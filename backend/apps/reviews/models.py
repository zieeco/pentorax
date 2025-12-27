import uuid

from django.db import models


class TimeStampedModel(models.Model):
    """Abstract base model with timestamps"""

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Review(TimeStampedModel):
    """Product review"""

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user_id = models.CharField(max_length=255, db_index=True)
    user_email = models.EmailField(max_length=255)
    product_id = models.UUIDField(db_index=True)
    rating = models.SmallIntegerField()
    comment = models.TextField()
    is_verified_purchase = models.BooleanField(default=False)

    class Meta:
        db_table = "reviews_review"
        verbose_name = "Review"
        verbose_name_plural = "Reviews"
        ordering = ["-created_at"]
        constraints = [
            models.UniqueConstraint(
                fields=["user_id", "product_id"], name="unique_user_product_review"
            )
        ]

    def __str__(self):
        return f"Review by {self.user_email} for product {self.product_id}"
