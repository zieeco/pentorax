from django.db import models
from apps.core.models import TimeStampedModel
from apps.products.models import Product


class Review(TimeStampedModel):
    """Product review"""
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='reviews')
    user_id = models.CharField(max_length=255, db_index=True)
    user_email = models.EmailField()
    rating = models.PositiveSmallIntegerField(choices=[(i, i) for i in range(1, 6)])
    comment = models.TextField()
    is_verified_purchase = models.BooleanField(default=False)
    
    class Meta:
        unique_together = ['product', 'user_id']
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.product.name} - {self.rating} stars"
