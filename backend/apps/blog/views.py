from rest_framework import viewsets, filters, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django_filters.rest_framework import DjangoFilterBackend
from .models import BlogCategory, BlogPost
from .serializers import (
    BlogCategorySerializer,
    BlogPostListSerializer,
    BlogPostDetailSerializer
)


class BlogCategoryViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet for blog categories.
    
    Permissions: AllowAny (public read-only)
    """
    queryset = BlogCategory.objects.all()
    serializer_class = BlogCategorySerializer
    permission_classes = [AllowAny]
    lookup_field = 'slug'
    
    @action(detail=True, methods=['get'])
    def posts(self, request, slug=None):
        """Get all published posts in this category"""
        category = self.get_object()
        posts = BlogPost.objects.filter(
            category_id=category.id,
            is_published=True
        )
        serializer = BlogPostListSerializer(posts, many=True)
        return Response(serializer.data)


class BlogPostViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet for blog posts.
    
    Permissions: AllowAny (public read-only)
    """
    queryset = BlogPost.objects.filter(is_published=True)
    permission_classes = [AllowAny]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['category_id', 'is_featured']
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
        
        # Filter by category slug
        category_slug = self.request.query_params.get('category')
        if category_slug:
            try:
                category = BlogCategory.objects.get(slug=category_slug)
                queryset = queryset.filter(category_id=category.id)
            except BlogCategory.DoesNotExist:
                pass
        
        # Filter by author
        author_id = self.request.query_params.get('author_id')
        if author_id:
            queryset = queryset.filter(author_id=author_id)
        
        return queryset
    
    @action(detail=False, methods=['get'])
    def featured(self, request):
        """Get featured blog posts"""
        featured = self.queryset.filter(is_featured=True)
        serializer = self.get_serializer(featured, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def recent(self, request):
        """Get recent blog posts"""
        limit = int(request.query_params.get('limit', 5))
        recent = self.queryset.order_by('-published_at')[:limit]
        serializer = self.get_serializer(recent, many=True)
        return Response(serializer.data)

