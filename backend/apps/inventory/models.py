from django.db import models
from apps.core.models import TimeStampedModel
from apps.products.models import Product


class Stock(TimeStampedModel):
    """Product stock levels"""
    product = models.OneToOneField(Product, on_delete=models.CASCADE, related_name='stock')
    quantity = models.IntegerField(default=0)
    reserved = models.IntegerField(default=0)
    
    @property
    def available(self):
        return max(0, self.quantity - self.reserved)
    
    def __str__(self):
        return f"{self.product.name} - {self.available} available"
