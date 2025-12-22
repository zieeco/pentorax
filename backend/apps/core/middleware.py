"""
Middleware for Supabase authentication
"""
from django.utils.deprecation import MiddlewareMixin
from .authentication import SupabaseAuthentication
from django.contrib.auth.models import AnonymousUser


class SupabaseAuthMiddleware(MiddlewareMixin):
    """
    Middleware to attach Supabase user to request
    """
    def process_request(self, request):
        auth = SupabaseAuthentication()
        try:
            user_auth = auth.authenticate(request)
            if user_auth is not None:
                request.user = user_auth[0]
            else:
                request.user = AnonymousUser()
        except Exception:
            request.user = AnonymousUser()
