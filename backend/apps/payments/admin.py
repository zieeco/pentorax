"""
Admin configuration for payments app
"""


from django.contrib import admin
from django.utils.html import format_html
from .models import Payment


@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = ["reference", "order_id", "amount", "status_badge", "created_at"]
    list_filter = ["status", "created_at"]
    search_fields = ["reference", "order_id"]
    readonly_fields = [
        "id",
        "reference",
        "paystack_response",
        "created_at",
        "updated_at",
    ]

    fieldsets = (
        (
            "Payment Information",
            {"fields": ("id", "reference", "order_id", "amount", "status")},
        ),
        (
            "Paystack Response",
            {"fields": ("paystack_response",), "classes": ("collapse",)},
        ),
        (
            "Timestamps",
            {"fields": ("created_at", "updated_at"), "classes": ("collapse",)},
        ),
    )

    def status_badge(self, obj):
        colors = {
            "pending": "#ff9800",
            "success": "#4CAF50",
            "failed": "#f44336",
            "abandoned": "#9e9e9e",
        }
        color = colors.get(obj.status, "#9e9e9e")

        return format_html(
            '<span style="background-color: {}; color: white; padding: 5px 10px; '
            'border-radius: 3px; font-weight: bold;">{}</span>',
            color,
            obj.get_status_display(),
        )

    status_badge.short_description = "Status"
