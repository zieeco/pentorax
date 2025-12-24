"""
Views for core app
"""
from rest_framework import viewsets, filters, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import TeamMember, FAQ, CaseStudy, ContactSubmission, SupportTicket, WarrantyCheck
from .serializers import (
    TeamMemberSerializer,
    FAQSerializer,
    CaseStudySerializer,
    ContactSubmissionSerializer,
    SupportTicketSerializer,
    WarrantyCheckSerializer,
    WarrantyCheckResponseSerializer
)


class TeamMemberViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet for team members (read-only)
    """
    queryset = TeamMember.objects.filter(is_active=True)
    serializer_class = TeamMemberSerializer
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['department', 'order', 'name']
    ordering = ['department', 'order']


class FAQViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet for FAQs (read-only with search)
    """
    queryset = FAQ.objects.filter(is_active=True)
    serializer_class = FAQSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['question', 'answer']
    ordering_fields = ['order', 'created_at']
    ordering = ['order']
    
    def get_queryset(self):
        queryset = super().get_queryset()
        
        # Filter by category
        category = self.request.query_params.get('category')
        if category:
            queryset = queryset.filter(category=category)
        
        return queryset


class CaseStudyViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet for case studies (read-only)
    """
    queryset = CaseStudy.objects.filter(is_active=True)
    serializer_class = CaseStudySerializer
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['project_date', 'created_at']
    ordering = ['-is_featured', '-project_date']


class ContactSubmissionViewSet(viewsets.ModelViewSet):
    """
    ViewSet for contact form submissions (create-only for public)
    """
    queryset = ContactSubmission.objects.all()
    serializer_class = ContactSubmissionSerializer
    http_method_names = ['post']
    
    def create(self, request, *args, **kwargs):
        """Create contact submission"""
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        contact = serializer.save()
        
        # TODO: Send email notification to admin
        
        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED
        )


class SupportTicketViewSet(viewsets.ModelViewSet):
    """
    ViewSet for support tickets (create-only for public)
    """
    queryset = SupportTicket.objects.all()
    serializer_class = SupportTicketSerializer
    http_method_names = ['post']
    
    def create(self, request, *args, **kwargs):
        """Create support ticket"""
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        ticket = serializer.save()
        
        # TODO: Send email notification to support team
        
        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED
        )


@api_view(['POST'])
def warranty_check(request):
    """
    Check warranty status by serial number
    """
    serializer = WarrantyCheckSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    
    serial = serializer.validated_data['serial']
    
    try:
        warranty = WarrantyCheck.objects.get(serial_number=serial)
        response_serializer = WarrantyCheckResponseSerializer(warranty)
        return Response(response_serializer.data)
    except WarrantyCheck.DoesNotExist:
        return Response(
            {
                'error': 'Serial number not found',
                'serial': serial
            },
            status=status.HTTP_404_NOT_FOUND
        )
