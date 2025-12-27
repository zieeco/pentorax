import resend
from django.conf import settings

from .models import OrderItem


def send_order_confirmation(order):
    """
    Send order confirmation email to customer

    Args:
        order: Order instance

    Returns:
        bool: True if email sent successfully, False otherwise
    """
    try:
        resend.api_key = settings.RESEND_API_KEY

        # Get order items
        items = OrderItem.objects.filter(order_id=order.id)

        html_content = _get_order_confirmation_template(order, items)

        resend.Emails.send(
            {
                "from": settings.RESEND_FROM_EMAIL,
                "to": order.email,
                "subject": f"Order Confirmation - Order #{str(order.id)[:8]}",
                "html": html_content,
            }
        )

        return True

    except Exception as e:
        print(f"Failed to send order confirmation: {str(e)}")
        return False


def _get_order_confirmation_template(order, items):
    """Generate HTML email template for order confirmation"""

    items_html = ""
    for item in items:
        items_html += f"""
        <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">{item.product_id}</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: center;">{item.quantity}</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">${item.price}</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">${item.subtotal}</td>
        </tr>
        """

    return f"""
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
            .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
            .header {{ background-color: #4CAF50; color: white; padding: 20px; text-align: center; }}
            .content {{ background-color: #f9f9f9; padding: 20px; border: 1px solid #ddd; }}
            table {{ width: 100%; border-collapse: collapse; margin: 20px 0; }}
            th {{ background-color: #4CAF50; color: white; padding: 10px; text-align: left; }}
            .total {{ background-color: #4CAF50; color: white; padding: 15px; text-align: right; font-size: 18px; font-weight: bold; }}
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h2>Order Confirmation</h2>
                <p>Order #{str(order.id)[:8]}</p>
            </div>
            <div class="content">
                <p>Hi {order.shipping_name},</p>
                <p>Thank you for your order! We've received your order and will process it shortly.</p>
                
                <h3>Order Details:</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th style="text-align: center;">Quantity</th>
                            <th style="text-align: right;">Price</th>
                            <th style="text-align: right;">Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items_html}
                    </tbody>
                </table>
                
                <div class="total">
                    Total: ${order.total}
                </div>
                
                <h3>Shipping Address:</h3>
                <p>
                    {order.shipping_name}<br>
                    {order.shipping_address}<br>
                    {order.shipping_city}, {order.shipping_state}<br>
                    Phone: {order.shipping_phone}
                </p>
                
                <p>We'll send you another email when your order ships.</p>
                <p>Best regards,<br>The Team</p>
            </div>
        </div>
    </body>
    </html>
    """
