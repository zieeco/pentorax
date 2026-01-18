"""
Views for cart app - supports both authenticated and guest users
"""

from django.db import connection
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

from .models import Cart, CartItem
from .serializers import (
    AddToCartSerializer,
    CartItemSerializer,
    UpdateCartItemSerializer,
)


def get_or_create_cart(request):
    """
    Get or create cart for user (authenticated) or session (guest)
    Returns: (cart, is_session_cart)
    """
    if request.user.is_authenticated:
        # Authenticated user - use database cart
        cart, created = Cart.objects.get_or_create(user_id=request.user.id)
        return cart, False
    else:
        # Guest user - use session cart
        if not request.session.session_key:
            request.session.create()
        
        session_key = request.session.session_key
        cart, created = Cart.objects.get_or_create(
            session_key=session_key,
            user_id=None
        )
        return cart, True


class CartViewSet(viewsets.ModelViewSet):
    """
    ViewSet for shopping cart operations.
    
    Permissions: AllowAny (guests can use cart, auth required at checkout)
    """

    serializer_class = CartItemSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        """Get cart items for the user or session"""
        cart, _ = get_or_create_cart(self.request)
        return CartItem.objects.filter(cart_id=cart.id)

    def list(self, request):
        """List all cart items with total"""
        cart, _ = get_or_create_cart(request)

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

        product_id = serializer.validated_data["product_id"]
        quantity = serializer.validated_data["quantity"]

        # Get or create cart
        cart, _ = get_or_create_cart(request)

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

        cart, _ = get_or_create_cart(request)

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
        cart, _ = get_or_create_cart(request)

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
        cart, _ = get_or_create_cart(request)

        if cart:
            deleted_count = CartItem.objects.filter(cart_id=cart.id).delete()[0]
            return Response(
                {"detail": f"{deleted_count} items removed from cart"},
                status=status.HTTP_204_NO_CONTENT,
            )

        return Response(
            {"detail": "Cart is already empty"}, status=status.HTTP_204_NO_CONTENT
        )

    @action(detail=False, methods=["post"], permission_classes=[IsAuthenticated])
    def merge_cart(self, request):
        """
        Merge guest cart (session) into user cart after login.
        Called automatically by frontend after successful login.
        """
        session_key = request.data.get('session_key')
        
        if not session_key:
            return Response(
                {"detail": "session_key required"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        user_id = str(request.user.id)
        
        try:
            # Get guest cart
            guest_cart = Cart.objects.filter(session_key=session_key, user_id__isnull=True).first()
            
            if not guest_cart:
                return Response({"detail": "No guest cart to merge"}, status=status.HTTP_200_OK)
            
            # Get or create user cart
            user_cart, created = Cart.objects.get_or_create(user_id=user_id)
            
            # Move all items from guest cart to user cart
            guest_items = CartItem.objects.filter(cart=guest_cart)
            merged_count = 0
            
            for guest_item in guest_items:
                # Check if item already exists in user cart
                user_item = CartItem.objects.filter(
                    cart=user_cart,
                    product=guest_item.product
                ).first()
                
                if user_item:
                    # Update quantity if item exists
                    user_item.quantity += guest_item.quantity
                    user_item.save()
                else:
                    # Move item to user cart
                    guest_item.cart = user_cart
                    guest_item.save()
                
                merged_count += 1
            
            # Delete the guest cart
            guest_cart.delete()
            
            return Response(
                {"detail": f"Merged {merged_count} items from guest cart"},
                status=status.HTTP_200_OK
            )
            
        except Exception as e:
            return Response(
                {"detail": f"Error merging cart: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
