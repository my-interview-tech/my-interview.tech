---
title: Какие оптимизации обычно применяются в продакшн-среде для Express
draft: false
tags:
  - "#NodeJS"
  - "#Express"
  - "#оптимизация"
  - "#производительность"
  - "#backend"
  - "#продакшн"
  - "#масштабирование"
info:
  - "[Официальная документация Express.js по работе в продакшн](https://expressjs.com/ru/advanced/best-practice-performance.html)"
  - "[Руководство по безопасности Express.js](https://expressjs.com/ru/advanced/best-practice-security.html)"
  - "[Node.js Performance Guide](https://nodejs.org/en/docs/guides/dont-block-the-event-loop/)"
  - "[Express.js - Production Best Practices: Performance and Reliability](https://expressjs.com/en/advanced/best-practice-performance.html)"
---

# Оптимизации Express.js для продакшн-среды

В продакшн-среде для Express.js приложений применяются различные оптимизации для повышения производительности, безопасности и стабильности. Рассмотрим основные из них с примерами реализации.

## 1. Настройка переменной окружения NODE_ENV

Установка `NODE_ENV=production` активирует внутренние оптимизации Express и используемых библиотек, что может повысить производительность до 3 раз.

```bash
# В командной строке
NODE_ENV=production node app.js

# В package.json
{
  "scripts": {
    "start": "NODE_ENV=production node app.js"
  }
}

# В коде приложения
process.env.NODE_ENV = 'production';
```

## 2. Включение сжатия (Gzip/Brotli)

Сжатие уменьшает размер передаваемых ответов, снижая потребление трафика и ускоряя загрузку.

```javascript
const compression = require("compression")

// Включение сжатия для всех запросов
app.use(compression())

// Или с настройками
app.use(
  compression({
    level: 6, // уровень сжатия (от 1 до 9)
    threshold: 1024, // минимальный размер для сжатия (в байтах)
    filter: (req, res) => {
      // Не сжимать уже сжатые форматы (изображения, видео)
      const contentType = res.getHeader("Content-Type")
      if (contentType && contentType.match(/image|video|audio/)) {
        return false
      }
      return compression.filter(req, res)
    },
  }),
)
```

## 3. HTTP кеширование статических ресурсов

Правильно настроенные заголовки кеширования снижают количество запросов к серверу.

```javascript
const express = require("express")
const app = express()

// Настройка статики с кешированием на 1 день (86400000 мс)
app.use(
  express.static("public", {
    maxAge: "1d",
    etag: true,
    lastModified: true,
  }),
)

// Более тонкая настройка для разных типов файлов
app.use(
  "/assets",
  express.static("assets", {
    maxAge: "30d", // Долгосрочное кеширование для редко изменяемых ресурсов
    immutable: true, // Указывает, что ресурс никогда не изменится
  }),
)

app.use(
  "/images",
  express.static("images", {
    maxAge: "7d", // Кеширование на неделю для изображений
  }),
)

// Использование ETag для эффективного кеширования
app.set("etag", "strong") // Использование сильных ETag
```

## 4. Использование CDN для статики

Размещение статических ресурсов на CDN снижает нагрузку на сервер и ускоряет доставку контента пользователям.

```javascript
// В коде: использование CDN URL в шаблонах
app.locals.staticUrl =
  process.env.NODE_ENV === "production" ? "https://cdn.example.com/assets" : "/assets"

// В шаблоне (например, с EJS)
// <link rel="stylesheet" href="<%= staticUrl %>/styles.css">
```

## 5. Оптимизация работы с базами данных

### Использование пулов соединений

```javascript
// MongoDB с Mongoose
const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost/myapp", {
  poolSize: 10, // Оптимальное значение зависит от нагрузки
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

// PostgreSQL с node-postgres
const { Pool } = require("pg")
const pool = new Pool({
  max: 20, // максимальное количество клиентов в пуле
  idleTimeoutMillis: 30000, // таймаут неактивных соединений
  connectionTimeoutMillis: 2000, // таймаут установки соединения
})
```

### Оптимизация запросов

