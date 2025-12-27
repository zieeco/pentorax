"""
Admin configuration for quotes app
"""

from django.contrib import admin

from .models import QuoteRequest


@admin.register(QuoteRequest)
class QuoteRequestAdmin(admin.ModelAdmin):
    list_display = ["name", "email", "phone", "status_badge", "created_at"]
    list_filter = ["status", "created_at"]
    search_fields = ["name", "email", "phone", "message"]
    readonly_fields = ["id", "created_at", "updated_at"]
    actions = ["mark_as_contacted", "mark_as_quoted", "mark_as_closed"]

    fieldsets = (
        ("Customer Information", {"fields": ("id", "name", "email", "phone")}),
        ("Quote Details", {"fields": ("message", "status")}),
        ("Timestamps", {"fields": ("created_at", "updated_at")}),
    )

    def status_badge(self, obj):
        """Display colored status badge"""
        colors = {
            "new": "#f44336",
            "contacted": "#ff9800",
            "quoted": "#2196F3",
            "closed": "#4CAF50",
        }
        color = colors.get(obj.status, "#9e9e9e")

        return format_html(
            '<span style="background-color: {}; color: white; padding: 5px 10px; '
            'border-radius: 3px; font-weight: bold;">{}</span>',
            color,
            obj.get_status_display(),
        )

    status_badge.short_description = "Status"

    def mark_as_contacted(self, request, queryset):
        queryset.update(status="contacted")
        self.message_user(
            request, f"{queryset.count()} quote requests marked as contacted."
        )

    mark_as_contacted.short_description = "Mark as Contacted"

    def mark_as_quoted(self, request, queryset):
        queryset.update(status="quoted")
        self.message_user(
            request, f"{queryset.count()} quote requests marked as quoted."
        )

    mark_as_quoted.short_description = "Mark as Quoted"

    def mark_as_closed(self, request, queryset):
        queryset.update(status="closed")
        self.message_user(
            request, f"{queryset.count()} quote requests marked as closed."
        )

    mark_as_closed.short_description = "Mark as Closed"
