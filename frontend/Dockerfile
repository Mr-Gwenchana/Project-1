# Stage 1: Build
FROM oven/bun:1.3.5 AS builder
WORKDIR /app

COPY package.json bun.lock* ./
RUN bun install --frozen-lockfile

COPY . .
ENV NODE_ENV=production
RUN bun run build

# Stage 2: Run
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3001
ENV HOSTNAME=0.0.0.0

COPY --from=builder /app/.next/standalone* ./
COPY --from=builder /app/.next/static* ./.next/static
COPY --from=builder /app/public* ./public
COPY --from=builder /app/.env* ./

EXPOSE 3001

CMD ["node", "server.js"]
