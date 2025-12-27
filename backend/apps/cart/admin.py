"""
Admin configuration for cart app
"""

from django.contrib import admin

from .models import Cart, CartItem


@admin.register(Cart)
class CartAdmin(admin.ModelAdmin):
    list_display = ["id", "user_id", "item_count", "created_at", "updated_at"]
    search_fields = ["user_id"]
    readonly_fields = ["id", "created_at", "updated_at"]

    def item_count(self, obj):
        return CartItem.objects.filter(cart_id=obj.id).count()

    item_count.short_description = "Items"


@admin.register(CartItem)
class CartItemAdmin(admin.ModelAdmin):
    list_display = ["id", "cart_id", "product_id", "quantity", "created_at"]
    list_filter = ["created_at"]
    search_fields = ["cart_id", "product_id"]
    readonly_fields = ["id", "created_at", "updated_at"]
