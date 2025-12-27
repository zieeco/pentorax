"""
Email notifications for quote requests
"""

import resend
from django.conf import settings

from ..models import QuoteRequest


def send_quote_request_notification(quote_request: QuoteRequest):
    """
    Send email notification to admin when new quote request is received

    Args:
        quote_request: QuoteRequest instance

    Returns:
        bool: True if email sent successfully, False otherwise
    """
    try:
        resend.api_key = settings.RESEND_API_KEY

        html_content = _get_quote_request_email_template(quote_request)

        resend.Emails.send(
            {
                "from": settings.RESEND_FROM_EMAIL,
                "to": settings.ADMIN_EMAIL,
                "subject": f"New Quote Request from {quote_request.name}",
                "html": html_content,
            }
        )

        return True

    except Exception as e:
        # Log the error but don't fail the request
        print(f"Failed to send quote request notification: {str(e)}")
        # TODO: Implement proper logging with Django's logging framework
        return False


def _get_quote_request_email_template(quote_request: QuoteRequest):
    """
    Generate HTML email template for quote request notification

    Args:
        quote_request: QuoteRequest instance

    Returns:
        str: HTML email content
    """
    return f"""
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body {{
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
            }}
            .container {{
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
            }}
            .header {{
                background-color: #4CAF50;
                color: white;
                padding: 20px;
                text-align: center;
            }}
            .content {{
                background-color: #f9f9f9;
                padding: 20px;
                border: 1px solid #ddd;
            }}
            .field {{
                margin-bottom: 15px;
            }}
            .field-label {{
                font-weight: bold;
                color: #555;
            }}
            .field-value {{
                margin-top: 5px;
                padding: 10px;
                background-color: white;
                border-left: 3px solid #4CAF50;
            }}
            .footer {{
                margin-top: 20px;
                padding-top: 20px;
                border-top: 1px solid #ddd;
                font-size: 12px;
                color: #777;
                text-align: center;
            }}
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h2>New Quote Request Received</h2>
            </div>
            
            <div class="content">
                <div class="field">
                    <div class="field-label">Name:</div>
                    <div class="field-value">{quote_request.name}</div>
                </div>
                
                <div class="field">
                    <div class="field-label">Email:</div>
                    <div class="field-value">
                        <a href="mailto:{quote_request.email}">{quote_request.email}</a>
                    </div>
                </div>
                
                <div class="field">
                    <div class="field-label">Phone:</div>
                    <div class="field-value">
                        <a href="tel:{quote_request.phone}">{quote_request.phone}</a>
                    </div>
                </div>
                
                <div class="field">
                    <div class="field-label">Message:</div>
                    <div class="field-value">{quote_request.message}</div>
                </div>
                
                <div class="field">
                    <div class="field-label">Submitted:</div>
                    <div class="field-value">
                        {quote_request.created_at.strftime('%B %d, %Y at %I:%M %p')}
                    </div>
                </div>
            </div>
            
            <div class="footer">
                <p>Quote Request ID: {quote_request.id}</p>
                <p>Status: {quote_request.get_status_display()}</p>
            </div>
        </div>
    </body>
    </html>
    """
