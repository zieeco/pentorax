"""
Serializers for products app
"""

from rest_framework import serializers

from .models import Category, Product, ProductImage, ProductSpecification, Wishlist, WishlistItem, StockNotification
from .models_qa import ProductQuestion, ProductAnswer, AnswerVote


class CategoryListSerializer(serializers.ModelSerializer):
    """Lightweight serializer for category lists and dropdowns"""
    product_count = serializers.SerializerMethodField()

    class Meta:
        model = Category
        fields = [
            "id",
            "name",
            "slug",
            "image",
            "product_count",
        ]
        read_only_fields = ["id"]

    def get_product_count(self, obj):
        return Product.objects.filter(category_id=obj.id, is_active=True).count()


class CategorySerializer(serializers.ModelSerializer):
    """Full category serializer with parent info"""
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
            "updated_at",
        ]
        read_only_fields = ["id", "created_at", "updated_at"]

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
        fields = ["id", "image_url", "alt_text", "position", "created_at"]
        read_only_fields = ["id", "created_at"]


class ProductSpecificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductSpecification
        fields = ["id", "key", "value", "position", "created_at"]
        read_only_fields = ["id", "created_at"]


class ProductListSerializer(serializers.ModelSerializer):
    """Optimized serializer for product lists"""
    category_name = serializers.SerializerMethodField()
    discount_percentage = serializers.ReadOnlyField()
    in_stock = serializers.ReadOnlyField()
    is_low_stock = serializers.ReadOnlyField()

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
            "is_active",
            "in_stock",
            "is_low_stock",
            "stock_quantity",
            "sku",
            "created_at",
        ]

    def get_category_name(self, obj):
        try:
            category = Category.objects.get(id=obj.category_id)
            return category.name
        except Category.DoesNotExist:
            return None


class ProductDetailSerializer(serializers.ModelSerializer):
    """Full product details with nested images and specifications"""
    category = serializers.SerializerMethodField()
    images = serializers.SerializerMethodField()
    specifications = serializers.SerializerMethodField()
    discount_percentage = serializers.ReadOnlyField()
    in_stock = serializers.ReadOnlyField()
    is_low_stock = serializers.ReadOnlyField()

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
            "category_id",
            "images",
            "specifications",
            "in_stock",
            "is_low_stock",
            "stock_quantity",
            "low_stock_threshold",
            "sku",
            "meta_title",
            "meta_description",
            "created_at",
            "updated_at",
        ]

    def get_category(self, obj):
        """Get category object for nested serializer"""
        try:
            category = Category.objects.get(id=obj.category_id)
            return CategorySerializer(category).data
        except Category.DoesNotExist:
            return None

    def get_images(self, obj):
        images = ProductImage.objects.filter(product_id=obj.id).order_by('position')
        return ProductImageSerializer(images, many=True).data

    def get_specifications(self, obj):
        specs = ProductSpecification.objects.filter(product_id=obj.id).order_by('position')
        return ProductSpecificationSerializer(specs, many=True).data


class ProductCreateUpdateSerializer(serializers.ModelSerializer):
    """Serializer for creating and updating products (Admin/Staff only)"""
    images = ProductImageSerializer(many=True, required=False)
    specifications = ProductSpecificationSerializer(many=True, required=False)
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(),
        source='category',
        required=False,
        allow_null=True
    )

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
            "is_active",
            "is_featured",
            "featured_image",
            "category_id",
            "images",
            "specifications",
            "meta_title",
            "meta_description",
            "stock_quantity",
            "low_stock_threshold",
            "sku",
        ]
        read_only_fields = ["id"]

    def create(self, validated_data):
        images_data = validated_data.pop('images', [])
        specifications_data = validated_data.pop('specifications', [])

        product = Product.objects.create(**validated_data)

        # Create images
        for image_data in images_data:
            ProductImage.objects.create(product_id=product.id, **image_data)

        # Create specifications
        for spec_data in specifications_data:
            ProductSpecification.objects.create(product_id=product.id, **spec_data)

        return product

    def update(self, instance, validated_data):
        images_data = validated_data.pop('images', None)
        specifications_data = validated_data.pop('specifications', None)

        # Update product fields
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        # Update images if provided
        if images_data is not None:
            # Delete existing images
            ProductImage.objects.filter(product_id=instance.id).delete()
            # Create new images
            for image_data in images_data:
                ProductImage.objects.create(product_id=instance.id, **image_data)

        # Update specifications if provided
        if specifications_data is not None:
            # Delete existing specifications
            ProductSpecification.objects.filter(product_id=instance.id).delete()
            # Create new specifications
            for spec_data in specifications_data:
                ProductSpecification.objects.create(product_id=instance.id, **spec_data)

        return instance

    def validate_slug(self, value):
        """Ensure slug is unique"""
        instance = self.instance
        if instance and instance.slug == value:
            return value
        
        if Product.objects.filter(slug=value).exists():
            raise serializers.ValidationError("A product with this slug already exists.")
        return value

    def validate_price(self, value):
        """Ensure price is positive"""
        if value <= 0:
            raise serializers.ValidationError("Price must be greater than zero.")
        return value

    def validate(self, data):
        """Cross-field validation"""
        if 'compare_at_price' in data and data.get('compare_at_price'):
            if data['compare_at_price'] <= data.get('price', 0):
                raise serializers.ValidationError({
                    "compare_at_price": "Compare at price must be greater than the regular price."
                })
        return data


