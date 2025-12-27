"""
Views for quotes app
"""

from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAdminUser
from rest_framework.response import Response

from .emails import send_quote_request_notification
from .models import QuoteRequest
from .serializers import QuoteRequestSerializer


class QuoteRequestViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing quote requests.

    Permissions:
    - create: AllowAny (public can submit quotes)
    - list, retrieve, update, destroy: IsAdminUser only
    """

    queryset = QuoteRequest.objects.all()
    serializer_class = QuoteRequestSerializer

    def get_permissions(self):
        """Allow anyone to create, admin only for all other actions"""
        if self.action == "create":
            return [AllowAny()]
        return [IsAdminUser()]

    def create(self, request, *args, **kwargs):
        """
        Create a new quote request and send email notification to admin
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        quote_request = serializer.save()

        # Send email notification to admin
        send_quote_request_notification(quote_request)

        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @action(detail=True, methods=["post"], permission_classes=[IsAdminUser])
    def update_status(self, request, pk=None):
        """
        Update the status of a quote request

        Expected payload: {"status": "contacted|quoted|closed"}
        """
        quote_request = self.get_object()
        new_status = request.data.get("status")

        if new_status not in ["new", "contacted", "quoted", "closed"]:
            return Response(
                {
                    "error": "Invalid status. Must be one of: new, contacted, quoted, closed"
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        quote_request.status = new_status
        quote_request.save()

        serializer = self.get_serializer(quote_request)
        return Response(serializer.data)
