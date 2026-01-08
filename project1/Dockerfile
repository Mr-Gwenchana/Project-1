# Stage 1: Build
FROM node:16.20.0-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

#Stage 2: Run
FROM node:16.20.0-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev

COPY --from=builder /app/dist ./dist
COPY .env .env

EXPOSE 3000

CMD ["node", "dist/main"]
