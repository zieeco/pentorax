.PHONY: help dev build up down logs shell-backend shell-frontend migrate makemigrations test-backend test-frontend lint format clean

help:
	@echo "Pentorax Monorepo Commands"
	@echo "=========================="
	@echo "dev                - Start development environment"
	@echo "build              - Build Docker images"
	@echo "up                 - Start containers"
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

dev:
	docker compose -f docker/docker-compose.dev.yml up

build:
	docker compose -f docker/docker-compose.dev.yml build

up:
	docker compose -f docker/docker-compose.dev.yml up -d

down:
	docker compose -f docker/docker-compose.dev.yml down

logs:
	docker compose -f docker/docker-compose.dev.yml logs -f

shell-backend:
	docker compose -f docker/docker-compose.dev.yml exec backend python manage.py shell

shell-frontend:
	docker compose -f docker/docker-compose.dev.yml exec frontend sh

migrate:
	docker compose -f docker/docker-compose.dev.yml exec backend python manage.py migrate

makemigrations:
	docker compose -f docker/docker-compose.dev.yml exec backend python manage.py makemigrations

test-backend:
	docker compose -f docker/docker-compose.dev.yml exec backend python manage.py test

test-frontend:
	docker compose -f docker/docker-compose.dev.yml exec frontend npm test

lint:
	docker compose -f docker/docker-compose.dev.yml exec backend flake8 .
	docker compose -f docker/docker-compose.dev.yml exec frontend npm run lint

format:
	docker compose -f docker/docker-compose.dev.yml exec backend black .
	docker compose -f docker/docker-compose.dev.yml exec frontend npm run format

clean:
	docker compose -f docker/docker-compose.dev.yml down -v
	docker system prune -f
