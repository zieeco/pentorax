"""
Django signals for products app
Handles automatic notifications and side effects
"""

from django.db.models.signals import post_save, pre_save
from django.dispatch import receiver
from .models import Product, StockNotification
from .emails.stock_notifications import send_stock_notification


@receiver(pre_save, sender=Product)
def track_stock_changes(sender, instance, **kwargs):
    """Track when product goes from out of stock to in stock"""
    if instance.pk:
        try:
            old_instance = Product.objects.get(pk=instance.pk)
            # Store previous stock status for comparison in post_save
            instance._previous_in_stock = old_instance.in_stock
        except Product.DoesNotExist:
            instance._previous_in_stock = False


@receiver(post_save, sender=Product)
def notify_stock_subscribers(sender, instance, created, **kwargs):
    """
    Send stock notifications when product becomes available
    Only triggers when product changes from out-of-stock to in-stock
    """
    if created:
        return
    
    # Check if stock status changed from False to True
    previous_status = getattr(instance, '_previous_in_stock', False)
    if not previous_status and instance.in_stock:
        # Product just came back in stock - notify subscribers
        notifications = StockNotification.objects.filter(
            product=instance,
            is_notified=False
        )
        
        for notification in notifications:
            # Send email
            success = send_stock_notification(
                product_name=instance.name,
                product_slug=instance.slug,
                recipient_email=notification.email
            )
            
            if success:
                # Mark as notified
                from django.utils import timezone
                notification.is_notified = True
                notification.notified_at = timezone.now()
                notification.save()
