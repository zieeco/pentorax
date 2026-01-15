"""
Newsletter serializers
"""
from rest_framework import serializers
from .models import NewsletterSubscriber


class NewsletterSubscriberSerializer(serializers.ModelSerializer):
    """Serializer for newsletter subscription"""
    
    class Meta:
        model = NewsletterSubscriber
        fields = ['id', 'email', 'full_name', 'created_at', 'is_active']
        read_only_fields = ['id', 'created_at', 'is_active']
    
    def validate_email(self, value):
        """Validate email format and check if already subscribed"""
        # Convert to lowercase for consistency
        value = value.lower().strip()
        return value


class UnsubscribeSerializer(serializers.Serializer):
    """Serializer for unsubscribe request"""
    token = serializers.UUIDField(required=True)
