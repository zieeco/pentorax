"""
Views for inventory app
"""


from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from django.db import transaction
from .models import Stock
from .serializers import StockSerializer, UpdateStockSerializer, ReserveStockSerializer


class StockViewSet(viewsets.ModelViewSet):
    """
    ViewSet for inventory/stock management.

    Permissions:
    - list, retrieve: IsAuthenticated
    - create, update, destroy: IsAdminUser
    """

    queryset = Stock.objects.all()
    serializer_class = StockSerializer

    def get_permissions(self):
        """Admin only for create, update, delete"""
        if self.action in ["create", "update", "partial_update", "destroy"]:
            return [IsAdminUser()]
        return [IsAuthenticated()]

    def create(self, request):
        """Create stock entry for a product"""
        product_id = request.data.get("product_id")
        quantity = request.data.get("quantity", 0)

        if not product_id:
            return Response(
                {"detail": "product_id is required"}, status=status.HTTP_400_BAD_REQUEST
            )

        # Check if stock already exists
        if Stock.objects.filter(product_id=product_id).exists():
            return Response(
                {"detail": "Stock entry already exists for this product"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        stock = Stock.objects.create(product_id=product_id, quantity=quantity)

        serializer = StockSerializer(stock)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def update(self, request, pk=None):
        """Update stock quantity"""
        serializer = UpdateStockSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        try:
            stock = Stock.objects.get(id=pk)
            stock.quantity = serializer.validated_data["quantity"]
            stock.save()

            stock_serializer = StockSerializer(stock)
            return Response(stock_serializer.data)
        except Stock.DoesNotExist:
            return Response(
                {"detail": "Stock not found"}, status=status.HTTP_404_NOT_FOUND
            )

    @action(detail=False, methods=["post"])
    def reserve(self, request):
        """Reserve stock for an order"""
        serializer = ReserveStockSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        product_id = serializer.validated_data["product_id"]
        quantity = serializer.validated_data["quantity"]

        try:
            with transaction.atomic():
                stock = Stock.objects.select_for_update().get(product_id=product_id)

                if stock.available < quantity:
                    return Response(
                        {"detail": f"Insufficient stock. Available: {stock.available}"},
                        status=status.HTTP_400_BAD_REQUEST,
                    )

                stock.reserved += quantity
                stock.save()

                stock_serializer = StockSerializer(stock)
                return Response(stock_serializer.data)
        except Stock.DoesNotExist:
            return Response(
                {"detail": "Stock not found for this product"},
                status=status.HTTP_404_NOT_FOUND,
            )

    @action(detail=False, methods=["post"])
    def release(self, request):
        """Release reserved stock"""
        serializer = ReserveStockSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        product_id = serializer.validated_data["product_id"]
        quantity = serializer.validated_data["quantity"]

        try:
            with transaction.atomic():
                stock = Stock.objects.select_for_update().get(product_id=product_id)

                if stock.reserved < quantity:
                    return Response(
                        {
                            "detail": f"Cannot release more than reserved. Reserved: {stock.reserved}"
                        },
                        status=status.HTTP_400_BAD_REQUEST,
                    )

                stock.reserved -= quantity
                stock.save()

                stock_serializer = StockSerializer(stock)
                return Response(stock_serializer.data)
        except Stock.DoesNotExist:
            return Response(
                {"detail": "Stock not found for this product"},
                status=status.HTTP_404_NOT_FOUND,
            )

    @action(detail=False, methods=["post"])
    def fulfill(self, request):
        """Fulfill an order - reduce quantity and reserved"""
        serializer = ReserveStockSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        product_id = serializer.validated_data["product_id"]
        quantity = serializer.validated_data["quantity"]

        try:
            with transaction.atomic():
                stock = Stock.objects.select_for_update().get(product_id=product_id)

                if stock.reserved < quantity or stock.quantity < quantity:
                    return Response(
                        {
                            "detail": "Cannot fulfill - insufficient stock or reserved quantity"
                        },
                        status=status.HTTP_400_BAD_REQUEST,
                    )

                stock.quantity -= quantity
                stock.reserved -= quantity
                stock.save()

                stock_serializer = StockSerializer(stock)
                return Response(stock_serializer.data)
        except Stock.DoesNotExist:
            return Response(
                {"detail": "Stock not found for this product"},
                status=status.HTTP_404_NOT_FOUND,
            )

    @action(detail=False, methods=["get"])
    def low_stock(self, request):
        """Get products with low stock"""
        threshold = int(request.query_params.get("threshold", 10))

        stocks = Stock.objects.all()
        low_stock_items = [stock for stock in stocks if stock.is_low_stock(threshold)]

        serializer = StockSerializer(low_stock_items, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=["get"])
    def out_of_stock(self, request):
        """Get out of stock products"""
        stocks = Stock.objects.all()
        out_of_stock_items = [stock for stock in stocks if stock.available <= 0]

        serializer = StockSerializer(out_of_stock_items, many=True)
        return Response(serializer.data)
