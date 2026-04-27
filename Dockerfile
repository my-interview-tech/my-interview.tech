# Многостадийная сборка: Node → public/, затем nginx отдаёт статику.
# Базовые образы через public.ecr.aws/docker/library — те же official images, без Docker Hub
# anonymous rate limit (429) на VPS при docker build.
# Конфиг веб-сервера — только deploy/docker/nginx/default.conf (не хостовый nginx на VPS).
FROM public.ecr.aws/docker/library/node:22-bookworm-slim AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --ignore-scripts
COPY . .

RUN npm run build -- --concurrency=1

FROM public.ecr.aws/docker/library/nginx:1.27-alpine
COPY deploy/docker/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/public /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
