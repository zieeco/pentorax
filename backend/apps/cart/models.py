import uuid

from django.db import models


class TimeStampedModel(models.Model):
    """Abstract base model with timestamps"""

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


from django.contrib.auth.models import User

class Cart(TimeStampedModel):
    """Shopping cart - one per user or session"""

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='carts', null=True, blank=True)

    session_key = models.CharField(max_length=40, null=True, blank=True, db_index=True)  # For guest users

    class Meta:
        db_table = "cart_cart"
        verbose_name = "Cart"
        verbose_name_plural = "Carts"
        constraints = [
            models.UniqueConstraint(
                fields=["user"],
                condition=models.Q(user__isnull=False),
                name="unique_user_cart"
            ),

            models.UniqueConstraint(
                fields=["session_key"],
                condition=models.Q(session_key__isnull=False),
                name="unique_session_cart"
            ),
        ]

    def __str__(self):
        if self.user:
            return f"Cart for user {self.user.email}"

        return f"Guest cart (session: {self.session_key})"


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
