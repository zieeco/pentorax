"""
Admin configuration for products app
"""


from django.contrib import admin
from django.utils.html import format_html
from .models import Category, Product, ProductImage, ProductSpecification


class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 1
    fields = ["image_url", "alt_text", "position"]


class ProductSpecificationInline(admin.TabularInline):
    model = ProductSpecification
    extra = 1
    fields = ["key", "value", "position"]


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ["name", "slug", "parent", "product_count", "created_at"]

    prepopulated_fields = {"slug": ("name",)}
    search_fields = ["name"]
    list_filter = ["created_at"]
    readonly_fields = ["id", "created_at", "updated_at"]

    def product_count(self, obj):
        return Product.objects.filter(category=obj).count()


    product_count.short_description = "Products"


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = [
        "name",
        "category_name",
        "price_display",
        "status_badge",
        "is_featured",
        "created_at",
    ]
    list_filter = ["is_active", "is_featured", "created_at"]
    search_fields = ["name", "description"]
    prepopulated_fields = {"slug": ("name",)}
    inlines = [ProductImageInline, ProductSpecificationInline]
    readonly_fields = ["id", "created_at", "updated_at"]

    fieldsets = (
        (
            "Basic Information",
            {
                "fields": (
                    "id",
                    "name",
                    "slug",
                    "category",
                    "short_description",
                    "description",

                )
            },
        ),
        ("Pricing", {"fields": ("price", "compare_at_price")}),
        ("Media", {"fields": ("featured_image",)}),
        ("Status", {"fields": ("is_active", "is_featured")}),
        (
            "SEO",
            {"fields": ("meta_title", "meta_description"), "classes": ("collapse",)},
        ),
        (
            "Timestamps",
            {"fields": ("created_at", "updated_at"), "classes": ("collapse",)},
        ),
    )

    def category_name(self, obj):
        return obj.category.name if obj.category else "N/A"


    category_name.short_description = "Category"

    def price_display(self, obj):
        if obj.compare_at_price:
            return format_html(
                '<span style="text-decoration: line-through; color: #999;">${}</span> '
                '<strong style="color: #4CAF50;">${}</strong>',
                obj.compare_at_price,
                obj.price,
            )
        return f"${obj.price}"

    price_display.short_description = "Price"

    def status_badge(self, obj):
        if obj.is_active:
            return format_html(
                '<span style="background-color: #4CAF50; color: white; padding: 5px 10px; '
                'border-radius: 3px;">Active</span>'
            )
        return format_html(
            '<span style="background-color: #f44336; color: white; padding: 5px 10px; '
            'border-radius: 3px;">Inactive</span>'
        )

    status_badge.short_description = "Status"


@admin.register(ProductImage)
class ProductImageAdmin(admin.ModelAdmin):
    list_display = ["product", "image_url", "position", "created_at"]

    list_filter = ["created_at"]
    readonly_fields = ["id", "created_at", "updated_at"]


@admin.register(ProductSpecification)
class ProductSpecificationAdmin(admin.ModelAdmin):
    list_display = ["product", "key", "value", "position", "created_at"]

    list_filter = ["created_at"]
    readonly_fields = ["id", "created_at", "updated_at"]
