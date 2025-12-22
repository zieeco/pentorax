"""
Serializers for products app
"""
from rest_framework import serializers
from .models import Category, Product, ProductImage, ProductSpecification


class CategorySerializer(serializers.ModelSerializer):
    """Serializer for product categories"""
    children = serializers.SerializerMethodField()
    
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'description', 'image', 'parent', 'children', 'created_at']
        read_only_fields = ['id', 'created_at']
    
    def get_children(self, obj):
        if obj.children.exists():
            return CategorySerializer(obj.children.all(), many=True).data
        return []


class ProductImageSerializer(serializers.ModelSerializer):
    """Serializer for product images"""
    class Meta:
        model = ProductImage
        fields = ['id', 'image_url', 'alt_text', 'position']
        read_only_fields = ['id']


class ProductSpecificationSerializer(serializers.ModelSerializer):
    """Serializer for product specifications"""
    class Meta:
        model = ProductSpecification
        fields = ['id', 'key', 'value', 'position']
        read_only_fields = ['id']


class ProductListSerializer(serializers.ModelSerializer):
    """Lightweight serializer for product lists"""
    category_name = serializers.CharField(source='category.name', read_only=True)
    discount_percentage = serializers.IntegerField(read_only=True)
    
    class Meta:
        model = Product
        fields = [
            'id', 'name', 'slug', 'short_description', 'category_name',
            'price', 'compare_at_price', 'discount_percentage',
            'featured_image', 'is_featured', 'created_at'
        ]
        read_only_fields = ['id', 'created_at']


class ProductDetailSerializer(serializers.ModelSerializer):
    """Detailed serializer for single product view"""
    category = CategorySerializer(read_only=True)
    images = ProductImageSerializer(many=True, read_only=True)
    specifications = ProductSpecificationSerializer(many=True, read_only=True)
    discount_percentage = serializers.IntegerField(read_only=True)
    
    class Meta:
        model = Product
        fields = [
            'id', 'name', 'slug', 'description', 'short_description',
            'category', 'price', 'compare_at_price', 'discount_percentage',
            'is_active', 'is_featured', 'featured_image', 'images',
            'specifications', 'meta_title', 'meta_description',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']
