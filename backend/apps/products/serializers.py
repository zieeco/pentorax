"""
Serializers for products app
"""

from rest_framework import serializers

from .models import Category, Product, ProductImage, ProductSpecification


class CategorySerializer(serializers.ModelSerializer):
    product_count = serializers.SerializerMethodField()
    parent_name = serializers.SerializerMethodField()

    class Meta:
        model = Category
        fields = [
            "id",
            "name",
            "slug",
            "description",
            "image",
            "parent_id",
            "parent_name",
            "product_count",
            "created_at",
        ]
        read_only_fields = ["id", "created_at"]

    def get_product_count(self, obj):
        return Product.objects.filter(category_id=obj.id, is_active=True).count()

    def get_parent_name(self, obj):
        if obj.parent_id:
            try:
                parent = Category.objects.get(id=obj.parent_id)
                return parent.name
            except Category.DoesNotExist:
                return None
        return None


class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ["id", "image_url", "alt_text", "position"]


class ProductSpecificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductSpecification
        fields = ["id", "key", "value", "position"]


class ProductListSerializer(serializers.ModelSerializer):
    category_name = serializers.SerializerMethodField()
    discount_percentage = serializers.ReadOnlyField()

    class Meta:
        model = Product
        fields = [
            "id",
            "name",
            "slug",
            "short_description",
            "price",
            "compare_at_price",
            "discount_percentage",
            "featured_image",
            "category_name",
            "is_featured",
            "created_at",
        ]

    def get_category_name(self, obj):
        try:
            category = Category.objects.get(id=obj.category_id)
            return category.name
        except Category.DoesNotExist:
            return None


class ProductDetailSerializer(serializers.ModelSerializer):
    category = serializers.SerializerMethodField()
    images = serializers.SerializerMethodField()
    specifications = serializers.SerializerMethodField()
    discount_percentage = serializers.ReadOnlyField()

    class Meta:
        model = Product
        fields = [
            "id",
            "name",
            "slug",
            "description",
            "short_description",
            "price",
            "compare_at_price",
            "discount_percentage",
            "is_active",
            "is_featured",
            "featured_image",
            "category",
            "images",
            "specifications",
            "meta_title",
            "meta_description",
            "created_at",
            "updated_at",
        ]

    def get_category(self, obj):
        try:
            category = Category.objects.get(id=obj.category_id)
            return CategorySerializer(category).data
        except Category.DoesNotExist:
            return None

    def get_images(self, obj):
        images = ProductImage.objects.filter(product_id=obj.id)
        return ProductImageSerializer(images, many=True).data

    def get_specifications(self, obj):
        specs = ProductSpecification.objects.filter(product_id=obj.id)
        return ProductSpecificationSerializer(specs, many=True).data
