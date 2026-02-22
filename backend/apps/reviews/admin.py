"""
Admin configuration for reviews app
"""

from django.contrib import admin
from django.utils.html import format_html

from .models import Review


@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = [
        "get_user_email",
        "product",
        "rating_stars",
        "is_verified_purchase",
        "created_at",
    ]
    list_filter = ["rating", "is_verified_purchase", "created_at"]
    search_fields = ["user__email", "product__name", "comment"]
    readonly_fields = ["id", "created_at", "updated_at"]


    fieldsets = (
        (
            "Review Information",
            {
                "fields": (
                    "id",
                    "user",
                    "product",
                    "rating",
                    "is_verified_purchase",
                )
            },

        ),
        ("Content", {"fields": ("comment",)}),
        (
            "Timestamps",
            {"fields": ("created_at", "updated_at"), "classes": ("collapse",)},
        ),
    )

    def get_user_email(self, obj):
        return obj.user.email if obj.user else "N/A"
    get_user_email.short_description = "User Email"

    def rating_stars(self, obj):

        """Display rating as stars"""
        stars = "★" * obj.rating + "☆" * (5 - obj.rating)
        return format_html(
            '<span style="color: #FFD700; font-size: 16px;">{}</span>', stars
        )

    rating_stars.short_description = "Rating"
