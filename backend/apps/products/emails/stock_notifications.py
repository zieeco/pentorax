"""
Stock notification email service using Resend
"""

import resend
from django.conf import settings


def send_stock_notification(product_name: str, product_slug: str, recipient_email: str) -> bool:
    """
    Send email notification when product is back in stock
    
    Args:
        product_name: Name of the product
        product_slug: Product slug for URL
        recipient_email: Email address to send notification to
        
    Returns:
        bool: True if email sent successfully, False otherwise
    """
    try:
        resend.api_key = settings.RESEND_API_KEY
        
        # Product URL (adjust domain as needed)
        product_url = f"{settings.FRONTEND_URL}/shop/products/{product_slug}"
        
        html_content = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
                <h1 style="color: white; margin: 0; font-size: 24px;">🎉 Great News!</h1>
            </div>
            
            <div style="background-color: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
                <h2 style="color: #667eea; margin-top: 0;">The Product You Wanted is Back in Stock!</h2>
                
                <p style="font-size: 16px; margin: 20px 0;">
                    <strong style="color: #764ba2;">{product_name}</strong> is now available for purchase.
                </p>
                
                <p style="margin: 20px 0;">
                    Don't miss out this time – stock is limited!
                </p>
                
                <div style="text-align: center; margin: 30px 0;">
                    <a href="{product_url}" 
                       style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                              color: white; 
                              padding: 15px 40px; 
                              text-decoration: none; 
                              border-radius: 5px; 
                              font-weight: bold; 
                              display: inline-block;
                              font-size: 16px;">
                        View Product →
                    </a>
                </div>
                
                <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 14px; color: #666;">
                    <p><strong>Pentorax Solar Energy Solutions</strong></p>
                    <p>Powering Nigeria with sustainable energy solutions.</p>
                    <p style="font-size: 12px; color: #999; margin-top: 15px;">
                        You received this email because you requested to be notified when this product became available. 
                        If you no longer wish to receive these notifications, you can unsubscribe from the product page.
                    </p>
                </div>
            </div>
        </body>
        </html>
        """
        
        params = {
            "from": settings.RESEND_FROM_EMAIL,
            "to": [recipient_email],
            "subject": f"🔔 {product_name} is Back in Stock!",
            "html": html_content,
        }
        
        resend.Emails.send(params)
        return True
        
    except Exception as e:
        print(f"Error sending stock notification email: {str(e)}")
        return False


def send_subscription_confirmation(product_name: str, product_slug: str, recipient_email: str) -> bool:
    """
    Send confirmation email when user subscribes to stock notifications
    
    Args:
        product_name: Name of the product
        product_slug: Product slug for URL
        recipient_email: Email address to send confirmation to
        
    Returns:
        bool: True if email sent successfully, False otherwise
    """
    try:
        resend.api_key = settings.RESEND_API_KEY
        
        # Product URL
        product_url = f"{settings.FRONTEND_URL}/shop/products/{product_slug}"
        
        html_content = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
                <h1 style="color: white; margin: 0; font-size: 24px;">✅ Subscription Confirmed!</h1>
            </div>
            
            <div style="background-color: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
                <h2 style="color: #667eea; margin-top: 0;">You're All Set!</h2>
                
                <p style="font-size: 16px; margin: 20px 0;">
                    Thank you for subscribing to notifications for <strong style="color: #764ba2;">{product_name}</strong>.
                </p>
                
                <p style="margin: 20px 0;">
                    We'll send you an email as soon as this product is back in stock. You'll be among the first to know!
                </p>
                
                <div style="background-color: #fff; padding: 20px; border-radius: 8px; border-left: 4px solid #667eea; margin: 20px 0;">
                    <p style="margin: 0; font-size: 14px; color: #666;">
                        <strong>What happens next?</strong><br>
                        • You'll receive an email when stock is available<br>
                        • No spam - just one notification when restocked<br>
                        • You can unsubscribe anytime from the product page
                    </p>
                </div>
                
                <div style="text-align: center; margin: 30px 0;">
                    <a href="{product_url}" 
                       style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                              color: white; 
                              padding: 15px 40px; 
                              text-decoration: none; 
                              border-radius: 5px; 
                              font-weight: bold; 
                              display: inline-block;
                              font-size: 16px;">
                        View Product →
                    </a>
                </div>
                
                <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 14px; color: #666;">
                    <p><strong>Pentorax Solar Energy Solutions</strong></p>
                    <p>Powering Nigeria with sustainable energy solutions.</p>
                    <p style="font-size: 12px; color: #999; margin-top: 15px;">
                        You received this email because you subscribed to stock notifications for {product_name}.
                    </p>
                </div>
            </div>
        </body>
        </html>
        """
        
        params = {
            "from": settings.RESEND_FROM_EMAIL,
            "to": [recipient_email],
            "subject": f"✅ Subscribed to {product_name} Stock Alerts",
            "html": html_content,
        }
        
        resend.Emails.send(params)
        return True
        
    except Exception as e:
        print(f"Error sending subscription confirmation email: {str(e)}")
        return False

