"""
Product Comparison model
"""

import uuid
from django.db import models


class ProductComparison(models.Model):
    """Save product comparisons for users"""
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user_id = models.CharField(max_length=255, db_index=True, blank=True, null=True)
    user_email = models.EmailField(max_length=255, blank=True)
    name = models.CharField(max_length=255, blank=True)  # Optional comparison name
    product_ids = models.JSONField()  # List of product UUIDs
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'product_comparisons'
        verbose_name = 'Product Comparison'
        verbose_name_plural = 'Product Comparisons'
        ordering = ['-created_at']
        
    def __str__(self):
        return f"Comparison {self.id} - {len(self.product_ids)} products"