```javascript
// Пагинация для уменьшения объема данных
app.get("/users", async (req, res) => {
  const page = parseInt(req.query.page) || 1
  const limit = parseInt(req.query.limit) || 10
  const skip = (page - 1) * limit

  try {
    const users = await User.find()
      .select("name email") // Выбираем только нужные поля
      .limit(limit)
      .skip(skip)
      .lean() // Возвращает простой JS-объект вместо документа Mongoose

    const total = await User.countDocuments()

    res.json({
      users,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})
```

## 6. Кеширование на стороне сервера

Использование Redis или другого in-memory хранилища для кеширования результатов запросов и вычислений.

```javascript
const redis = require("redis")
const { promisify } = require("util")
const client = redis.createClient()

// Преобразуем колбэки Redis в промисы
const getAsync = promisify(client.get).bind(client)
const setAsync = promisify(client.set).bind(client)

// Middleware для кеширования ответов API
async function cacheMiddleware(req, res, next) {
  // Создаем ключ на основе URL и параметров запроса
  const cacheKey = `api:${req.originalUrl}`

  try {
    // Проверяем наличие данных в кеше
    const cachedData = await getAsync(cacheKey)

    if (cachedData) {
      // Возвращаем закешированные данные
      return res.json(JSON.parse(cachedData))
    }

    // Сохраняем оригинальный метод res.json
    const originalJson = res.json.bind(res)

    // Переопределяем метод json для кеширования ответа
    res.json = async (data) => {
      // Кешируем данные на 5 минут (300 секунд)
      await setAsync(cacheKey, JSON.stringify(data), "EX", 300)
      // Вызываем оригинальный метод
      return originalJson(data)
    }

    next()
  } catch (err) {
    next(err)
  }
}

// Применение middleware к маршруту
app.get("/api/products", cacheMiddleware, async (req, res) => {
  // Обработка запроса...
  const products = await Product.find()
  res.json(products)
})
```

## 7. Кластеризация процессов Node.js

Для использования всех ядер процессора и повышения доступности приложения.

```javascript
const cluster = require("cluster")
const os = require("os")
const numCPUs = os.cpus().length

if (cluster.isMaster) {
  console.log(`Мастер-процесс ${process.pid} запущен`)

  // Создаем рабочие процессы
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork()
  }

  // Обработка завершения рабочего процесса
  cluster.on("exit", (worker, code, signal) => {
    console.log(`Рабочий процесс ${worker.process.pid} завершился`)
    // Перезапускаем рабочий процесс
    cluster.fork()
  })
} else {
  // Рабочие процессы запускают Express-сервер
  const express = require("express")
  const app = express()

  // Настройка приложения...

  app.listen(3000, () => {
    console.log(`Рабочий процесс ${process.pid} слушает порт 3000`)
  })
}
```

Альтернативный вариант с использованием PM2:

```bash
# Установка PM2
npm install -g pm2

# Запуск приложения в кластерном режиме
pm2 start app.js -i max

# С настройками в экосистемном файле
# ecosystem.config.js
module.exports = {
  apps: [{
    name: "app",
    script: "./app.js",
    instances: "max",
    exec_mode: "cluster",
    watch: false,
    autorestart: true,
    max_memory_restart: "1G"
  }]
}

# Запуск приложения через экосистемный файл
pm2 start ecosystem.config.js
```

## 8. Обработка ошибок и логирование

### Централизованная обработка ошибок

```javascript
// Централизованный обработчик ошибок
app.use((err, req, res, next) => {
  // Логируем ошибку
  console.error(err.stack)

  // В продакшн не показываем детали ошибки пользователю
  const status = err.status || 500
  const message =
    process.env.NODE_ENV === "production" ? "Произошла внутренняя ошибка сервера" : err.message

  res.status(status).json({
    error: {
      message,
      status,
    },
  })
})
```

### Настройка логирования с Winston или Morgan

