"""
Serializers for orders app
"""

from django.db import connection
from rest_framework import serializers

from .models import Order, OrderItem


class OrderItemSerializer(serializers.ModelSerializer):
    product_details = serializers.SerializerMethodField()
    subtotal = serializers.ReadOnlyField()

    class Meta:
        model = OrderItem
        fields = [
            "id",
            "order_id",
            "product_id",
            "quantity",
            "price",
            "subtotal",
            "product_details",
            "created_at",
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


class OrderListSerializer(serializers.ModelSerializer):
    item_count = serializers.SerializerMethodField()
    status_display = serializers.CharField(source="get_status_display", read_only=True)

    class Meta:
        model = Order
        fields = [
            "id",
            "user_id",
            "email",
            "status",
            "status_display",
            "total",
            "item_count",
            "created_at",
        ]

    def get_item_count(self, obj):
        return OrderItem.objects.filter(order_id=obj.id).count()


class OrderDetailSerializer(serializers.ModelSerializer):
    items = serializers.SerializerMethodField()
    status_display = serializers.CharField(source="get_status_display", read_only=True)

    class Meta:
        model = Order
        fields = [
            "id",
            "user_id",
            "email",
            "status",
            "status_display",
            "total",
            "shipping_name",
            "shipping_address",
            "shipping_city",
            "shipping_state",
            "shipping_phone",
            "items",
            "created_at",
            "updated_at",
        ]

    def get_items(self, obj):
        items = OrderItem.objects.filter(order_id=obj.id)
        return OrderItemSerializer(items, many=True).data


class CreateOrderSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    shipping_name = serializers.CharField(max_length=255, required=True)
    shipping_address = serializers.CharField(required=True)
    shipping_city = serializers.CharField(max_length=255, required=True)
    shipping_state = serializers.CharField(max_length=255, required=True)
    shipping_phone = serializers.CharField(max_length=50, required=True)
