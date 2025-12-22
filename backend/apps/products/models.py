"""
Product models for solar energy products
"""
from django.db import models
from apps.core.models import TimeStampedModel


class Category(TimeStampedModel):
    """
    Product categories (e.g., Solar Panels, Inverters, Batteries)
    """
    name = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    description = models.TextField(blank=True)
    image = models.URLField(blank=True, help_text="Supabase Storage URL")
    parent = models.ForeignKey(
        'self',
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name='children'
    )
    
    class Meta:
        verbose_name_plural = 'Categories'
        ordering = ['name']
    
    def __str__(self):
        return self.name


class Product(TimeStampedModel):
    """
    Main product model for solar energy products
    """
    name = models.CharField(max_length=300)
    slug = models.SlugField(unique=True)
    description = models.TextField()
    short_description = models.CharField(max_length=500, blank=True)
    category = models.ForeignKey(
        Category,
        on_delete=models.PROTECT,
        related_name='products'
    )
    price = models.DecimalField(max_digits=10, decimal_places=2)
    compare_at_price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        null=True,
        blank=True,
        help_text="Original price for showing discounts"
    )
    is_active = models.BooleanField(default=True)
    is_featured = models.BooleanField(default=False)
    featured_image = models.URLField(blank=True, help_text="Supabase Storage URL")
    
    # SEO fields
    meta_title = models.CharField(max_length=200, blank=True)
    meta_description = models.CharField(max_length=300, blank=True)
    
    class Meta:
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['slug']),
            models.Index(fields=['category', 'is_active']),
            models.Index(fields=['-created_at']),
        ]
    
    def __str__(self):
        return self.name
    
    @property
    def discount_percentage(self):
        """Calculate discount percentage if compare_at_price exists"""
        if self.compare_at_price and self.compare_at_price > self.price:
            return int(((self.compare_at_price - self.price) / self.compare_at_price) * 100)
        return 0


class ProductImage(TimeStampedModel):
    """
    Multiple images for a product
    """
    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
        related_name='images'
    )
    image_url = models.URLField(help_text="Supabase Storage URL")
    alt_text = models.CharField(max_length=200, blank=True)
    position = models.PositiveIntegerField(default=0)
    
    class Meta:
        ordering = ['position', 'created_at']
    
    def __str__(self):
        return f"{self.product.name} - Image {self.position}"


class ProductSpecification(TimeStampedModel):
    """
    Key-value specifications for products
    """
    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
        related_name='specifications'
    )
    key = models.CharField(max_length=100, help_text="e.g., 'Wattage', 'Voltage'")
    value = models.CharField(max_length=200, help_text="e.g., '500W', '48V'")
    position = models.PositiveIntegerField(default=0)
    
    class Meta:
        ordering = ['position', 'key']
        unique_together = ['product', 'key']
    
    def __str__(self):
        return f"{self.product.name} - {self.key}: {self.value}"
