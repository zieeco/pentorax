"""
Views for products app
"""

from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from .models import Category, Product
from .serializers import (
    CategorySerializer,
    ProductDetailSerializer,
    ProductListSerializer,
)


class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet for product categories.

    Permissions: AllowAny (public read-only)
    """

    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [AllowAny]
    lookup_field = "slug"

    def get_queryset(self):
        queryset = Category.objects.all()

        # Filter root categories (no parent)
        root_only = self.request.query_params.get("root_only")
        if root_only == "true":
            queryset = queryset.filter(parent_id__isnull=True)

        return queryset

    @action(detail=True, methods=["get"])
    def products(self, request, slug=None):
        """Get all products in this category"""
        category = self.get_object()
        products = Product.objects.filter(category_id=category.id, is_active=True)
        serializer = ProductListSerializer(products, many=True)
        return Response(serializer.data)


class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet for products.

    Permissions: AllowAny (public read-only)
    """

    queryset = Product.objects.filter(is_active=True)
    permission_classes = [AllowAny]
    filter_backends = [
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter,
    ]
    filterset_fields = ["category_id", "is_featured"]
    search_fields = ["name", "description", "short_description"]
    ordering_fields = ["price", "created_at", "name"]
    ordering = ["-created_at"]
    lookup_field = "slug"

    def get_serializer_class(self):
        if self.action == "retrieve":
            return ProductDetailSerializer
        return ProductListSerializer

    def get_queryset(self):
        queryset = super().get_queryset()

        # Filter by price range
        min_price = self.request.query_params.get("min_price")
        max_price = self.request.query_params.get("max_price")

        if min_price:
            queryset = queryset.filter(price__gte=min_price)
        if max_price:
            queryset = queryset.filter(price__lte=max_price)

        return queryset

    @action(detail=False, methods=["get"])
    def featured(self, request):
        """Get featured products"""
        featured = self.queryset.filter(is_featured=True)
        serializer = self.get_serializer(featured, many=True)
        return Response(serializer.data)
