---
title: Как реализовать WebSocket-сервер на Node.js с использованием библиотеки ws
draft: false
tags:
  - "#NodeJS"
  - "#WebSocket"
  - "#ws"
  - "#РеальноеВремя"
  - "#ДвустороннийОбмен"
info:
  - "[Документация библиотеки ws](https://github.com/websockets/ws)"
  - "[MDN Web Docs - WebSockets API](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)"
  - "[Статья на WebSockets](https://javascript.info/websocket)"
---

![[Pasted image websocket-node.png|600]]

## WebSocket-сервер на Node.js с библиотекой ws

**WebSocket** — это протокол связи, обеспечивающий полнодуплексный канал связи поверх TCP-соединения. WebSocket позволяет создавать интерактивные соединения между клиентом и сервером для обмена данными в режиме реального времени.

**ws** — это популярная библиотека для Node.js, которая предоставляет простой API для работы с WebSocket протоколом.

## Установка библиотеки ws

```bash
npm install ws
```

## Создание простого WebSocket-сервера

Базовая реализация WebSocket сервера:

```javascript
const WebSocket = require("ws")

// Создаем WebSocket сервер на порту 8080
const wss = new WebSocket.Server({ port: 8080 })

// Обрабатываем событие подключения нового клиента
wss.on("connection", function connection(ws) {
  console.log("Новое соединение установлено")

  // Обрабатываем сообщения от клиента
  ws.on("message", function incoming(message) {
    console.log("Получено сообщение: %s", message)

    // Отправляем ответ клиенту
    ws.send(`Сервер получил ваше сообщение: ${message}`)
  })

  // Отправляем приветственное сообщение
  ws.send("Добро пожаловать на WebSocket сервер!")
})

console.log("WebSocket сервер запущен на порту 8080")
```

## Интеграция с HTTP сервером

WebSocket сервер можно интегрировать с существующим HTTP сервером:

```javascript
const http = require("http")
const WebSocket = require("ws")

// Создаем HTTP сервер
const server = http.createServer(function (req, res) {
  res.writeHead(200, { "Content-Type": "text/plain" })
  res.end("WebSocket сервер работает")
})

// Создаем WebSocket сервер, подключенный к HTTP серверу
const wss = new WebSocket.Server({ server })

wss.on("connection", function connection(ws) {
  ws.on("message", function incoming(message) {
    console.log("Получено: %s", message)
  })

  ws.send("Подключено к серверу!")
})

// Запускаем сервер на порту 8080
server.listen(8080, function () {
  console.log("Сервер запущен на порту 8080")
})
```

## Широковещательная рассылка (Broadcasting)

Отправка сообщений всем подключенным клиентам:

```javascript
const WebSocket = require("ws")
const wss = new WebSocket.Server({ port: 8080 })

// Функция для рассылки сообщений всем клиентам
function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data)
    }
  })
}

wss.on("connection", function connection(ws) {
  ws.on("message", function incoming(message) {
    console.log("Получено сообщение: %s", message)

    // Отправляем сообщение всем клиентам
    broadcast(`Клиент отправил: ${message}`)
  })

  ws.send("Добро пожаловать в чат!")
})
```

## Чат-приложение на WebSocket

Пример простого чат-приложения:

```javascript
const WebSocket = require("ws")
const http = require("http")
const fs = require("fs")
const path = require("path")

// Создаем HTTP сервер для обслуживания HTML-страницы
const server = http.createServer(function (req, res) {
  if (req.url === "/") {
    fs.readFile(path.join(__dirname, "chat.html"), function (err, data) {
      if (err) {
        res.writeHead(500)
        res.end("Ошибка при загрузке chat.html")
      } else {
        res.writeHead(200, { "Content-Type": "text/html" })
        res.end(data)
      }
    })
  } else {
    res.writeHead(404)
    res.end("Страница не найдена")
  }
})

// Создаем WebSocket сервер
const wss = new WebSocket.Server({ server })

// Храним историю сообщений
const messageHistory = []
const MAX_HISTORY = 100

// Функция для рассылки сообщений всем клиентам
function broadcast(message) {
  // Добавляем сообщение в историю
  messageHistory.push(message)
  if (messageHistory.length > MAX_HISTORY) {
    messageHistory.shift()
  }

  // Отправляем всем клиентам
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(message))
    }
  })
}

wss.on("connection", function connection(ws) {
  console.log("Новое соединение")

  // Отправляем историю сообщений новому клиенту
  messageHistory.forEach(function (message) {
    ws.send(JSON.stringify(message))
  })

  // Устанавливаем имя пользователя по умолчанию
  ws.username = "Аноним"

  ws.on("message", function incoming(data) {
    try {
      const message = JSON.parse(data)

      // Обработка разных типов сообщений
      if (message.type === "username") {
        // Обновление имени пользователя
        const oldUsername = ws.username
        ws.username = message.username || "Аноним"

        broadcast({
          type: "system",
          content: `${oldUsername} сменил имя на ${ws.username}`,
          timestamp: Date.now(),
        })
      } else if (message.type === "chat") {
        // Отправка сообщения чата
        broadcast({
          type: "chat",
          username: ws.username,
          content: message.content,
          timestamp: Date.now(),
        })
      }
    } catch (e) {
      console.error("Ошибка при обработке сообщения:", e)
    }
  })

  // Обработка отключения клиента
  ws.on("close", function () {
    broadcast({
      type: "system",
      content: `${ws.username} вышел из чата`,
      timestamp: Date.now(),
    })
  })

  // Отправляем уведомление о новом пользователе
  broadcast({
    type: "system",
    content: `${ws.username} присоединился к чату`,
    timestamp: Date.now(),
  })
})

// Запускаем сервер
server.listen(8080, function () {
  console.log("Сервер запущен на порту 8080")
})
```

