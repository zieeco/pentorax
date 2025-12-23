"""
URL configuration for quotes app
"""
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import QuoteRequestViewSet

router = DefaultRouter()
router.register(r'', QuoteRequestViewSet, basename='quote')

urlpatterns = [
    path('', include(router.urls)),
]
