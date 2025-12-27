
# ============================================
# ADMIN.PY: apps/blog/admin.py
# ============================================

from django.contrib import admin
from django.utils.html import format_html
from .models import BlogCategory, BlogPost


@admin.register(BlogCategory)
class BlogCategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug', 'post_count', 'created_at']
    prepopulated_fields = {'slug': ('name',)}
    search_fields = ['name', 'description']
    readonly_fields = ['id', 'created_at', 'updated_at']
    
    fieldsets = (
        ('Category Information', {
            'fields': ('id', 'name', 'slug', 'description')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    
    def post_count(self, obj):
        count = BlogPost.objects.filter(category_id=obj.id).count()
        return format_html(
            '<span style="background-color: #2196F3; color: white; padding: 3px 8px; '
            'border-radius: 3px;">{}</span>',
            count
        )
    post_count.short_description = 'Posts'


@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    list_display = ['title', 'category_name', 'author_name', 'status_badge', 
                    'is_featured', 'published_at', 'created_at']
    list_filter = ['is_published', 'is_featured', 'published_at', 'created_at']
    search_fields = ['title', 'content', 'excerpt', 'author_name']
    prepopulated_fields = {'slug': ('title',)}
    readonly_fields = ['id', 'created_at', 'updated_at']
    
    fieldsets = (
        ('Post Information', {
            'fields': ('id', 'title', 'slug', 'category_id')
        }),
        ('Author', {
            'fields': ('author_id', 'author_name')
        }),
        ('Content', {
            'fields': ('excerpt', 'content', 'featured_image')
        }),
        ('Publishing', {
            'fields': ('is_published', 'is_featured', 'published_at')
        }),
        ('SEO', {
            'fields': ('meta_title', 'meta_description'),
            'classes': ('collapse',)
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    
    def category_name(self, obj):
        if obj.category_id:
            try:
                category = BlogCategory.objects.get(id=obj.category_id)
                return category.name
            except BlogCategory.DoesNotExist:
                return 'N/A'
        return 'Uncategorized'
    category_name.short_description = 'Category'
    
    def status_badge(self, obj):
        if obj.is_published:
            return format_html(
                '<span style="background-color: #4CAF50; color: white; padding: 5px 10px; '
                'border-radius: 3px; font-weight: bold;">Published</span>'
            )
        return format_html(
            '<span style="background-color: #ff9800; color: white; padding: 5px 10px; '
            'border-radius: 3px; font-weight: bold;">Draft</span>'
        )
    status_badge.short_description = 'Status'
    
    actions = ['publish_posts', 'unpublish_posts', 'mark_as_featured', 'unmark_as_featured']
    
    def publish_posts(self, request, queryset):
        from django.utils import timezone
        updated = queryset.update(is_published=True, published_at=timezone.now())
        self.message_user(request, f"{updated} posts published successfully.")
    publish_posts.short_description = "Publish selected posts"
    
    def unpublish_posts(self, request, queryset):
        updated = queryset.update(is_published=False)
        self.message_user(request, f"{updated} posts unpublished successfully.")
    unpublish_posts.short_description = "Unpublish selected posts"
    
    def mark_as_featured(self, request, queryset):
        updated = queryset.update(is_featured=True)
        self.message_user(request, f"{updated} posts marked as featured.")
    mark_as_featured.short_description = "Mark as featured"
    
    def unmark_as_featured(self, request, queryset):
        updated = queryset.update(is_featured=False)
        self.message_user(request, f"{updated} posts unmarked as featured.")
    unmark_as_featured.short_description = "Remove featured"

