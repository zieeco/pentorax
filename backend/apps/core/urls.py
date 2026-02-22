"""
URL configuration for core app
"""

from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import (
    CaseStudyViewSet,
    FAQViewSet,
    TeamMemberViewSet,
    UserProfileViewSet,
    RegisterView,
    TokenLoginView,
    LogoutView,
)

router = DefaultRouter()
router.register(r"profiles", UserProfileViewSet, basename="userprofile")
router.register(r"case-studies", CaseStudyViewSet, basename="casestudy")
router.register(r"faqs", FAQViewSet, basename="faq")
router.register(r"team", TeamMemberViewSet, basename="teammember")

urlpatterns = [
    path("register/", RegisterView.as_view({'post': 'create'}), name="register"),
    path("token-login/", TokenLoginView.as_view({'post': 'create'}), name="token_login"),
    path("logout/", LogoutView.as_view({'post': 'create'}), name="logout"),
    path("", include(router.urls)),
]

