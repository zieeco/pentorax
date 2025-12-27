"""
Views for core app
"""

from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAdminUser, IsAuthenticated
from rest_framework.response import Response

from .models import FAQ, CaseStudy, TeamMember, UserProfile
from .serializers import (
    CaseStudySerializer,
    FAQSerializer,
    TeamMemberSerializer,
    UserProfileSerializer,
)


class UserProfileViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing user profiles.

    Permissions: IsAuthenticated
    """

    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated]

    @action(detail=False, methods=["get"])
    def me(self, request):
        """Get current user's profile"""
        try:
            profile = UserProfile.objects.get(supabase_id=request.user.id)
            serializer = self.get_serializer(profile)
            return Response(serializer.data)
        except UserProfile.DoesNotExist:
            return Response(
                {"detail": "Profile not found"}, status=status.HTTP_404_NOT_FOUND
            )


class CaseStudyViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet for viewing case studies.

    Permissions: AllowAny (public read-only)
    """

    queryset = CaseStudy.objects.filter(is_active=True)
    serializer_class = CaseStudySerializer
    permission_classes = [AllowAny]

    @action(detail=False, methods=["get"])
    def featured(self, request):
        """Get featured case studies"""
        featured = self.queryset.filter(is_featured=True)
        serializer = self.get_serializer(featured, many=True)
        return Response(serializer.data)


class FAQViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet for viewing FAQs.

    Permissions: AllowAny (public read-only)
    """

    queryset = FAQ.objects.filter(is_active=True)
    serializer_class = FAQSerializer
    permission_classes = [AllowAny]

    @action(detail=False, methods=["get"])
    def by_category(self, request):
        """Get FAQs grouped by category"""
        category = request.query_params.get("category")
        if category:
            faqs = self.queryset.filter(category=category)
        else:
            faqs = self.queryset
        serializer = self.get_serializer(faqs, many=True)
        return Response(serializer.data)


class TeamMemberViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet for viewing team members.

    Permissions: AllowAny (public read-only)
    """

    queryset = TeamMember.objects.filter(is_active=True)
    serializer_class = TeamMemberSerializer
    permission_classes = [AllowAny]

    @action(detail=False, methods=["get"])
    def by_department(self, request):
        """Get team members by department"""
        department = request.query_params.get("department")
        if department:
            members = self.queryset.filter(department=department)
        else:
            members = self.queryset
        serializer = self.get_serializer(members, many=True)
        return Response(serializer.data)
