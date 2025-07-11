---
title: Какие ограничения есть у бесплатной версии ngrok и как их можно обойти
draft: false
tags:
  - "#NodeJS"
  - "#ngrok"
  - "#туннелирование"
  - "#разработка"
  - "#бесплатные-сервисы"
info:
  - "[Официальная документация ngrok](https://ngrok.com/docs)"
  - "[Ценовая политика ngrok](https://ngrok.com/pricing)"
  - "[Альтернативы ngrok](https://github.com/anderspitman/awesome-tunneling)"
---

# Ограничения бесплатной версии ngrok и способы их обхода

[Ngrok](https://ngrok.com/) — это популярный сервис туннелирования, который позволяет создавать защищенные туннели к локальным серверам, делая их доступными через интернет. Однако бесплатная версия имеет ряд существенных ограничений.

## 1. Ограничение на количество туннелей

### Ограничение

В бесплатной версии ngrok можно создавать **только один туннель одновременно**. Это усложняет разработку приложений, требующих нескольких внешних точек доступа (например, отдельных сервисов API, веб-интерфейса и WebSocket).

### Способы обхода

- **Несколько аккаунтов**: Можно зарегистрировать несколько учетных записей ngrok и запускать клиенты из разных директорий с разными конфигурационными файлами.

  ```bash
  # Для первого аккаунта (порт 3000)
  ./ngrok1/ngrok http 3000

  # Для второго аккаунта (порт 8080)
  ./ngrok2/ngrok http 8080
  ```

- **Использование HTTP-тоннеля с маршрутизацией**: Можно создать один HTTP-туннель и настроить маршрутизацию на бэкенде:

  ```bash
  ngrok http 8000
  ```

  И настроить обратный прокси (например, с использованием Express):

  ```javascript
  const express = require("express")
  const { createProxyMiddleware } = require("http-proxy-middleware")

  const app = express()

  // Маршрутизация разных путей на разные порты
  app.use("/api", createProxyMiddleware({ target: "http://localhost:3000" }))
  app.use("/socket", createProxyMiddleware({ target: "http://localhost:5000" }))
  app.use("/", createProxyMiddleware({ target: "http://localhost:8080" }))

  app.listen(8000)
  ```

- **Платные тарифы**: Для профессионального использования стоит рассмотреть возможность перехода на платную версию, начиная от $10/месяц, которая позволяет создавать несколько туннелей.

## 2. Динамические URL-адреса

### Ограничение

При каждом перезапуске ngrok генерирует **новый случайный субдомен** (например, `a1b2c3.ngrok.io`). Это создает проблемы, если вам нужно поделиться ссылкой с клиентами или интегрировать сервис с внешними API.

### Способы обхода

- **Автоматическое обновление URL**: Создайте скрипт, который будет извлекать новый URL из API ngrok и обновлять его в вашем приложении:

  ```javascript
  const axios = require("axios")

  async function updateNgrokUrl() {
    try {
      const response = await axios.get("http://localhost:4040/api/tunnels")
      const tunnelUrl = response.data.tunnels[0].public_url
      console.log("Новый URL ngrok:", tunnelUrl)

      // Обновите URL в вашей конфигурации или базе данных
      // updateConfigUrl(tunnelUrl);
    } catch (error) {
      console.error("Ошибка получения URL ngrok:", error)
    }
  }

  // Вызов при запуске ngrok
  updateNgrokUrl()
  ```

- **Webhook с динамическим URL**: Если вы интегрируетесь с сервисами через вебхуки, обновляйте URL вебхука при каждом перезапуске ngrok:

  ```javascript
  const axios = require("axios")

  async function updateWebhookUrl() {
    const ngrokUrl = await getNgrokUrl() // Функция из предыдущего примера

    // Обновите URL вебхука в стороннем сервисе
    await axios.post(
      "https://api.example.com/webhooks/update",
      {
        url: `${ngrokUrl}/webhook`,
      },
      {
        headers: { Authorization: "Bearer YOUR_API_KEY" },
      },
    )

    console.log("Webhook URL обновлен")
  }
  ```

- **Платные тарифы**: В платных планах ngrok доступны постоянные и пользовательские поддомены.

## 3. Ограничение времени сессии

### Ограничение

Сессии ngrok в бесплатной версии **автоматически истекают через 2 часа** (это ограничение было изменено — раньше было 8 часов).

### Способы обхода

- **Автоматический перезапуск**: Настройте скрипт или задачу cron для перезапуска ngrok:

  ```bash
  # Скрипт restart_ngrok.sh
  #!/bin/bash

  pkill ngrok
  sleep 2
  nohup ngrok http 3000 > /dev/null 2>&1 &

  # Для перезапуска каждые 110 минут добавьте в crontab:
  # */110 * * * * /path/to/restart_ngrok.sh
  ```

  или в Node.js:

  ```javascript
  const { exec } = require("child_process")
  const RESTART_INTERVAL = 110 * 60 * 1000 // 110 минут

  function restartNgrok() {
    exec("pkill ngrok", () => {
      setTimeout(() => {
        exec("ngrok http 3000")
        console.log("Ngrok перезапущен:", new Date())
      }, 2000)
    })
  }

  // Запускать перезапуск каждые 110 минут
  setInterval(restartNgrok, RESTART_INTERVAL)
  ```

- **Мониторинг и перезапуск**: Используйте инструменты вроде PM2 для мониторинга и автоматического перезапуска ngrok:

  ```bash
  npm install -g pm2
  pm2 start "ngrok http 3000" --name "ngrok-tunnel"

  # Настройка перезапуска
  pm2 start restart_ngrok.js
  ```

- **Платные тарифы**: В платных планах ngrok нет ограничений по времени сессии.

## 4. Ограничение пропускной способности

### Ограничение

Бесплатная версия имеет **ограничение на трафик в 40 соединений в минуту**. При превышении лимита соединения начнут отклоняться с ошибкой 429 (Too Many Requests).

### Способы обхода

- **Кэширование и оптимизация запросов**: Уменьшите количество запросов к туннелю:

  - Используйте кэширование на стороне клиента
  - Оптимизируйте API для минимизации количества запросов
  - Используйте технологии вроде GraphQL для объединения запросов

- **Распределение нагрузки**: Если вы используете несколько аккаунтов ngrok, распределите нагрузку между ними:

  ```javascript
  // Простая балансировка на стороне клиента
  const NGROK_URLS = ["https://a1b2c3.ngrok.io", "https://d4e5f6.ngrok.io"]

  function getNextUrl() {
    // Простое поочередное распределение
    const url = NGROK_URLS.shift()
    NGROK_URLS.push(url)
    return url
  }

  async function makeRequest(path) {
    const baseUrl = getNextUrl()
    return axios.get(`${baseUrl}${path}`)
  }
  ```

- **Платные тарифы**: В платных планах доступна более высокая пропускная способность.

## 5. Ограничения безопасности

### Ограничение

Бесплатная версия не предоставляет:

- Защиту туннелей паролем
- Поддержку пользовательских SSL-сертификатов
- Контроль IP и строгую аутентификацию

### Способы обхода

- **Реализация аутентификации на уровне приложения**: Добавьте базовую HTTP-аутентификацию в ваше приложение:

  ```javascript
  // Express с базовой аутентификацией
  const express = require("express")
  const basicAuth = require("express-basic-auth")

  const app = express()

  app.use(
    basicAuth({
      users: { admin: "supersecret" },
      challenge: true,
    }),
  )

  app.get("/", (req, res) => {
    res.send("Защищенный контент")
  })

  app.listen(3000)
  ```

- **Использование JWT или других механизмов авторизации**: Реализуйте более сложные механизмы авторизации:

  ```javascript
  const jwt = require("jsonwebtoken")

  // Middleware для проверки JWT
  function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1]

    if (!token) return res.sendStatus(401)

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(403)
      req.user = user
      next()
    })
  }

  // Применение к защищенным маршрутам
  app.get("/protected", authenticateToken, (req, res) => {
    res.json({ data: "Защищенные данные" })
  })
  ```

- **Платные тарифы**: В платных планах доступны встроенные механизмы защиты и аутентификации, включая TLS-сертификаты и контроль доступа на основе IP.

## 6. Ограниченный доступ к API

### Ограничение

Бесплатная версия имеет ограниченный доступ к API ngrok, что затрудняет автоматизацию и интеграцию с другими инструментами.

### Способы обхода

- **Локальный API ngrok**: Даже в бесплатной версии вы можете использовать локальный API, доступный на `http://localhost:4040/api`:

  ```javascript
  const axios = require("axios")

  async function getNgrokInfo() {
    try {
      // Получение списка активных туннелей
      const tunnelsResponse = await axios.get("http://localhost:4040/api/tunnels")
      console.log("Активные туннели:", tunnelsResponse.data)

      // Получение последних запросов
      const requestsResponse = await axios.get("http://localhost:4040/api/requests/http")
      console.log("Последние запросы:", requestsResponse.data)
    } catch (error) {
      console.error("Ошибка доступа к API ngrok:", error)
    }
  }
  ```

- **Использование альтернативных инструментов**: Рассмотрите инструменты с более открытым API:

  - [localtunnel](https://github.com/localtunnel/localtunnel)
  - [Cloudflare Tunnel](https://www.cloudflare.com/products/tunnel/)
  - [Serveo](https://serveo.net/)
  - [PageKite](https://pagekite.net/)

- **Платные тарифы**: В платных планах доступен полный доступ к API.

## 7. Альтернативы ngrok

Если ограничения бесплатной версии ngrok слишком критичны для вашего проекта, рассмотрите следующие альтернативы:

### Бесплатные альтернативы:

- **localtunnel**: Простой инструмент с меньшим количеством ограничений:

  ```bash
  npm install -g localtunnel
  lt --port 3000
  ```

- **Serveo**: Не требует установки клиента, работает через SSH:

  ```bash
  ssh -R 80:localhost:3000 serveo.net
  ```

- **Cloudflare Tunnel** (ограниченная бесплатная версия):
  ```bash
  # Установка
  brew install cloudflared
  # Создание туннеля
  cloudflared tunnel --url http://localhost:3000
  ```

### Платные альтернативы с бесплатными планами:

- **PageKite**: Больше возможностей в бесплатном плане с открытым исходным кодом
- **ngrok Pro**: Начиная от $10/месяц
- **Cloudflare Tunnel Pro**: Расширенные возможности за $5/месяц

## Заключение

Бесплатная версия ngrok отлично подходит для быстрой разработки и тестирования, но имеет существенные ограничения для продакшн-использования. Для большинства ограничений существуют обходные пути, но они требуют дополнительных усилий и не всегда удобны.

Для серьезных проектов рекомендуется:

1. Перейти на платный план ngrok
2. Использовать альтернативные сервисы с более подходящими условиями
3. Настроить собственный VPS с прямой маршрутизацией для постоянных проектов

---

[[002 Node.js|Назад]]
