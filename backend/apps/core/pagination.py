"""
Custom pagination classes for Pentorax API
"""
from rest_framework.pagination import PageNumberPagination


class StandardResultsSetPagination(PageNumberPagination):
    """
    Pagination class that follows standard ecommerce API patterns.
    
    Query params:
    - page: page number (1-indexed)
    - per_page: items per page (default 20, max 100)
    
    Example: /api/products?page=2&per_page=24&sort=price&order=asc
    """
    page_size = 20  # Default
    page_size_query_param = 'per_page'  # Standard ecommerce param name
    max_page_size = 100  # Maximum allowed
