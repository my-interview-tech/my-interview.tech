---
title: Модули HTTP и HTTPS в Node.js: создание серверов и выполнение запросов
draft: false
tags:
  - "#NodeJS"
  - "#HTTP"
  - "#HTTPS"
  - "#веб-сервер"
  - "#REST"
  - "#API"
info:
---

Модули `http` и `https` в Node.js предоставляют функционал для создания веб-серверов и выполнения HTTP/HTTPS запросов. Эти модули являются частью стандартной библиотеки и служат основой для большинства веб-фреймворков, таких как Express.js.

## Модуль HTTP

### Создание базового HTTP сервера

```javascript
const http = require("http")

// Создание сервера
const server = http.createServer((req, res) => {
  // Установка статус-кода и заголовков
  res.statusCode = 200
  res.setHeader("Content-Type", "text/plain; charset=utf-8")

  // Отправка ответа
  res.end("Привет, мир!")
})

// Запуск сервера на порту 3000
server.listen(3000, () => {
  console.log("Сервер запущен на http://localhost:3000/")
})
```

### Маршрутизация запросов

```javascript
const http = require("http")

const server = http.createServer((req, res) => {
  // Получение информации о запросе
  const { method, url, headers } = req

  console.log(`${method} ${url}`)

  // Простая маршрутизация
  if (url === "/") {
    res.statusCode = 200
    res.setHeader("Content-Type", "text/html; charset=utf-8")
    res.end("<h1>Главная страница</h1>")
  } else if (url === "/api/users") {
    if (method === "GET") {
      res.statusCode = 200
      res.setHeader("Content-Type", "application/json")
      res.end(
        JSON.stringify([
          { id: 1, name: "Петр" },
          { id: 2, name: "Анна" },
        ]),
      )
    } else if (method === "POST") {
      handlePostRequest(req, res)
    } else {
      methodNotAllowed(res)
    }
  } else {
    notFound(res)
  }
})

function handlePostRequest(req, res) {
  let body = ""

  // Получение данных запроса
  req.on("data", (chunk) => {
    body += chunk.toString()
  })

  // Обработка данных после получения всего запроса
  req.on("end", () => {
    try {
      const data = JSON.parse(body)

      // Обработка данных и отправка ответа
      res.statusCode = 201
      res.setHeader("Content-Type", "application/json")
      res.end(
        JSON.stringify({
          message: "Пользователь создан",
          user: { id: 3, ...data },
        }),
      )
    } catch (error) {
      badRequest(res, "Неверный формат JSON")
    }
  })
}

function notFound(res) {
  res.statusCode = 404
  res.setHeader("Content-Type", "text/plain; charset=utf-8")
  res.end("Страница не найдена")
}

function methodNotAllowed(res) {
  res.statusCode = 405
  res.setHeader("Content-Type", "text/plain; charset=utf-8")
  res.end("Метод не поддерживается")
}

function badRequest(res, message) {
  res.statusCode = 400
  res.setHeader("Content-Type", "text/plain; charset=utf-8")
  res.end(message || "Некорректный запрос")
}

server.listen(3000, () => {
  console.log("Сервер запущен на http://localhost:3000/")
})
```

### Выполнение HTTP запросов

#### GET запрос

```javascript
const http = require("http")

// Упрощенный вариант для GET запросов
http
  .get("http://example.com/api/data", (res) => {
    const { statusCode, headers } = res
    let data = ""

    console.log(`Статус: ${statusCode}`)
    console.log(`Заголовки: ${JSON.stringify(headers)}`)

    // Получение данных ответа
    res.on("data", (chunk) => {
      data += chunk
    })

    // Обработка завершения запроса
    res.on("end", () => {
      try {
        const parsedData = JSON.parse(data)
        console.log("Данные:", parsedData)
      } catch (error) {
        console.error("Ошибка парсинга JSON:", error)
      }
    })
  })
  .on("error", (error) => {
    console.error("Ошибка запроса:", error)
  })
```

