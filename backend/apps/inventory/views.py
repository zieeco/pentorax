"""
Views for inventory app
"""
from rest_framework import viewsets
from .models import Stock
from .serializers import StockSerializer


class StockViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet for product stock (read-only for public)
    """
    queryset = Stock.objects.all().select_related('product')
    serializer_class = StockSerializer
    
    def get_queryset(self):
        queryset = super().get_queryset()
        
        # Filter by product
        product_id = self.request.query_params.get('product_id')
        if product_id:
            queryset = queryset.filter(product_id=product_id)
        
        return queryset
