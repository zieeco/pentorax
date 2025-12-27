import uuid

from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True
    dependencies = [
        ("products", "0001_initial"),  # FIXED: Added dependency
    ]

    operations = [
        # Order Model
        migrations.CreateModel(
            name="Order",
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
                # Keep as CharField for Supabase auth.users reference
                ("user_id", models.CharField(max_length=255, db_index=True)),
                ("email", models.EmailField(max_length=255)),
                (
                    "status",
                    models.CharField(
                        max_length=50,
                        choices=[
                            ("pending", "Pending"),
                            ("processing", "Processing"),
                            ("shipped", "Shipped"),
                            ("delivered", "Delivered"),
                            ("cancelled", "Cancelled"),
                        ],
                        default="pending",
                    ),
                ),
                ("total", models.DecimalField(max_digits=10, decimal_places=2)),
                ("shipping_name", models.CharField(max_length=255)),
                ("shipping_address", models.TextField()),
                ("shipping_city", models.CharField(max_length=255)),
                ("shipping_state", models.CharField(max_length=255)),
                ("shipping_phone", models.CharField(max_length=50)),
            ],
            options={
                "db_table": "orders_order",
                "verbose_name": "Order",
                "verbose_name_plural": "Orders",
                "ordering": ["-created_at"],
                "indexes": [
                    models.Index(fields=["user_id"], name="idx_orders_order_user_id"),
                    models.Index(fields=["status"], name="idx_orders_order_status"),
                    models.Index(
                        fields=["created_at"], name="idx_orders_order_created_at"
                    ),
                ],
            },
        ),
        # OrderItem Model
        migrations.CreateModel(
            name="OrderItem",
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
                ("quantity", models.PositiveIntegerField()),
                ("price", models.DecimalField(max_digits=10, decimal_places=2)),
                # FIXED: ForeignKey to Order
                (
                    "order",
                    models.ForeignKey(
                        on_delete=models.CASCADE,
                        to="orders.Order",
                        related_name="items",
                        db_column="order_id",
                    ),
                ),
                # FIXED: ForeignKey to Product
                (
                    "product",
                    models.ForeignKey(
                        on_delete=models.RESTRICT,
                        to="products.Product",
                        related_name="order_items",
                        db_column="product_id",
                    ),
                ),
            ],
            options={
                "db_table": "orders_orderitem",
                "verbose_name": "Order Item",
                "verbose_name_plural": "Order Items",
                "indexes": [
                    models.Index(
                        fields=["order"], name="idx_orders_orderitem_order_id"
                    ),
                    models.Index(
                        fields=["product"], name="idx_orders_orderitem_product_id"
                    ),
                ],
            },
        ),
        # CRITICAL FIX: Add DEFAULT values at database level
        # Django's default=uuid.uuid4 and auto_now_add=True don't create SQL DEFAULT
        # This causes NOT NULL constraint violations when triggers insert data
        migrations.RunSQL(
            sql="""
            -- Fix orders_order table
            ALTER TABLE orders_order ALTER COLUMN id SET DEFAULT gen_random_uuid();
            ALTER TABLE orders_order ALTER COLUMN created_at SET DEFAULT NOW();
            ALTER TABLE orders_order ALTER COLUMN updated_at SET DEFAULT NOW();

            -- Fix orders_orderitem table
            ALTER TABLE orders_orderitem ALTER COLUMN id SET DEFAULT gen_random_uuid();
            ALTER TABLE orders_orderitem ALTER COLUMN created_at SET DEFAULT NOW();
            ALTER TABLE orders_orderitem ALTER COLUMN updated_at SET DEFAULT NOW();
            """,
            reverse_sql="""
            ALTER TABLE orders_order ALTER COLUMN id DROP DEFAULT;
            ALTER TABLE orders_order ALTER COLUMN created_at DROP DEFAULT;
            ALTER TABLE orders_order ALTER COLUMN updated_at DROP DEFAULT;

            ALTER TABLE orders_orderitem ALTER COLUMN id DROP DEFAULT;
            ALTER TABLE orders_orderitem ALTER COLUMN created_at DROP DEFAULT;
            ALTER TABLE orders_orderitem ALTER COLUMN updated_at DROP DEFAULT;
            """,
        ),
    ]
