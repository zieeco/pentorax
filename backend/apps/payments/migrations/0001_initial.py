import uuid

from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True
    dependencies = [
        ("orders", "0001_initial"),  # FIXED: Added dependency
    ]

    operations = [
        migrations.CreateModel(
            name="Payment",
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
                ("reference", models.CharField(max_length=255, unique=True)),
                ("amount", models.DecimalField(max_digits=10, decimal_places=2)),
                (
                    "status",
                    models.CharField(
                        max_length=50,
                        choices=[
                            ("pending", "Pending"),
                            ("success", "Success"),
                            ("failed", "Failed"),
                            ("abandoned", "Abandoned"),
                        ],
                        default="pending",
                    ),
                ),
                ("paystack_response", models.JSONField(null=True, blank=True)),
                # FIXED: ForeignKey to Order
                (
                    "order",
                    models.ForeignKey(
                        on_delete=models.CASCADE,
                        to="orders.Order",
                        related_name="payments",
                        db_column="order_id",
                    ),
                ),
            ],
            options={
                "db_table": "payments_payment",
                "verbose_name": "Payment",
                "verbose_name_plural": "Payments",
                "ordering": ["-created_at"],
                "indexes": [
                    models.Index(
                        fields=["reference"], name="idx_payments_payment_reference"
                    ),
                    models.Index(fields=["status"], name="idx_payments_payment_status"),
                    models.Index(
                        fields=["created_at"], name="idx_payments_payment_created_at"
                    ),
                    models.Index(
                        fields=["order"], name="idx_payments_payment_order_id"
                    ),
                ],
            },
        ),
    ]