HTML-файл для чата (`chat.html`):

```html
<!doctype html>
<html lang="ru">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>WebSocket Чат</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        max-width: 800px;
        margin: 0 auto;
        padding: 20px;
      }
      #chat {
        height: 400px;
        overflow-y: scroll;
        border: 1px solid #ddd;
        padding: 10px;
        margin-bottom: 10px;
      }
      #message-form {
        display: flex;
      }
      #message-input {
        flex-grow: 1;
        padding: 8px;
      }
      button {
        padding: 8px 16px;
        background: #4caf50;
        color: white;
        border: none;
        cursor: pointer;
      }
      .system-message {
        color: #888;
        font-style: italic;
      }
      .user-message {
        margin-bottom: 5px;
      }
      .username {
        font-weight: bold;
      }
      .timestamp {
        color: #999;
        font-size: 0.8em;
      }
    </style>
  </head>
  <body>
    <h1>WebSocket Чат</h1>

    <div id="username-container">
      <label for="username">Ваше имя:</label>
      <input type="text" id="username" placeholder="Аноним" />
      <button id="set-username">Установить</button>
    </div>

    <div id="chat"></div>

    <form id="message-form">
      <input type="text" id="message-input" placeholder="Введите сообщение..." autocomplete="off" />
      <button type="submit">Отправить</button>
    </form>

    <script>
      // Подключаемся к WebSocket серверу
      const socket = new WebSocket(`ws://${window.location.hostname}:8080`)

      // Элементы DOM
      const chatDiv = document.getElementById("chat")
      const messageForm = document.getElementById("message-form")
      const messageInput = document.getElementById("message-input")
      const usernameInput = document.getElementById("username")
      const setUsernameButton = document.getElementById("set-username")

      // Функция для форматирования времени
      function formatTime(timestamp) {
        const date = new Date(timestamp)
        return date.toLocaleTimeString()
      }

      // Обработчик входящих сообщений
      socket.onmessage = function (event) {
        const message = JSON.parse(event.data)
        const messageDiv = document.createElement("div")

        if (message.type === "system") {
          // Системное сообщение
          messageDiv.className = "system-message"
          messageDiv.innerHTML = `
          <span class="timestamp">[${formatTime(message.timestamp)}]</span>
          ${message.content}
        `
        } else if (message.type === "chat") {
          // Сообщение пользователя
          messageDiv.className = "user-message"
          messageDiv.innerHTML = `
          <span class="timestamp">[${formatTime(message.timestamp)}]</span>
          <span class="username">${message.username}:</span>
          ${message.content}
        `
        }

        chatDiv.appendChild(messageDiv)
        chatDiv.scrollTop = chatDiv.scrollHeight // Прокрутка вниз
      }

      // Обработчик отправки сообщения
      messageForm.addEventListener("submit", function (e) {
        e.preventDefault()

        const content = messageInput.value.trim()
        if (content) {
          socket.send(
            JSON.stringify({
              type: "chat",
              content: content,
            }),
          )
          messageInput.value = ""
        }
      })

      // Обработчик изменения имени пользователя
      setUsernameButton.addEventListener("click", function () {
        const username = usernameInput.value.trim()
        if (username) {
          socket.send(
            JSON.stringify({
              type: "username",
              username: username,
            }),
          )
        }
      })

      // Обработчики состояния соединения
      socket.onopen = function () {
        console.log("Соединение установлено")
      }

      socket.onclose = function () {
        console.log("Соединение закрыто")
        chatDiv.innerHTML += '<div class="system-message">Соединение с сервером разорвано</div>'
      }

      socket.onerror = function (error) {
        console.error("Ошибка WebSocket:", error)
        chatDiv.innerHTML += '<div class="system-message">Ошибка соединения</div>'
      }
    </script>
  </body>
</html>
```

## Обработка ошибок и состояний соединения

```javascript
const WebSocket = require("ws")
const wss = new WebSocket.Server({ port: 8080 })

