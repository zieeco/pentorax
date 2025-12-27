
import uuid

from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True
    dependencies = [
        ("products", "0001_initial"),  # FIXED: Added dependency
    ]

    operations = [
        migrations.CreateModel(
            name="Review",
            fields=[
                (
                    "id",
                    models.UUIDField(
                        default=uuid.uuid4,
                        editable=False,
                        primary_key=True,
                        serialize=False,
                    ),
                ),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                ("user_id", models.CharField(max_length=255, db_index=True)),
                ("user_email", models.EmailField(max_length=255)),
                ("rating", models.SmallIntegerField()),
                ("comment", models.TextField()),
                ("is_verified_purchase", models.BooleanField(default=False)),
                # FIXED: ForeignKey to Product
                (
                    "product",
                    models.ForeignKey(
                        on_delete=models.CASCADE,
                        to="products.Product",
                        related_name="reviews",
                        db_column="product_id",
                    ),
                ),
            ],
            options={
                "db_table": "reviews_review",
                "verbose_name": "Review",
                "verbose_name_plural": "Reviews",
                "ordering": ["-created_at"],
                "indexes": [
                    models.Index(
                        fields=["product"], name="idx_reviews_review_product_id"
                    ),
                    models.Index(fields=["rating"], name="idx_reviews_review_rating"),
                    models.Index(
                        fields=["created_at"], name="idx_reviews_review_created_at"
                    ),
                    models.Index(fields=["user_id"], name="idx_reviews_review_user_id"),
                ],
            },
        ),
        # FIXED: Check constraint for rating (1-5)
        migrations.AddConstraint(
            model_name="review",
            constraint=models.CheckConstraint(
                check=models.Q(rating__gte=1, rating__lte=5),
                name="reviews_review_rating_check",
            ),
        ),
        # Unique constraint for user per product
        migrations.AddConstraint(
            model_name="review",
            constraint=models.UniqueConstraint(
                fields=["user_id", "product"], name="unique_user_product_review"
            ),
        ),
    ]
