"""
URL configuration for warranty app
"""

from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import WarrantyCheckViewSet

router = DefaultRouter()
router.register(r"warranties", WarrantyCheckViewSet, basename="warranty")

urlpatterns = [
    path("", include(router.urls)),
]

# urlpatterns = [
#     path("", include(router.urls)),
#     path("support/warranty/check/", warranty_check, name="warranty-check"),
# ]
