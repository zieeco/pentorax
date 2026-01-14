# Wishlist ViewSet Implementation
# Added to backend/apps/products/views.py

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
