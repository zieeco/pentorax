from django.db import models
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
