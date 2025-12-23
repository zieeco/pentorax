"""
Serializers for reviews app
"""
from rest_framework import serializers
from .models import Review


class ReviewSerializer(serializers.ModelSerializer):
    """Serializer for product reviews"""
    user_email = serializers.EmailField(read_only=True)
    
    class Meta:
        model = Review
        fields = ['id', 'product', 'user_id', 'user_email', 'rating', 'comment', 'is_verified_purchase', 'created_at']
        read_only_fields = ['id', 'user_id', 'user_email', 'is_verified_purchase', 'created_at']