```javascript
const winston = require("winston")
const morgan = require("morgan")

// Настройка Morgan для HTTP-логирования
if (process.env.NODE_ENV !== "test") {
  app.use(
    morgan("combined", {
      skip: (req, res) => res.statusCode < 400, // Логировать только ошибки
      stream: {
        write: (message) => logger.http(message.trim()),
      },
    }),
  )
}

// Настройка Winston
const logger = winston.createLogger({
  level: process.env.NODE_ENV === "production" ? "info" : "debug",
  format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
  transports: [
    // Логирование в консоль в разработке
    new winston.transports.Console({
      format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
    }),
    // Логирование в файл
    new winston.transports.File({
      filename: "logs/error.log",
      level: "error",
    }),
    new winston.transports.File({
      filename: "logs/combined.log",
    }),
  ],
})

// Экспорт для использования в других файлах
module.exports = logger
```

## 9. Использование Reverse Proxy

Размещение Express-приложения за Nginx или Apache для дополнительной оптимизации и защиты.

```nginx
# Пример конфигурации NGINX
http {
  # Ограничение размера буфера для тела запроса
  client_max_body_size 10M;

  # Настройка кеширования
  proxy_cache_path /path/to/cache levels=1:2 keys_zone=my_cache:10m max_size=10g inactive=60m;

  # Настройка сжатия
  gzip on;
  gzip_comp_level 5;
  gzip_min_length 256;
  gzip_proxied any;
  gzip_types
    application/javascript
    application/json
    application/xml
    text/css
    text/plain
    text/xml;

  server {
    listen 80;
    server_name example.com;

    # Перенаправление на HTTPS
    return 301 https://$host$request_uri;
  }

  server {
    listen 443 ssl http2;
    server_name example.com;

    # SSL-сертификаты
    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;

    # Настройки безопасности
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Content-Type-Options nosniff;
    add_header X-Frame-Options SAMEORIGIN;
    add_header X-XSS-Protection "1; mode=block";

    # Статические файлы
    location /static/ {
      root /path/to/static;
      expires 30d;
      add_header Cache-Control "public, max-age=2592000, immutable";
    }

    # Проксирование запросов к Express
    location / {
      proxy_pass http://localhost:3000;
      proxy_http_version 1.1;
      proxy_set_header Upgrade $http_upgrade;
      proxy_set_header Connection 'upgrade';
      proxy_set_header Host $host;
      proxy_set_header X-Real-IP $remote_addr;
      proxy_cache my_cache;
      proxy_cache_bypass $http_pragma;
      proxy_cache_revalidate on;
      proxy_cache_min_uses 1;
      proxy_cache_valid 200 302 10m;
      proxy_cache_valid 404 1m;
    }
  }
}
```

## 10. Мониторинг и диагностика

Настройка мониторинга для отслеживания производительности и проблем в реальном времени.

```javascript
// Встроенный модуль для мониторинга производительности
const { performance, PerformanceObserver } = require("perf_hooks")

// Наблюдатель за метриками производительности
const obs = new PerformanceObserver((items) => {
  const entries = items.getEntries()
  entries.forEach((entry) => {
    console.log(`${entry.name}: ${entry.duration}ms`)
  })
})
obs.observe({ entryTypes: ["measure"] })

// Middleware для измерения времени выполнения запросов
app.use((req, res, next) => {
  const start = `${req.method}-${req.url}-start`
  const end = `${req.method}-${req.url}-end`

  performance.mark(start)

  // Перехватываем окончание запроса
  res.on("finish", () => {
    performance.mark(end)
    performance.measure(`${req.method} ${req.url}`, start, end)
  })

  next()
})

// Маршрут для проверки работоспособности (health check)
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    cpuUsage: process.cpuUsage(),
  })
})
```

## 11. Балансировка нагрузки

Распределение запросов между несколькими серверами или экземплярами приложения.

```javascript
// Для горизонтального масштабирования можно использовать
// внешние инструменты (AWS ELB, GCP Load Balancer, Nginx)
// или программные решения (HAProxy, Traefik)

// Пример интеграции с AWS ELB в nodejs-приложении:
const express = require("express")
const app = express()

// Middleware для поддержки sticky sessions
app.use((req, res, next) => {
  // Передаем cookie с идентификатором сессии
  if (!req.cookies.sessionAffinity) {
    res.cookie("sessionAffinity", generateSessionId(), {
      maxAge: 24 * 60 * 60 * 1000, // 1 день
      httpOnly: true,
    })
  }
  next()
})

// Для простого health-проверки load balancer'ом
app.get("/elb-health-check", (req, res) => {
  res.status(200).send("OK")
})
```

