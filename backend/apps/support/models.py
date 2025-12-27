import uuid

from django.db import models


class TimeStampedModel(models.Model):
    """Abstract base model with timestamps"""

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class SupportTicket(TimeStampedModel):
    """Customer support tickets"""

    STATUS_CHOICES = [
        ("open", "Open"),
        ("in_progress", "In Progress"),
        ("resolved", "Resolved"),
        ("closed", "Closed"),
    ]

    CATEGORY_CHOICES = [
        ("inverter", "Inverter Performance"),
        ("battery", "Battery Discharge Level"),
        ("connectivity", "App Connectivity"),
        ("installation", "New Hardware Install"),
        ("other", "Other"),
    ]

    PRIORITY_CHOICES = [
        ("low", "Low"),
        ("medium", "Medium"),
        ("high", "High"),
        ("urgent", "Urgent"),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    serial_number = models.CharField(max_length=100)
    description = models.TextField()
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default="open")
    priority = models.CharField(
        max_length=50, choices=PRIORITY_CHOICES, default="medium"
    )
    user_email = models.EmailField(max_length=255, blank=True)
    user_name = models.CharField(max_length=255, blank=True)
    assigned_to = models.CharField(max_length=255, blank=True)
    resolution_notes = models.TextField(blank=True)

    class Meta(TimeStampedModel.Meta):
        db_table = "support_supportticket"
        ordering = ["-created_at"]

    def __str__(self):
        return f"Ticket {self.id} - {self.category} - {self.status}"
