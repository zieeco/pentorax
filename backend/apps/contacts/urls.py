"""
URL configuration for warranty app
"""

from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import ContactSubmissionViewSet

router = DefaultRouter()
router.register(r"submissions", ContactSubmissionViewSet, basename="contactsubmission")

urlpatterns = [
    path("", include(router.urls)),
]
