from rest_framework import serializers
from .models import BlogCategory, BlogPost


class BlogCategorySerializer(serializers.ModelSerializer):
    post_count = serializers.SerializerMethodField()
    
    class Meta:
        model = BlogCategory
        fields = ['id', 'name', 'slug', 'description', 'post_count', 'created_at']
        read_only_fields = ['id', 'created_at']
    
    def get_post_count(self, obj):
        return BlogPost.objects.filter(category_id=obj.id, is_published=True).count()


class BlogPostListSerializer(serializers.ModelSerializer):
    category_name = serializers.SerializerMethodField()
    read_time = serializers.SerializerMethodField()
    
    class Meta:
        model = BlogPost
        fields = ['id', 'title', 'slug', 'excerpt', 'featured_image',
                  'category_name', 'author_name', 'is_featured',
                  'published_at', 'read_time', 'created_at']
        read_only_fields = ['id', 'created_at']
    
    def get_category_name(self, obj):
        if obj.category_id:
            try:
                category = BlogCategory.objects.get(id=obj.category_id)
                return category.name
            except BlogCategory.DoesNotExist:
                return None
        return None
    
    def get_read_time(self, obj):
        """Calculate estimated read time in minutes"""
        words_per_minute = 200
        word_count = len(obj.content.split())
        read_time = max(1, round(word_count / words_per_minute))
        return f"{read_time} min read"


class BlogPostDetailSerializer(serializers.ModelSerializer):
    category = serializers.SerializerMethodField()
    read_time = serializers.SerializerMethodField()
    
    class Meta:
        model = BlogPost
        fields = ['id', 'title', 'slug', 'content', 'excerpt',
                  'featured_image', 'category', 'author_id', 'author_name',
                  'is_published', 'is_featured', 'published_at',
                  'meta_title', 'meta_description', 'read_time',
                  'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']
    
    def get_category(self, obj):
        if obj.category_id:
            try:
                category = BlogCategory.objects.get(id=obj.category_id)
                return BlogCategorySerializer(category).data
            except BlogCategory.DoesNotExist:
                return None
        return None
    
    def get_read_time(self, obj):
        """Calculate estimated read time in minutes"""
        words_per_minute = 200
        word_count = len(obj.content.split())
        read_time = max(1, round(word_count / words_per_minute))
        return f"{read_time} min read"
