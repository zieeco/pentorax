# Multi-stage Dockerfile for Next.js frontend

# ==================== BASE STAGE ====================
FROM node:20-alpine AS base

WORKDIR /app

# ==================== DEVELOPMENT STAGE ====================
FROM base AS development

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3001

CMD ["npm", "run", "dev"]

# ==================== PRODUCTION STAGE ====================
FROM base AS production

COPY package*.json ./

RUN npm ci --only=production

COPY . .

RUN npm run build

EXPOSE 3001

CMD ["npm", "start"]
