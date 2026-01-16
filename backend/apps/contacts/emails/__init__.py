"""
Email utilities for contacts app
"""

from .contact_notifications import send_contact_submission_notification, send_customer_confirmation

__all__ = ['send_contact_submission_notification', 'send_customer_confirmation']
