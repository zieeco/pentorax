"""
Serializers for blog app
"""
from rest_framework import serializers
from .models import BlogCategory, BlogPost
from django.db import connection


class BlogCategorySerializer(serializers.ModelSerializer):
    """Serializer for blog categories"""
    post_count = serializers.SerializerMethodField()
    
    class Meta:
        model = BlogCategory
        fields = ['id', 'name', 'slug', 'post_count', 'created_at']
        read_only_fields = ['id', 'created_at']
    
    def get_post_count(self, obj):
        return BlogPost.objects.filter(category_id=obj.id, is_published=True).count()


class BlogPostListSerializer(serializers.ModelSerializer):
    """Lightweight serializer for blog post lists"""
    category_name = serializers.SerializerMethodField()
    
    class Meta:
        model = BlogPost
        fields = [
            'id', 'title', 'slug', 'excerpt', 'featured_image',
            'category_name',
            'author_id',
            'is_published',
            'published_at', 'created_at'
        ]
        read_only_fields = ['id', 'created_at']
    
    def get_category_name(self, obj):
        if obj.category_id:
            try:
                category = BlogCategory.objects.get(id=obj.category_id)
                return category.name
            except BlogCategory.DoesNotExist:
                return None
        return None


class BlogPostDetailSerializer(serializers.ModelSerializer):
    """Detailed serializer for single blog post view"""
    category = serializers.SerializerMethodField()
    
    class Meta:
        model = BlogPost
        fields = [
            'id', 'title', 'slug', 'content', 'excerpt',
            'featured_image', 'category', 
            'author_id',
            'is_published', 'published_at', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']

    def get_category(self, obj):
        if obj.category_id:
            try:
                category = BlogCategory.objects.get(id=obj.category_id)
                return BlogCategorySerializer(category).data
            except BlogCategory.DoesNotExist:
                return None
        return None


