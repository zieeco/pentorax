"""
Product reviews models
"""

import uuid

from django.db import models
from .models_votes import ReviewVote


class TimeStampedModel(models.Model):
    """Abstract base model with timestamps"""

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


from django.contrib.auth.models import User

class Review(TimeStampedModel):
    """Product review"""

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='reviews', null=True, blank=True)


    product = models.ForeignKey(
        'products.Product',
        on_delete=models.CASCADE,
        related_name="reviews",
        db_column="product_id",
    )
    rating = models.IntegerField()
    comment = models.TextField()
    images = models.JSONField(default=list, blank=True)  # List of image URLs
    is_verified_purchase = models.BooleanField(default=False)
    helpful_count = models.IntegerField(default=0)
    not_helpful_count = models.IntegerField(default=0)

    class Meta(TimeStampedModel.Meta):
        db_table = "reviews_review"
        verbose_name = "Review"
        verbose_name_plural = "Reviews"
        ordering = ["-created_at"]
        constraints = [
            models.UniqueConstraint(
                fields=["user", "product"], name="unique_user_product_review"
            )
        ]


    def __str__(self):
        return f"Review by {self.user.email} for product {self.product_id}"

