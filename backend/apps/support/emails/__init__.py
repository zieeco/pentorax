"""
Email utilities for support  app
"""
from .ticket_notifications import (
    send_ticket_created_notification,
    send_ticket_status_update,
)

__all__ = ["send_ticket_created_notification", "send_ticket_status_update"]
