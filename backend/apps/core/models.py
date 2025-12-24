"""
Base models for all apps
"""
from django.db import models
import uuid


class TimeStampedModel(models.Model):
    """
    Abstract base model with created_at and updated_at fields
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        abstract = True
        ordering = ['-created_at']


class TeamMember(TimeStampedModel):
    """Team member model"""
    DEPARTMENT_CHOICES = [
        ('leadership', 'Leadership'),
        ('engineering', 'Engineering'),
        ('operations', 'Operations'),
    ]
    
    name = models.CharField(max_length=200)
    role = models.CharField(max_length=200)
    department = models.CharField(max_length=50, choices=DEPARTMENT_CHOICES)
    bio = models.TextField()
    image = models.URLField(max_length=500, help_text="Supabase Storage URL")
    email = models.EmailField(blank=True, null=True)
    linkedin = models.URLField(max_length=500, blank=True, null=True)
    order = models.IntegerField(default=0, help_text="Display order")
    is_active = models.BooleanField(default=True)
    
    class Meta:
        ordering = ['department', 'order', 'name']
    
    def __str__(self):
        return f"{self.name} - {self.role}"


class FAQ(TimeStampedModel):
    """Frequently Asked Questions"""
    question = models.CharField(max_length=500)
    answer = models.TextField()
    category = models.CharField(max_length=100, blank=True)
    order = models.IntegerField(default=0, help_text="Display order")
    is_active = models.BooleanField(default=True)
    
    class Meta:
        ordering = ['order', 'question']
        verbose_name = "FAQ"
        verbose_name_plural = "FAQs"
    
    def __str__(self):
        return self.question


class CaseStudy(TimeStampedModel):
    """Case studies / project showcases"""
    title = models.CharField(max_length=200)
    description = models.TextField()
    image = models.URLField(max_length=500, help_text="Supabase Storage URL")
    location = models.CharField(max_length=200)
    capacity = models.CharField(max_length=100, help_text="e.g., 250kW")
    savings = models.CharField(max_length=200, help_text="e.g., 65% reduction in energy costs")
    project_date = models.DateField(blank=True, null=True)
    is_featured = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    
    class Meta:
        ordering = ['-is_featured', '-project_date']
        verbose_name_plural = "Case Studies"
    
    def __str__(self):
        return self.title


class ContactSubmission(TimeStampedModel):
    """Contact form submissions"""
    name = models.CharField(max_length=200)
    email = models.EmailField()
    phone = models.CharField(max_length=50, blank=True)
    subject = models.CharField(max_length=200, blank=True)
    message = models.TextField()
    is_read = models.BooleanField(default=False)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"Contact from {self.name} - {self.created_at.strftime('%Y-%m-%d')}"


class SupportTicket(TimeStampedModel):
    """Support ticket submissions"""
    STATUS_CHOICES = [
        ('open', 'Open'),
        ('in_progress', 'In Progress'),
        ('resolved', 'Resolved'),
        ('closed', 'Closed'),
    ]
    
    CATEGORY_CHOICES = [
        ('inverter', 'Inverter Performance'),
        ('battery', 'Battery Discharge Level'),
        ('connectivity', 'App Connectivity'),
        ('installation', 'New Hardware Install'),
        ('other', 'Other'),
    ]
    
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    serial_number = models.CharField(max_length=100)
    description = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='open')
    user_email = models.EmailField(blank=True, null=True)
    assigned_to = models.CharField(max_length=200, blank=True, null=True)
    resolution_notes = models.TextField(blank=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"Ticket #{str(self.id)[:8]} - {self.category} - {self.status}"


class WarrantyCheck(models.Model):
    """Warranty check records"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    serial_number = models.CharField(max_length=100, unique=True, db_index=True)
    is_valid = models.BooleanField(default=True)
    expiry_date = models.DateField()
    support_level = models.CharField(max_length=50, default='Standard')
    product_name = models.CharField(max_length=200, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.serial_number} - Valid: {self.is_valid}"