class WishlistItemSerializer(serializers.ModelSerializer):
    """Serializer for wishlist items with product details"""
    
    product = ProductListSerializer(read_only=True)
    product_id = serializers.UUIDField(write_only=True)
    
    class Meta:
        model = WishlistItem
        fields = ['id', 'product', 'product_id', 'notes', 'created_at']
        read_only_fields = ['id', 'created_at']
        
    def validate_product_id(self, value):
        """Ensure product exists"""
        if not Product.objects.filter(pk=value).exists():
            raise serializers.ValidationError("Product does not exist")
        return value


class WishlistSerializer(serializers.ModelSerializer):
    """Serializer for user wishlist"""
    
    items = WishlistItemSerializer(many=True, read_only=True)
    items_count = serializers.IntegerField(read_only=True)
    
    class Meta:
        model = Wishlist
        fields = ['id', 'items', 'items_count', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']


class StockNotificationSerializer(serializers.ModelSerializer):
    """Serializer for stock notification requests"""
    
    product_id = serializers.UUIDField(write_only=True)
    product_name = serializers.CharField(source='product.name', read_only=True)
    product_slug = serializers.CharField(source='product.slug', read_only=True)
    product_image = serializers.URLField(source='product.featured_image', read_only=True)
    product_in_stock = serializers.BooleanField(source='product.in_stock', read_only=True)
    
    class Meta:
        model = StockNotification
        fields = [
            'id', 'product_id', 'product_name', 'product_slug', 'product_image', 'product_in_stock',
            'email', 'user_id', 'is_notified', 'notified_at',
            'is_read', 'is_archived', 'admin_notes',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'user_id', 'is_notified', 'notified_at', 'created_at', 'updated_at']
        
    def validate_product_id(self, value):
        """Ensure product exists"""
        if not Product.objects.filter(pk=value).exists():
            raise serializers.ValidationError("Product does not exist")
        return value
    
    def validate_email(self, value):
        """Validate email format"""
        if not value or '@' not in value:
            raise serializers.ValidationError("Valid email is required")
        return value.lower()


class CustomEmailSerializer(serializers.Serializer):
    """Serializer for sending custom emails to subscribers"""
    subject = serializers.CharField(max_length=255)
    message = serializers.CharField()
    
    def validate_subject(self, value):
        if not value.strip():
            raise serializers.ValidationError("Subject is required")
        return value
    
    def validate_message(self, value):
        if not value.strip():
            raise serializers.ValidationError("Message is required")
        return value


class ProductAnswerSerializer(serializers.ModelSerializer):
    """Serializer for product answers"""
    
    question_id = serializers.UUIDField(write_only=True)
    has_voted = serializers.SerializerMethodField()
    
    class Meta:
        model = ProductAnswer
        fields = [
            'id', 'question_id', 'user_name', 'answer', 'is_official',
            'is_best_answer', 'helpful_count', 'has_voted', 'created_at'
        ]
        read_only_fields = ['id', 'is_official', 'helpful_count', 'created_at']
        
    def get_has_voted(self, obj):
        """Check if current user has voted on this answer"""
        request = self.context.get('request')
        if not request or not hasattr(request, 'user'):
            return False
        
        if isinstance(request.user, dict):
            user_email = request.user.get('email', '')
        else:
            return False
            
        return AnswerVote.objects.filter(answer=obj, user_email=user_email).exists()


class ProductQuestionSerializer(serializers.ModelSerializer):
    """Serializer for product questions with nested answers"""
    
    product_id = serializers.UUIDField(write_only=True)
    answers = ProductAnswerSerializer(many=True, read_only=True)
    answers_count = serializers.ReadOnlyField()
    
    class Meta:
        model = ProductQuestion
        fields = [
            'id', 'product_id', 'user_name', 'question',
            'answers', 'answers_count', 'created_at'
        ]
        read_only_fields = ['id', 'created_at']