wss.on("connection", function connection(ws) {
  // Устанавливаем таймаут бездействия
  const interval = setInterval(function ping() {
    if (ws.isAlive === false) {
      // Если клиент не ответил на прошлый пинг
      return ws.terminate()
    }

    // Отмечаем клиента как неактивного до следующего понга
    ws.isAlive = false
    // Отправляем пинг
    ws.ping("", false, true)
  }, 30000)

  // Устанавливаем начальное состояние
  ws.isAlive = true

  // Обработка понг-сообщений от клиента
  ws.on("pong", function () {
    ws.isAlive = true
  })

  // Обработка ошибок
  ws.on("error", function (error) {
    console.error("Ошибка соединения:", error)
  })

  // Очищаем интервал при закрытии соединения
  ws.on("close", function () {
    clearInterval(interval)
    console.log("Соединение закрыто")
  })

  // Далее обычная обработка сообщений...
  ws.on("message", function incoming(message) {
    console.log("Получено: %s", message)
  })
})

// Обработка ошибок сервера
wss.on("error", function (error) {
  console.error("Ошибка сервера:", error)
})
```

## Обеспечение безопасности WebSocket

1. **Использование WSS (WebSocket Secure)**:

```javascript
const https = require("https")
const WebSocket = require("ws")
const fs = require("fs")

// Настройки SSL/TLS
const server = https.createServer({
  cert: fs.readFileSync("/path/to/cert.pem"),
  key: fs.readFileSync("/path/to/key.pem"),
})

const wss = new WebSocket.Server({ server })

wss.on("connection", function connection(ws) {
  // Обработка соединения...
})

server.listen(8443, function () {
  console.log("Безопасный WebSocket сервер запущен на порту 8443")
})
```

2. **Аутентификация и авторизация**:

```javascript
const WebSocket = require("ws")
const http = require("http")
const jwt = require("jsonwebtoken")
const url = require("url")

const SECRET_KEY = "ваш-секретный-ключ"

// Создаем HTTP сервер
const server = http.createServer()

// Создаем WebSocket сервер с проверкой авторизации
const wss = new WebSocket.Server({
  server,
  verifyClient: function (info, callback) {
    // Получаем токен из URL параметров
    const token = url.parse(info.req.url, true).query.token

    if (!token) {
      callback(false, 401, "Unauthorized")
      return
    }

    // Проверяем JWT токен
    jwt.verify(token, SECRET_KEY, function (err, decoded) {
      if (err) {
        callback(false, 401, "Unauthorized")
      } else {
        // Сохраняем данные пользователя для использования при обработке соединения
        info.req.user = decoded
        callback(true)
      }
    })
  },
})

wss.on("connection", function connection(ws, req) {
  // Данные пользователя доступны через req.user
  const username = req.user.username
  console.log(`Пользователь ${username} подключился`)

  // Дальнейшая обработка соединения...
})

server.listen(8080)
```

## Масштабирование WebSocket с Redis

Для масштабирования WebSocket на несколько серверов можно использовать Redis:

```javascript
const WebSocket = require("ws")
const Redis = require("ioredis")
const http = require("http")

// Создаем Redis клиенты для публикации и подписки
const redisSub = new Redis()
const redisPub = new Redis()

// Создаем HTTP сервер
const server = http.createServer()
const wss = new WebSocket.Server({ server })

// Подписываемся на канал сообщений
redisSub.subscribe("chat-messages")

// Получаем сообщения из Redis и отправляем клиентам
redisSub.on("message", function (channel, message) {
  if (channel === "chat-messages") {
    // Отправляем сообщение всем подключенным клиентам
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message)
      }
    })
  }
})

// Обрабатываем новые соединения
wss.on("connection", function connection(ws) {
  ws.on("message", function incoming(message) {
    // Публикуем сообщение в Redis для всех экземпляров сервера
    redisPub.publish("chat-messages", message)
  })
})

server.listen(8080, function () {
  console.log("Сервер запущен на порту 8080")
})
```

## Продакшен-готовое решение

Для продакшена рекомендуется использовать более продвинутые библиотеки:

1. **Socket.IO** - предоставляет дополнительные возможности и автоматический fallback:

```javascript
const server = require("http").createServer()
const io = require("socket.io")(server)

io.on("connection", function (socket) {
  console.log("Клиент подключился")

  socket.on("chat message", function (msg) {
    io.emit("chat message", msg)
  })

  socket.on("disconnect", function () {
    console.log("Клиент отключился")
  })
})

server.listen(3000)
```

2. **uWebSockets.js** - высокопроизводительная альтернатива для больших нагрузок:

```javascript
const uWS = require("uWebSockets.js")

const app = uWS
  .App()
  .ws("/*", {
    open: (ws) => {
      console.log("Соединение открыто")
    },
    message: (ws, message, isBinary) => {
      // Преобразуем сообщение из Buffer в строку
      const msg = Buffer.from(message).toString()
      console.log("Получено:", msg)

      // Отправляем сообщение обратно
      ws.send(msg, isBinary)
    },
    close: (ws, code, message) => {
      console.log("Соединение закрыто")
    },
  })
  .listen(9001, (listenSocket) => {
    if (listenSocket) {
      console.log("Сервер запущен на порту 9001")
    }
  })
```

---

[[002 Node.js|Назад]]
