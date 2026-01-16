"""
URL configuration for contacts app
"""

from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import ContactSubmissionViewSet

router = DefaultRouter()
router.register(r"", ContactSubmissionViewSet, basename="contact")

urlpatterns = [
    path("", include(router.urls)),
]
