import uuid

from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True
    dependencies = []

    operations = [
        # Category Model
        migrations.CreateModel(
            name="Category",
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
                ("name", models.CharField(max_length=255)),
                ("slug", models.SlugField(unique=True, max_length=255)),
                ("description", models.TextField(blank=True, null=True, default="")),
                (
                    "image",
                    models.URLField(
                        blank=True,
                        null=True,
                        default="",
                        help_text="Supabase Storage URL",
                    ),
                ),
                # FIXED: Self-referencing ForeignKey
                (
                    "parent",
                    models.ForeignKey(
                        null=True,
                        blank=True,
                        on_delete=models.SET_NULL,
                        to="products.Category",
                        related_name="subcategories",
                        db_column="parent_id",
                    ),
                ),
            ],
            options={
                "db_table": "products_category",
                "verbose_name": "Category",
                "verbose_name_plural": "Categories",
                "indexes": [
                    models.Index(fields=["slug"], name="idx_products_category_slug"),
                ],
            },
        ),
        # Product Model
        migrations.CreateModel(
            name="Product",
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
                ("name", models.CharField(max_length=255)),
                ("slug", models.SlugField(unique=True, max_length=255)),
                ("description", models.TextField()),
                (
                    "short_description",
                    models.CharField(max_length=500, blank=True, null=True, default=""),
                ),
                ("price", models.DecimalField(max_digits=10, decimal_places=2)),
                (
                    "compare_at_price",
                    models.DecimalField(
                        blank=True,
                        null=True,
                        decimal_places=2,
                        help_text="Original price for showing discounts",
                        max_digits=10,
                    ),
                ),
                ("is_active", models.BooleanField(default=True)),
                ("is_featured", models.BooleanField(default=False)),
                (
                    "featured_image",
                    models.URLField(
                        blank=True,
                        null=True,
                        default="",
                        help_text="Supabase Storage URL",
                    ),
                ),
                (
                    "meta_title",
                    models.CharField(max_length=255, blank=True, null=True, default=""),
                ),
                (
                    "meta_description",
                    models.CharField(max_length=500, blank=True, null=True, default=""),
                ),
                # FIXED: ForeignKey to Category
                (
                    "category",
                    models.ForeignKey(
                        on_delete=models.RESTRICT,
                        to="products.Category",
                        related_name="products",
                        db_column="category_id",
                    ),
                ),
            ],
            options={
                "db_table": "products_product",
                "verbose_name": "Product",
                "verbose_name_plural": "Products",
                "ordering": ["-created_at"],
                "indexes": [
                    models.Index(fields=["slug"], name="idx_products_product_slug"),
                    models.Index(
                        fields=["is_active"], name="idx_products_product_is_active"
                    ),
                    models.Index(
                        fields=["is_featured"], name="idx_products_product_is_featured"
                    ),
                    models.Index(
                        fields=["category"], name="idx_products_product_category_id"
                    ),
                ],
            },
        ),
        # Product Image Model
        migrations.CreateModel(
            name="ProductImage",
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
                ("image_url", models.URLField(help_text="Supabase Storage URL")),
                (
                    "alt_text",
                    models.CharField(max_length=255, blank=True, null=True, default=""),
                ),
                ("position", models.PositiveIntegerField(default=0)),
                # FIXED: ForeignKey to Product
                (
                    "product",
                    models.ForeignKey(
                        on_delete=models.CASCADE,
                        to="products.Product",
                        related_name="images",
                        db_column="product_id",
                    ),
                ),
            ],
            options={
                "db_table": "products_productimage",
                "verbose_name": "Product Image",
                "verbose_name_plural": "Product Images",
                "ordering": ["position", "created_at"],
            },
        ),
        # Product Specification Model
        migrations.CreateModel(
            name="ProductSpecification",
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
                (
                    "key",
                    models.CharField(
                        help_text="e.g., 'Wattage', 'Voltage'", max_length=100
                    ),
                ),
                (
                    "value",
                    models.CharField(help_text="e.g., '500W', '48V'", max_length=200),
                ),
                ("position", models.PositiveIntegerField(default=0)),
                # FIXED: ForeignKey to Product
                (
                    "product",
                    models.ForeignKey(
                        on_delete=models.CASCADE,
                        to="products.Product",
                        related_name="specifications",
                        db_column="product_id",
                    ),
                ),
            ],
            options={
                "db_table": "products_productspecification",
                "verbose_name": "Product Specification",
                "verbose_name_plural": "Product Specifications",
                "ordering": ["position"],
            },
        ),
        # CRITICAL FIX: Add DEFAULT values at database level
        # Django's default=uuid.uuid4 and auto_now_add=True don't create SQL DEFAULT
        # This causes NOT NULL constraint violations when triggers insert data
        migrations.RunSQL(
            sql="""
            -- Fix products_category table
            ALTER TABLE products_category ALTER COLUMN id SET DEFAULT gen_random_uuid();
            ALTER TABLE products_category ALTER COLUMN created_at SET DEFAULT NOW();
            ALTER TABLE products_category ALTER COLUMN updated_at SET DEFAULT NOW();

            -- Fix products_product table
            ALTER TABLE products_product ALTER COLUMN id SET DEFAULT gen_random_uuid();
            ALTER TABLE products_product ALTER COLUMN created_at SET DEFAULT NOW();
            ALTER TABLE products_product ALTER COLUMN updated_at SET DEFAULT NOW();

            -- Fix products_productimage table
            ALTER TABLE products_productimage ALTER COLUMN id SET DEFAULT gen_random_uuid();
            ALTER TABLE products_productimage ALTER COLUMN created_at SET DEFAULT NOW();
            ALTER TABLE products_productimage ALTER COLUMN updated_at SET DEFAULT NOW();

            -- Fix products_productspecification table
            ALTER TABLE products_productspecification ALTER COLUMN id SET DEFAULT gen_random_uuid();
            ALTER TABLE products_productspecification ALTER COLUMN created_at SET DEFAULT NOW();
            ALTER TABLE products_productspecification ALTER COLUMN updated_at SET DEFAULT NOW();
            """,
            reverse_sql="""
            ALTER TABLE products_category ALTER COLUMN id DROP DEFAULT;
            ALTER TABLE products_category ALTER COLUMN created_at DROP DEFAULT;
            ALTER TABLE products_category ALTER COLUMN updated_at DROP DEFAULT;

            ALTER TABLE products_product ALTER COLUMN id DROP DEFAULT;
            ALTER TABLE products_product ALTER COLUMN created_at DROP DEFAULT;
            ALTER TABLE products_product ALTER COLUMN updated_at DROP DEFAULT;

            ALTER TABLE products_productimage ALTER COLUMN id DROP DEFAULT;
            ALTER TABLE products_productimage ALTER COLUMN created_at DROP DEFAULT;
            ALTER TABLE products_productimage ALTER COLUMN updated_at DROP DEFAULT;

            ALTER TABLE products_productspecification ALTER COLUMN id DROP DEFAULT;
            ALTER TABLE products_productspecification ALTER COLUMN created_at DROP DEFAULT;
            ALTER TABLE products_productspecification ALTER COLUMN updated_at DROP DEFAULT;
            """,
        ),
    ]
