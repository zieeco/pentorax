"""
Views for products app
"""
from rest_framework import viewsets, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Q
from .models import Category, Product
from .serializers import (
    CategorySerializer,
    ProductListSerializer,
    ProductDetailSerializer
)


class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet for product categories
    """
    queryset = Category.objects.filter(parent=None)  # Only root categories
    serializer_class = CategorySerializer
    lookup_field = 'slug'


class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet for products with filtering and search
    """
    queryset = Product.objects.filter(is_active=True).select_related('category').prefetch_related('images', 'specifications')
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'description', 'short_description']
    ordering_fields = ['price', 'created_at', 'name']
    ordering = ['-created_at']
    lookup_field = 'slug'
    
    def get_serializer_class(self):
        if self.action == 'retrieve':
            return ProductDetailSerializer
        return ProductListSerializer
    
    def get_queryset(self):
        queryset = super().get_queryset()
        
        # Filter by category
        category_slug = self.request.query_params.get('category')
        if category_slug:
            queryset = queryset.filter(category__slug=category_slug)
        
        # Filter by price range
        min_price = self.request.query_params.get('min_price')
        max_price = self.request.query_params.get('max_price')
        if min_price:
            queryset = queryset.filter(price__gte=min_price)
        if max_price:
            queryset = queryset.filter(price__lte=max_price)
        
        # Filter featured products
        is_featured = self.request.query_params.get('featured')
        if is_featured == 'true':
            queryset = queryset.filter(is_featured=True)
        
        return queryset
    
    @action(detail=False, methods=['get'])
    def featured(self, request):
        """Get featured products"""
        featured_products = self.get_queryset().filter(is_featured=True)[:8]
        serializer = self.get_serializer(featured_products, many=True)
        return Response(serializer.data)
