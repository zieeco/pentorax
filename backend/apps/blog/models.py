from django.db import models
import uuid


class TimeStampedModel(models.Model):
    """Abstract base model with timestamps"""
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        abstract = True


class BlogCategory(TimeStampedModel):
    """Blog category"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=200)
    slug = models.SlugField(unique=True, max_length=200)
    description = models.TextField(blank=True)
    
    class Meta:
        db_table = 'blog_blogcategory'
        verbose_name = 'Blog Category'
        verbose_name_plural = 'Blog Categories'
    
    def __str__(self):
        return self.name


class BlogPost(TimeStampedModel):
    """Blog post"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=300)
    slug = models.SlugField(unique=True, max_length=300)
    content = models.TextField()
    excerpt = models.TextField(blank=True)
    featured_image = models.URLField(blank=True)
    category_id = models.UUIDField(null=True, blank=True, db_index=True)
    author_id = models.CharField(max_length=255)
    author_name = models.CharField(max_length=255, blank=True)
    is_published = models.BooleanField(default=False)
    is_featured = models.BooleanField(default=False)
    published_at = models.DateTimeField(null=True, blank=True)
    meta_title = models.CharField(max_length=300, blank=True)
    meta_description = models.CharField(max_length=500, blank=True)
    
    class Meta:
        db_table = 'blog_blogpost'
        verbose_name = 'Blog Post'
        verbose_name_plural = 'Blog Posts'
        ordering = ['-published_at', '-created_at']
    
    def __str__(self):
        return self.title
