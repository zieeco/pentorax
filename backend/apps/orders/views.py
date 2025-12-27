"""
Views for orders app
"""


from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from django.db import connection, transaction
from .models import Order, OrderItem
from .serializers import (
    OrderListSerializer,
    OrderDetailSerializer,
    CreateOrderSerializer,
)
from .emails import send_order_confirmation


class OrderViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet for orders.

    Permissions:
    - list, retrieve, create_order, cancel: IsAuthenticated
    - Admin can see all orders
    """

    permission_classes = [IsAuthenticated]

    def get_permissions(self):
        """Allow authenticated users for most actions, admin for update_status"""
        if self.action == "update_status":
            return [IsAdminUser()]
        return [IsAuthenticated()]

    def get_queryset(self):
        """Get orders for authenticated user (or all for admin)"""
        user = self.request.user
        user_id = str(user.id)

        if user.is_staff or user.is_superuser:
            return Order.objects.all()

        return Order.objects.filter(user_id=user_id)

    def get_serializer_class(self):
        if self.action == "retrieve":
            return OrderDetailSerializer
        return OrderListSerializer

    @action(detail=False, methods=["post"])
    def create_order(self, request):
        """Create order from cart"""
        serializer = CreateOrderSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user_id = str(request.user.id)

        # Get user's cart
        with connection.cursor() as cursor:
            cursor.execute(
                """
                SELECT id FROM public.cart_cart WHERE user_id = %s
            """,
                [user_id],
            )
            cart_row = cursor.fetchone()

            if not cart_row:
                return Response(
                    {"detail": "Cart not found"}, status=status.HTTP_404_NOT_FOUND
                )

            cart_id = cart_row[0]

            # Get cart items with product details
            cursor.execute(
                """
                SELECT ci.product_id, ci.quantity, p.price, p.name, p.is_active
                FROM public.cart_cartitem ci
                JOIN public.products_product p ON ci.product_id = p.id
                WHERE ci.cart_id = %s
            """,
                [str(cart_id)],
            )

            cart_items = cursor.fetchall()

            if not cart_items:
                return Response(
                    {"detail": "Cart is empty"}, status=status.HTTP_400_BAD_REQUEST
                )

        # Calculate total
        total = sum(float(item[2]) * item[1] for item in cart_items if item[4])

        if total <= 0:
            return Response(
                {"detail": "No valid items in cart"}, status=status.HTTP_400_BAD_REQUEST
            )

        # Create order
        with transaction.atomic():
            order = Order.objects.create(
                user_id=user_id,
                email=serializer.validated_data["email"],
                total=total,
                shipping_name=serializer.validated_data["shipping_name"],
                shipping_address=serializer.validated_data["shipping_address"],
                shipping_city=serializer.validated_data["shipping_city"],
                shipping_state=serializer.validated_data["shipping_state"],
                shipping_phone=serializer.validated_data["shipping_phone"],
            )

            # Create order items
            for item in cart_items:
                if item[4]:
                    OrderItem.objects.create(
                        order_id=order.id,
                        product_id=item[0],
                        quantity=item[1],
                        price=item[2],
                    )

            # Clear cart
            with connection.cursor() as cursor:
                cursor.execute(
                    """
                    DELETE FROM public.cart_cartitem WHERE cart_id = %s
                """,
                    [str(cart_id)],
                )

        # Send confirmation email
        send_order_confirmation(order)

        order_serializer = OrderDetailSerializer(order)
        return Response(order_serializer.data, status=status.HTTP_201_CREATED)

    @action(detail=True, methods=["post"])
    def cancel(self, request, pk=None):
        """Cancel an order"""
        user_id = str(request.user.id)

        try:
            order = Order.objects.get(id=pk, user_id=user_id)

            if order.status not in ["pending", "processing"]:
                return Response(
                    {"detail": "Order cannot be cancelled at this stage"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            order.status = "cancelled"
            order.save()

            serializer = OrderDetailSerializer(order)
            return Response(serializer.data)
        except Order.DoesNotExist:
            return Response(
                {"detail": "Order not found"}, status=status.HTTP_404_NOT_FOUND
            )

    @action(detail=True, methods=["post"], permission_classes=[IsAdminUser])
    def update_status(self, request, pk=None):
        """Update order status (admin only)"""
        order = self.get_object()
        new_status = request.data.get("status")

        valid_statuses = ["pending", "processing", "shipped", "delivered", "cancelled"]
        if new_status not in valid_statuses:
            return Response(
                {
                    "error": f'Invalid status. Must be one of: {", ".join(valid_statuses)}'
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        order.status = new_status
        order.save()

        serializer = OrderDetailSerializer(order)
        return Response(serializer.data)
