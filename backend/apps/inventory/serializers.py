"""
Serializers for inventory app
"""
from rest_framework import serializers
from .models import Stock


class StockSerializer(serializers.ModelSerializer):
    """Serializer for product stock"""
    product_name = serializers.CharField(source='product.name', read_only=True)
    available = serializers.IntegerField(read_only=True)
    
    class Meta:
        model = Stock
        fields = ['id', 'product', 'product_name', 'quantity', 'reserved', 'available', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']
