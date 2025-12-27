import uuid

from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True
    dependencies = []

    operations = [
        migrations.CreateModel(
            name="BlogCategory",
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
                ("name", models.CharField(max_length=200)),
                ("slug", models.SlugField(unique=True, max_length=200)),
                ("description", models.TextField(blank=True, null=True, default="")),
            ],
            options={
                "db_table": "blog_blogcategory",
                "verbose_name": "Blog Category",
                "verbose_name_plural": "Blog Categories",
            },
        ),
        migrations.CreateModel(
            name="BlogPost",
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
                ("title", models.CharField(max_length=300)),
                ("slug", models.SlugField(unique=True, max_length=300)),
                ("content", models.TextField()),
                ("excerpt", models.TextField(blank=True, null=True, default="")),
                ("featured_image", models.URLField(blank=True, null=True, default="")),
                ("author_id", models.CharField(max_length=255)),
                (
                    "author_name",
                    models.CharField(max_length=255, blank=True, null=True, default=""),
                ),
                ("is_published", models.BooleanField(default=False)),
                ("is_featured", models.BooleanField(default=False)),
                ("published_at", models.DateTimeField(null=True, blank=True)),
                (
                    "meta_title",
                    models.CharField(max_length=300, blank=True, null=True, default=""),
                ),
                (
                    "meta_description",
                    models.CharField(max_length=500, blank=True, null=True, default=""),
                ),
                # FIXED: ForeignKey instead of UUID field
                (
                    "category",
                    models.ForeignKey(
                        null=True,
                        blank=True,
                        on_delete=models.SET_NULL,
                        to="blog.BlogCategory",
                        related_name="posts",
                        db_column="category_id",  # Keeps the column name as category_id
                    ),
                ),
            ],
            options={
                "db_table": "blog_blogpost",
                "verbose_name": "Blog Post",
                "verbose_name_plural": "Blog Posts",
                "ordering": ["-published_at", "-created_at"],
                "indexes": [
                    models.Index(
                        fields=["category"], name="idx_blog_blogpost_category_id"
                    ),
                    models.Index(
                        fields=["published_at"], name="idx_blog_blogpost_published_at"
                    ),
                    models.Index(
                        fields=["is_published"], name="idx_blog_blogpost_is_published"
                    ),
                    models.Index(fields=["slug"], name="idx_blog_blogpost_slug"),
                ],
            },
        ),
    ]
