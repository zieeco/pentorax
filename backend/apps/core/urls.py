"""
URL configuration for core app
"""
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    TeamMemberViewSet,
    FAQViewSet,
    CaseStudyViewSet,
    ContactSubmissionViewSet,
    SupportTicketViewSet,
    warranty_check
)

router = DefaultRouter()
router.register(r'team', TeamMemberViewSet, basename='team')
router.register(r'faqs', FAQViewSet, basename='faq')
router.register(r'case-studies', CaseStudyViewSet, basename='case-study')
router.register(r'contact', ContactSubmissionViewSet, basename='contact')
router.register(r'support/tickets', SupportTicketViewSet, basename='support-ticket')

urlpatterns = [
    path('', include(router.urls)),
    path('support/warranty/check/', warranty_check, name='warranty-check'),
]
