import uuid

from django.db import models


class TimeStampedModel(models.Model):
    """Abstract base model with timestamps"""

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Cart(TimeStampedModel):
    """Shopping cart - one per user"""

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user_id = models.UUIDField(unique=True, db_index=True)

    class Meta:
        db_table = "cart_cart"
        verbose_name = "Cart"
        verbose_name_plural = "Carts"

    def __str__(self):
        return f"Cart for user {self.user_id}"


class CartItem(TimeStampedModel):
    """Items in shopping cart"""

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    cart = models.ForeignKey(
        Cart,
        on_delete=models.CASCADE,
        related_name="items",
        db_column="cart_id",
    )
    product = models.ForeignKey(
        'products.Product',
        on_delete=models.CASCADE,
        related_name="cart_items",
        db_column="product_id",
    )
    quantity = models.PositiveIntegerField(default=1)

    class Meta:
        db_table = "cart_cartitem"
        verbose_name = "Cart Item"
        verbose_name_plural = "Cart Items"
        ordering = ["-created_at"]
        constraints = [
            models.UniqueConstraint(
                fields=["cart", "product"], name="unique_cart_product"
            )
        ]

    def __str__(self):
        return f"CartItem {self.id}"
