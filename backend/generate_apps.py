#!/usr/bin/env python3
"""
Script to generate boilerplate code for remaining Django apps
"""

APPS_CONFIG = {
    'cart': {
        'models': '''from django.db import models
from apps.core.models import TimeStampedModel
from apps.products.models import Product


class Cart(TimeStampedModel):
    """Shopping cart"""
    user_id = models.CharField(max_length=255, db_index=True, help_text="User ID or session ID")

    
    class Meta:
        ordering = ['-updated_at']
    
    def __str__(self):
        return f"Cart {self.id}"
    
    @property
    def total(self):
        return sum(item.subtotal for item in self.items.all())
    
    @property
    def item_count(self):
        return sum(item.quantity for item in self.items.all())


class CartItem(TimeStampedModel):
    """Items in shopping cart"""
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    
    class Meta:
        unique_together = ['cart', 'product']
    
    def __str__(self):
        return f"{self.product.name} x{self.quantity}"
    
    @property
    def subtotal(self):
        return self.product.price * self.quantity
''',
        'views': '''from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Cart, CartItem
from .serializers import CartSerializer, CartItemSerializer


class CartViewSet(viewsets.ModelViewSet):
    """ViewSet for shopping cart"""
    serializer_class = CartSerializer
    
    def get_queryset(self):
        user_id = self.request.user.id if hasattr(self.request.user, 'id') else self.request.session.session_key
        return Cart.objects.filter(user_id=user_id).prefetch_related('items__product')
    
    @action(detail=True, methods=['post'])
    def add_item(self, request, pk=None):
        """Add item to cart"""
        cart = self.get_object()
        serializer = CartItemSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(cart=cart)
            return Response(CartSerializer(cart).data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
'''
    },
    'orders': {
        'models': '''from django.db import models
from apps.core.models import TimeStampedModel
from apps.products.models import Product


class Order(TimeStampedModel):
    """Customer order"""
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('processing', 'Processing'),
        ('shipped', 'Shipped'),
        ('delivered', 'Delivered'),
        ('cancelled', 'Cancelled'),
    ]
    
    user_id = models.CharField(max_length=255, db_index=True)
    email = models.EmailField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    total = models.DecimalField(max_digits=10, decimal_places=2)
    
    # Shipping info
    shipping_name = models.CharField(max_length=200)
    shipping_address = models.TextField()
    shipping_city = models.CharField(max_length=100)
    shipping_state = models.CharField(max_length=100)
    shipping_phone = models.CharField(max_length=20)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"Order {self.id}"


class OrderItem(TimeStampedModel):
    """Items in an order"""
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.PROTECT)
    quantity = models.PositiveIntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    
    def __str__(self):
        return f"{self.product.name} x{self.quantity}"
'''
    },
    'payments': {
        'models': '''from django.db import models
from apps.core.models import TimeStampedModel
from apps.orders.models import Order


class Payment(TimeStampedModel):
    """Payment transaction"""
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('success', 'Success'),
        ('failed', 'Failed'),
    ]
    
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='payments')
    reference = models.CharField(max_length=200, unique=True)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    paystack_response = models.JSONField(null=True, blank=True)
    
    def __str__(self):
        return f"Payment {self.reference}"
'''
    },
    'reviews': {
        'models': '''from django.db import models
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
'''
    },
    'quotes': {
        'models': '''from django.db import models
from apps.core.models import TimeStampedModel


class QuoteRequest(TimeStampedModel):
    """Quote request from customers"""
    STATUS_CHOICES = [
        ('new', 'New'),
        ('contacted', 'Contacted'),
        ('quoted', 'Quoted'),
        ('closed', 'Closed'),
    ]
    
    name = models.CharField(max_length=200)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    message = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='new')
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"Quote from {self.name}"
'''
    },
    'blog': {
        'models': '''from django.db import models
from apps.core.models import TimeStampedModel


class BlogCategory(TimeStampedModel):
    """Blog category"""
    name = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    
    class Meta:
        verbose_name_plural = 'Blog Categories'
    
    def __str__(self):
        return self.name


class BlogPost(TimeStampedModel):
    """Blog post"""
    title = models.CharField(max_length=300)
    slug = models.SlugField(unique=True)
    content = models.TextField()
    excerpt = models.TextField(blank=True)
    featured_image = models.URLField(blank=True)
    category = models.ForeignKey(BlogCategory, on_delete=models.SET_NULL, null=True, related_name='posts')
    author_id = models.CharField(max_length=255)
    is_published = models.BooleanField(default=False)
    published_at = models.DateTimeField(null=True, blank=True)
    
    class Meta:
        ordering = ['-published_at', '-created_at']
    
    def __str__(self):
        return self.title
'''
    },
    'inventory': {
        'models': '''from django.db import models
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
'''
    }
}

# Generate apps
import os

for app_name, config in APPS_CONFIG.items():
    app_dir = f"/home/zieeco/Music/pentorax/backend/apps/{app_name}"
    
    # Create apps.py
    apps_content = f'''from django.apps import AppConfig


class {app_name.capitalize()}Config(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'apps.{app_name}'
    verbose_name = '{app_name.capitalize()}'
'''
    with open(f"{app_dir}/apps.py", 'w') as f:
        f.write(apps_content)
    
    # Create models.py
    if 'models' in config:
        with open(f"{app_dir}/models.py", 'w') as f:
            f.write(config['models'])
    
    # Create empty files
    for filename in ['admin.py', 'serializers.py', 'views.py', 'urls.py']:
        filepath = f"{app_dir}/{filename}"
        if not os.path.exists(filepath):
            with open(filepath, 'w') as f:
                f.write(f'# {filename} for {app_name} app\n')
    
    print(f"Generated {app_name} app")

print("All apps generated successfully!")
