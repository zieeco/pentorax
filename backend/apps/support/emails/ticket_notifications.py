"""
Email notifications for warranty app
"""

import resend
from django.conf import settings


def send_ticket_created_notification(ticket):
    """
    Send email notification when a new support ticket is created

    Args:
        ticket: SupportTicket instance

    Returns:
        bool: True if email sent successfully, False otherwise
    """
    try:
        resend.api_key = settings.RESEND_API_KEY

        # Send to admin
        admin_html = _get_ticket_created_admin_template(ticket)
        resend.Emails.send(
            {
                "from": settings.RESEND_FROM_EMAIL,
                "to": settings.ADMIN_EMAIL,
                "subject": f"New Support Ticket: {ticket.category}",
                "html": admin_html,
            }
        )

        # Send confirmation to user if email provided
        if ticket.user_email:
            user_html = _get_ticket_created_user_template(ticket)
            resend.Emails.send(
                {
                    "from": settings.RESEND_FROM_EMAIL,
                    "to": ticket.user_email,
                    "subject": f"Support Ticket Created: {ticket.category}",
                    "html": user_html,
                }
            )

        return True

    except Exception as e:
        print(f"Failed to send ticket creation notification: {str(e)}")
        return False


def send_ticket_status_update(ticket, old_status):
    """
    Send email notification when ticket status changes

    Args:
        ticket: SupportTicket instance
        old_status: Previous status value

    Returns:
        bool: True if email sent successfully, False otherwise
    """
    try:
        if not ticket.user_email:
            return False

        resend.api_key = settings.RESEND_API_KEY

        html_content = _get_ticket_status_update_template(ticket, old_status)

        resend.Emails.send(
            {
                "from": settings.RESEND_FROM_EMAIL,
                "to": ticket.user_email,
                "subject": f"Support Ticket Update: {ticket.get_status_display()}",
                "html": html_content,
            }
        )

        return True

    except Exception as e:
        print(f"Failed to send ticket status update: {str(e)}")
        return False


def _get_ticket_created_admin_template(ticket):
    """Admin notification template for new ticket"""
    return f"""
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
            .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
            .header {{ background-color: #FF5722; color: white; padding: 20px; text-align: center; }}
            .content {{ background-color: #f9f9f9; padding: 20px; border: 1px solid #ddd; }}
            .field {{ margin-bottom: 15px; }}
            .field-label {{ font-weight: bold; color: #555; }}
            .field-value {{ margin-top: 5px; padding: 10px; background-color: white; border-left: 3px solid #FF5722; }}
            .priority-{ticket.priority} {{ background-color: {'#f44336' if ticket.priority == 'urgent' else '#ff9800' if ticket.priority == 'high' else '#2196F3'}; color: white; padding: 5px 10px; border-radius: 3px; display: inline-block; }}
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h2>New Support Ticket Created</h2>
            </div>
            <div class="content">
                <div class="field">
                    <div class="field-label">Priority:</div>
                    <div class="field-value">
                        <span class="priority-{ticket.priority}">{ticket.get_priority_display()}</span>
                    </div>
                </div>
                <div class="field">
                    <div class="field-label">Category:</div>
                    <div class="field-value">{ticket.category}</div>
                </div>
                <div class="field">
                    <div class="field-label">Serial Number:</div>
                    <div class="field-value">{ticket.serial_number}</div>
                </div>
                <div class="field">
                    <div class="field-label">Customer Name:</div>
                    <div class="field-value">{ticket.user_name or 'Not provided'}</div>
                </div>
                <div class="field">
                    <div class="field-label">Customer Email:</div>
                    <div class="field-value">
                        <a href="mailto:{ticket.user_email}">{ticket.user_email or 'Not provided'}</a>
                    </div>
                </div>
                <div class="field">
                    <div class="field-label">Description:</div>
                    <div class="field-value">{ticket.description}</div>
                </div>
                <div class="field">
                    <div class="field-label">Submitted:</div>
                    <div class="field-value">{ticket.created_at.strftime('%B %d, %Y at %I:%M %p')}</div>
                </div>
            </div>
            <div style="margin-top: 20px; text-align: center; font-size: 12px; color: #777;">
                <p>Ticket ID: {ticket.id}</p>
            </div>
        </div>
    </body>
    </html>
    """


def _get_ticket_created_user_template(ticket):
    """User confirmation template for new ticket"""
    return f"""
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
            .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
            .header {{ background-color: #4CAF50; color: white; padding: 20px; text-align: center; }}
            .content {{ background-color: #f9f9f9; padding: 20px; border: 1px solid #ddd; }}
            .info-box {{ background-color: #e3f2fd; padding: 15px; border-left: 4px solid #2196F3; margin: 15px 0; }}
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h2>Support Ticket Created</h2>
            </div>
            <div class="content">
                <p>Hi {ticket.user_name or 'there'},</p>
                <p>Thank you for contacting our support team. We've received your support ticket and will get back to you as soon as possible.</p>
                
                <div class="info-box">
                    <strong>Ticket Details:</strong><br>
                    <strong>Category:</strong> {ticket.category}<br>
                    <strong>Serial Number:</strong> {ticket.serial_number}<br>
                    <strong>Priority:</strong> {ticket.get_priority_display()}<br>
                    <strong>Status:</strong> {ticket.get_status_display()}<br>
                    <strong>Ticket ID:</strong> {ticket.id}
                </div>
                
                <p><strong>Your Message:</strong></p>
                <p style="background-color: white; padding: 15px; border-left: 3px solid #4CAF50;">
                    {ticket.description}
                </p>
                
                <p>We'll keep you updated on the progress of your ticket.</p>
                
                <p>Best regards,<br>Support Team</p>
            </div>
        </div>
    </body>
    </html>
    """


def _get_ticket_status_update_template(ticket, old_status):
    """User notification template for status updates"""
    status_messages = {
        "in_progress": "Our team is now working on your ticket.",
        "resolved": "Your ticket has been resolved. Please review the resolution notes below.",
        "closed": "Your ticket has been closed.",
    }

    message = status_messages.get(ticket.status, "Your ticket status has been updated.")

    return f"""
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
            .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
            .header {{ background-color: #2196F3; color: white; padding: 20px; text-align: center; }}
            .content {{ background-color: #f9f9f9; padding: 20px; border: 1px solid #ddd; }}
            .status-change {{ background-color: #fff3cd; padding: 15px; border-left: 4px solid #ffc107; margin: 15px 0; }}
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h2>Ticket Status Updated</h2>
            </div>
            <div class="content">
                <p>Hi {ticket.user_name or 'there'},</p>
                
                <div class="status-change">
                    <strong>Status Change:</strong><br>
                    {old_status.replace('_', ' ').title()} → <strong>{ticket.get_status_display()}</strong>
                </div>
                
                <p>{message}</p>
                
                {f'''
                <div style="background-color: white; padding: 15px; border-left: 3px solid #4CAF50; margin: 15px 0;">
                    <strong>Resolution Notes:</strong><br>
                    {ticket.resolution_notes}
                </div>
                ''' if ticket.resolution_notes else ''}
                
                <p><strong>Ticket Details:</strong></p>
                <ul>
                    <li><strong>Category:</strong> {ticket.category}</li>
                    <li><strong>Serial Number:</strong> {ticket.serial_number}</li>
                    <li><strong>Ticket ID:</strong> {ticket.id}</li>
                </ul>
                
                <p>If you have any questions, please reply to this email.</p>
                
                <p>Best regards,<br>Support Team</p>
            </div>
        </div>
    </body>
    </html>
    """
