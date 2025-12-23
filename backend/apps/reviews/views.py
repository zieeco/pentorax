"""
Views for reviews app
"""
from rest_framework import viewsets, permissions
from rest_framework.exceptions import PermissionDenied
from .models import Review
from .serializers import ReviewSerializer


class ReviewViewSet(viewsets.ModelViewSet):
    """
    ViewSet for product reviews
    """
    queryset = Review.objects.all().select_related('product')
    serializer_class = ReviewSerializer
    
    def get_queryset(self):
        queryset = super().get_queryset()
        product_id = self.request.query_params.get('product_id')
        if product_id:
            queryset = queryset.filter(product_id=product_id)
        return queryset
    
    def perform_create(self, serializer):
        """Create review with user info"""
        user = self.request.user
        if not hasattr(user, 'id'):
            raise PermissionDenied("Authentication required to create reviews")
        
        serializer.save(
            user_id=user.id,
            user_email=user.email
        )
    
    def perform_update(self, serializer):
        """Only allow users to update their own reviews"""
        if serializer.instance.user_id != self.request.user.id:
            raise PermissionDenied("You can only update your own reviews")
        serializer.save()
    
    def perform_destroy(self, instance):
        """Only allow users to delete their own reviews"""
        if instance.user_id != self.request.user.id:
            raise PermissionDenied("You can only delete your own reviews")
        instance.delete()
