"""
Views for contacts app
"""

from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAdminUser
from rest_framework.response import Response

from .emails import send_contact_submission_notification
from .models import ContactSubmission
from .serializers import ContactSubmissionSerializer


class ContactSubmissionViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing contact form submissions.

    Permissions:
    - create: AllowAny (public can submit)
    - list, retrieve, update, destroy: IsAdminUser only
    """

    queryset = ContactSubmission.objects.all()
    serializer_class = ContactSubmissionSerializer

    def get_permissions(self):
        """Allow anyone to create, admin only for all other actions"""
        if self.action == "create":
            return [AllowAny()]
        return [IsAdminUser()]

    def create(self, request, *args, **kwargs):
        """
        Create a new contact submission and send email notification to admin
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        contact = serializer.save()

        # Send email notification to admin
        send_contact_submission_notification(contact)
        
        # Send confirmation email to customer
        from .emails import send_customer_confirmation
        send_customer_confirmation(contact)

        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @action(detail=True, methods=["post"], permission_classes=[IsAdminUser])
    def mark_as_read(self, request, pk=None):
        """
        Mark a contact submission as read
        """
        contact = self.get_object()
        contact.is_read = True
        contact.save()

        serializer = self.get_serializer(contact)
        return Response(serializer.data)

    @action(detail=False, methods=["get"], permission_classes=[IsAdminUser])
    def unread(self, request):
        """
        Get all unread contact submissions
        """
        unread_contacts = self.queryset.filter(is_read=False)
        serializer = self.get_serializer(unread_contacts, many=True)
        return Response(serializer.data)
