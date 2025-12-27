from django.db import connection
from rest_framework import serializers

from .models import Review


class ReviewSerializer(serializers.ModelSerializer):
    product_details = serializers.SerializerMethodField()

    class Meta:
        model = Review
        fields = [
            "id",
            "user_id",
            "user_email",
            "product_id",
            "rating",
            "comment",
            "is_verified_purchase",
            "product_details",
            "created_at",
            "updated_at",
        ]
        read_only_fields = [
            "id",
            "user_id",
            "user_email",
            "is_verified_purchase",
            "created_at",
            "updated_at",
        ]

    def get_product_details(self, obj):
        """Fetch product details"""
        with connection.cursor() as cursor:
            cursor.execute(
                """
                SELECT id, name, slug, featured_image
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
                }
        return None


class CreateReviewSerializer(serializers.Serializer):
    product_id = serializers.UUIDField(required=True)
    rating = serializers.IntegerField(min_value=1, max_value=5, required=True)
    comment = serializers.CharField(required=True)

    def validate_product_id(self, value):
        """Verify product exists"""
        with connection.cursor() as cursor:
            cursor.execute(
                """
                SELECT id FROM public.products_product 
                WHERE id = %s AND is_active = true
            """,
                [str(value)],
            )

            if not cursor.fetchone():
                raise serializers.ValidationError("Product not found or not active")

        return value


class ProductReviewStatsSerializer(serializers.Serializer):
    product_id = serializers.UUIDField()
    average_rating = serializers.FloatField()
    total_reviews = serializers.IntegerField()
    rating_distribution = serializers.DictField()
