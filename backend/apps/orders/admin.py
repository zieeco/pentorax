"""
Admin configuration for orders app
"""

from django.contrib import admin
from django.utils.html import format_html

from .models import Order, OrderItem


class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0
    readonly_fields = ["product_id", "quantity", "price"]
    can_delete = False


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ["order_number", "email", "status_badge", "total", "created_at"]
    list_filter = ["status", "created_at"]
    search_fields = ["id", "email", "user_id", "shipping_name"]
    readonly_fields = ["id", "created_at", "updated_at"]
    inlines = [OrderItemInline]

    fieldsets = (
        (
            "Order Information",
            {"fields": ("id", "user_id", "email", "status", "total")},
        ),
        (
            "Shipping Details",
            {
                "fields": (
                    "shipping_name",
                    "shipping_address",
                    "shipping_city",
                    "shipping_state",
                    "shipping_phone",
                )
            },
        ),
        (
            "Timestamps",
            {"fields": ("created_at", "updated_at"), "classes": ("collapse",)},
        ),
    )

    def order_number(self, obj):
        return f"#{str(obj.id)[:8]}"

    order_number.short_description = "Order #"

    def status_badge(self, obj):
        colors = {
            "pending": "#ff9800",
            "processing": "#2196F3",
            "shipped": "#9C27B0",
            "delivered": "#4CAF50",
            "cancelled": "#f44336",
        }
        color = colors.get(obj.status, "#9e9e9e")

        return format_html(
            '<span style="background-color: {}; color: white; padding: 5px 10px; '
            'border-radius: 3px; font-weight: bold;">{}</span>',
            color,
            obj.get_status_display(),
        )

    status_badge.short_description = "Status"


@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):
    list_display = ["id", "order_id", "product_id", "quantity", "price", "created_at"]
    list_filter = ["created_at"]
    search_fields = ["order_id", "product_id"]
    readonly_fields = ["id", "created_at", "updated_at"]
