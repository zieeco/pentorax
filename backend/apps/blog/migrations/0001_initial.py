import uuid
from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True
    dependencies = []

    operations = [
        migrations.CreateModel(
            name="BlogCategory",
            fields=[
                ("id", models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                ("name", models.CharField(max_length=200)),
                ("slug", models.SlugField(unique=True, max_length=200)),
                ("description", models.TextField(blank=True)),
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
                ("id", models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                ("title", models.CharField(max_length=300)),
                ("slug", models.SlugField(unique=True, max_length=300)),
                ("content", models.TextField()),
                ("excerpt", models.TextField(blank=True)),
                ("featured_image", models.URLField(blank=True)),
                ("author_id", models.CharField(max_length=255)),
                ("author_name", models.CharField(max_length=255, blank=True)),
                ("is_published", models.BooleanField(default=False)),
                ("is_featured", models.BooleanField(default=False)),
                ("published_at", models.DateTimeField(null=True, blank=True)),
                ("meta_title", models.CharField(max_length=300, blank=True)),
                ("meta_description", models.CharField(max_length=500, blank=True)),
                ("category_id", models.UUIDField(null=True, blank=True, db_index=True)),
            ],
            options={
                "db_table": "blog_blogpost",
                "verbose_name": "Blog Post",
                "verbose_name_plural": "Blog Posts",
                "ordering": ["-published_at", "-created_at"],
            },
        ),
    ]


