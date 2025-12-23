"""
Views for cart app
"""
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import Cart, CartItem
from .serializers import CartSerializer, CartItemSerializer
from apps.products.models import Product


class CartViewSet(viewsets.ModelViewSet):
    """
    ViewSet for shopping cart management
    """
    serializer_class = CartSerializer
    
    def get_queryset(self):
        # Get user ID from Supabase auth or session
        user_id = getattr(self.request.user, 'id', None) or self.request.session.session_key
        return Cart.objects.filter(user_id=user_id).prefetch_related('items__product')
    
    def get_or_create_cart(self):
        """Get or create cart for current user"""
        user_id = getattr(self.request.user, 'id', None) or self.request.session.session_key
        cart, created = Cart.objects.get_or_create(user_id=user_id)
        return cart
    
    @action(detail=False, methods=['get'])
    def current(self, request):
        """Get current user's cart"""
        cart = self.get_or_create_cart()
        serializer = self.get_serializer(cart)
        return Response(serializer.data)
    
    @action(detail=False, methods=['post'])
    def add_item(self, request):
        """Add item to cart"""
        cart = self.get_or_create_cart()
        product_id = request.data.get('product_id')
        quantity = int(request.data.get('quantity', 1))
        
        product = get_object_or_404(Product, id=product_id)
        
        # Update or create cart item
        cart_item, created = CartItem.objects.get_or_create(
            cart=cart,
            product=product,
            defaults={'quantity': quantity}
        )
        
        if not created:
            cart_item.quantity += quantity
            cart_item.save()
        
        serializer = CartSerializer(cart)
        return Response(serializer.data)
    
    @action(detail=False, methods=['patch'])
    def update_item(self, request):
        """Update cart item quantity"""
        cart = self.get_or_create_cart()
        item_id = request.data.get('item_id')
        quantity = int(request.data.get('quantity', 1))
        
        cart_item = get_object_or_404(CartItem, id=item_id, cart=cart)
        cart_item.quantity = quantity
        cart_item.save()
        
        serializer = CartSerializer(cart)
        return Response(serializer.data)
    
    @action(detail=False, methods=['delete'])
    def remove_item(self, request):
        """Remove item from cart"""
        cart = self.get_or_create_cart()
        item_id = request.query_params.get('item_id')
        
        cart_item = get_object_or_404(CartItem, id=item_id, cart=cart)
        cart_item.delete()
        
        serializer = CartSerializer(cart)
        return Response(serializer.data)
    
    @action(detail=False, methods=['delete'])
    def clear(self, request):
        """Clear all items from cart"""
        cart = self.get_or_create_cart()
        cart.items.all().delete()
        
        serializer = CartSerializer(cart)
        return Response(serializer.data)
