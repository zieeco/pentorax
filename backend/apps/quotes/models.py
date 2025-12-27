import uuid

from django.db import models


class TimeStampedModel(models.Model):
    """Abstract base model with timestamps"""

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class QuoteRequest(TimeStampedModel):
    """Quote request from customers"""

    STATUS_CHOICES = [
        ("new", "New"),
        ("contacted", "Contacted"),
        ("quoted", "Quoted"),
        ("closed", "Closed"),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    email = models.EmailField(max_length=255)
    phone = models.CharField(max_length=50)
    message = models.TextField()
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default="new")

    class Meta(TimeStampedModel.Meta):
        db_table = "quotes_quoterequest"
        ordering = ["-created_at"]

    def __str__(self):
        return f"Quote from {self.name} - {self.status}"
