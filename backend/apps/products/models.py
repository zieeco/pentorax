"""
Product models for solar energy products
"""

import uuid

from django.db import models


class TimeStampedModel(models.Model):
    """Abstract base model with timestamps"""

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Category(TimeStampedModel):
    """Product category with hierarchical support"""

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    slug = models.SlugField(unique=True, max_length=255)
    description = models.TextField(blank=True)
    image = models.URLField(blank=True)
    parent_id = models.UUIDField(null=True, blank=True, db_index=True)

    class Meta(TimeStampedModel.Meta):
        db_table = "products_category"
        verbose_name = "Category"
        verbose_name_plural = "Categories"

    def __str__(self):
        return self.name


class Product(TimeStampedModel):
    """Solar energy product"""

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    slug = models.SlugField(unique=True, max_length=255)
    description = models.TextField()
    short_description = models.CharField(max_length=500, blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    compare_at_price = models.DecimalField(
        max_digits=10, decimal_places=2, null=True, blank=True
    )
    is_active = models.BooleanField(default=True)
    is_featured = models.BooleanField(default=False)
    featured_image = models.URLField(blank=True)
    meta_title = models.CharField(max_length=255, blank=True)
    meta_description = models.CharField(max_length=500, blank=True)
    category_id = models.UUIDField(db_index=True)

    class Meta(TimeStampedModel.Meta):
        db_table = "products_product"
        verbose_name = "Product"
        verbose_name_plural = "Products"
        ordering = ["-created_at"]

    def __str__(self):
        return self.name

    @property
    def discount_percentage(self):
        """Calculate discount percentage if compare_at_price exists"""
        if self.compare_at_price and self.compare_at_price > self.price:
            return int(
                ((self.compare_at_price - self.price) / self.compare_at_price) * 100
            )
        return 0


class ProductImage(TimeStampedModel):
    """Additional product images"""

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    image_url = models.URLField()
    alt_text = models.CharField(max_length=255, blank=True)
    position = models.PositiveIntegerField(default=0)
    product_id = models.UUIDField(db_index=True)

    class Meta(TimeStampedModel.Meta):
        db_table = "products_productimage"
        verbose_name = "Product Image"
        verbose_name_plural = "Product Images"
        ordering = ["position"]

    def __str__(self):
        return f"Image for product {self.product_id}"


class ProductSpecification(TimeStampedModel):
    """Product technical specifications"""

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    key = models.CharField(max_length=255)
    value = models.CharField(max_length=500)
    position = models.PositiveIntegerField(default=0)
    product_id = models.UUIDField(db_index=True)

    class Meta(TimeStampedModel.Meta):
        db_table = "products_productspecification"
        verbose_name = "Product Specification"
        verbose_name_plural = "Product Specifications"
        ordering = ["position"]

    def __str__(self):
        return f"{self.key}: {self.value}"
