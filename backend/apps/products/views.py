"""
Views for products app
"""

from django.db.models import Q
from django.utils.text import slugify
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters, viewsets, status
from rest_framework.decorators import action
from rest_framework.parsers import MultiPartParser
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from .models import Category, Product, ProductImage, Wishlist, WishlistItem, StockNotification
from .models_qa import ProductQuestion, ProductAnswer, AnswerVote
from .serializers import (
    CategoryListSerializer,
    CategorySerializer,
    ProductDetailSerializer,
    ProductListSerializer,
    ProductCreateUpdateSerializer,
    WishlistSerializer,
    WishlistItemSerializer,
    StockNotificationSerializer,
    CustomEmailSerializer,
    ProductQuestionSerializer,
    ProductAnswerSerializer,
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
    
    @action(detail=True, methods=['get'])
    def recommendations(self, request, pk=None):
        """
        Get personalized product recommendations
        Based on: same category, similar price range, and popularity
        """
        try:
            product = self.get_object()
        except Product.DoesNotExist:
            return Response(
                {'error': 'Product not found'},
                status=status.HTTP_404_NOT_FOUND
            )
        
        # Get products in same category
        recommendations = Product.objects.filter(
            category=product.category,
            in_stock=True
        ).exclude(id=product.id)
        
        # Filter by similar price range (±30%)
        if product.price:
            price_lower = float(product.price) * 0.7
            price_upper = float(product.price) * 1.3
            recommendations = recommendations.filter(
                price__gte=price_lower,
                price__lte=price_upper
            )
        
        # Order by rating and limit
        recommendations = recommendations.order_by('-average_rating', '-created_at')[:6]
        
        serializer = ProductListSerializer(recommendations, many=True)
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
        wishlist, created = Wishlist.objects.get_or_create(user=request.user)
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
        
        # Get or create wishlist
        wishlist, _ = Wishlist.objects.get_or_create(user=request.user)
        
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
        try:
            wishlist = Wishlist.objects.get(user=request.user)
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
        try:
            wishlist = Wishlist.objects.get(user=request.user)
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


class StockNotificationViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing stock notifications
    
    Public Endpoints:
    - POST /api/products/stock-notifications/subscribe/ - Subscribe to stock alerts
    - DELETE /api/products/stock-notifications/unsubscribe/ - Unsubscribe from alerts
    
    Admin/Staff Endpoints:
    - GET /api/products/stock-notifications/ - List all notifications (with filters)
    - GET /api/products/stock-notifications/stats/ - Get notification statistics
    - POST /api/products/stock-notifications/{id}/mark_read/ - Mark as read
    - POST /api/products/stock-notifications/{id}/mark_unread/ - Mark as unread
    - POST /api/products/stock-notifications/{id}/archive/ - Archive notification
    - POST /api/products/stock-notifications/{id}/unarchive/ - Unarchive notification
    - POST /api/products/stock-notifications/{id}/send_custom_email/ - Send custom email
    - POST /api/products/stock-notifications/bulk_send_email/ - Send bulk custom email
    """
    
    queryset = StockNotification.objects.all()
    serializer_class = StockNotificationSerializer
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['is_read', 'is_archived', 'is_notified']
    ordering_fields = ['created_at', 'notified_at']
    ordering = ['-created_at']
    
    def get_permissions(self):
        """
        Public: subscribe, unsubscribe
        Admin/Staff: everything else
        """
        if self.action in ['subscribe', 'unsubscribe']:
            return [AllowAny()]
        # All other actions require authentication (staff/admin check in view logic)
        return [IsAuthenticated()]
    
    def get_queryset(self):
        """Filter queryset based on query params"""
        queryset = StockNotification.objects.all().select_related('product')
        
        # Search by product name or email
        search = self.request.query_params.get('search')
        if search:
            queryset = queryset.filter(
                Q(product__name__icontains=search) | Q(email__icontains=search)
            )
        
        # Filter by product
        product_id = self.request.query_params.get('product_id')
        if product_id:
            queryset = queryset.filter(product_id=product_id)
        
        return queryset
    
    def list(self, request):
        """List all stock notifications with pagination"""
        queryset = self.filter_queryset(self.get_queryset())
        
        # Paginate the results
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def stats(self, request):
        """
        Get notification statistics
        
        Note: Active stats (unread, pending_restock, notified) exclude archived notifications
        because archived items are considered "put away" and shouldn't affect actionable metrics.
        """
        # Total: all notifications (including archived)
        total = StockNotification.objects.count()
        
        # Unread: notifications admin hasn't reviewed yet (exclude archived)
        unread = StockNotification.objects.filter(
            is_read=False,
            is_archived=False
        ).count()
        
        # Pending restock: waiting for product to come back in stock (exclude archived)
        # Note: in_stock is a @property, so we use stock_quantity instead
        pending_restock = StockNotification.objects.filter(
            is_notified=False,
            product__stock_quantity=0,  # Out of stock means quantity is 0
            is_archived=False
        ).count()
        
        # Notified: already sent restock email (exclude archived)
        notified = StockNotification.objects.filter(
            is_notified=True,
            is_archived=False
        ).count()
        
        # Archived: items put away/completed
        archived = StockNotification.objects.filter(is_archived=True).count()
        
        return Response({
            'total': total,
            'unread': unread,
            'pending_restock': pending_restock,
            'notified': notified,
            'archived': archived
        })
    
    @action(detail=True, methods=['post'])
    def mark_read(self, request, pk=None):
        """Mark notification as read"""
        notification = self.get_object()
        notification.is_read = True
        notification.save()
        serializer = self.get_serializer(notification)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'])
    def mark_unread(self, request, pk=None):
        """Mark notification as unread"""
        notification = self.get_object()
        notification.is_read = False
        notification.save()
        serializer = self.get_serializer(notification)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'])
    def archive(self, request, pk=None):
        """Archive notification"""
        notification = self.get_object()
        notification.is_archived = True
        notification.save()
        serializer = self.get_serializer(notification)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'])
    def unarchive(self, request, pk=None):
        """Unarchive notification"""
        notification = self.get_object()
        notification.is_archived = False
        notification.save()
        serializer = self.get_serializer(notification)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'])
    def send_custom_email(self, request, pk=None):
        """Send custom email to a single subscriber"""
        import resend
        from django.conf import settings
        
        notification = self.get_object()
        email_serializer = CustomEmailSerializer(data=request.data)
        
        if not email_serializer.is_valid():
            return Response(
                email_serializer.errors,
                status=status.HTTP_400_BAD_REQUEST
            )
        
        subject = email_serializer.validated_data['subject']
        message = email_serializer.validated_data['message']
        
        try:
            resend.api_key = settings.RESEND_API_KEY
            
            html_content = f"""
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
                <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
                    <h1 style="color: white; margin: 0; font-size: 24px;">{subject}</h1>
                </div>
                
                <div style="background-color: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
                    <div style="white-space: pre-wrap;">{message}</div>
                    
                    <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 14px; color: #666;">
                        <p><strong>Pentorax Solar Energy Solutions</strong></p>
                        <p>Powering Nigeria with sustainable energy solutions.</p>
                    </div>
                </div>
            </body>
            </html>
            """
            
            params = {
                "from": settings.RESEND_FROM_EMAIL,
                "to": [notification.email],
                "subject": subject,
                "html": html_content,
            }
            
            resend.Emails.send(params)
            
            return Response({
                'message': f'Email sent successfully to {notification.email}'
            })
            
        except Exception as e:
            return Response(
                {'error': f'Failed to send email: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
    
    @action(detail=False, methods=['post'])
    def bulk_send_email(self, request):
        """Send personalized emails to multiple subscribers"""
        import resend
        from django.conf import settings
        from .ai_service import generate_notification_email, is_ai_available
        
        ids = request.data.get('ids', [])
        use_ai = request.data.get('use_ai', False)  # Whether to use AI for each email
        manual_subject = request.data.get('subject', '')
        manual_message = request.data.get('message', '')
        
        if not ids:
            return Response(
                {'error': 'No notification IDs provided'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # If not using AI, validate manual content
        if not use_ai:
            email_serializer = CustomEmailSerializer(data={
                'subject': manual_subject,
                'message': manual_message
            })
            if not email_serializer.is_valid():
                return Response(
                    email_serializer.errors,
                    status=status.HTTP_400_BAD_REQUEST
                )
        elif not is_ai_available():
            return Response(
                {'error': 'AI service is not configured'},
                status=status.HTTP_503_SERVICE_UNAVAILABLE
            )
        
        notifications = StockNotification.objects.filter(id__in=ids).select_related('product')
        sent_count = 0
        failed_count = 0
        
        for notification in notifications:
            try:
                resend.api_key = settings.RESEND_API_KEY
                
                # Generate personalized content for each recipient
                if use_ai:
                    try:
                        email_content = generate_notification_email(
                            product_name=notification.product.name,
                            customer_email=notification.email,
                            product_in_stock=notification.product.in_stock,
                            is_bulk=False  # Treat as individual even in bulk
                        )
                        subject = email_content['subject']
                        message = email_content['message']
                    except Exception as ai_error:
                        print(f"AI generation failed for {notification.email}: {str(ai_error)}")
                        failed_count += 1
                        continue
                else:
                    # Use manual content (replace placeholders if any)
                    subject = manual_subject.replace('{product_name}', notification.product.name)
                    subject = subject.replace('{customer_email}', notification.email)
                    message = manual_message.replace('{product_name}', notification.product.name)
                    message = message.replace('{customer_email}', notification.email)
                
                html_content = f"""
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                </head>
                <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
                    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
                        <h1 style="color: white; margin: 0; font-size: 24px;">{subject}</h1>
                    </div>
                    
                    <div style="background-color: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
                        <div style="white-space: pre-wrap;">{message}</div>
                        
                        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 14px; color: #666;">
                            <p><strong>Pentorax Solar Energy Solutions</strong></p>
                            <p>Powering Nigeria with sustainable energy solutions.</p>
                        </div>
                    </div>
                </body>
                </html>
                """
                
                params = {
                    "from": settings.RESEND_FROM_EMAIL,
                    "to": [notification.email],
                    "subject": subject,
                    "html": html_content,
                }
                
                resend.Emails.send(params)
                sent_count += 1
                
            except Exception as e:
                failed_count += 1
                print(f"Failed to send email to {notification.email}: {str(e)}")
        
        return Response({
            'message': f'Sent {sent_count} personalized emails successfully, {failed_count} failed',
            'sent': sent_count,
            'failed': failed_count
        })
    
    @action(detail=False, methods=['post'])
    def generate_email(self, request):
        """Generate AI-powered email content for notification(s)"""
        from .ai_service import generate_notification_email, is_ai_available
        
        if not is_ai_available():
            return Response(
                {'error': 'AI service is not configured'},
                status=status.HTTP_503_SERVICE_UNAVAILABLE
            )
        
        notification_id = request.data.get('notification_id')
        notification_ids = request.data.get('notification_ids', [])
        
        try:
            if notification_id:
                # Single notification
                notification = StockNotification.objects.select_related('product').get(id=notification_id)
                email_content = generate_notification_email(
                    product_name=notification.product.name,
                    customer_email=notification.email,
                    product_in_stock=notification.product.in_stock,
                    is_bulk=False
                )
            elif notification_ids:
                # Bulk notifications
                notifications = StockNotification.objects.filter(id__in=notification_ids).select_related('product')
                product_names = list(set([n.product.name for n in notifications]))
                email_content = generate_notification_email(
                    product_name=product_names[0] if len(product_names) == 1 else '',
                    customer_email='',
                    product_in_stock=False,
                    is_bulk=True,
                    product_names_list=product_names
                )
            else:
                return Response(
                    {'error': 'Either notification_id or notification_ids is required'},
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            return Response(email_content)
            
        except StockNotification.DoesNotExist:
            return Response(
                {'error': 'Notification not found'},
                status=status.HTTP_404_NOT_FOUND
            )
        except Exception as e:
            return Response(
                {'error': str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
    
    @action(detail=False, methods=['post'])
    def subscribe(self, request):
        """Subscribe to stock notification for a product"""
        serializer = StockNotificationSerializer(data=request.data)
        
        if not serializer.is_valid():
            return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST
            )
        
        product_id = serializer.validated_data['product_id']
        email = serializer.validated_data['email']
        
        # Get user_id if authenticated
        user_id = None
        if request.user and hasattr(request.user, 'get'):
            user_id = request.user.get('sub')
        
        # Check if product exists and is out of stock
        try:
            product = Product.objects.get(pk=product_id)
            if product.in_stock:
                return Response(
                    {'error': 'Product is currently in stock'},
                    status=status.HTTP_400_BAD_REQUEST
                )
        except Product.DoesNotExist:
            return Response(
                {'error': 'Product not found'},
                status=status.HTTP_404_NOT_FOUND
            )
        
        # Create or get existing notification
        notification, created = StockNotification.objects.get_or_create(
            product_id=product_id,
            email=email,
            defaults={'user_id': user_id}
        )
        
        if not created and notification.is_notified:
            # Reset notification status if user subscribes again
            notification.is_notified = False
            notification.notified_at = None
            notification.save()
        
        # Send confirmation email
        from .emails.stock_notifications import send_subscription_confirmation
        send_subscription_confirmation(
            product_name=product.name,
            product_slug=product.slug,
            recipient_email=email
        )
        
        response_serializer = StockNotificationSerializer(notification)
        return Response(
            {
                'message': 'Successfully subscribed to stock notifications',
                'notification': response_serializer.data
            },
            status=status.HTTP_201_CREATED if created else status.HTTP_200_OK
        )
    
    @action(detail=False, methods=['delete'])
    def unsubscribe(self, request):
        """Unsubscribe from stock notification"""
        product_id = request.data.get('product_id')
        email = request.data.get('email')
        
        if not product_id or not email:
            return Response(
                {'error': 'product_id and email are required'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            notification = StockNotification.objects.get(
                product_id=product_id,
                email=email
            )
            notification.delete()
            return Response(
                {'message': 'Successfully unsubscribed from stock notifications'},
                status=status.HTTP_200_OK
            )
        except StockNotification.DoesNotExist:
            return Response(
                {'error': 'Notification subscription not found'},
                status=status.HTTP_404_NOT_FOUND
            )
