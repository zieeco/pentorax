"""
Serializers for inventory app
"""

from django.db import connection
from rest_framework import serializers

from .models import Stock


class StockSerializer(serializers.ModelSerializer):
    available = serializers.ReadOnlyField()
    is_in_stock = serializers.ReadOnlyField()
    is_low_stock = serializers.SerializerMethodField()
    product_details = serializers.SerializerMethodField()

    class Meta:
        model = Stock
        fields = [
            "id",
            "product_id",
            "quantity",
            "reserved",
            "available",
            "is_in_stock",
            "is_low_stock",
            "product_details",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "created_at", "updated_at"]

    def get_is_low_stock(self, obj):
        return obj.is_low_stock()

    def get_product_details(self, obj):
        """Fetch product details"""
        with connection.cursor() as cursor:
            cursor.execute(
                """
                SELECT id, name, slug, price, featured_image
                FROM public.products_product
                WHERE id = %s
            """,
                [str(obj.product_id)],
            )

            row = cursor.fetchone()
            if row:
                return {
                    "id": str(row[0]),
                    "name": row[1],
                    "slug": row[2],
                    "price": float(row[3]),
                    "featured_image": row[4],
                }
        return None


class UpdateStockSerializer(serializers.Serializer):
    quantity = serializers.IntegerField(min_value=0, required=True)


class ReserveStockSerializer(serializers.Serializer):
    product_id = serializers.UUIDField(required=True)
    quantity = serializers.IntegerField(min_value=1, required=True)
