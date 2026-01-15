"""
Email service for newsletter
"""
import resend
from django.conf import settings


def send_welcome_email(subscriber):
    """
    Send welcome email to new newsletter subscriber
    
    Args:
        subscriber: NewsletterSubscriber instance
    
    Returns:
        bool: True if email sent successfully, False otherwise
    """
    try:
        resend.api_key = settings.RESEND_API_KEY
        
        # Debug output
        print(f"🔍 Attempting to send welcome email to: {subscriber.email}")
        print(f"📧 From: {settings.RESEND_FROM_EMAIL}")
        print(f"🔑 API Key set: {'Yes' if settings.RESEND_API_KEY else 'No'}")
        
        # Unsubscribe URL
        unsubscribe_url = f"{settings.FRONTEND_URL}/newsletter/unsubscribe?token={subscriber.unsubscribe_token}"
        
        html_content = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f4f4f4;">
            <div style="background: linear-gradient(135deg, #0052CC 0%, #00D1FF 100%); padding: 40px 30px; text-align: center; border-radius: 10px 10px 0 0;">
                <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">Welcome to Pentorax!</h1>
                <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px;">Your Solar Energy Partner</p>
            </div>
            
            <div style="background-color: white; padding: 40px 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                <h2 style="color: #0052CC; margin-top: 0; font-size: 24px;">Thank you for subscribing, {subscriber.full_name}!</h2>
                
                <p style="font-size: 16px; color: #555; line-height: 1.8;">
                    We're excited to have you join our community of solar energy enthusiasts and professionals. 
                    You'll now receive:
                </p>
                
                <ul style="list-style: none; padding: 0; margin: 20px 0;">
                    <li style="padding: 12px 0; border-bottom: 1px solid #eee; font-size: 15px;">
                        ⚡ Latest updates on solar technology
                    </li>
                    <li style="padding: 12px 0; border-bottom: 1px solid #eee; font-size: 15px;">
                        💡 Energy-saving tips and best practices
                    </li>
                    <li style="padding: 12px 0; border-bottom: 1px solid #eee; font-size: 15px;">
                        🎁 Exclusive offers and product launches
                    </li>
                    <li style="padding: 12px 0; font-size: 15px;">
                        📊 Industry insights and case studies
                    </li>
                </ul>
                
                <div style="text-align: center; margin: 35px 0;">
                    <a href="{settings.FRONTEND_URL}/shop" 
                       style="display: inline-block; background: linear-gradient(135deg, #0052CC 0%, #00D1FF 100%); 
                              color: white; padding: 14px 32px; text-decoration: none; border-radius: 8px; 
                              font-weight: bold; font-size: 16px; box-shadow: 0 4px 12px rgba(0,82,204,0.3);">
                        Explore Our Products →
                    </a>
                </div>
                
                <div style="margin-top: 40px; padding-top: 30px; border-top: 2px solid #f0f0f0;">
                    <p style="color: #888; font-size: 13px; text-align: center; margin: 0;">
                        You're receiving this because you subscribed to our newsletter at pentorax.com
                    </p>
                    <p style="text-align: center; margin: 15px 0 0 0;">
                        <a href="{unsubscribe_url}" style="color: #999; font-size: 12px; text-decoration: none;">
                            Unsubscribe from this list
                        </a>
                    </p>
                </div>
            </div>
            
            <div style="text-align: center; padding: 20px; color: #999; font-size: 12px;">
                <p style="margin: 5px 0;">
                    <strong style="color: #666;">Pentorax Solar Energy Solutions</strong><br>
                    1, Industrial Street, Ilupeju, Lagos<br>
                    support@pentorax.com | +234 808 159 8604
                </p>
            </div>
        </body>
        </html>
        """
        
        params = {
            "from": settings.RESEND_FROM_EMAIL,
            "to": [subscriber.email],
            "subject": "🌞 Welcome to Pentorax Newsletter - Your Solar Journey Starts Here!",
            "html": html_content,
        }
        
        print(f"📤 Sending email via Resend...")
        response = resend.Emails.send(params)
        print(f"✅ Email sent successfully! Response: {response}")
        return True
        
    except Exception as e:
        print(f"❌ Error sending welcome email to {subscriber.email}: {str(e)}")
        import traceback
        traceback.print_exc()
        return False


def send_unsubscribe_confirmation(email):
    """
    Send confirmation email after unsubscribe
    
    Args:
        email: Email address
    
    Returns:
        bool: True if email sent successfully
    """
    try:
        resend.api_key = settings.RESEND_API_KEY
        
        html_content = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background-color: #f9f9f9; padding: 30px; border-radius: 10px; text-align: center;">
                <h1 style="color: #666; margin-top: 0;">You've Been Unsubscribed</h1>
                <p style="font-size: 16px; color: #555;">
                    Your email has been removed from our newsletter list. You won't receive any more emails from us.
                </p>
                <p style="font-size: 14px; color: #888; margin-top: 30px;">
                    Changed your mind? You can always <a href="{settings.FRONTEND_URL}" style="color: #0052CC;">visit our website</a> to subscribe again.
                </p>
                <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #999;">
                    <p><strong>Pentorax Solar Energy Solutions</strong></p>
                </div>
            </div>
        </body>
        </html>
        """
        
        params = {
            "from": settings.RESEND_FROM_EMAIL,
            "to": [email],
            "subject": "Unsubscribed from Pentorax Newsletter",
            "html": html_content,
        }
        
        resend.Emails.send(params)
        return True
        
    except Exception as e:
        print(f"Error sending unsubscribe confirmation to {email}: {str(e)}")
        return False
