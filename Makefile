.PHONY: help dev build up down logs shell-backend shell-frontend \
        migrate makemigrations test-backend test-frontend lint format clean \
        lock sync add add-dev rebuild

help:
	@echo "Pentorax Monorepo Commands"
	@echo "=========================="
	@echo "dev                - Start development environment (with rebuild)"
	@echo "rebuild            - Force rebuild backend and start"
	@echo "build              - Build Docker images"
	@echo "up                 - Start containers in detached mode"
	@echo "down               - Stop containers"
	@echo "logs               - View logs"
	@echo "shell-backend      - Open Django shell"
	@echo "shell-frontend     - Open frontend container shell"
	@echo "migrate            - Run Django migrations"
	@echo "makemigrations     - Create Django migrations"
	@echo "test-backend       - Run Django tests"
	@echo "test-frontend      - Run frontend tests"
	@echo "lint               - Lint code"
	@echo "format             - Format code"
	@echo "clean              - Clean up containers and volumes"
	@echo ""
	@echo "uv / dependency commands (local)"
	@echo "================================"
	@echo "lock               - Regenerate uv.lock"
	@echo "sync               - Sync local venv with lockfile"
	@echo "add pkg=<name>     - Add a dependency"
	@echo "add-dev pkg=<name> - Add a dev dependency"

# ── Docker Compose Command ───────────────────────────────────────────────────

COMPOSE = docker compose -f docker/docker-compose.dev.yml

# ── Main Development Commands ────────────────────────────────────────────────

dev:
	$(COMPOSE) up --build

rebuild:
	$(COMPOSE) down -v
	$(COMPOSE) build --no-cache backend
	$(COMPOSE) up

build:
	$(COMPOSE) build --no-cache

up:
	$(COMPOSE) up -d

down:
	$(COMPOSE) down

logs:
	$(COMPOSE) logs -f

# ── Backend Commands ─────────────────────────────────────────────────────────

shell-backend:
	$(COMPOSE) exec backend python manage.py shell

shell-frontend:
	$(COMPOSE) exec frontend sh

migrate:
	$(COMPOSE) exec backend python manage.py migrate

makemigrations:
	$(COMPOSE) exec backend python manage.py makemigrations

test-backend:
	$(COMPOSE) exec backend python -m pytest

# ── Frontend Commands ────────────────────────────────────────────────────────

test-frontend:
	$(COMPOSE) exec frontend npm test

lint:
	$(COMPOSE) exec backend flake8 .
	$(COMPOSE) exec frontend npm run lint

format:
	$(COMPOSE) exec backend black .
	$(COMPOSE) exec frontend npm run format

# ── Cleanup ──────────────────────────────────────────────────────────────────

clean:
	$(COMPOSE) down -v
	docker volume rm -f pentorax_backend_venv 2>/dev/null || true

# ── uv dependency management (run locally on host) ───────────────────────────

lock:
	uv lock

sync:
	uv sync

add:
	uv add $(pkg)

add-dev:
	uv add --dev $(pkg)
	