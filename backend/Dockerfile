# Multi-stage Dockerfile for Django backend with uv

# ==================== BASE STAGE ====================
FROM python:3.12-slim AS base

ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    UV_NO_CACHE=1 \
    VIRTUAL_ENV=/venv \
    PATH="/venv/bin:$PATH"

WORKDIR /app

# Install system dependencies + uv
RUN apt-get update && apt-get install -y \
    postgresql-client \
    curl \
    && rm -rf /var/lib/apt/lists/* \
    && curl -LsSf https://astral.sh/uv/install.sh | sh \
    && mv /root/.local/bin/uv /usr/local/bin/uv

# ==================== DEVELOPMENT STAGE ====================
FROM base AS development

WORKDIR /app

# Copy dependency files first for better caching
COPY pyproject.toml uv.lock* /app/

# Force uv to use our protected /venv and install dependencies
RUN uv venv /venv && \
    uv sync --active

# Copy the rest of the code
COPY . /app/

# Critical: Tell uv to respect our venv path (this fixes the .venv warnings)
ENV VIRTUAL_ENV=/venv \
    PATH="/venv/bin:$PATH" \
    PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PYTHONPATH=/app \
    UV_PROJECT_ENVIRONMENT=/venv

EXPOSE 8080

# Improved CMD for development with editable install (recommended)
CMD ["uv", "run", "--with-editable", ".", "python", "manage.py", "runserver", "0.0.0.0:8080"]

# ==================== PRODUCTION STAGE ====================
FROM base AS production

WORKDIR /app

COPY pyproject.toml uv.lock* /app/

# Production install only (no dev group)
RUN uv venv /venv && \
    uv sync --extra prod --no-group dev

COPY . /app/

RUN python manage.py collectstatic --noinput

EXPOSE 8080

CMD ["gunicorn", "--bind", "0.0.0.0:8080", "--workers", "4", "config.wsgi:application"]
