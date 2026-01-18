"""
Serializers for payments app
"""
from rest_framework import serializers
from .models import Payment
from apps.orders.serializers import OrderDetailSerializer


class PaymentSerializer(serializers.ModelSerializer):
    """Serializer for payment transactions"""
    order = OrderDetailSerializer(read_only=True)
    order_id = serializers.UUIDField(write_only=True)
    
    class Meta:
        model = Payment
        fields = ['id', 'order', 'order_id', 'reference', 'amount', 'status', 'paystack_response', 'created_at']
        read_only_fields = ['id', 'reference', 'status', 'paystack_response', 'created_at']


class PaymentInitializeSerializer(serializers.Serializer):
    """Serializer for initializing payment"""
    order_id = serializers.UUIDField()


class PaymentVerifySerializer(serializers.Serializer):
    """Serializer for verifying payment"""
    reference = serializers.CharField()
