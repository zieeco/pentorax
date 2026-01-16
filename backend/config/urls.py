"""
URL configuration for Pentorax project.
"""
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('api/', include('apps.core.urls')),
    path('api/products/', include('apps.products.urls')),
    path('api/cart/', include('apps.cart.urls')),
    path('api/orders/', include('apps.orders.urls')),
    path('api/payments/', include('apps.payments.urls')),
    path('api/reviews/', include('apps.reviews.urls')),
    path('api/quotes/', include('apps.quotes.urls')),
    path('api/blog/', include('apps.blog.urls')),
    path('api/newsletter/', include('apps.newsletter.urls')),
    path('api/contact/', include('apps.contacts.urls')),
    path('api/inventory/', include('apps.inventory.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
