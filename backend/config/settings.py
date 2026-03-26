"""
Django settings for Pentorax project.
Works for local dev and Coolify/production — controlled entirely via environment variables.
"""
import os
from pathlib import Path
from dotenv import load_dotenv

load_dotenv()

BASE_DIR = Path(__file__).resolve().parent.parent

# ── Core ──────────────────────────────────────────────────────────────────────

SECRET_KEY = os.getenv('DJANGO_SECRET_KEY', 'django-insecure-change-this-in-production')

DEBUG = os.getenv('DJANGO_DEBUG', 'True') == 'True'

ALLOWED_HOSTS = os.getenv('DJANGO_ALLOWED_HOSTS', 'localhost,127.0.0.1').split(',')

# ── Apps ──────────────────────────────────────────────────────────────────────

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    # Third-party
    'rest_framework',
    'rest_framework.authtoken',
    'corsheaders',

    # Local
    'apps.blog',
    'apps.cart',
    'apps.contacts',
    'apps.core',
    'apps.inventory',
    'apps.orders',
    'apps.payments',
    'apps.products',
    'apps.newsletter',
    'apps.quotes',
    'apps.reviews',
    'apps.support',
    'apps.warranty',
]

if DEBUG:
    INSTALLED_APPS += ['debug_toolbar']

# ── Middleware ────────────────────────────────────────────────────────────────

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',  # serves static files in production
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

if DEBUG:
    MIDDLEWARE += ['debug_toolbar.middleware.DebugToolbarMiddleware']

ROOT_URLCONF = 'config.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'config.wsgi.application'

# ── Database ──────────────────────────────────────────────────────────────────

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.getenv('DB_NAME', 'pentorax'),
        'USER': os.getenv('DB_USER', 'pentorax'),
        'PASSWORD': os.getenv('DB_PASSWORD', ''),
        'HOST': os.getenv('DB_HOST', 'db'),
        'PORT': os.getenv('DB_PORT', '5432'),
        'CONN_MAX_AGE': 60,  # persistent connections
    }
}

# ── Cache / Redis ─────────────────────────────────────────────────────────────

REDIS_URL = os.getenv('REDIS_URL', 'redis://redis:6379/0')

CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.redis.RedisCache',
        'LOCATION': REDIS_URL,
    }
}

SESSION_ENGINE = 'django.contrib.sessions.backends.cache'
SESSION_CACHE_ALIAS = 'default'
SESSION_COOKIE_AGE = 86400  # 1 day

# ── Password validation ───────────────────────────────────────────────────────

AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

# ── Internationalisation ──────────────────────────────────────────────────────

LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

# ── Static & media files ──────────────────────────────────────────────────────

STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# ── REST Framework ────────────────────────────────────────────────────────────

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.TokenAuthentication',
        'rest_framework.authentication.SessionAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.AllowAny',
    ],
    'DEFAULT_PAGINATION_CLASS': 'apps.core.pagination.StandardResultsSetPagination',
    'PAGE_SIZE': 20,
    'DEFAULT_FILTER_BACKENDS': [
        'rest_framework.filters.SearchFilter',
        'rest_framework.filters.OrderingFilter',
    ],
}

# ── CORS & CSRF ───────────────────────────────────────────────────────────────

_frontend_url = os.getenv('FRONTEND_URL', 'http://localhost:3000')
_cors_origins = os.getenv('CORS_ALLOWED_ORIGINS', 'http://localhost:5173,http://localhost:3000').split(',')

CORS_ALLOWED_ORIGINS = _cors_origins
CORS_ALLOW_CREDENTIALS = True

CSRF_TRUSTED_ORIGINS = _cors_origins + (
    [_frontend_url] if _frontend_url not in _cors_origins else []
)

# ── Security (auto-enabled in production) ────────────────────────────────────

SESSION_COOKIE_HTTPONLY = True
SESSION_COOKIE_SAMESITE = 'Lax'
CSRF_COOKIE_SAMESITE = 'Lax'
CSRF_COOKIE_HTTPONLY = False

if not DEBUG:
    SESSION_COOKIE_SECURE = True
    CSRF_COOKIE_SECURE = True
    SECURE_BROWSER_XSS_FILTER = True
    SECURE_CONTENT_TYPE_NOSNIFF = True
    SECURE_HSTS_SECONDS = 31536000
    SECURE_HSTS_INCLUDE_SUBDOMAINS = True
    SECURE_HSTS_PRELOAD = True
    SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')  # required behind Coolify/Traefik
    X_FRAME_OPTIONS = 'DENY'
else:
    SESSION_COOKIE_SECURE = False
    CSRF_COOKIE_SECURE = False

# ── Debug toolbar ─────────────────────────────────────────────────────────────

if DEBUG:
    INTERNAL_IPS = ['127.0.0.1']

# ── Logging ───────────────────────────────────────────────────────────────────

LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'verbose': {
            'format': '{levelname} {asctime} {module} {message}',
            'style': '{',
        },
    },
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
            'formatter': 'verbose',
        },
    },
    'root': {
        'handlers': ['console'],
        'level': 'DEBUG' if DEBUG else 'INFO',
    },
    'loggers': {
        'django': {
            'handlers': ['console'],
            'level': 'INFO',
            'propagate': False,
        },
    },
}

# ── Sentry (production only) ──────────────────────────────────────────────────

SENTRY_DSN = os.getenv('SENTRY_DSN', '')

if not DEBUG and SENTRY_DSN:
    import sentry_sdk
    from sentry_sdk.integrations.django import DjangoIntegration

    sentry_sdk.init(
        dsn=SENTRY_DSN,
        integrations=[DjangoIntegration()],
        traces_sample_rate=0.2,
        send_default_pii=False,
    )

# ── Third-party services ──────────────────────────────────────────────────────

PAYSTACK_SECRET_KEY = os.getenv('PAYSTACK_SECRET_KEY', '')
PAYSTACK_PUBLIC_KEY = os.getenv('PAYSTACK_PUBLIC_KEY', '')

RESEND_API_KEY = os.getenv('RESEND_API_KEY', '')
RESEND_FROM_EMAIL = os.getenv('FROM_EMAIL', 'support@pentorax.com')

GEMINI_API_KEY = os.getenv('GEMINI_API_KEY', '')

FRONTEND_URL = os.getenv('FRONTEND_URL', 'http://localhost:3000')
ADMIN_EMAIL = os.getenv('ADMIN_EMAIL', 'sololled7@gmail.com')

# ── Cloudflare R2 ─────────────────────────────────────────────────────────────

R2_ENDPOINT_URL = os.getenv('R2_ENDPOINT_URL', '')
R2_ACCESS_KEY_ID = os.getenv('R2_ACCESS_KEY_ID', '')
R2_SECRET_ACCESS_KEY = os.getenv('R2_SECRET_ACCESS_KEY', '')
R2_BUCKET_NAME = os.getenv('R2_BUCKET_NAME', '')
R2_PUBLIC_URL = os.getenv('R2_PUBLIC_URL', '')
R2_REGION = os.getenv('R2_REGION', 'auto')
