import uuid

from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True
    dependencies = []

    operations = [
        # UserProfile Model - FIXED with proper null/blank/defaults
        migrations.CreateModel(
            name="UserProfile",
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
                ("supabase_id", models.UUIDField(unique=True, db_index=True)),
                ("email", models.EmailField(max_length=255, unique=True)),
                ("name", models.CharField(max_length=255)),
                # FIXED: null=True added for optional fields
                (
                    "phone",
                    models.CharField(max_length=50, blank=True, null=True, default=""),
                ),
                (
                    "role",
                    models.CharField(
                        choices=[
                            ("customer", "Customer"),
                            ("staff", "Staff"),
                            ("admin", "Admin"),
                        ],
                        default="customer",
                        max_length=20,
                    ),
                ),
                (
                    "avatar_url",
                    models.URLField(
                        blank=True,
                        null=True,
                        default="",
                        help_text="Supabase Storage URL",
                    ),
                ),
                ("bio", models.TextField(blank=True, null=True, default="")),
                ("is_active", models.BooleanField(default=True)),
                ("email_verified", models.BooleanField(default=False)),
            ],
            options={
                "db_table": "core_userprofile",
                "ordering": ["-created_at"],
                "indexes": [
                    models.Index(
                        fields=["supabase_id"], name="idx_core_userprofile_supabase_id"
                    ),
                    models.Index(fields=["email"], name="idx_core_userprofile_email"),
                    models.Index(fields=["role"], name="idx_core_userprofile_role"),
                ],
            },
        ),
        # CaseStudy Model - FIXED
        migrations.CreateModel(
            name="CaseStudy",
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
                ("title", models.CharField(max_length=255)),
                ("description", models.TextField()),
                (
                    "image",
                    models.URLField(help_text="Supabase Storage URL", max_length=500),
                ),
                ("location", models.CharField(max_length=200)),
                ("capacity", models.CharField(help_text="e.g., 250kW", max_length=100)),
                (
                    "savings",
                    models.CharField(
                        help_text="e.g., 65% reduction in energy costs", max_length=200
                    ),
                ),
                ("project_date", models.DateField(null=True, blank=True)),
                ("is_featured", models.BooleanField(default=False)),
                ("is_active", models.BooleanField(default=True)),
            ],
            options={
                "db_table": "core_casestudy",
                "ordering": ["-project_date", "-is_featured"],
            },
        ),
        # FAQ Model
        migrations.CreateModel(
            name="FAQ",
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
                ("question", models.CharField(max_length=500)),
                ("answer", models.TextField()),
                ("category", models.CharField(max_length=100)),
                ("order", models.IntegerField(default=0)),
                ("is_active", models.BooleanField(default=True)),
            ],
            options={
                "db_table": "core_faq",
                "verbose_name": "FAQ",
                "verbose_name_plural": "FAQs",
                "ordering": ["order", "category", "question"],
            },
        ),
        # TeamMember Model - FIXED
        migrations.CreateModel(
            name="TeamMember",
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
                ("role", models.CharField(max_length=255)),
                (
                    "department",
                    models.CharField(
                        choices=[
                            ("leadership", "Leadership"),
                            ("engineering", "Engineering"),
                            ("operations", "Operations"),
                        ],
                        max_length=50,
                    ),
                ),
                ("bio", models.TextField(blank=True, null=True, default="")),
                (
                    "image",
                    models.URLField(help_text="Supabase Storage URL", max_length=500),
                ),
                (
                    "email",
                    models.EmailField(
                        max_length=255, blank=True, null=True, default=""
                    ),
                ),
                ("linkedin", models.URLField(blank=True, null=True, default="")),
                ("order", models.IntegerField(default=0)),
                ("is_active", models.BooleanField(default=True)),
            ],
            options={
                "db_table": "core_teammember",
                "ordering": ["order", "name", "role", "department"],
            },
        ),
        # CRITICAL FIX: Add DEFAULT values at database level
        # Django's default=uuid.uuid4 and auto_now_add=True don't create SQL DEFAULT
        # This causes NOT NULL constraint violations when triggers insert data
        migrations.RunSQL(
            sql="""
            -- Fix UserProfile table
            ALTER TABLE core_userprofile ALTER COLUMN id SET DEFAULT gen_random_uuid();
            ALTER TABLE core_userprofile ALTER COLUMN created_at SET DEFAULT NOW();
            ALTER TABLE core_userprofile ALTER COLUMN updated_at SET DEFAULT NOW();
            
            -- Fix CaseStudy table
            ALTER TABLE core_casestudy ALTER COLUMN id SET DEFAULT gen_random_uuid();
            ALTER TABLE core_casestudy ALTER COLUMN created_at SET DEFAULT NOW();
            ALTER TABLE core_casestudy ALTER COLUMN updated_at SET DEFAULT NOW();
            
            -- Fix FAQ table
            ALTER TABLE core_faq ALTER COLUMN id SET DEFAULT gen_random_uuid();
            ALTER TABLE core_faq ALTER COLUMN created_at SET DEFAULT NOW();
            ALTER TABLE core_faq ALTER COLUMN updated_at SET DEFAULT NOW();
            
            -- Fix TeamMember table
            ALTER TABLE core_teammember ALTER COLUMN id SET DEFAULT gen_random_uuid();
            ALTER TABLE core_teammember ALTER COLUMN created_at SET DEFAULT NOW();
            ALTER TABLE core_teammember ALTER COLUMN updated_at SET DEFAULT NOW();
            """,
            reverse_sql="""
            -- Reverse: Remove DEFAULT values
            ALTER TABLE core_userprofile ALTER COLUMN id DROP DEFAULT;
            ALTER TABLE core_userprofile ALTER COLUMN created_at DROP DEFAULT;
            ALTER TABLE core_userprofile ALTER COLUMN updated_at DROP DEFAULT;
            
            ALTER TABLE core_casestudy ALTER COLUMN id DROP DEFAULT;
            ALTER TABLE core_casestudy ALTER COLUMN created_at DROP DEFAULT;
            ALTER TABLE core_casestudy ALTER COLUMN updated_at DROP DEFAULT;
            
            ALTER TABLE core_faq ALTER COLUMN id DROP DEFAULT;
            ALTER TABLE core_faq ALTER COLUMN created_at DROP DEFAULT;
            ALTER TABLE core_faq ALTER COLUMN updated_at DROP DEFAULT;
            
            ALTER TABLE core_teammember ALTER COLUMN id DROP DEFAULT;
            ALTER TABLE core_teammember ALTER COLUMN created_at DROP DEFAULT;
            ALTER TABLE core_teammember ALTER COLUMN updated_at DROP DEFAULT;
            """,
        ),
    ]
