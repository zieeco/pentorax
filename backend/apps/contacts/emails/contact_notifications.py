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
        
        # Debug logging
        print(f"📧 Preparing to send contact notification email")
        print(f"   From: {settings.RESEND_FROM_EMAIL}")
        print(f"   To: {settings.ADMIN_EMAIL}")
        print(f"   Subject: New Contact: {contact.subject}")
        print(f"   Contact Name: {contact.name}")
        print(f"   Contact Email: {contact.email}")

        html_content = _get_contact_submission_email_template(contact)

        print(f"🚀 Sending email via Resend...")
        response = resend.Emails.send(
            {
                "from": settings.RESEND_FROM_EMAIL,
                "to": settings.ADMIN_EMAIL,
                "subject": f"New Contact: {contact.subject}",
                "html": html_content,
                "reply_to": contact.email,
            }
        )
        
        print(f"✅ Email sent successfully!")
        print(f"   Resend Response: {response}")
        return True

    except Exception as e:
        print(f"❌ Failed to send contact submission notification: {str(e)}")
        import traceback
        traceback.print_exc()
        return False


def send_customer_confirmation(contact):
    """
    Send confirmation email to customer after contact form submission

    Args:
        contact: ContactSubmission instance

    Returns:
        bool: True if email sent successfully, False otherwise
    """
    try:
        resend.api_key = settings.RESEND_API_KEY
        
        # Debug logging
        print(f"📨 Sending confirmation to customer")
        print(f"   From: {settings.RESEND_FROM_EMAIL}")
        print(f"   To: {contact.email}")
        print(f"   Customer: {contact.name}")

        html_content = f"""
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
                    background: linear-gradient(135deg, #0052CC 0%, #00D1FF 100%);
                    color: white;
                    padding: 40px 30px;
                    text-align: center;
                    border-radius: 10px 10px 0 0;
                }}
                .content {{
                    background-color: #ffffff;
                    padding: 40px 30px;
                    border: 1px solid #e0e0e0;
                    border-top: none;
                }}
                .footer {{
                    background-color: #f9f9f9;
                    padding: 20px;
                    text-align: center;
                    font-size: 12px;
                    color: #777;
                    border-radius: 0 0 10px 10px;
                }}
                .info-box {{
                    background-color: #f0f7ff;
                    border-left: 4px solid #0052CC;
                    padding: 15px;
                    margin: 20px 0;
                }}
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1 style="margin: 0; font-size: 28px;">Thank You for Contacting Us!</h1>
                    <p style="margin: 10px 0 0 0; opacity: 0.9;">Your message has been received</p>
                </div>
                
                <div class="content">
                    <p style="font-size: 16px;">Hi {contact.name},</p>
                    
                    <p>Thank you for reaching out to Pentorax! We've successfully received your inquiry regarding <strong>{contact.subject}</strong>.</p>
                    
                    <div class="info-box">
                        <p style="margin: 0;"><strong>What happens next?</strong></p>
                        <ul style="margin: 10px 0 0 0; padding-left: 20px;">
                            <li>Our team will review your message</li>
                            <li>We'll get back to you within 24 business hours</li>
                            <li>You'll receive a detailed response via email</li>
                        </ul>
                    </div>
                    
                    <p><strong>Your Message:</strong></p>
                    <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 10px 0;">
                        {contact.message}
                    </div>
                    
                    <p style="margin-top: 30px;">If you have any urgent concerns, feel free to call us directly at <strong>+234 808 159 8604</strong>.</p>
                    
                    <p style="margin-top: 20px;">
                        Best regards,<br>
                        <strong>The Pentorax Team</strong>
                    </p>
                </div>
                
                <div class="footer">
                    <p style="margin: 5px 0;">
                        <strong>Pentorax Solar Energy Solutions</strong><br>
                        1, Industrial Street, Ilupeju, Lagos, Nigeria<br>
                        support@pentorax.com | +234 808 159 8604
                    </p>
                    <p style="margin: 15px 0 0 0; font-size: 11px;">
                        This is an automated confirmation. Please do not reply to this email.
                    </p>
                </div>
            </div>
        </body>
        </html>
        """

        print(f"🚀 Sending customer confirmation via Resend...")
        response = resend.Emails.send(
            {
                "from": settings.RESEND_FROM_EMAIL,
                "to": contact.email,
                "subject": "Thank You for Contacting Pentorax - We'll Be In Touch Soon!",
                "html": html_content,
            }
        )
        
        print(f"✅ Customer confirmation sent!")
        print(f"   Resend Response: {response}")
        return True

    except Exception as e:
        print(f"❌ Failed to send customer confirmation: {str(e)}")
        import traceback
        traceback.print_exc()
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
