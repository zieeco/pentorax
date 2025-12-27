import uuid

from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True
    dependencies = []

    operations = [
        migrations.CreateModel(
            name="WarrantyCheck",
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
                ("serial_number", models.CharField(max_length=100, unique=True)),
                ("product_name", models.CharField(max_length=255)),
                ("product_category", models.CharField(max_length=100)),
                ("purchase_date", models.DateField()),
                ("warranty_duration_months", models.IntegerField(default=12)),
                ("expiry_date", models.DateField()),
                ("is_valid", models.BooleanField(default=True)),
                (
                    "support_level",
                    models.CharField(
                        max_length=50,
                        choices=[
                            ("basic", "Basic"),
                            ("standard", "Standard"),
                            ("premium", "Premium"),
                        ],
                        default="standard",
                    ),
                ),
                (
                    "customer_name",
                    models.CharField(max_length=255, blank=True, null=True, default=""),
                ),
                (
                    "customer_email",
                    models.EmailField(
                        max_length=255, blank=True, null=True, default=""
                    ),
                ),
                ("notes", models.TextField(blank=True, null=True, default="")),
            ],
            options={
                "db_table": "warranty_warrantycheck",
                "ordering": ["-created_at"],
                "indexes": [
                    models.Index(fields=["serial_number"], name="idx_warranty_serial"),
                    models.Index(fields=["expiry_date"], name="idx_warranty_expiry"),
                    models.Index(fields=["customer_email"], name="idx_warranty_email"),
                ],
            },
        ),
        # CRITICAL FIX: Add DEFAULT values at database level
        # Django's default=uuid.uuid4 and auto_now_add=True don't create SQL DEFAULT
        # This causes NOT NULL constraint violations when triggers insert data
        migrations.RunSQL(
            sql="""
            -- Fix warranty_warrantycheck table
            ALTER TABLE warranty_warrantycheck ALTER COLUMN id SET DEFAULT gen_random_uuid();
            ALTER TABLE warranty_warrantycheck ALTER COLUMN created_at SET DEFAULT NOW();
            ALTER TABLE warranty_warrantycheck ALTER COLUMN updated_at SET DEFAULT NOW();
            """,
            reverse_sql="""
            ALTER TABLE warranty_warrantycheck ALTER COLUMN id DROP DEFAULT;
            ALTER TABLE warranty_warrantycheck ALTER COLUMN created_at DROP DEFAULT;
            ALTER TABLE warranty_warrantycheck ALTER COLUMN updated_at DROP DEFAULT;
            """,
        ),
    ]
