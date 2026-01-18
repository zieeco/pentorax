"""
Utility functions for cart operations
"""

from .models import Cart, CartItem


def merge_guest_cart_to_user(session_key, user_id):
    """
    Merge guest cart (session-based) into user cart when user logs in.
    
    Args:
        session_key: The session key of the guest cart
        user_id: The user ID to merge into
    """
    try:
        # Get guest cart
        guest_cart = Cart.objects.filter(session_key=session_key, user_id__isnull=True).first()
        
        if not guest_cart:
            return  # No guest cart to merge
        
        # Get or create user cart
        user_cart, created = Cart.objects.get_or_create(user_id=user_id)
        
        # Move all items from guest cart to user cart
        guest_items = CartItem.objects.filter(cart=guest_cart)
        
        for guest_item in guest_items:
            # Check if item already exists in user cart
            user_item = CartItem.objects.filter(
                cart=user_cart,
                product=guest_item.product
            ).first()
            
            if user_item:
                # Update quantity if item exists
                user_item.quantity += guest_item.quantity
                user_item.save()
            else:
                # Move item to user cart
                guest_item.cart = user_cart
                guest_item.save()
        
        # Delete the guest cart
        guest_cart.delete()
        
    except Exception as e:
        # Log error but don't fail the login process
        print(f"Error merging guest cart: {e}")
