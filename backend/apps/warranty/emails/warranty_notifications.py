"""
Email notifications for warranty app
"""

import resend
from django.conf import settings


def send_warranty_expiry_reminder(warranty):
    """
    Send warranty expiry reminder email to customer

    Args:
        warranty: WarrantyCheck instance

    Returns:
        bool: True if email sent successfully, False otherwise
    """
    try:
        if not warranty.customer_email:
            return False

        resend.api_key = settings.RESEND_API_KEY

        html_content = _get_warranty_expiry_reminder_template(warranty)

        resend.Emails.send(
            {
                "from": settings.RESEND_FROM_EMAIL,
                "to": warranty.customer_email,
                "subject": f"Warranty Expiry Reminder: {warranty.product_name}",
                "html": html_content,
            }
        )

        return True

    except Exception as e:
        print(f"Failed to send warranty expiry reminder: {str(e)}")
        return False


def _get_warranty_expiry_reminder_template(warranty):
    """
    Generate HTML email template for warranty expiry reminder

    Args:
        warranty: WarrantyCheck instance

    Returns:
        str: HTML email content
    """
    days_remaining = warranty.days_remaining()
    urgency_color = "#f44336" if days_remaining <= 30 else "#ff9800"

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
                background-color: {urgency_color};
                color: white;
                padding: 20px;
                text-align: center;
            }}
            .content {{
                background-color: #f9f9f9;
                padding: 20px;
                border: 1px solid #ddd;
            }}
            .warranty-info {{
                background-color: white;
                padding: 20px;
                border-left: 4px solid {urgency_color};
                margin: 20px 0;
            }}
            .info-row {{
                display: flex;
                justify-content: space-between;
                padding: 10px 0;
                border-bottom: 1px solid #eee;
            }}
            .info-label {{
                font-weight: bold;
                color: #555;
            }}
            .days-remaining {{
                background-color: {urgency_color};
                color: white;
                padding: 10px 20px;
                border-radius: 5px;
                text-align: center;
                font-size: 18px;
                font-weight: bold;
                margin: 20px 0;
            }}
            .cta-button {{
                display: inline-block;
                padding: 12px 30px;
                background-color: #4CAF50;
                color: white;
                text-decoration: none;
                border-radius: 5px;
                margin: 20px 0;
                text-align: center;
            }}
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h2>Warranty Expiry Reminder</h2>
            </div>
            
            <div class="content">
                <p>Dear {warranty.customer_name or 'Valued Customer'},</p>
                
                <p>This is a friendly reminder that the warranty for your product is {'about to expire' if days_remaining > 0 else 'expiring soon'}.</p>
                
                <div class="days-remaining">
                    {f'{days_remaining} days remaining' if days_remaining > 0 else 'Expires today'}
                </div>
                
                <div class="warranty-info">
                    <h3>Warranty Details</h3>
                    
                    <div class="info-row">
                        <span class="info-label">Product:</span>
                        <span>{warranty.product_name}</span>
                    </div>
                    
                    <div class="info-row">
                        <span class="info-label">Serial Number:</span>
                        <span>{warranty.serial_number}</span>
                    </div>
                    
                    <div class="info-row">
                        <span class="info-label">Purchase Date:</span>
                        <span>{warranty.purchase_date.strftime('%B %d, %Y')}</span>
                    </div>
                    
                    <div class="info-row">
                        <span class="info-label">Expiry Date:</span>
                        <span>{warranty.expiry_date.strftime('%B %d, %Y')}</span>
                    </div>
                    
                    <div class="info-row">
                        <span class="info-label">Support Level:</span>
                        <span>{warranty.get_support_level_display()}</span>
                    </div>
                </div>
                
                <h3>What happens after warranty expires?</h3>
                <ul>
                    <li>You will no longer be covered for repairs or replacements</li>
                    <li>Service calls may incur additional charges</li>
                    <li>You may lose access to priority support</li>
                </ul>
                
                <h3>Extend Your Warranty</h3>
                <p>Consider extending your warranty to continue enjoying peace of mind and comprehensive coverage.</p>
                
                <div style="text-align: center;">
                    <a href="#" class="cta-button">Extend Warranty Now</a>
                </div>
                
                <p>If you have any questions about your warranty or would like to discuss extension options, please don't hesitate to contact us.</p>
                
                <p>Best regards,<br>Customer Support Team</p>
            </div>
            
            <div style="margin-top: 20px; text-align: center; font-size: 12px; color: #777;">
                <p>This is an automated reminder. Please do not reply to this email.</p>
            </div>
        </div>
    </body>
    </html>
    """
