"""
Views for reviews app
"""

from django.db import connection
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

from .models import Review
from .serializers import (
    CreateReviewSerializer,
    ProductReviewStatsSerializer,
    ReviewSerializer,
)


class ReviewViewSet(viewsets.ModelViewSet):
    """
    ViewSet for product reviews.

    Permissions:
    - list, retrieve, product_reviews, product_stats: AllowAny
    - create, update, destroy: IsAuthenticated
    """

    serializer_class = ReviewSerializer

    def get_permissions(self):
        """Allow anyone to view reviews, authenticated users to create"""
        if self.action in ["list", "retrieve", "product_reviews", "product_stats"]:
            return [AllowAny()]
        return [IsAuthenticated()]

    def get_queryset(self):
        """Get reviews, optionally filtered by product"""
        queryset = Review.objects.all()

        product_id = self.request.query_params.get("product_id")
        if product_id:
            queryset = queryset.filter(product_id=product_id)

        return queryset

    def create(self, request):
        """Create a review"""
        serializer = CreateReviewSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user_id = str(request.user.id)
        user_email = request.user.email
        product_id = serializer.validated_data["product_id"]

        # Check if user already reviewed this product
        if Review.objects.filter(user_id=user_id, product_id=product_id).exists():
            return Response(
                {"detail": "You have already reviewed this product"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Check if user purchased this product
        with connection.cursor() as cursor:
            cursor.execute(
                """
                SELECT oi.id
                FROM public.orders_orderitem oi
                JOIN public.orders_order o ON oi.order_id = o.id
                WHERE o.user_id = %s AND oi.product_id = %s AND o.status = 'delivered'
            """,
                [user_id, str(product_id)],
            )

            is_verified = cursor.fetchone() is not None

        # Create review
        review = Review.objects.create(
            user_id=user_id,
            user_email=user_email,
            product_id=product_id,
            rating=serializer.validated_data["rating"],
            comment=serializer.validated_data["comment"],
            is_verified_purchase=is_verified,
        )

        review_serializer = ReviewSerializer(review)
        return Response(review_serializer.data, status=status.HTTP_201_CREATED)

    def update(self, request, pk=None):
        """Update a review (only by owner)"""
        user_id = str(request.user.id)

        try:
            review = Review.objects.get(id=pk, user_id=user_id)

            if "rating" in request.data:
                rating = int(request.data["rating"])
                if 1 <= rating <= 5:
                    review.rating = rating

            if "comment" in request.data:
                review.comment = request.data["comment"]

            review.save()

            serializer = ReviewSerializer(review)
            return Response(serializer.data)
        except Review.DoesNotExist:
            return Response(
                {"detail": "Review not found or you do not have permission"},
                status=status.HTTP_404_NOT_FOUND,
            )

    def destroy(self, request, pk=None):
        """Delete a review (only by owner)"""
        user_id = str(request.user.id)

        try:
            review = Review.objects.get(id=pk, user_id=user_id)
            review.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Review.DoesNotExist:
            return Response(
                {"detail": "Review not found or you do not have permission"},
                status=status.HTTP_404_NOT_FOUND,
            )

    @action(detail=False, methods=["get"])
    def product_reviews(self, request):
        """Get all reviews for a specific product"""
        product_id = request.query_params.get("product_id")

        if not product_id:
            return Response(
                {"detail": "product_id parameter is required"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        reviews = Review.objects.filter(product_id=product_id)
        serializer = ReviewSerializer(reviews, many=True)

        return Response(serializer.data)

    @action(detail=False, methods=["get"])
    def product_stats(self, request):
        """Get review statistics for a product"""
        product_id = request.query_params.get("product_id")

        if not product_id:
            return Response(
                {"detail": "product_id parameter is required"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        with connection.cursor() as cursor:
            # Get average rating and total reviews
            cursor.execute(
                """
                SELECT 
                    AVG(rating) as avg_rating,
                    COUNT(*) as total_reviews
                FROM public.reviews_review
                WHERE product_id = %s
            """,
                [product_id],
            )

            stats_row = cursor.fetchone()

            # Get rating distribution
            cursor.execute(
                """
                SELECT rating, COUNT(*) as count
                FROM public.reviews_review
                WHERE product_id = %s
                GROUP BY rating
                ORDER BY rating DESC
            """,
                [product_id],
            )

            distribution = {str(row[0]): row[1] for row in cursor.fetchall()}

        return Response(
            {
                "product_id": product_id,
                "average_rating": float(stats_row[0]) if stats_row[0] else 0,
                "total_reviews": stats_row[1],
                "rating_distribution": distribution,
            }
        )

    @action(detail=False, methods=["get"], permission_classes=[IsAuthenticated])
    def my_reviews(self, request):
        """Get all reviews by the authenticated user"""
        user_id = str(request.user.id)
        reviews = Review.objects.filter(user_id=user_id)
        serializer = ReviewSerializer(reviews, many=True)

        return Response(serializer.data)
