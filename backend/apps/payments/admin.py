"""
Admin configuration for payments app
"""
from django.contrib import admin
from .models import Payment


@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = ['reference', 'order', 'amount', 'status', 'created_at']
    list_filter = ['status', 'created_at']
    search_fields = ['reference', 'order__id']
    readonly_fields = ['order', 'reference', 'amount', 'paystack_response', 'created_at']
    
    fieldsets = (
        ('Payment Information', {
            'fields': ('order', 'reference', 'amount', 'status')
        }),
        ('Paystack Response', {
            'fields': ('paystack_response',),
            'classes': ('collapse',)
        }),
        ('Timestamps', {
            'fields': ('created_at',),
            'classes': ('collapse',)
        }),
    )
