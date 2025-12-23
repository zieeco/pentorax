"""
Admin configuration for cart app
"""
from django.contrib import admin
from .models import Cart, CartItem


class CartItemInline(admin.TabularInline):
    model = CartItem
    extra = 0
    readonly_fields = ['subtotal']


@admin.register(Cart)
class CartAdmin(admin.ModelAdmin):
    list_display = ['id', 'user_id', 'item_count', 'total', 'updated_at']
    search_fields = ['user_id']
    readonly_fields = ['total', 'item_count']
    inlines = [CartItemInline]
    
    def item_count(self, obj):
        return obj.item_count
    item_count.short_description = 'Items'
    
    def total(self, obj):
        return f"₦{obj.total:,.2f}"
    total.short_description = 'Total'


@admin.register(CartItem)
class CartItemAdmin(admin.ModelAdmin):
    list_display = ['id', 'cart', 'product', 'quantity', 'subtotal', 'created_at']
    list_filter = ['created_at']
    search_fields = ['product__name']
    readonly_fields = ['subtotal']
