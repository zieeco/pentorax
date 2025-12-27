"""
Email notifications for contacts app
"""

import resend
from django.conf import settings


def send_contact_submission_notification(contact):
    """
    Send email notification to admin when new contact submission is received

    Args:
        contact: ContactSubmission instance

    Returns:
        bool: True if email sent successfully, False otherwise
    """
    try:
        resend.api_key = settings.RESEND_API_KEY

        html_content = _get_contact_submission_email_template(contact)

        resend.Emails.send(
            {
                "from": settings.RESEND_FROM_EMAIL,
                "to": settings.ADMIN_EMAIL,
                "subject": f"New Contact: {contact.subject}",
                "html": html_content,
                "reply_to": contact.email,
            }
        )

        return True

    except Exception as e:
        print(f"Failed to send contact submission notification: {str(e)}")
        return False


def _get_contact_submission_email_template(contact):
    """
    Generate HTML email template for contact submission notification

    Args:
        contact: ContactSubmission instance

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
                background-color: #2196F3;
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
                border-left: 3px solid #2196F3;
            }}
            .footer {{
                margin-top: 20px;
                padding-top: 20px;
                border-top: 1px solid #ddd;
                font-size: 12px;
                color: #777;
                text-align: center;
            }}
            .action-button {{
                display: inline-block;
                padding: 10px 20px;
                background-color: #2196F3;
                color: white;
                text-decoration: none;
                border-radius: 5px;
                margin-top: 15px;
            }}
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h2>New Contact Form Submission</h2>
            </div>
            
            <div class="content">
                <div class="field">
                    <div class="field-label">Subject:</div>
                    <div class="field-value">{contact.subject}</div>
                </div>
                
                <div class="field">
                    <div class="field-label">Name:</div>
                    <div class="field-value">{contact.name}</div>
                </div>
                
                <div class="field">
                    <div class="field-label">Email:</div>
                    <div class="field-value">
                        <a href="mailto:{contact.email}">{contact.email}</a>
                    </div>
                </div>
                
                <div class="field">
                    <div class="field-label">Phone:</div>
                    <div class="field-value">
                        <a href="tel:{contact.phone}">{contact.phone}</a>
                    </div>
                </div>
                
                <div class="field">
                    <div class="field-label">Message:</div>
                    <div class="field-value">{contact.message}</div>
                </div>
                
                <div class="field">
                    <div class="field-label">Submitted:</div>
                    <div class="field-value">
                        {contact.created_at.strftime('%B %d, %Y at %I:%M %p')}
                    </div>
                </div>
            </div>
            
            <div class="footer">
                <p>Contact Submission ID: {contact.id}</p>
                <p>Click reply to respond directly to {contact.name}</p>
            </div>
        </div>
    </body>
    </html>
    """
