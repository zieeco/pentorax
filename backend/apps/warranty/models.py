import uuid
from datetime import timedelta

from django.db import models
from django.utils import timezone


class TimeStampedModel(models.Model):
    """Abstract base model with timestamps"""

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class WarrantyCheck(TimeStampedModel):
    """Product warranty verification and tracking"""

    SUPPORT_LEVEL_CHOICES = [
        ("basic", "Basic"),
        ("standard", "Standard"),
        ("premium", "Premium"),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    serial_number = models.CharField(max_length=100, unique=True)
    product_name = models.CharField(max_length=255)
    product_category = models.CharField(max_length=100)
    purchase_date = models.DateField()
    warranty_duration_months = models.IntegerField(default=12)
    expiry_date = models.DateField()
    is_valid = models.BooleanField(default=True)
    support_level = models.CharField(
        max_length=50, choices=SUPPORT_LEVEL_CHOICES, default="standard"
    )
    customer_name = models.CharField(max_length=255, blank=True)
    customer_email = models.EmailField(max_length=255, blank=True)
    notes = models.TextField(blank=True)

    class Meta(TimeStampedModel.Meta):
        db_table = "warranty_warrantycheck"
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.serial_number} - {self.product_name}"

    def save(self, *args, **kwargs):
        """Auto-calculate expiry date if not set"""
        if not self.expiry_date and self.purchase_date:
            self.expiry_date = self.purchase_date + timedelta(
                days=self.warranty_duration_months * 30
            )
        super().save(*args, **kwargs)

    def is_expired(self):
        """Check if warranty has expired"""
        return timezone.now().date() > self.expiry_date

    def days_remaining(self):
        """Calculate days remaining in warranty"""
        if self.is_expired():
            return 0
        return (self.expiry_date - timezone.now().date()).days
