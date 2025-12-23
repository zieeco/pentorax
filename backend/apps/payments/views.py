"""
Views for payments app
"""
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.conf import settings
from django.shortcuts import get_object_or_404
import uuid
from .models import Payment
from .serializers import PaymentSerializer, PaymentInitializeSerializer, PaymentVerifySerializer
from apps.orders.models import Order


class PaymentViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet for payment management
    """
    queryset = Payment.objects.all().select_related('order')
    serializer_class = PaymentSerializer
    
    @action(detail=False, methods=['post'])
    def initialize(self, request):
        """Initialize Paystack payment"""
        serializer = PaymentInitializeSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        order = get_object_or_404(Order, id=serializer.validated_data['order_id'])
        
        # Generate unique reference
        reference = f"PENT-{uuid.uuid4().hex[:12].upper()}"
        
        # Create payment record
        payment = Payment.objects.create(
            order=order,
            reference=reference,
            amount=serializer.validated_data['amount'],
            status='pending'
        )
        
        # TODO: Initialize Paystack transaction
        # paystack_response = paystack.transaction.initialize(
        #     email=serializer.validated_data['email'],
        #     amount=int(serializer.validated_data['amount'] * 100),  # Convert to kobo
        #     reference=reference
        # )
        
        return Response({
            'reference': reference,
            'payment_id': payment.id,
            # 'authorization_url': paystack_response['data']['authorization_url']
        }, status=status.HTTP_201_CREATED)
    
    @action(detail=False, methods=['post'])
    def verify(self, request):
        """Verify Paystack payment"""
        serializer = PaymentVerifySerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        reference = serializer.validated_data['reference']
        payment = get_object_or_404(Payment, reference=reference)
        
        # TODO: Verify with Paystack
        # paystack_response = paystack.transaction.verify(reference)
        # if paystack_response['data']['status'] == 'success':
        #     payment.status = 'success'
        #     payment.paystack_response = paystack_response['data']
        #     payment.save()
        #     
        #     # Update order status
        #     payment.order.status = 'processing'
        #     payment.order.save()
        
        payment.status = 'success'  # Temporary for testing
        payment.save()
        
        return Response(PaymentSerializer(payment).data)
