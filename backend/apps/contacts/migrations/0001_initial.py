import uuid

from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True
    dependencies = []

    operations = [
        migrations.CreateModel(
            name="ContactSubmission",
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
                ("subject", models.CharField(max_length=255)),
                ("message", models.TextField()),
                ("is_read", models.BooleanField(default=False)),
            ],
            options={
                "db_table": "contacts_contactsubmission",
                "ordering": ["-created_at"],
                "indexes": [
                    models.Index(
                        fields=["is_read"], name="idx_contacts_submission_is_read"
                    ),
                    models.Index(
                        fields=["email"], name="idx_contacts_submission_email"
                    ),
                ],
            },
        ),
        # CRITICAL FIX: Add DEFAULT values at database level
        # Django's default=uuid.uuid4 and auto_now_add=True don't create SQL DEFAULT
        # This causes NOT NULL constraint violations when triggers insert data
        migrations.RunSQL(
            sql="""
            -- Fix contacts_contactsubmission table
            ALTER TABLE contacts_contactsubmission ALTER COLUMN id SET DEFAULT gen_random_uuid();
            ALTER TABLE contacts_contactsubmission ALTER COLUMN created_at SET DEFAULT NOW();
            ALTER TABLE contacts_contactsubmission ALTER COLUMN updated_at SET DEFAULT NOW();
            """,
            reverse_sql="""
            ALTER TABLE contacts_contactsubmission ALTER COLUMN id DROP DEFAULT;
            ALTER TABLE contacts_contactsubmission ALTER COLUMN created_at DROP DEFAULT;
            ALTER TABLE contacts_contactsubmission ALTER COLUMN updated_at DROP DEFAULT;
            """,
        ),
    ]
