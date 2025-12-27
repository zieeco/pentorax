"""
Serializers for warranty app
"""

from rest_framework import serializers

from .models import WarrantyCheck


class WarrantyCheckSerializer(serializers.ModelSerializer):
    """Serializer for warranty check requests"""

    is_expired = serializers.BooleanField(read_only=True)
    days_remaining = serializers.IntegerField(read_only=True)
    support_level_display = serializers.CharField(
        source="get_support_level_display", read_only=True
    )

    class Meta:
        model = WarrantyCheck
        fields = [
            "id",
            "serial_number",
            "product_name",
            "product_category",
            "purchase_date",
            "warranty_duration_months",
            "expiry_date",
            "is_valid",
            "is_expired",
            "days_remaining",
            "support_level",
            "support_level_display",
            "customer_name",
            "customer_email",
            "notes",
            "created_at",
        ]
        read_only_fields = ["id", "created_at", "is_expired", "days_remaining"]


class WarrantyLookupSerializer(serializers.Serializer):
    """Serializer for public warranty lookup (limited fields)"""

    serial_number = serializers.CharField(max_length=100)
    product_name = serializers.CharField(read_only=True)
    product_category = serializers.CharField(read_only=True)
    purchase_date = serializers.DateField(read_only=True)
    expiry_date = serializers.DateField(read_only=True)
    is_valid = serializers.BooleanField(read_only=True)
    is_expired = serializers.BooleanField(read_only=True)
    days_remaining = serializers.IntegerField(read_only=True)
    support_level = serializers.CharField(read_only=True)
