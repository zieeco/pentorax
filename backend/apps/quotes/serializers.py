"""
Serializers for quotes app
"""
from rest_framework import serializers
from .models import QuoteRequest


class QuoteRequestSerializer(serializers.ModelSerializer):
    """Serializer for quote requests"""
    class Meta:
        model = QuoteRequest
        fields = ['id', 'name', 'email', 'phone', 'message', 'status', 'created_at']
        read_only_fields = ['id', 'status', 'created_at']
