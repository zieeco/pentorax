"""
Newsletter API views
"""
import csv
from django.http import HttpResponse
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from .models import NewsletterSubscriber
from .serializers import NewsletterSubscriberSerializer, UnsubscribeSerializer
from .emails.newsletter import send_welcome_email, send_unsubscribe_confirmation


class NewsletterViewSet(viewsets.ModelViewSet):
    """Newsletter subscription management"""
    
    queryset = NewsletterSubscriber.objects.all()
    serializer_class = NewsletterSubscriberSerializer
    
    def get_permissions(self):
        """Allow public access for subscribe/unsubscribe, staff only for others"""
        if self.action in ['subscribe', 'unsubscribe']:
            return [AllowAny()]
        return [IsAuthenticated()]
    
    def list(self, request):
        """List all subscribers (staff only)"""
        if not (request.user.is_staff or request.user.is_superuser):
            return Response(
                {'error': 'Permission denied'},
                status=status.HTTP_403_FORBIDDEN
            )
        
        queryset = self.get_queryset()
        
        # Filter by active status if provided
        is_active = request.query_params.get('is_active')
        if is_active is not None:
            queryset = queryset.filter(is_active=is_active.lower() == 'true')
        
        # Search
        search = request.query_params.get('search')
        if search:
            queryset = queryset.filter(
                email__icontains=search
            ) | queryset.filter(
                full_name__icontains=search
            )
        
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['post'])
    def subscribe(self, request):
        """
        Public endpoint for newsletter subscription
        """
        serializer = self.get_serializer(data=request.data)
        
        if not serializer.is_valid():
            return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST
            )
        
        email = serializer.validated_data['email']
        
        # Check if already subscribed
        existing = NewsletterSubscriber.objects.filter(email=email).first()
        
        if existing:
            if existing.is_active:
                return Response(
                    {
                        'message': 'This email is already subscribed to our newsletter.',
                        'already_subscribed': True
                    },
                    status=status.HTTP_200_OK
                )
            else:
                # Reactivate
                existing.is_active = True
                existing.full_name = serializer.validated_data['full_name']
                existing.save()
                
                # Send welcome email
                send_welcome_email(existing)
                
                return Response(
                    {
                        'message': 'Welcome back! You have been resubscribed.',
                        'subscriber': NewsletterSubscriberSerializer(existing).data
                    },
                    status=status.HTTP_200_OK
                )
        
        # Create new subscriber
        subscriber = serializer.save()
        
        # Send welcome email
        email_sent = send_welcome_email(subscriber)
        
        return Response(
            {
                'message': 'Successfully subscribed! Check your email for confirmation.',
                'subscriber': NewsletterSubscriberSerializer(subscriber).data,
                'email_sent': email_sent
            },
            status=status.HTTP_201_CREATED
        )
    
    @action(detail=False, methods=['post'])
    def unsubscribe(self, request):
        """
        Public endpoint for unsubscribing via token
        """
        serializer = UnsubscribeSerializer(data=request.data)
        
        if not serializer.is_valid():
            return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST
            )
        
        token = serializer.validated_data['token']
        
        try:
            subscriber = NewsletterSubscriber.objects.get(
                unsubscribe_token=token,
                is_active=True
            )
            
            subscriber.is_active = False
            subscriber.save()
            
            # Send confirmation
            send_unsubscribe_confirmation(subscriber.email)
            
            return Response(
                {'message': 'Successfully unsubscribed from newsletter.'},
                status=status.HTTP_200_OK
            )
            
        except NewsletterSubscriber.DoesNotExist:
            return Response(
                {'error': 'Invalid unsubscribe link or already unsubscribed.'},
                status=status.HTTP_404_NOT_FOUND
            )
    
    @action(detail=False, methods=['get'])
    def export(self, request):
        """
        Export subscribers to CSV (staff only)
        """
        if not (request.user.is_staff or request.user.is_superuser):
            return Response(
                {'error': 'Permission denied'},
                status=status.HTTP_403_FORBIDDEN
            )
        
        # Create CSV response
        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename="newsletter_subscribers.csv"'
        
        writer = csv.writer(response)
        writer.writerow(['Email', 'Full Name', 'Subscribed At', 'Active'])
        
        subscribers = NewsletterSubscriber.objects.all().order_by('-created_at')
        
        for sub in subscribers:
            writer.writerow([
                sub.email,
                sub.full_name,
                sub.created_at.strftime('%Y-%m-%d %H:%M:%S'),
                'Yes' if sub.is_active else 'No'
            ])
        
        return response
