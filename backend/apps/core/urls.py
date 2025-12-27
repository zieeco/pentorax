"""
URL configuration for core app
"""

from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import CaseStudyViewSet, FAQViewSet, TeamMemberViewSet, UserProfileViewSet

router = DefaultRouter()
router.register(r"profiles", UserProfileViewSet, basename="userprofile")
router.register(r"case-studies", CaseStudyViewSet, basename="casestudy")
router.register(r"faqs", FAQViewSet, basename="faq")
router.register(r"team", TeamMemberViewSet, basename="teammember")

urlpatterns = [
    path("", include(router.urls)),
]
