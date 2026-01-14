"""
Product Video model for video demonstrations
"""

import uuid
from django.db import models


class ProductVideo(models.Model):
    """Product demonstration videos"""
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    product = models.ForeignKey(
        'products.Product',
        on_delete=models.CASCADE,
        related_name='videos',
        db_column='product_id'
    )
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    video_url = models.URLField(max_length=500)  # YouTube, Vimeo, or direct video URL
    thumbnail_url = models.URLField(max_length=500, blank=True)
    duration_seconds = models.IntegerField(null=True, blank=True)
    is_primary = models.BooleanField(default=False)  # Main product video
    display_order = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'product_videos'
        verbose_name = 'Product Video'
        verbose_name_plural = 'Product Videos'
        ordering = ['-is_primary', 'display_order', '-created_at']
        
    def __str__(self):
        return f"{self.title} - {self.product_id}"
