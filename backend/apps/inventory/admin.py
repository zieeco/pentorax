"""
Admin configuration for inventory app
"""
from django.contrib import admin
from .models import Stock


@admin.register(Stock)
class StockAdmin(admin.ModelAdmin):
    list_display = ['product', 'quantity', 'reserved', 'available_display', 'updated_at']
    list_filter = ['updated_at']
    search_fields = ['product__name']
    readonly_fields = ['available_display', 'created_at', 'updated_at']
    
    fieldsets = (
        ('Product', {
            'fields': ('product',)
        }),
        ('Stock Levels', {
            'fields': ('quantity', 'reserved', 'available_display')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    
    def available_display(self, obj):
        return obj.available
    available_display.short_description = 'Available'
