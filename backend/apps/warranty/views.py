"""
Views for cart app
"""

from django.shortcuts import get_object_or_404
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAdminUser
from rest_framework.response import Response

from .emails import send_warranty_expiry_reminder
from .models import WarrantyCheck
from .serializers import WarrantyCheckSerializer, WarrantyLookupSerializer


class WarrantyCheckViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing warranty records.

    Permissions:
    - lookup: AllowAny (public can check warranties)
    - list, retrieve, create, update, destroy: IsAdminUser only
    """

    queryset = WarrantyCheck.objects.all()
    serializer_class = WarrantyCheckSerializer
    lookup_field = "serial_number"

    def get_permissions(self):
        """Allow anyone to lookup warranties, admin for management"""
        if self.action == "lookup":
            return [AllowAny()]
        return [IsAdminUser()]

    @action(detail=False, methods=["post"], permission_classes=[AllowAny])
    def lookup(self, request):
        """
        Public endpoint to check warranty status by serial number

        Expected payload: {"serial_number": "ABC123"}
        """
        serial_number = request.data.get("serial_number")

        if not serial_number:
            return Response(
                {"error": "serial_number is required"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            warranty = WarrantyCheck.objects.get(serial_number=serial_number.upper())

            # Return limited public information
            data = {
                "serial_number": warranty.serial_number,
                "product_name": warranty.product_name,
                "product_category": warranty.product_category,
                "purchase_date": warranty.purchase_date,
                "expiry_date": warranty.expiry_date,
                "is_valid": warranty.is_valid,
                "is_expired": warranty.is_expired(),
                "days_remaining": warranty.days_remaining(),
                "support_level": warranty.get_support_level_display(),
            }

            return Response(data)

        except WarrantyCheck.DoesNotExist:
            return Response(
                {
                    "error": "Warranty not found",
                    "message": "No warranty record found for this serial number. Please check the number and try again.",
                },
                status=status.HTTP_404_NOT_FOUND,
            )

    @action(detail=False, methods=["get"], permission_classes=[IsAdminUser])
    def expiring_soon(self, request):
        """
        Get warranties expiring within the next 30 days
        """
        from datetime import timedelta

        from django.utils import timezone

        today = timezone.now().date()
        thirty_days = today + timedelta(days=30)

        expiring = self.queryset.filter(
            expiry_date__gte=today, expiry_date__lte=thirty_days, is_valid=True
        )

        serializer = self.get_serializer(expiring, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=["get"], permission_classes=[IsAdminUser])
    def expired(self, request):
        """
        Get all expired warranties
        """
        from django.utils import timezone

        today = timezone.now().date()
        expired = self.queryset.filter(expiry_date__lt=today)

        serializer = self.get_serializer(expired, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=["post"], permission_classes=[IsAdminUser])
    def send_expiry_reminder(self, request, serial_number=None):
        """
        Send warranty expiry reminder email to customer
        """
        warranty = self.get_object()

        if not warranty.customer_email:
            return Response(
                {"error": "No customer email on record"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        success = send_warranty_expiry_reminder(warranty)

        if success:
            return Response({"message": "Reminder email sent successfully"})
        else:
            return Response(
                {"error": "Failed to send email"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

    @action(detail=True, methods=["post"], permission_classes=[IsAdminUser])
    def extend_warranty(self, request, serial_number=None):
        """
        Extend warranty by specified months

        Expected payload: {"months": 12}
        """
        warranty = self.get_object()
        months = request.data.get("months")

        if not months or not isinstance(months, int) or months <= 0:
            return Response(
                {"error": "Valid number of months is required"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        from datetime import timedelta

        warranty.expiry_date = warranty.expiry_date + timedelta(days=months * 30)
        warranty.warranty_duration_months += months
        warranty.save()

        serializer = self.get_serializer(warranty)
        return Response(serializer.data)
