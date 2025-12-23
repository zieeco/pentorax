"""
Views for quotes app
"""
from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import QuoteRequest
from .serializers import QuoteRequestSerializer


class QuoteRequestViewSet(viewsets.ModelViewSet):
    """
    ViewSet for quote requests
    """
    queryset = QuoteRequest.objects.all()
    serializer_class = QuoteRequestSerializer
    
    def create(self, request, *args, **kwargs):
        """Create quote request"""
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        quote = serializer.save()
        
        # TODO: Send email notification to admin
        
        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED
        )
