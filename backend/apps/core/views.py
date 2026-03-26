"""
Views for core app
"""

from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAdminUser, IsAuthenticated
from rest_framework.response import Response

from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate, login, logout
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import ensure_csrf_cookie
from .models import FAQ, CaseStudy, TeamMember, UserProfile

from .serializers import (
    CaseStudySerializer,
    FAQSerializer,
    TeamMemberSerializer,
    UserProfileSerializer,
    UserRegistrationSerializer,
)


@method_decorator(ensure_csrf_cookie, name='dispatch')
class RegisterView(viewsets.GenericViewSet):
    permission_classes = [AllowAny]
    serializer_class = UserRegistrationSerializer

    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            login(request, user)
            token, _ = Token.objects.get_or_create(user=user)
            return Response({
                "access_token": token.key,
                "token_type": "Token",
                "user": UserProfileSerializer(user.profile).data
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@method_decorator(ensure_csrf_cookie, name='dispatch')
class TokenLoginView(viewsets.GenericViewSet):
    permission_classes = [AllowAny]

    def create(self, request):
        email = request.data.get("email")
        password = request.data.get("password")
        user = authenticate(username=email, password=password)
        if user:
            login(request, user)
            token, _ = Token.objects.get_or_create(user=user)
            return Response({
                "access_token": token.key,
                "token_type": "Token",
                "user": UserProfileSerializer(user.profile).data
            })
        return Response({"detail": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)


@method_decorator(ensure_csrf_cookie, name='dispatch')
class LogoutView(viewsets.GenericViewSet):
    permission_classes = [IsAuthenticated]

    def create(self, request):
        logout(request)
        return Response(status=status.HTTP_204_NO_CONTENT)



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
        if not request.user.is_authenticated:
            return Response({"detail": "Not authenticated"}, status=status.HTTP_401_UNAUTHORIZED)
            
        try:
            profile = UserProfile.objects.get(user=request.user)
            serializer = self.get_serializer(profile)
            
            # Include token for session rehydration
            token, _ = Token.objects.get_or_create(user=request.user)
            
            return Response({
                "user": serializer.data,
                "access_token": token.key,
                "token_type": "Token"
            })
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
