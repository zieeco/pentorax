"""
Views for payments app
"""

import uuid as uuid_lib

import requests
from django.conf import settings
from django.db import connection, transaction
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import Payment
from .serializers import (
    PaymentInitializeSerializer,
    PaymentSerializer,
    PaymentVerifySerializer,
)


class PaymentViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet for payments.

    Permissions: IsAuthenticated (all actions)
    """

    serializer_class = PaymentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """Get payments for authenticated user's orders"""
        user_id = str(self.request.user.id)

        # Get order IDs for this user
        with connection.cursor() as cursor:
            cursor.execute(
                """
                SELECT id FROM public.orders_order WHERE user_id = %s
            """,
                [user_id],
            )
            order_ids = [str(row[0]) for row in cursor.fetchall()]

        return Payment.objects.filter(order_id__in=order_ids)

    @action(detail=False, methods=["post"])
    def initialize(self, request):
        """Initialize payment with Paystack"""
        serializer = PaymentInitializeSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        order_id = serializer.validated_data["order_id"]
        user_id = str(request.user.id)

        # Verify order belongs to user
        with connection.cursor() as cursor:
            cursor.execute(
                """
                SELECT id, email, total, status
                FROM public.orders_order
                WHERE id = %s AND user_id = %s
            """,
                [str(order_id), user_id],
            )

            order = cursor.fetchone()

            if not order:
                return Response(
                    {"detail": "Order not found"}, status=status.HTTP_404_NOT_FOUND
                )

            if order[3] != "pending":
                return Response(
                    {"detail": "Order is not in pending status"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

        # Generate unique reference
        reference = f"PAY-{uuid_lib.uuid4().hex[:12].upper()}"

        # Initialize payment with Paystack
        paystack_url = "https://api.paystack.co/transaction/initialize"
        headers = {
            "Authorization": f"Bearer {settings.PAYSTACK_SECRET_KEY}",
            "Content-Type": "application/json",
        }

        payload = {
            "email": order[1],
            "amount": int(float(order[2]) * 100),  # Convert to kobo
            "reference": reference,
            "callback_url": f"{settings.FRONTEND_URL}/payment/verify",
            "metadata": {
                "order_id": str(order_id),
            },
        }

        try:
            response = requests.post(paystack_url, json=payload, headers=headers)
            response_data = response.json()

            if response_data.get("status"):
                # Create payment record
                payment = Payment.objects.create(
                    reference=reference,
                    amount=order[2],
                    status="pending",
                    order_id=order_id,
                    paystack_response=response_data,
                )

                return Response(
                    {
                        "payment_id": str(payment.id),
                        "reference": reference,
                        "authorization_url": response_data["data"]["authorization_url"],
                        "access_code": response_data["data"]["access_code"],
                    }
                )
            else:
                return Response(
                    {"detail": "Failed to initialize payment", "error": response_data},
                    status=status.HTTP_400_BAD_REQUEST,
                )

        except Exception as e:
            return Response(
                {"detail": f"Payment initialization failed: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

    @action(detail=False, methods=["post"])
    def verify(self, request):
        """Verify payment with Paystack"""
        serializer = PaymentVerifySerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        reference = serializer.validated_data["reference"]

        # Verify with Paystack
        paystack_url = f"https://api.paystack.co/transaction/verify/{reference}"
        headers = {
            "Authorization": f"Bearer {settings.PAYSTACK_SECRET_KEY}",
        }

        try:
            response = requests.get(paystack_url, headers=headers)
            response_data = response.json()

            if (
                response_data.get("status")
                and response_data["data"]["status"] == "success"
            ):
                # Update payment status
                with transaction.atomic():
                    payment = Payment.objects.get(reference=reference)
                    payment.status = "success"
                    payment.paystack_response = response_data
                    payment.save()

                    # Update order status
                    with connection.cursor() as cursor:
                        cursor.execute(
                            """
                            UPDATE public.orders_order
                            SET status = 'processing'
                            WHERE id = %s
                        """,
                            [str(payment.order_id)],
                        )

                payment_serializer = PaymentSerializer(payment)
                return Response(payment_serializer.data)
            else:
                # Update payment status to failed
                payment = Payment.objects.get(reference=reference)
                payment.status = "failed"
                payment.paystack_response = response_data
                payment.save()

                return Response(
                    {"detail": "Payment verification failed", "data": response_data},
                    status=status.HTTP_400_BAD_REQUEST,
                )

        except Payment.DoesNotExist:
            return Response(
                {"detail": "Payment not found"}, status=status.HTTP_404_NOT_FOUND
            )
        except Exception as e:
            return Response(
                {"detail": f"Payment verification failed: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
