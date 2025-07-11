---
title: Модуль HTTP в Node.js и создание веб-сервера
draft: false
tags:
  - "#NodeJS"
  - "#HTTP"
  - "#веб-сервер"
  - "#backend"
  - "#REST"
info:
---

`http` - это встроенный модуль Node.js, который предоставляет функционал для создания HTTP серверов и выполнения HTTP запросов. Этот модуль является основой для многих веб-фреймворков, таких как Express.js.

## Создание базового HTTP сервера

```javascript
const http = require("http")

// Создание сервера
const server = http.createServer((req, res) => {
  // Установка статус-кода и заголовков
  res.statusCode = 200
  res.setHeader("Content-Type", "text/plain")

  // Отправка ответа
  res.end("Привет, мир!")
})

// Запуск сервера на порту 3000
server.listen(3000, "localhost", () => {
  console.log("Сервер запущен на http://localhost:3000/")
})
```

## Обработка HTTP запросов

### Получение информации о запросе

```javascript
const http = require("http")

const server = http.createServer((req, res) => {
  // Информация о запросе
  console.log("Метод:", req.method)
  console.log("URL:", req.url)
  console.log("Заголовки:", req.headers)

  // Обработка в зависимости от URL
  if (req.url === "/") {
    res.statusCode = 200
    res.setHeader("Content-Type", "text/plain")
    res.end("Главная страница")
  } else if (req.url === "/api") {
    res.statusCode = 200
    res.setHeader("Content-Type", "application/json")
    res.end(JSON.stringify({ message: "API endpoint" }))
  } else {
    res.statusCode = 404
    res.setHeader("Content-Type", "text/plain")
    res.end("Страница не найдена")
  }
})

server.listen(3000)
```

### Работа с разными HTTP методами

```javascript
const http = require("http")

const server = http.createServer((req, res) => {
  // Маршрутизация на основе метода и URL
  if (req.url === "/api/users") {
    switch (req.method) {
      case "GET":
        res.statusCode = 200
        res.setHeader("Content-Type", "application/json")
        res.end(JSON.stringify([{ id: 1, name: "Пользователь 1" }]))
        break
      case "POST":
        // Обработка POST запроса
        let body = ""
        req.on("data", (chunk) => {
          body += chunk.toString()
        })
        req.on("end", () => {
          try {
            const data = JSON.parse(body)
            res.statusCode = 201
            res.setHeader("Content-Type", "application/json")
            res.end(JSON.stringify({ message: "Пользователь создан", data }))
          } catch (error) {
            res.statusCode = 400
            res.end("Неверный формат JSON")
          }
        })
        break
      default:
        res.statusCode = 405
        res.end("Метод не поддерживается")
    }
  } else {
    res.statusCode = 404
    res.end("Не найдено")
  }
})

server.listen(3000)
```

## Отправка HTTP запросов

### GET запрос

```javascript
const http = require("http")

const options = {
  hostname: "example.com",
  port: 80,
  path: "/api/data",
  method: "GET",
}

const req = http.request(options, (res) => {
  console.log(`Статус: ${res.statusCode}`)

  let data = ""

  // Получение данных
  res.on("data", (chunk) => {
    data += chunk
  })

  // Обработка завершения запроса
  res.on("end", () => {
    console.log("Данные:", data)
    try {
      const parsedData = JSON.parse(data)
      console.log("Обработанные данные:", parsedData)
    } catch (e) {
      console.error("Ошибка парсинга JSON:", e)
    }
  })
})

// Обработка ошибок
req.on("error", (error) => {
  console.error("Ошибка запроса:", error)
})

// Завершение запроса
req.end()
```

### POST запрос с данными

