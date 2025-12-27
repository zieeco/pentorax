"""
Admin configuration for warranty app
"""

from django.contrib import admin

from .models import SupportTicket


@admin.register(SupportTicket)
class SupportTicketAdmin(admin.ModelAdmin):
    list_display = [
        "id",
        "category",
        "serial_number",
        "status",
        "priority",
        "user_email",
        "assigned_to",
        "created_at",
    ]
    list_filter = ["status", "priority", "category", "created_at"]
    search_fields = ["serial_number", "user_email", "user_name", "description"]
    readonly_fields = ["id", "created_at", "updated_at"]
    actions = ["mark_as_in_progress", "mark_as_resolved", "mark_as_closed"]

    fieldsets = (
        (
            "Ticket Information",
            {
                "fields": (
                    "id",
                    "category",
                    "serial_number",
                    "description",
                    "created_at",
                    "updated_at",
                )
            },
        ),
        ("Customer Information", {"fields": ("user_name", "user_email")}),
        ("Status & Assignment", {"fields": ("status", "priority", "assigned_to")}),
        ("Resolution", {"fields": ("resolution_notes",)}),
    )

    def mark_as_in_progress(self, request, queryset):
        queryset.update(status="in_progress")
        self.message_user(request, f"{queryset.count()} tickets marked as in progress.")

    mark_as_in_progress.short_description = "Mark as In Progress"

    def mark_as_resolved(self, request, queryset):
        queryset.update(status="resolved")
        self.message_user(request, f"{queryset.count()} tickets marked as resolved.")

    mark_as_resolved.short_description = "Mark as Resolved"

    def mark_as_closed(self, request, queryset):
        queryset.update(status="closed")
        self.message_user(request, f"{queryset.count()} tickets marked as closed.")

    mark_as_closed.short_description = "Mark as Closed"
