"""
Admin configuration for inventory app
"""


from django.contrib import admin
from django.utils.html import format_html
from .models import Stock


@admin.register(Stock)
class StockAdmin(admin.ModelAdmin):
    list_display = [
        "product_id",
        "quantity",
        "reserved",
        "get_available",
        "stock_status",
        "updated_at",
    ]
    search_fields = ["product_id"]
    readonly_fields = ["id", "created_at", "updated_at"]
    list_filter = ["updated_at"]

    fieldsets = (
        ("Stock Information", {"fields": ("id", "product_id", "quantity", "reserved")}),
        (
            "Timestamps",
            {"fields": ("created_at", "updated_at"), "classes": ("collapse",)},
        ),
    )

    def get_available(self, obj):
        return obj.available

    get_available.short_description = "Available"

    def stock_status(self, obj):
        """Display colored stock status"""
        if obj.available <= 0:
            color = "#f44336"
            text = "Out of Stock"
        elif obj.is_low_stock():
            color = "#ff9800"
            text = "Low Stock"
        else:
            color = "#4CAF50"
            text = "In Stock"

        return format_html(
            '<span style="background-color: {}; color: white; padding: 5px 10px; '
            'border-radius: 3px; font-weight: bold;">{}</span>',
            color,
            text,
        )

    stock_status.short_description = "Status"
