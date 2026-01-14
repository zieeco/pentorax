"""
Supabase JWT authentication for Django REST Framework
"""
from rest_framework import authentication, exceptions
from .supabase_client import get_supabase_client
import jwt
from django.conf import settings


class AnonymousUser:
    """Custom anonymous user (no Django auth)"""
    id = None
    is_authenticated = False
    is_anonymous = True


class SupabaseUser:
    """
    Wrapper for Supabase user data
    """
    def __init__(self, user_data):
        self.id = user_data.get('sub')
        self.email = user_data.get('email')
        self.is_authenticated = True
        self.is_anonymous = False
        self.user_metadata = user_data.get('user_metadata', {})
        self.app_metadata = user_data.get('app_metadata', {})
    
    @property
    def is_staff(self):
        """Check if user has staff/admin role from Supabase metadata"""
        # Primary: Check app_metadata (set by JWT hook)
        role = self.app_metadata.get('role')
        
        # Fallback: Check user_metadata
        if not role:
            role = self.user_metadata.get('role', 'customer')
        
        return role in ('staff', 'admin')
    
    def __str__(self):
        return f"SupabaseUser({self.email})"


class SupabaseAuthentication(authentication.BaseAuthentication):
    """
    Supabase JWT token authentication
    """
    def authenticate(self, request):
        auth_header = request.META.get('HTTP_AUTHORIZATION', '')
        
        if not auth_header.startswith('Bearer '):
            return None
        
        token = auth_header.split(' ')[1]
        
        try:
            # Verify JWT token
            supabase = get_supabase_client()
            user_response = supabase.auth.get_user(token)
            
            if user_response and user_response.user:
                user = SupabaseUser(user_response.user.model_dump())
                return (user, token)
            else:
                raise exceptions.AuthenticationFailed('Invalid token')
                
        except Exception as e:
            raise exceptions.AuthenticationFailed(f'Authentication failed: {str(e)}')
    
    def authenticate_header(self, request):
        return 'Bearer'