#### POST запрос

```javascript
const http = require("http")

const postData = JSON.stringify({
  name: "Иван",
  email: "ivan@example.com",
})

const options = {
  hostname: "example.com",
  port: 80,
  path: "/api/users",
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Content-Length": Buffer.byteLength(postData),
  },
}

const req = http.request(options, (res) => {
  let data = ""

  res.on("data", (chunk) => {
    data += chunk
  })

  res.on("end", () => {
    console.log(`Статус: ${res.statusCode}`)
    console.log("Ответ:", data)
  })
})

req.on("error", (error) => {
  console.error("Ошибка запроса:", error)
})

// Отправка данных
req.write(postData)
req.end()
```

## Модуль HTTPS

Модуль `https` работает аналогично `http`, но использует SSL/TLS для шифрования соединения.

### Создание HTTPS сервера

```javascript
const https = require("https")
const fs = require("fs")

// Чтение SSL-сертификатов
const options = {
  key: fs.readFileSync("server-key.pem"),
  cert: fs.readFileSync("server-cert.pem"),
}

const server = https.createServer(options, (req, res) => {
  res.statusCode = 200
  res.setHeader("Content-Type", "text/plain; charset=utf-8")
  res.end("Защищенный HTTPS сервер")
})

server.listen(443, () => {
  console.log("HTTPS сервер запущен на порту 443")
})
```

### Выполнение HTTPS запросов

```javascript
const https = require("https")

// GET запрос по HTTPS
https
  .get("https://api.example.com/data", (res) => {
    let data = ""

    res.on("data", (chunk) => {
      data += chunk
    })

    res.on("end", () => {
      console.log("Данные:", data)
    })
  })
  .on("error", (error) => {
    console.error("Ошибка:", error)
  })

// POST запрос по HTTPS
const postData = JSON.stringify({ user: "user1", password: "password123" })

const options = {
  hostname: "api.example.com",
  port: 443,
  path: "/login",
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Content-Length": Buffer.byteLength(postData),
  },
}

const req = https.request(options, (res) => {
  let data = ""

  res.on("data", (chunk) => {
    data += chunk
  })

  res.on("end", () => {
    console.log("Результат авторизации:", data)
  })
})

req.on("error", (error) => {
  console.error("Ошибка:", error)
})

req.write(postData)
req.end()
```

## Расширенные возможности

### Обработка потоков

HTTP модули интегрированы с потоками (streams) в Node.js, что позволяет эффективно обрабатывать большие объемы данных:

```javascript
const http = require("http")
const fs = require("fs")

const server = http.createServer((req, res) => {
  if (req.url === "/download") {
    // Отправка файла клиенту через поток
    res.setHeader("Content-Type", "application/pdf")
    res.setHeader("Content-Disposition", "attachment; filename=document.pdf")

    // Создание потока чтения и передача его в поток записи (response)
    const fileStream = fs.createReadStream("document.pdf")
    fileStream.pipe(res)

    fileStream.on("error", (error) => {
      console.error("Ошибка чтения файла:", error)
      res.statusCode = 500
      res.end("Ошибка сервера")
    })
  } else if (req.url === "/upload" && req.method === "POST") {
    // Сохранение загруженного файла
    const fileStream = fs.createWriteStream("uploaded-file.dat")

    req.pipe(fileStream)

    req.on("end", () => {
      res.statusCode = 200
      res.end("Файл успешно загружен")
    })

    fileStream.on("error", (error) => {
      console.error("Ошибка записи файла:", error)
      res.statusCode = 500
      res.end("Ошибка сохранения файла")
    })
  } else {
    res.statusCode = 404
    res.end("Страница не найдена")
  }
})

server.listen(3000)
```

### Создание прокси-сервера

