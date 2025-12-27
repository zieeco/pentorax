"""
Admin configuration for warranty app
"""

from django.contrib import admin
from django.utils.html import format_html

from .models import WarrantyCheck


@admin.register(WarrantyCheck)
class WarrantyCheckAdmin(admin.ModelAdmin):
    list_display = [
        "serial_number",
        "product_name",
        "customer_name",
        "expiry_date",
        "warranty_status",
        "support_level",
        "created_at",
    ]
    list_filter = ["support_level", "is_valid", "product_category", "expiry_date"]
    search_fields = ["serial_number", "product_name", "customer_name", "customer_email"]
    readonly_fields = ["id", "created_at", "updated_at", "warranty_status_display"]

    fieldsets = (
        (
            "Product Information",
            {"fields": ("id", "serial_number", "product_name", "product_category")},
        ),
        (
            "Warranty Details",
            {
                "fields": (
                    "purchase_date",
                    "warranty_duration_months",
                    "expiry_date",
                    "is_valid",
                    "support_level",
                    "warranty_status_display",
                )
            },
        ),
        ("Customer Information", {"fields": ("customer_name", "customer_email")}),
        ("Additional Information", {"fields": ("notes", "created_at", "updated_at")}),
    )

    def warranty_status(self, obj):
        """Display colored warranty status"""
        if obj.is_expired():
            color = "red"
            text = "Expired"
        elif obj.days_remaining() <= 30:
            color = "orange"
            text = f"Expiring Soon ({obj.days_remaining()} days)"
        else:
            color = "green"
            text = f"Active ({obj.days_remaining()} days)"

        return format_html(
            '<span style="color: {}; font-weight: bold;">{}</span>', color, text
        )

    warranty_status.short_description = "Status"

    def warranty_status_display(self, obj):
        """Display warranty status in detail view"""
        if obj.is_expired():
            return format_html(
                '<span style="color: red; font-weight: bold;">Expired</span>'
            )
        else:
            return format_html(
                '<span style="color: green; font-weight: bold;">Active - {} days remaining</span>',
                obj.days_remaining(),
            )

    warranty_status_display.short_description = "Warranty Status"
