
import uuid

from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True
    dependencies = [
        ("products", "0001_initial"),  # FIXED: Added dependency
    ]

    operations = [
        migrations.CreateModel(
            name="Stock",
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
                ("quantity", models.IntegerField(default=0)),
                ("reserved", models.IntegerField(default=0)),
                # FIXED: ForeignKey to Product (one-to-one)
                (
                    "product",
                    models.OneToOneField(
                        on_delete=models.CASCADE,
                        to="products.Product",
                        related_name="stock",
                        db_column="product_id",
                    ),
                ),
            ],
            options={
                "db_table": "inventory_stock",
                "verbose_name": "Stock",
                "verbose_name_plural": "Stock",
                "indexes": [
                    models.Index(
                        fields=["product"], name="idx_inventory_stock_product_id"
                    ),
                ],
            },
        ),
        # FIXED: Check constraints for inventory
        migrations.AddConstraint(
            model_name="stock",
            constraint=models.CheckConstraint(
                check=models.Q(quantity__gte=0), name="inventory_stock_quantity_check"
            ),
        ),
        migrations.AddConstraint(
            model_name="stock",
            constraint=models.CheckConstraint(
                check=models.Q(reserved__gte=0), name="inventory_stock_reserved_check"
            ),
        ),
        # CRITICAL FIX: Add DEFAULT values at database level
        # Django's default=uuid.uuid4 and auto_now_add=True don't create SQL DEFAULT
        # This causes NOT NULL constraint violations when triggers insert data
        migrations.RunSQL(
            sql="""
            -- Fix inventory_stock table
            ALTER TABLE inventory_stock ALTER COLUMN id SET DEFAULT gen_random_uuid();
            ALTER TABLE inventory_stock ALTER COLUMN created_at SET DEFAULT NOW();
            ALTER TABLE inventory_stock ALTER COLUMN updated_at SET DEFAULT NOW();
            """,
            reverse_sql="""
            ALTER TABLE inventory_stock ALTER COLUMN id DROP DEFAULT;
            ALTER TABLE inventory_stock ALTER COLUMN created_at DROP DEFAULT;
            ALTER TABLE inventory_stock ALTER COLUMN updated_at DROP DEFAULT;
            """,
        ),
    ]
