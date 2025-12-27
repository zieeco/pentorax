"""
Serializers for warranty app
"""

from rest_framework import serializers

from .models import SupportTicket


class SupportTicketSerializer(serializers.ModelSerializer):
    status_display = serializers.CharField(source="get_status_display", read_only=True)
    priority_display = serializers.CharField(
        source="get_priority_display", read_only=True
    )

    class Meta:
        model = SupportTicket
        fields = [
            "id",
            "category",
            "serial_number",
            "description",
            "status",
            "status_display",
            "priority",
            "priority_display",
            "user_email",
            "user_name",
            "assigned_to",
            "resolution_notes",
            "created_at",
            "updated_at",
        ]
        read_only_fields = [
            "id",
            "created_at",
            "updated_at",
            "status_display",
            "priority_display",
        ]


class SupportTicketCreateSerializer(serializers.ModelSerializer):
    """Serializer for creating support tickets (limited fields)"""

    class Meta:
        model = SupportTicket
        fields = [
            "category",
            "serial_number",
            "description",
            "user_email",
            "user_name",
            "priority",
        ]
