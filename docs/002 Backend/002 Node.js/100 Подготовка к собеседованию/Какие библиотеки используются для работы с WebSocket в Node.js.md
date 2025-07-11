---
title: Какие библиотеки используются для работы с WebSocket в Node.js
draft: false
tags:
  - "#NodeJS"
  - "#WebSocket"
  - "#ws"
  - "#socket.io"
  - "#realtime"
info:
  - "[WebSocket API - MDN](https://developer.mozilla.org/ru/docs/Web/API/WebSocket)"
  - "[ws npm package](https://www.npmjs.com/package/ws)"
  - "[socket.io документация](https://socket.io/docs/v4/)"
---

В Node.js существует несколько популярных библиотек для работы с WebSocket, которые упрощают создание и управление WebSocket-соединениями. Вот некоторые из них:

### 1. **`ws`**

- **Описание**: Одна из самых популярных и простых в использовании библиотек для работы с WebSocket в Node.js. Она поддерживает как клиентскую, так и серверную стороны WebSocket.
- **Преимущества**: Легковесность, высокая производительность, простота в использовании.
- **Использование**: Для создания WebSocket-сервера и клиента.

Пример использования:

```javascript
const WebSocket = require("ws")
const wss = new WebSocket.Server({ port: 8080 })

wss.on("connection", (ws) => {
  ws.on("message", (message) => {
    console.log("Получено сообщение: %s", message)
  })
  ws.send("Привет, клиент!")
})
```

### 2. **`socket.io`**

- **Описание**: Это более высокоуровневая библиотека, которая работает поверх WebSocket и добавляет множество дополнительных возможностей, таких как автоматическое восстановление соединения, поддержка различных транспортных протоколов (WebSocket, long-polling и другие), комнаты и пространство имён, и т.д.
- **Преимущества**: Множество встроенных функций, упрощённое управление событиями, поддержка масштабируемости.
- **Использование**: Часто используется для создания чат-приложений, реального времени, онлайн-игр и других приложений, где требуется стабильное соединение и масштабируемость.

Пример использования:

```javascript
const socketIo = require("socket.io")
const http = require("http")
const server = http.createServer()
const io = socketIo(server)

io.on("connection", (socket) => {
  console.log("Клиент подключен")
  socket.emit("message", "Привет, клиент!")

  socket.on("message", (msg) => {
    console.log("Получено сообщение: %s", msg)
  })
})

server.listen(3000)
```

### 3. **`websocket`**

- **Описание**: Еще одна библиотека для работы с WebSocket, которая поддерживает клиентские и серверные соединения. Она поддерживает различные стандарты WebSocket, включая RFC 6455.
- **Преимущества**: Поддерживает расширенные возможности WebSocket, такие как сжатие сообщений и протоколы.
- **Использование**: Для создания WebSocket-сервера и клиента с дополнительными возможностями.

Пример использования:

```javascript
const WebSocketServer = require("websocket").server
const http = require("http")

const server = http.createServer((req, res) => {
  res.writeHead(404)
  res.end()
})

server.listen(8080, () => {
  console.log("Сервер слушает на порту 8080")
})

const wsServer = new WebSocketServer({
  httpServer: server,
})

wsServer.on("request", (request) => {
  const connection = request.accept(null, request.origin)

  connection.on("message", (message) => {
    console.log("Получено сообщение:", message.utf8Data)
    connection.sendUTF("Привет, клиент!")
  })
})
```

### 4. **`uWebSockets.js`**

- **Описание**: Это библиотека с высокой производительностью для работы с WebSocket и HTTP-серверами. Она разрабатывалась с упором на скорость и минимальные затраты ресурсов.
- **Преимущества**: Очень высокая производительность, минимальное потребление памяти и CPU.
- **Использование**: Идеально подходит для высоконагруженных приложений и ситуаций, где важна высокая скорость.

Пример использования:

```javascript
const uWS = require("uWebSockets.js")

uWS
  .App()
  .ws("/*", {
    message: (ws, message) => {
      ws.send("Привет, клиент!")
    },
  })
  .listen(8080, (token) => {
    if (token) {
      console.log("Сервер запущен на порту 8080")
    }
  })
```

### 5. **`sockjs`**

- **Описание**: Это библиотека для реализации WebSocket-подобных соединений, но с дополнительной поддержкой fallback-режимов, таких как long-polling и другие транспортные протоколы, которые могут использоваться, если WebSocket не доступен.
- **Преимущества**: Подходит для приложений, где важна совместимость с большим количеством клиентов (включая старые браузеры), которые не поддерживают WebSocket.
- **Использование**: Используется, когда необходимо работать в условиях нестабильных сетевых условий или когда клиент не поддерживает WebSocket.

Пример использования:

```javascript
const sockjs = require("sockjs")
const http = require("http")

const echo = sockjs.createServer()
echo.on("connection", (conn) => {
  conn.on("data", (message) => {
    conn.write(message)
  })
})

const server = http.createServer()
echo.installHandlers(server, { prefix: "/echo" })
server.listen(8080)
```

### Резюме:

- **`ws`** — легковесная и высокая производительность, стандартная библиотека для WebSocket.
- **`socket.io`** — более сложная библиотека с дополнительными возможностями для масштабируемых приложений.
- **`websocket`** — поддерживает расширенные возможности WebSocket.
- **`uWebSockets.js`** — чрезвычайно высокая производительность, подходит для высоконагруженных приложений.
- **`sockjs`** — решение для совместимости с устаревшими браузерами и нестабильными сетями.

Выбор библиотеки зависит от специфики вашего проекта и требований к производительности, совместимости и масштабируемости.

---

[[002 Node.js|Назад]]
