---
title: Как создать WebSocket-соединение в Node.js
draft: false
tags:
  - "#NodeJS"
  - "#WebSocket"
  - "#ws"
  - "#real-time"
  - "#сокеты"
info:
  - "[Документация библиотеки ws](https://github.com/websockets/ws)"
  - "[Документация WebSocket в MDN](https://developer.mozilla.org/ru/docs/Web/API/WebSockets_API)"
  - "[Спецификация WebSocket](https://tools.ietf.org/html/rfc6455)"
---

Для создания WebSocket-соединения в Node.js вы можете использовать пакет **`ws`**. Это популярная и удобная библиотека для работы с WebSocket в Node.js.

## Шаги для создания WebSocket-сервера и клиента:

### 1. Установите библиотеку `ws`:

```bash
npm install ws
```

### 2. Создание WebSocket-сервера:

```javascript
const WebSocket = require("ws")

// Создание WebSocket-сервера
const wss = new WebSocket.Server({ port: 8080 })

wss.on("connection", (ws) => {
  console.log("Новое соединение установлено")

  // Отправка сообщения клиенту
  ws.send("Привет, клиент!")

  // Обработка сообщений от клиента
  ws.on("message", (message) => {
    console.log("Получено сообщение от клиента:", message)
  })

  // Обработка закрытия соединения
  ws.on("close", () => {
    console.log("Соединение закрыто")
  })
})
```

#### Объяснение:

- **`WebSocket.Server`** создаёт WebSocket-сервер, который слушает на порту 8080.
- **`wss.on('connection', callback)`** — событие, которое срабатывает, когда клиент подключается к серверу.
- **`ws.send(message)`** — отправка сообщения клиенту.
- **`ws.on('message', callback)`** — обработка сообщений, полученных от клиента.
- **`ws.on('close', callback)`** — обработка закрытия соединения.

### 3. Создание WebSocket-клиента:

```javascript
const WebSocket = require("ws")

// Подключение к серверу WebSocket
const ws = new WebSocket("ws://localhost:8080")

ws.on("open", () => {
  console.log("Соединение установлено")

  // Отправка сообщения на сервер
  ws.send("Привет, сервер!")
})

ws.on("message", (message) => {
  console.log("Получено сообщение от сервера:", message)
})

ws.on("close", () => {
  console.log("Соединение закрыто")
})
```

#### Объяснение:

- **`new WebSocket(url)`** — создание WebSocket-клиента, который подключается к серверу по указанному URL.
- **`ws.on('open', callback)`** — событие, которое срабатывает, когда соединение установлено.
- **`ws.send(message)`** — отправка сообщения на сервер.
- **`ws.on('message', callback)`** — обработка сообщений, полученных от сервера.
- **`ws.on('close', callback)`** — обработка закрытия соединения.

## Пример обмена JSON-данными

```javascript
// На стороне сервера
ws.on("message", (message) => {
  try {
    const data = JSON.parse(message)
    console.log("Получены данные:", data)

    // Отправка ответа в формате JSON
    ws.send(
      JSON.stringify({
        type: "response",
        status: "success",
        message: "Данные получены",
      }),
    )
  } catch (e) {
    console.error("Ошибка при обработке сообщения:", e)
  }
})
```

## Важные замечания:

- Для того чтобы WebSocket-сервер и клиент могли взаимодействовать, убедитесь, что сервер работает и слушает на правильном порту.
- WebSocket соединения используют протокол **ws://** для незашифрованных соединений и **wss://** для защищённых (SSL) соединений.
- В боевых приложениях всегда рекомендуется использовать **wss://** для безопасной передачи данных.
- Для обработки ошибок добавляйте обработчики `ws.on('error', callback)`.

Теперь у вас есть базовая настройка для создания WebSocket-соединений в Node.js!

---

[[002 Node.js|Назад]]
