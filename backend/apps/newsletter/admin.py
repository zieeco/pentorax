"""
Newsletter admin configuration
"""
from django.contrib import admin
from .models import NewsletterSubscriber


@admin.register(NewsletterSubscriber)
class NewsletterSubscriberAdmin(admin.ModelAdmin):
    list_display = ['email', 'full_name', 'is_active', 'created_at']
    list_filter = ['is_active', 'created_at']
    search_fields = ['email', 'full_name']
    readonly_fields = ['id', 'created_at', 'updated_at', 'unsubscribe_token']
    ordering = ['-created_at']
    
    fieldsets = (
        ('Subscriber Information', {
            'fields': ('email', 'full_name')
        }),
        ('Status', {
            'fields': ('is_active',)
        }),
        ('System', {
            'fields': ('id', 'unsubscribe_token', 'created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    
    def has_add_permission(self, request):
        # Prevent manual addition through admin, use API only
        return False
