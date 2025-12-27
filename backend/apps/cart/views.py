"""
Views for cart app
"""

from django.db import connection
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import Cart, CartItem
from .serializers import (
    AddToCartSerializer,
    CartItemSerializer,
    UpdateCartItemSerializer,
)


class CartViewSet(viewsets.ModelViewSet):
    """
    ViewSet for shopping cart operations.

    Permissions: IsAuthenticated (all actions)
    """

    serializer_class = CartItemSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """Get cart items for the authenticated user"""
        user_id = self.request.user.id

        # Get or create cart for user
        cart, created = Cart.objects.get_or_create(user_id=user_id)

        return CartItem.objects.filter(cart_id=cart.id)

    def list(self, request):
        """List all cart items with total"""
        user_id = request.user.id
        cart, created = Cart.objects.get_or_create(user_id=user_id)

        items = CartItem.objects.filter(cart_id=cart.id)
        serializer = CartItemSerializer(items, many=True)

        # Calculate total
        total = sum(item["subtotal"] for item in serializer.data)

        return Response(
            {
                "cart_id": str(cart.id),
                "items": serializer.data,
                "item_count": items.count(),
                "total": total,
            }
        )

    def create(self, request):
        """Add item to cart or update quantity if exists"""
        serializer = AddToCartSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user_id = request.user.id
        product_id = serializer.validated_data["product_id"]
        quantity = serializer.validated_data["quantity"]

        # Get or create cart
        cart, created = Cart.objects.get_or_create(user_id=user_id)

        # Check if item already in cart
        cart_item, item_created = CartItem.objects.get_or_create(
            cart_id=cart.id, product_id=product_id, defaults={"quantity": quantity}
        )

        if not item_created:
            # Update quantity if item already exists
            cart_item.quantity += quantity
            cart_item.save()

        item_serializer = CartItemSerializer(cart_item)
        return Response(item_serializer.data, status=status.HTTP_201_CREATED)

    def update(self, request, pk=None):
        """Update cart item quantity"""
        serializer = UpdateCartItemSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user_id = request.user.id
        cart = Cart.objects.filter(user_id=user_id).first()

        if not cart:
            return Response(
                {"detail": "Cart not found"}, status=status.HTTP_404_NOT_FOUND
            )

        try:
            cart_item = CartItem.objects.get(id=pk, cart_id=cart.id)
            cart_item.quantity = serializer.validated_data["quantity"]
            cart_item.save()

            item_serializer = CartItemSerializer(cart_item)
            return Response(item_serializer.data)
        except CartItem.DoesNotExist:
            return Response(
                {"detail": "Cart item not found"}, status=status.HTTP_404_NOT_FOUND
            )

    def destroy(self, request, pk=None):
        """Remove item from cart"""
        user_id = request.user.id
        cart = Cart.objects.filter(user_id=user_id).first()

        if not cart:
            return Response(status=status.HTTP_404_NOT_FOUND)

        try:
            cart_item = CartItem.objects.get(id=pk, cart_id=cart.id)
            cart_item.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except CartItem.DoesNotExist:
            return Response(
                {"detail": "Cart item not found"}, status=status.HTTP_404_NOT_FOUND
            )

    @action(detail=False, methods=["delete"])
    def clear(self, request):
        """Clear all items from cart"""
        user_id = request.user.id
        cart = Cart.objects.filter(user_id=user_id).first()

        if cart:
            deleted_count = CartItem.objects.filter(cart_id=cart.id).delete()[0]
            return Response(
                {"detail": f"{deleted_count} items removed from cart"},
                status=status.HTTP_204_NO_CONTENT,
            )

        return Response(
            {"detail": "Cart is already empty"}, status=status.HTTP_204_NO_CONTENT
        )
