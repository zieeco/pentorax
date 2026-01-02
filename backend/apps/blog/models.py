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
    description = models.TextField(blank=True, null=True, default="")
    
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
    excerpt = models.TextField(blank=True, null=True, default="")
    featured_image = models.URLField(blank=True, null=True, default="")
    category = models.ForeignKey(
        BlogCategory,
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="posts",
        db_column="category_id",
    )
    author_id = models.CharField(max_length=255)
    author_name = models.CharField(max_length=255, blank=True, null=True, default="")
    is_published = models.BooleanField(default=False)
    is_featured = models.BooleanField(default=False)
    published_at = models.DateTimeField(null=True, blank=True)
    meta_title = models.CharField(max_length=300, blank=True, null=True, default="")
    meta_description = models.CharField(max_length=500, blank=True, null=True, default="")
    
    class Meta:
        db_table = 'blog_blogpost'
        verbose_name = 'Blog Post'
        verbose_name_plural = 'Blog Posts'
        ordering = ['-published_at', '-created_at']
    
    def __str__(self):
        return self.title
