"""
Admin configuration for products app
"""
from django.contrib import admin
from .models import Category, Product, ProductImage, ProductSpecification


class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 1


class ProductSpecificationInline(admin.TabularInline):
    model = ProductSpecification
    extra = 1


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug', 'parent', 'created_at']
    prepopulated_fields = {'slug': ('name',)}
    search_fields = ['name']
    list_filter = ['parent']


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ['name', 'category', 'price', 'is_active', 'is_featured', 'created_at']
    list_filter = ['category', 'is_active', 'is_featured', 'created_at']
    search_fields = ['name', 'description']
    prepopulated_fields = {'slug': ('name',)}
    inlines = [ProductImageInline, ProductSpecificationInline]
    fieldsets = (
        ('Basic Information', {
            'fields': ('name', 'slug', 'category', 'short_description', 'description')
        }),
        ('Pricing', {
            'fields': ('price', 'compare_at_price')
        }),
        ('Media', {
            'fields': ('featured_image',)
        }),
        ('Status', {
            'fields': ('is_active', 'is_featured')
        }),
        ('SEO', {
            'fields': ('meta_title', 'meta_description'),
            'classes': ('collapse',)
        }),
    )
