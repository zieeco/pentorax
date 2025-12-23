"""
Views for blog app
"""
from rest_framework import viewsets, filters
from .models import BlogCategory, BlogPost
from .serializers import BlogCategorySerializer, BlogPostListSerializer, BlogPostDetailSerializer


class BlogCategoryViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet for blog categories
    """
    queryset = BlogCategory.objects.all()
    serializer_class = BlogCategorySerializer
    lookup_field = 'slug'


class BlogPostViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet for blog posts
    """
    queryset = BlogPost.objects.filter(is_published=True).select_related('category')
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'content', 'excerpt']
    ordering_fields = ['published_at', 'created_at']
    ordering = ['-published_at']
    lookup_field = 'slug'
    
    def get_serializer_class(self):
        if self.action == 'retrieve':
            return BlogPostDetailSerializer
        return BlogPostListSerializer
    
    def get_queryset(self):
        queryset = super().get_queryset()
        
        # Filter by category
        category_slug = self.request.query_params.get('category')
        if category_slug:
            queryset = queryset.filter(category__slug=category_slug)
        
        return queryset
