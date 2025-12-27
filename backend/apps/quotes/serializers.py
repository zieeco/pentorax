"""
Serializers for quotes app
"""

from rest_framework import serializers  # type: ignore

from .models import QuoteRequest


class QuoteRequestSerializer(serializers.ModelSerializer):
    """Serializer for quote requests"""

    status_display = serializers.CharField(source="get_status_display", read_only=True)

    class Meta:
        model = QuoteRequest
        fields = [
            "id",
            "name",
            "email",
            "phone",
            "message",
            "status",
            "status_display",
            "created_at",
            "updated_at",
        ]
        read_only_fields = [
            "id",
            "status",
            "status_display",
            "created_at",
            "updated_at",
        ]
