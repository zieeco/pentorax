from django.db import models
import uuid


class TimeStampedModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        abstract = True


class BlogCategory(TimeStampedModel):
    """Blog category"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=200)
    slug = models.SlugField(unique=True, max_length=200)
    
    class Meta:
        db_table = 'blog_blogcategory'
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
    category_id = models.UUIDField(null=True, blank=True, db_index=True)  # FK to BlogCategory
    author_id = models.CharField(max_length=255)  # VARCHAR - author identifier
    is_published = models.BooleanField(default=False)
    published_at = models.DateTimeField(null=True, blank=True)
    
    class Meta:
        db_table = 'blog_blogpost'
        ordering = ['-published_at', '-created_at']
    
    def __str__(self):
        return self.title