## 12. Безопасность

### Защита от распространенных уязвимостей

```javascript
const helmet = require("helmet")

// Использование helmet для защиты от веб-уязвимостей
app.use(helmet())

// Более тонкая настройка
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "trusted-cdn.com"],
        styleSrc: ["'self'", "trusted-cdn.com", "'unsafe-inline'"],
      },
    },
    hsts: {
      maxAge: 15552000, // 180 дней
      includeSubDomains: true,
      preload: true,
    },
  }),
)

// Защита от CSRF атак
const csurf = require("csurf")
app.use(csurf({ cookie: true }))

// Ограничение числа запросов (Rate Limiting)
const rateLimit = require("express-rate-limit")

app.use(
  "/api/",
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 минут
    max: 100, // макс. 100 запросов на IP
    message: "Слишком много запросов, попробуйте позже",
  }),
)

// Более строгие ограничения для критических эндпоинтов
app.use(
  "/api/auth/",
  rateLimit({
    windowMs: 60 * 60 * 1000, // 1 час
    max: 5, // макс. 5 попыток в час
    message: "Слишком много попыток авторизации",
  }),
)
```

### Валидация входных данных

```javascript
const { body, validationResult } = require("express-validator")

app.post(
  "/api/users",
  // Валидация входных данных
  [
    body("email").isEmail().normalizeEmail(),
    body("password").isLength({ min: 8 }),
    body("name").trim().notEmpty(),
  ],
  (req, res) => {
    // Проверка результатов валидации
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    // Обработка запроса...
  },
)
```

### Ограничение размера запроса

Защита от DoS-атак путем ограничения размера тела запроса:

```javascript
// Ограничение размера JSON-запросов
app.use(express.json({ limit: "1mb" }))

// Ограничение размера данных формы
app.use(
  express.urlencoded({
    extended: true,
    limit: "1mb",
  }),
)

// Более тонкая настройка для разных маршрутов
app.post("/api/small-data", express.json({ limit: "100kb" }))
app.post("/api/uploads", express.json({ limit: "5mb" }))
```

## 13. Управление соединениями

Правильное управление соединениями уменьшает нагрузку на сервер и предотвращает утечки ресурсов:

```javascript
// Настройка таймаутов сервера для предотвращения зависания соединений
const server = app.listen(3000)

// Установка таймаута сокета (30 секунд)
server.timeout = 30000

// Настройка keep-alive соединений
server.keepAliveTimeout = 65000 // мс
server.headersTimeout = 66000 // мс (должен быть больше keepAliveTimeout)

// Ограничение максимального количества ожидающих соединений
server.maxConnections = 1000

// Graceful shutdown при получении сигнала
process.on("SIGTERM", () => {
  console.log("Получен сигнал SIGTERM, закрытие HTTP-сервера")

  server.close(() => {
    console.log("HTTP-сервер закрыт")
    // Закрываем соединения с базами данных и другими сервисами
    mongoose.connection.close()
    process.exit(0)
  })

  // Если сервер не закрылся за 30 секунд, принудительно завершаем процесс
  setTimeout(() => {
    console.error("Не удалось корректно завершить работу, принудительное завершение")
    process.exit(1)
  }, 30000)
})
```

## Заключение

Оптимизация Express.js приложений для продакшн-среды включает множество аспектов, от настройки самого веб-сервера до организации инфраструктуры. Ключевые направления оптимизации:

1. **Производительность**: сжатие, кеширование, оптимизация запросов
2. **Масштабируемость**: кластеризация, балансировка нагрузки
3. **Безопасность**: защита от уязвимостей, валидация данных
4. **Надежность**: обработка ошибок, мониторинг
5. **Инфраструктура**: использование CDN, Reverse Proxy
6. **Управление ресурсами**: контроль соединений, предотвращение утечек памяти

Применение этих оптимизаций поможет создать высокопроизводительное, безопасное и надежное Express.js приложение для промышленной эксплуатации.

---

[[002 Node.js|Назад]]
