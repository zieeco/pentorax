import uuid

from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True
    dependencies = []

    operations = [
        migrations.CreateModel(
            name="QuoteRequest",
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
                ("email", models.EmailField(max_length=255)),
                ("phone", models.CharField(max_length=50)),
                ("message", models.TextField()),
                (
                    "status",
                    models.CharField(
                        max_length=50,
                        choices=[
                            ("new", "New"),
                            ("contacted", "Contacted"),
                            ("quoted", "Quoted"),
                            ("closed", "Closed"),
                        ],
                        default="new",
                    ),
                ),
            ],
            options={
                "db_table": "quotes_quoterequest",
                "ordering": ["-created_at"],
                "indexes": [
                    models.Index(fields=["status"], name="idx_quotes_request_status"),
                    models.Index(fields=["email"], name="idx_quotes_request_email"),
                ],
            },
        ),
        # CRITICAL FIX: Add DEFAULT values at database level
        # Django's default=uuid.uuid4 and auto_now_add=True don't create SQL DEFAULT
        # This causes NOT NULL constraint violations when triggers insert data
        migrations.RunSQL(
            sql="""
            -- Fix quotes_quoterequest table
            ALTER TABLE quotes_quoterequest ALTER COLUMN id SET DEFAULT gen_random_uuid();
            ALTER TABLE quotes_quoterequest ALTER COLUMN created_at SET DEFAULT NOW();
            ALTER TABLE quotes_quoterequest ALTER COLUMN updated_at SET DEFAULT NOW();
            """,
            reverse_sql="""
            ALTER TABLE quotes_quoterequest ALTER COLUMN id DROP DEFAULT;
            ALTER TABLE quotes_quoterequest ALTER COLUMN created_at DROP DEFAULT;
            ALTER TABLE quotes_quoterequest ALTER COLUMN updated_at DROP DEFAULT;
            """,
        ),
    ]

