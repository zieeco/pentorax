"""
URL configuration for products app
"""

from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import CategoryViewSet, ProductViewSet, WishlistViewSet, StockNotificationViewSet
from .views_qa import ProductQAViewSet, AnswerVoteViewSet
from .views_chat import ChatViewSet

router = DefaultRouter()
router.register(r"categories", CategoryViewSet, basename="category")
router.register(r"wishlist", WishlistViewSet, basename="wishlist")
router.register(r"stock-notifications", StockNotificationViewSet, basename="stock-notification")
router.register(r"answers", AnswerVoteViewSet, basename="answer")
router.register(r"chat", ChatViewSet, basename="chat")
router.register(r"", ProductViewSet, basename="product")

urlpatterns = [
    path("", include(router.urls)),
    # Product Q&A endpoints
    path("<uuid:product_pk>/questions/", ProductQAViewSet.as_view({'get': 'list'})),
    path("<uuid:product_pk>/questions/ask/", ProductQAViewSet.as_view({'post': 'ask'})),
    path("questions/<uuid:pk>/answer/", ProductQAViewSet.as_view({'post': 'answer_question'})),
]