```javascript
const http = require("http")
const url = require("url")

const proxy = http.createServer((clientReq, clientRes) => {
  const parsedUrl = url.parse(clientReq.url)

  const options = {
    hostname: "example.com",
    port: 80,
    path: parsedUrl.path,
    method: clientReq.method,
    headers: clientReq.headers,
  }

  // Удаляем или изменяем проблемные заголовки
  delete options.headers.host

  const proxyReq = http.request(options, (proxyRes) => {
    // Копируем заголовки ответа клиенту
    clientRes.writeHead(proxyRes.statusCode, proxyRes.headers)

    // Передаем ответ от целевого сервера клиенту
    proxyRes.pipe(clientRes)
  })

  // Передаем данные от клиента целевому серверу
  clientReq.pipe(proxyReq)

  proxyReq.on("error", (error) => {
    console.error("Ошибка прокси-запроса:", error)
    clientRes.statusCode = 500
    clientRes.end("Ошибка прокси")
  })
})

proxy.listen(8080, () => {
  console.log("Прокси-сервер запущен на порту 8080")
})
```

### Обработка ошибок и таймауты

```javascript
const http = require("http")

const server = http.createServer((req, res) => {
  // Установка таймаута для запроса
  req.setTimeout(5000, () => {
    res.statusCode = 408 // Request Timeout
    res.end("Таймаут запроса")
  })

  // Обработка ошибок
  req.on("error", (error) => {
    console.error("Ошибка запроса:", error)
    res.statusCode = 400
    res.end("Ошибка запроса")
  })

  // Нормальная обработка запроса
  if (req.url === "/api/data") {
    setTimeout(() => {
      // Имитация длительной операции
      res.statusCode = 200
      res.setHeader("Content-Type", "application/json")
      res.end(JSON.stringify({ data: "Длительная операция завершена" }))
    }, 3000)
  } else {
    res.statusCode = 200
    res.end("OK")
  }
})

// Обработка ошибок сервера
server.on("error", (error) => {
  console.error("Ошибка сервера:", error)

  if (error.code === "EADDRINUSE") {
    console.log("Порт уже используется, пробуем другой...")
    server.listen(3001)
  }
})

// Обработка превышения лимита подключений
server.maxConnections = 100
server.on("connection", (socket) => {
  console.log("Новое подключение")

  socket.on("error", (error) => {
    console.error("Ошибка сокета:", error)
  })
})

server.listen(3000, () => {
  console.log("Сервер запущен на http://localhost:3000/")
})
```

## Различия между HTTP и HTTPS

1. **Шифрование:** HTTPS обеспечивает шифрование данных через SSL/TLS, в то время как HTTP передает данные в открытом виде.
2. **Сертификаты:** Для HTTPS требуются SSL/TLS сертификаты.
3. **Порты по умолчанию:** HTTP использует порт 80, HTTPS - порт 443.
4. **Производительность:** HTTPS немного медленнее из-за дополнительной нагрузки на шифрование/дешифрование.

## Когда использовать каждый модуль

- **HTTP:** для внутренних сервисов, разработки, тестирования или когда безопасность не критична.
- **HTTPS:** для публичных API, сервисов с авторизацией, передачи конфиденциальных данных.

## Сравнение с внешними HTTP-клиентами

Хотя встроенные модули HTTP/HTTPS предоставляют базовый функционал, для более сложных сценариев часто используются библиотеки, такие как:

- **Axios:** Поддержка промисов, более удобный API, автоматическая обработка JSON
- **Node-fetch:** API, совместимый с браузерным Fetch API
- **Got:** Простой и мощный HTTP-клиент с множеством функций
- **SuperAgent:** Прогрессивный и гибкий HTTP-клиент

## Заключение

Модули `http` и `https` в Node.js предоставляют мощный низкоуровневый интерфейс для работы с HTTP-протоколом. Они подходят как для создания серверов, так и для выполнения клиентских запросов. Благодаря асинхронной природе и интеграции с потоками, эти модули хорошо масштабируются и эффективно обрабатывают множество одновременных соединений, что делает Node.js идеальным инструментом для создания высокопроизводительных веб-приложений.

---

[[Назад]]
