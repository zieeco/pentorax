"""
Admin configuration for reviews app
"""
from django.contrib import admin
from .models import Review


@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ['product', 'user_email', 'rating', 'is_verified_purchase', 'created_at']
    list_filter = ['rating', 'is_verified_purchase', 'created_at']
    search_fields = ['product__name', 'user_email', 'comment']
    readonly_fields = ['user_id', 'user_email', 'created_at']
    
    fieldsets = (
        ('Review Information', {
            'fields': ('product', 'user_id', 'user_email', 'rating', 'comment')
        }),
        ('Verification', {
            'fields': ('is_verified_purchase',)
        }),
        ('Timestamps', {
            'fields': ('created_at',),
            'classes': ('collapse',)
        }),
    )
