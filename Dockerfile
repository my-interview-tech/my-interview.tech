# Многостадийная сборка: Node → public/, затем nginx отдаёт статику.
# Конфиг веб-сервера — только deploy/docker/nginx/default.conf (не хостовый nginx на VPS).
# Базовый образ nginx:1.27-alpine уже содержит /etc/nginx/nginx.conf с include conf.d/*.conf.
FROM node:22-bookworm-slim AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --ignore-scripts
COPY . .
RUN npm run build

FROM nginx:1.27-alpine
COPY deploy/docker/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/public /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
