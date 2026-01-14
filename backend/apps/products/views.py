"""
Views for products app
"""

from django.utils.text import slugify
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters, viewsets, status
from rest_framework.decorators import action
from rest_framework.parsers import MultiPartParser
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

from .models import Category, Product, ProductImage, Wishlist, WishlistItem
from .serializers import (
    CategoryListSerializer,
    CategorySerializer,
    ProductDetailSerializer,
    ProductListSerializer,
    ProductCreateUpdateSerializer,
    WishlistSerializer,
    WishlistItemSerializer,
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


class ProductViewSet(viewsets.ModelViewSet):
    """
    ViewSet for products with full CRUD support.

    GET requests: AllowAny (public)
    POST/PUT/PATCH/DELETE: Requires admin/staff authentication
    """

    queryset = Product.objects.all()
    permission_classes = [AllowAny]
    filter_backends = [
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter,
    ]
    filterset_fields = ["category_id", "is_featured", "is_active"]
    search_fields = ["name", "description", "short_description"]
    ordering_fields = ["price", "created_at", "name"]
    ordering = ["-created_at"]
    lookup_field = "slug"

    def get_permissions(self):
        """
        Return different permissions based on action:
        - list, retrieve, featured: AllowAny
        - create, update, partial_update, destroy: IsAdminUser
        """
        if self.action in ['create', 'update', 'partial_update', 'destroy', 'duplicate']:
            return [IsAdminUser()]
        return [AllowAny()]

    def get_serializer_class(self):
        if self.action in ['create', 'update', 'partial_update']:
            return ProductCreateUpdateSerializer
        if self.action == "retrieve":
            return ProductDetailSerializer
        return ProductListSerializer

    def get_queryset(self):
        queryset = Product.objects.all()
        
        # For public list views, only show active products
        # For admin actions (authenticated staff), show all products
        is_staff = self.request.user.is_authenticated and getattr(self.request.user, 'is_staff', False)
        if self.action == 'list' and not is_staff:
            queryset = queryset.filter(is_active=True)

        # Filter by category slug (for category pages)
        category_slug = self.request.query_params.get("category")
        if category_slug:
            try:
                category = Category.objects.get(slug=category_slug)
                queryset = queryset.filter(category_id=category.id)
            except Category.DoesNotExist:
                queryset = queryset.none()

        # Filter by price range
        min_price = self.request.query_params.get("min_price")
        max_price = self.request.query_params.get("max_price")

        if min_price:
            queryset = queryset.filter(price__gte=min_price)
        if max_price:
            queryset = queryset.filter(price__lte=max_price)

        # Exclude specific product (for related products)
        exclude_id = self.request.query_params.get("exclude_id")
        if exclude_id:
            queryset = queryset.exclude(id=exclude_id)

        return queryset

    def perform_create(self, serializer):
        """Auto-generate slug from name if not provided"""
        data = serializer.validated_data
        if not data.get('slug'):
            base_slug = slugify(data['name'])
            slug = base_slug
            counter = 1
            # Ensure unique slug
            while Product.objects.filter(slug=slug).exists():
                slug = f"{base_slug}-{counter}"
                counter += 1
            serializer.save(slug=slug)
        else:
            serializer.save()

    @action(detail=False, methods=["get"])
    def featured(self, request):
        """Get featured products"""
        featured = self.get_queryset().filter(is_featured=True, is_active=True)
        serializer = self.get_serializer(featured, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=["post"])
    def duplicate(self, request, slug=None):
        """Duplicate a product"""
        product = self.get_object()
        
        # Generate unique slug for duplicate
        base_slug = f"{product.slug}-copy"
        new_slug = base_slug
        counter = 1
        while Product.objects.filter(slug=new_slug).exists():
            new_slug = f"{base_slug}-{counter}"
            counter += 1
        
        # Create duplicate
        duplicate = Product.objects.create(
            name=f"{product.name} (Copy)",
            slug=new_slug,
            description=product.description,
            short_description=product.short_description,
            price=product.price,
            compare_at_price=product.compare_at_price,
            is_active=False,  # Duplicates start as inactive
            is_featured=False,
            featured_image=product.featured_image,
            category_id=product.category_id,
        )
        
        serializer = ProductDetailSerializer(duplicate)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @action(detail=False, methods=["post"])
    def upload_image(self, request):
        """
        Upload a product image to Cloudflare R2.
        
        Requires staff authentication.
        Accepts multipart/form-data with 'image' field.
        Returns public URL of uploaded image.
        """
        from apps.core.storage import upload_image as r2_upload, R2StorageError
        
        if not request.user.is_authenticated or not getattr(request.user, 'is_staff', False):
            return Response(
                {"error": "Authentication required"},
                status=status.HTTP_401_UNAUTHORIZED
            )
        
        if 'image' not in request.FILES:
            return Response(
                {"error": "No image file provided"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        image_file = request.FILES['image']
        
        try:
            result = r2_upload(image_file, prefix='products')
            return Response({
                "url": result['url'],
                "key": result['key'],
                "size": result['size'],
                "content_type": result['content_type'],
            }, status=status.HTTP_201_CREATED)
        except R2StorageError as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )
        except Exception as e:
            return Response(
                {"error": f"Upload failed: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    @action(detail=False, methods=["post"])
    def bulk_delete(self, request):
        """
        Delete multiple products.
        
        Accepts: {"ids": ["id1", "id2", ...]}
        Returns: {"deleted": count, "failed": count}
        """
        if not request.user.is_authenticated or not getattr(request.user, 'is_staff', False):
            return Response(
                {"error": "Staff authentication required"},
                status=status.HTTP_401_UNAUTHORIZED
            )
        
        ids = request.data.get('ids', [])
        if not ids:
            return Response(
                {"error": "No product IDs provided"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        deleted_count = 0
        failed_count = 0
        
        for product_id in ids:
            try:
                product = Product.objects.get(id=product_id)
                product.delete()
                deleted_count += 1
            except Product.DoesNotExist:
                failed_count += 1
            except Exception:
                failed_count += 1
        
        return Response({
            "deleted": deleted_count,
            "failed": failed_count,
            "message": f"Deleted {deleted_count} products"
        })

    @action(detail=False, methods=["post"])
    def bulk_activate(self, request):
        """
        Activate multiple products.
        
        Accepts: {"ids": ["id1", "id2", ...]}
        Returns: {"updated": count}
        """
        if not request.user.is_authenticated or not getattr(request.user, 'is_staff', False):
            return Response(
                {"error": "Staff authentication required"},
                status=status.HTTP_401_UNAUTHORIZED
            )
        
        ids = request.data.get('ids', [])
        if not ids:
            return Response(
                {"error": "No product IDs provided"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        updated = Product.objects.filter(id__in=ids).update(is_active=True)
        
        return Response({
            "updated": updated,
            "message": f"Activated {updated} products"
        })

    @action(detail=False, methods=["post"])
    def bulk_deactivate(self, request):
        """
        Deactivate multiple products.
        
        Accepts: {"ids": ["id1", "id2", ...]}
        Returns: {"updated": count}
        """
        if not request.user.is_authenticated or not getattr(self.request.user, 'is_staff', False):
            return Response(
                {"error": "Staff authentication required"},
                status=status.HTTP_401_UNAUTHORIZED
            )
        
        ids = request.data.get('ids', [])
        if not ids:
            return Response(
                {"error": "No product IDs provided"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        updated = Product.objects.filter(id__in=ids).update(is_active=False)
        
        return Response({
            "updated": updated,
            "message": f"Deactivated {updated} products"
        })
    
    @action(detail=False, methods=["post"])
    def generate_specifications(self, request):
        """
        AI-powered specification generation from product image
        POST /api/products/generate_specifications/
       
        Body:
        {
            "image_url": "https://...",
            "product_name": "Optional product name",
            "product_description": "Optional description"
        }
        """
        from .ai_service import generate_specifications_from_image, is_ai_available
        
        if not is_ai_available():
            return Response(
                {"error": "AI features are not available. Please configure GEMINI_API_KEY."},
                status=status.HTTP_503_SERVICE_UNAVAILABLE
            )
        
        image_url = request.data.get('image_url')
        if not image_url:
            return Response(
                {"error": "image_url is required"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        product_name = request.data.get('product_name', '')
        product_description = request.data.get('product_description', '')
        
        try:
            specifications = generate_specifications_from_image(
                image_url=image_url,
                product_name=product_name,
                product_description=product_description
            )
            
            return Response({
                "success": True,
                "specifications": specifications,
                "count": len(specifications)
            })
            
        except Exception as e:
            return Response(
                {"error": f"Failed to generate specifications: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
    
    @action(detail=False, methods=["post"])
    def refine_description(self, request):
        """
        AI-powered description refinement
        POST /api/products/refine_description/
       
        Body:
        {
            "description": "Original description text",
            "product_name": "Optional product name"
        }
        """
        from .ai_service import refine_product_description, is_ai_available
        
        if not is_ai_available():
            return Response(
                {"error": "AI features are not available. Please configure GEMINI_API_KEY."},
                status=status.HTTP_503_SERVICE_UNAVAILABLE
            )
        
        description = request.data.get('description')
        if not description:
            return Response(
                {"error": "description is required"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        product_name = request.data.get('product_name', '')
        
        try:
            refined_description = refine_product_description(
                description=description,
                product_name=product_name
            )
            
            return Response({
                "success": True,
                "refined_description": refined_description
            })
            
        except Exception as e:
            return Response(
                {" error": f"Failed to refine description: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class WishlistViewSet(viewsets.ViewSet):
    """
    ViewSet for managing user wishlists
    
    Endpoints:
    - GET /api/products/wishlist/ - Get current user's wishlist
    - POST /api/products/wishlist/add_item/ - Add product to wishlist
    - DELETE /api/products/wishlist/remove_item/<product_id>/ - Remove product
    - DELETE /api/products/wishlist/clear/ - Clear entire wishlist
    """
    
    permission_classes = [IsAuthenticated]
    
    def list(self, request):
        """Get current user's wishlist"""
        # Extract user_id from Supabase user object
        user_id = request.user.get('sub') if isinstance(request.user, dict) else str(request.user.id)
        wishlist, created = Wishlist.objects.get_or_create(user_id=user_id)
        serializer = WishlistSerializer(wishlist)
        return Response(serializer.data)
    
    @action(detail=False, methods=['post'])
    def add_item(self, request):
        """Add product to wishlist"""
        product_id = request.data.get('product_id')
        notes = request.data.get('notes', '')
        
        if not product_id:
            return Response(
                {'error': 'product_id is required'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Get user ID
        user_id = request.user.get('sub') if isinstance(request.user, dict) else str(request.user.id)
        
        # Get or create wishlist
        wishlist, _ = Wishlist.objects.get_or_create(user_id=user_id)
        
        # Check if product exists
        try:
            product = Product.objects.get(pk=product_id)
        except Product.DoesNotExist:
            return Response(
                {'error': 'Product not found'},
                status=status.HTTP_404_NOT_FOUND
            )
        
        # Add or update item
        item, created = WishlistItem.objects.update_or_create(
            wishlist=wishlist,
            product=product,
            defaults={'notes': notes}
        )
        
        serializer = WishlistItemSerializer(item)
        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED if created else status.HTTP_200_OK
        )
    
    @action(detail=False, methods=['delete'], url_path='remove_item/(?P<product_id>[^/.]+)')
    def remove_item(self, request, product_id=None):
        """Remove product from wishlist"""
        user_id = request.user.get('sub') if isinstance(request.user, dict) else str(request.user.id)
        try:
            wishlist = Wishlist.objects.get(user_id=user_id)
            item = WishlistItem.objects.get(wishlist=wishlist, product_id=product_id)
            item.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Wishlist.DoesNotExist:
            return Response(
                {'error': 'Wishlist not found'},
                status=status.HTTP_404_NOT_FOUND
            )
        except WishlistItem.DoesNotExist:
            return Response(
                {'error': 'Item not in wishlist'},
                status=status.HTTP_404_NOT_FOUND
            )
    
    @action(detail=False, methods=['delete'])
    def clear(self, request):
        """Clear all items from wishlist"""
        user_id = request.user.get('sub') if isinstance(request.user, dict) else str(request.user.id)
        try:
            wishlist = Wishlist.objects.get(user_id=user_id)
            wishlist.items.all().delete()
            return Response(
                {'message': 'Wishlist cleared'},
                status=status.HTTP_200_OK
            )
        except Wishlist.DoesNotExist:
            return Response(
                {'error': 'Wishlist not found'},
                status=status.HTTP_404_NOT_FOUND
            )
