"""
Serializers for orders app
"""
from rest_framework import serializers
from .models import Order, OrderItem
from apps.products.serializers import ProductListSerializer


class OrderItemSerializer(serializers.ModelSerializer):
    """Serializer for order items"""
    product = ProductListSerializer(read_only=True)
    product_id = serializers.UUIDField(write_only=True)
    
    class Meta:
        model = OrderItem
        fields = ['id', 'product', 'product_id', 'quantity', 'price', 'created_at']
        read_only_fields = ['id', 'price', 'created_at']


class OrderListSerializer(serializers.ModelSerializer):
    """Lightweight serializer for order lists"""
    item_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Order
        fields = [
            'id', 'status', 'total', 'item_count',
            'shipping_name', 'created_at'
        ]
        read_only_fields = ['id', 'created_at']
    
    def get_item_count(self, obj):
        return obj.items.count()


class OrderDetailSerializer(serializers.ModelSerializer):
    """Detailed serializer for single order view"""
    items = OrderItemSerializer(many=True, read_only=True)
    
    class Meta:
        model = Order
        fields = [
            'id', 'user_id', 'email', 'status', 'total',
            'shipping_name', 'shipping_address', 'shipping_city',
            'shipping_state', 'shipping_phone', 'items',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']


class OrderCreateSerializer(serializers.ModelSerializer):
    """Serializer for creating orders"""
    items = OrderItemSerializer(many=True)
    
    class Meta:
        model = Order
        fields = [
            'email', 'shipping_name', 'shipping_address',
            'shipping_city', 'shipping_state', 'shipping_phone', 'items'
        ]
    
    def create(self, validated_data):
        items_data = validated_data.pop('items')
        user_id = self.context['request'].user.id if hasattr(self.context['request'].user, 'id') else 'guest'
        
        # Calculate total
        total = sum(item['quantity'] * item['product'].price for item in items_data)
        
        order = Order.objects.create(
            user_id=user_id,
            total=total,
            **validated_data
        )
        
        # Create order items
        for item_data in items_data:
            OrderItem.objects.create(
                order=order,
                product=item_data['product'],
                quantity=item_data['quantity'],
                price=item_data['product'].price
            )
        
        return order
