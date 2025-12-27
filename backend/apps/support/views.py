"""
Views for cart app
"""

from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAdminUser, IsAuthenticated
from rest_framework.response import Response

from .emails import send_ticket_created_notification, send_ticket_status_update
from .models import SupportTicket
from .serializers import SupportTicketCreateSerializer, SupportTicketSerializer


class SupportTicketViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing support tickets.

    Permissions:
    - create: AllowAny (anyone can create tickets)
    - list, retrieve: IsAuthenticated (users can see their tickets)
    - update, destroy: IsAdminUser only
    """

    queryset = SupportTicket.objects.all()
    serializer_class = SupportTicketSerializer

    def get_permissions(self):
        """Set permissions based on action"""
        if self.action == "create":
            return [AllowAny()]
        elif self.action in ["list", "retrieve"]:
            return [IsAuthenticated()]
        return [IsAdminUser()]

    def get_serializer_class(self):
        """Use different serializer for creation"""
        if self.action == "create":
            return SupportTicketCreateSerializer
        return SupportTicketSerializer

    def get_queryset(self):
        """Filter tickets based on user role"""
        user = self.request.user
        if user.is_staff or user.is_superuser:
            return SupportTicket.objects.all()

        # Regular users see only their tickets
        return SupportTicket.objects.filter(user_email=user.email)

    def create(self, request, *args, **kwargs):
        """
        Create a new support ticket and send notifications
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        ticket = serializer.save()

        # Send email notifications
        send_ticket_created_notification(ticket)

        # Return full ticket details
        response_serializer = SupportTicketSerializer(ticket)
        return Response(response_serializer.data, status=status.HTTP_201_CREATED)

    @action(detail=True, methods=["post"], permission_classes=[IsAdminUser])
    def update_status(self, request, pk=None):
        """
        Update the status of a support ticket

        Expected payload: {"status": "open|in_progress|resolved|closed"}
        """
        ticket = self.get_object()
        old_status = ticket.status
        new_status = request.data.get("status")

        valid_statuses = ["open", "in_progress", "resolved", "closed"]
        if new_status not in valid_statuses:
            return Response(
                {
                    "error": f"Invalid status. Must be one of: {', '.join(valid_statuses)}"
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        ticket.status = new_status
        ticket.save()

        # Send status update notification
        if old_status != new_status:
            send_ticket_status_update(ticket, old_status)

        serializer = self.get_serializer(ticket)
        return Response(serializer.data)

    @action(detail=True, methods=["post"], permission_classes=[IsAdminUser])
    def assign(self, request, pk=None):
        """
        Assign a ticket to a staff member

        Expected payload: {"assigned_to": "staff_name"}
        """
        ticket = self.get_object()
        assigned_to = request.data.get("assigned_to")

        if not assigned_to:
            return Response(
                {"error": "assigned_to field is required"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        ticket.assigned_to = assigned_to
        ticket.save()

        serializer = self.get_serializer(ticket)
        return Response(serializer.data)

    @action(detail=True, methods=["post"], permission_classes=[IsAdminUser])
    def resolve(self, request, pk=None):
        """
        Resolve a ticket with resolution notes

        Expected payload: {"resolution_notes": "description of resolution"}
        """
        ticket = self.get_object()
        resolution_notes = request.data.get("resolution_notes")

        if not resolution_notes:
            return Response(
                {"error": "resolution_notes field is required"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        old_status = ticket.status
        ticket.status = "resolved"
        ticket.resolution_notes = resolution_notes
        ticket.save()

        # Send resolution notification
        if old_status != "resolved":
            send_ticket_status_update(ticket, old_status)

        serializer = self.get_serializer(ticket)
        return Response(serializer.data)

    @action(detail=False, methods=["get"], permission_classes=[IsAdminUser])
    def open_tickets(self, request):
        """Get all open tickets"""
        open_tickets = self.queryset.filter(status="open")
        serializer = self.get_serializer(open_tickets, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=["get"], permission_classes=[IsAdminUser])
    def by_status(self, request):
        """Get tickets filtered by status"""
        ticket_status = request.query_params.get("status")
        if not ticket_status:
            return Response(
                {"error": "status query parameter is required"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        tickets = self.queryset.filter(status=ticket_status)
        serializer = self.get_serializer(tickets, many=True)
        return Response(serializer.data)
