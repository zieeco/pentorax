import uuid

from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True
    dependencies = [
        ("products", "0001_initial"),  # FIXED: Added dependency
    ]

    operations = [
        # Cart Model
        migrations.CreateModel(
            name="Cart",
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
                # FIXED: Should reference auth.users, but we'll keep as UUID for Supabase
                # Add constraint in separate SQL migration
                ("user_id", models.UUIDField(unique=True, db_index=True)),
            ],
            options={
                "db_table": "cart_cart",
                "verbose_name": "Cart",
                "verbose_name_plural": "Carts",
                "indexes": [
                    models.Index(fields=["user_id"], name="idx_cart_cart_user_id"),
                ],
            },
        ),
        # CartItem Model
        migrations.CreateModel(
            name="CartItem",
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
                ("quantity", models.PositiveIntegerField(default=1)),
                # FIXED: ForeignKey to Cart
                (
                    "cart",
                    models.ForeignKey(
                        on_delete=models.CASCADE,
                        to="cart.Cart",
                        related_name="items",
                        db_column="cart_id",
                    ),
                ),
                # FIXED: ForeignKey to Product
                (
                    "product",
                    models.ForeignKey(
                        on_delete=models.CASCADE,
                        to="products.Product",
                        related_name="cart_items",
                        db_column="product_id",
                    ),
                ),
            ],
            options={
                "db_table": "cart_cartitem",
                "verbose_name": "Cart Item",
                "verbose_name_plural": "Cart Items",
                "ordering": ["-created_at"],
                "indexes": [
                    models.Index(fields=["cart"], name="idx_cart_cartitem_cart_id"),
                    models.Index(
                        fields=["product"], name="idx_cart_cartitem_product_id"
                    ),
                ],
            },
        ),
        # Unique constraint for cart_id + product_id
        migrations.AddConstraint(
            model_name="cartitem",
            constraint=models.UniqueConstraint(
                fields=["cart", "product"], name="unique_cart_product"
            ),
        ),
        # CRITICAL FIX: Add DEFAULT values at database level
        # Django's default=uuid.uuid4 and auto_now_add=True don't create SQL DEFAULT
        # This causes NOT NULL constraint violations when triggers insert data
        migrations.RunSQL(
            sql="""
            -- Fix cart_cart table
            ALTER TABLE cart_cart ALTER COLUMN id SET DEFAULT gen_random_uuid();
            ALTER TABLE cart_cart ALTER COLUMN created_at SET DEFAULT NOW();
            ALTER TABLE cart_cart ALTER COLUMN updated_at SET DEFAULT NOW();

            -- Fix cart_cartitem table
            ALTER TABLE cart_cartitem ALTER COLUMN id SET DEFAULT gen_random_uuid();
            ALTER TABLE cart_cartitem ALTER COLUMN created_at SET DEFAULT NOW();
            ALTER TABLE cart_cartitem ALTER COLUMN updated_at SET DEFAULT NOW();
            """,
            reverse_sql="""
            ALTER TABLE cart_cart ALTER COLUMN id DROP DEFAULT;
            ALTER TABLE cart_cart ALTER COLUMN created_at DROP DEFAULT;
            ALTER TABLE cart_cart ALTER COLUMN updated_at DROP DEFAULT;

            ALTER TABLE cart_cartitem ALTER COLUMN id DROP DEFAULT;
            ALTER TABLE cart_cartitem ALTER COLUMN created_at DROP DEFAULT;
            ALTER TABLE cart_cartitem ALTER COLUMN updated_at DROP DEFAULT;
            """,
        ),
    ]
