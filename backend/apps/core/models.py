"""
Base models for all apps
"""

import uuid

from django.db import models


class TimeStampedModel(models.Model):
    """Abstract base model with timestamps"""

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


from django.contrib.auth.models import User

class UserProfile(TimeStampedModel):
    """Extended user profile linked to Django auth"""

    ROLE_CHOICES = [
        ("admin", "Admin"),
        ("staff", "Staff"),
        ("customer", "Customer"),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile', null=True)
    name = models.CharField(max_length=255)
    phone = models.CharField(max_length=50, blank=True, null=True, default="")
    role = models.CharField(max_length=50, choices=ROLE_CHOICES, default="customer")
    avatar_url = models.URLField(blank=True, null=True, default="", help_text="Profile Image URL")
    bio = models.TextField(blank=True, null=True, default="")
    is_active = models.BooleanField(default=True)
    email_verified = models.BooleanField(default=False)

    class Meta(TimeStampedModel.Meta):
        db_table = "core_userprofile"
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.name} ({self.user.email if self.user else 'No User'}) - {self.role}"


    @property
    def is_admin(self):
        """Check if user has admin role"""
        return self.role == "admin"

    @property
    def is_staff_member(self):
        """Check if user has staff or admin role"""
        return self.role in ["staff", "admin"]


class CaseStudy(TimeStampedModel):
    """Solar installation case studies"""

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=255)
    description = models.TextField()
    image = models.URLField()
    location = models.CharField(max_length=255)
    capacity = models.CharField(max_length=100, help_text="e.g., 250kW")
    savings = models.CharField(
        max_length=200, help_text="e.g., 65% reduction in energy costs"
    )
    project_date = models.DateField(null=True, blank=True)
    is_featured = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    class Meta(TimeStampedModel.Meta):
        db_table = "core_casestudy"
        ordering = ["-project_date", "-is_featured"]
        verbose_name_plural = "Case Studies"

    def __str__(self):
        return self.title


class FAQ(TimeStampedModel):
    """Frequently Asked Questions"""

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    question = models.CharField(max_length=500)
    answer = models.TextField()
    category = models.CharField(max_length=100)
    order = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta(TimeStampedModel.Meta):
        db_table = "core_faq"
        ordering = ["order", "category", "question"]
        verbose_name = "FAQ"
        verbose_name_plural = "FAQs"

    def __str__(self):
        return self.question


class TeamMember(TimeStampedModel):
    """Team members model"""

    DEPARTMENT_CHOICES = [
        ("leadership", "Leadership"),
        ("engineering", "Engineering"),
        ("operations", "Operations"),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    role = models.CharField(max_length=255)
    department = models.CharField(max_length=50, choices=DEPARTMENT_CHOICES)
    bio = models.TextField(blank=True, null=True, default="")
    image = models.URLField(max_length=500, help_text="Storage URL")
    email = models.EmailField(max_length=255, blank=True, null=True, default="")
    linkedin = models.URLField(blank=True, null=True, default="")
    order = models.IntegerField(default=0, help_text="Display order")
    is_active = models.BooleanField(default=True)

    class Meta(TimeStampedModel.Meta):
        db_table = "core_teammember"
        ordering = ["order"]

    def __str__(self):
        return f"{self.name} - {self.role}"
