"""
Serializers for cart app
"""

from django.db import connection
from rest_framework import serializers

from .models import Cart, CartItem


class CartItemSerializer(serializers.ModelSerializer):
    product = serializers.SerializerMethodField()
    subtotal = serializers.SerializerMethodField()

    class Meta:
        model = CartItem
        fields = [
            "id",
            "cart_id",
            "product_id",
            "quantity",
            "product",
            "subtotal",
            "created_at",
        ]
        read_only_fields = ["id", "cart_id", "created_at"]

    def get_product(self, obj):
        """Fetch product details"""
        with connection.cursor() as cursor:
            cursor.execute(
                """
                SELECT id, name, slug, featured_image, price, 
                       compare_at_price, is_active
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
                    "featured_image": row[3],
                    "price": float(row[4]),
                    "compare_at_price": float(row[5]) if row[5] else None,
                    "is_active": row[6],
                }
        return None

    def get_subtotal(self, obj):
        """Calculate subtotal for this item"""
        product = self.get_product(obj)
        if product:
            return float(product["price"]) * obj.quantity
        return 0


class AddToCartSerializer(serializers.Serializer):
    product_id = serializers.UUIDField(required=True)
    quantity = serializers.IntegerField(default=1, min_value=1)

    def validate_product_id(self, value):
        """Verify product exists and is active"""
        with connection.cursor() as cursor:
            cursor.execute(
                """
                SELECT id FROM public.products_product 
                WHERE id = %s AND is_active = true
            """,
                [str(value)],
            )

            if not cursor.fetchone():
                raise serializers.ValidationError("Product not found or not available")

        return value


class UpdateCartItemSerializer(serializers.Serializer):
    quantity = serializers.IntegerField(min_value=1, required=True)
