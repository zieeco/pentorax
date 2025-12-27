import uuid

from django.db import models


class TimeStampedModel(models.Model):
    """Abstract base model with timestamps"""

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Stock(TimeStampedModel):
    """Product stock/inventory management"""

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    product_id = models.UUIDField(unique=True, db_index=True)
    quantity = models.IntegerField(default=0)
    reserved = models.IntegerField(default=0)

    class Meta:
        db_table = "inventory_stock"
        verbose_name = "Stock"
        verbose_name_plural = "Stock"

    def __str__(self):
        return f"Stock for product {self.product_id}"

    @property
    def available(self):
        """Calculate available quantity (not reserved)"""
        return max(0, self.quantity - self.reserved)

    @property
    def is_in_stock(self):
        """Check if product is in stock"""
        return self.available > 0

    def is_low_stock(self, threshold=10):
        """Check if stock is low (default threshold: 10)"""
        return 0 < self.available <= threshold