```javascript
const http = require("http")

const data = JSON.stringify({
  name: "Иван",
  age: 30,
})

const options = {
  hostname: "example.com",
  port: 80,
  path: "/api/users",
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Content-Length": data.length,
  },
}

const req = http.request(options, (res) => {
  let responseData = ""

  res.on("data", (chunk) => {
    responseData += chunk
  })

  res.on("end", () => {
    console.log(`Статус: ${res.statusCode}`)
    console.log("Ответ:", responseData)
  })
})

req.on("error", (error) => {
  console.error("Ошибка:", error)
})

// Отправка данных
req.write(data)
req.end()
```

## Создание прокси-сервера

```javascript
const http = require("http")

// Создание прокси-сервера
const proxy = http.createServer((clientReq, clientRes) => {
  const options = {
    hostname: "example.com",
    port: 80,
    path: clientReq.url,
    method: clientReq.method,
    headers: clientReq.headers,
  }

  const proxyReq = http.request(options, (proxyRes) => {
    // Копирование заголовков ответа
    Object.keys(proxyRes.headers).forEach((key) => {
      clientRes.setHeader(key, proxyRes.headers[key])
    })
    clientRes.writeHead(proxyRes.statusCode)

    // Передача данных клиенту
    proxyRes.pipe(clientRes)
  })

  // Передача данных от клиента к удаленному серверу
  clientReq.pipe(proxyReq)

  proxyReq.on("error", (err) => {
    console.error("Ошибка прокси:", err)
    clientRes.statusCode = 500
    clientRes.end("Ошибка прокси-сервера")
  })
})

proxy.listen(8080, () => {
  console.log("Прокси-сервер запущен на порту 8080")
})
```

## Обработка ошибок сервера

```javascript
const http = require("http")

const server = http.createServer((req, res) => {
  try {
    // Обработка запроса
    if (req.url === "/error") {
      throw new Error("Тестовая ошибка")
    }

    res.statusCode = 200
    res.end("Сервер работает нормально")
  } catch (err) {
    // Логирование ошибки
    console.error("Ошибка обработки запроса:", err)

    // Отправка ответа об ошибке клиенту
    res.statusCode = 500
    res.setHeader("Content-Type", "text/plain")
    res.end("Внутренняя ошибка сервера")
  }
})

// Обработка необработанных исключений
process.on("uncaughtException", (err) => {
  console.error("Необработанное исключение:", err)
  // В продакшене здесь можно логировать ошибку и перезапускать сервер
})

server.on("error", (err) => {
  console.error("Ошибка сервера:", err)
  if (err.code === "EADDRINUSE") {
    console.log("Порт уже используется, пробуем другой порт...")
    // Попытка запустить на другом порту
    server.listen(3001)
  }
})

server.listen(3000, () => {
  console.log("Сервер запущен на http://localhost:3000/")
})
```

## Работа с HTTPS

Для HTTPS запросов и серверов можно использовать встроенный модуль `https`:

```javascript
const https = require("https")
const fs = require("fs")

// Чтение SSL-сертификатов
const options = {
  key: fs.readFileSync("private-key.pem"),
  cert: fs.readFileSync("certificate.pem"),
}

// Создание HTTPS сервера
const server = https.createServer(options, (req, res) => {
  res.statusCode = 200
  res.setHeader("Content-Type", "text/plain")
  res.end("Защищенный сервер")
})

server.listen(443, () => {
  console.log("HTTPS сервер запущен на порту 443")
})
```

## Основные особенности HTTP модуля

1. **Низкоуровневое API** - HTTP модуль предоставляет базовый функционал, который часто требует дополнительной обработки для создания полноценных приложений.
2. **Поддержка протоколов** - поддерживаются HTTP/1.1 и HTTPS.
3. **Потоковая обработка** - интегрирован с потоками Node.js, что позволяет эффективно обрабатывать большие объемы данных.
4. **Масштабируемость** - благодаря асинхронной природе Node.js, HTTP сервер может обрабатывать множество запросов одновременно.

Для более сложных веб-приложений рекомендуется использовать фреймворки, построенные на базе HTTP модуля, такие как Express.js, Koa.js или Hapi.js.

---

[[Назад]]
