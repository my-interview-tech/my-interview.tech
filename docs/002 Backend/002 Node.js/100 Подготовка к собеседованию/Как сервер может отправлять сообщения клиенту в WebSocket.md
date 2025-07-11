---
title: Как сервер может отправлять сообщения клиенту в WebSocket
draft: false
tags:
  - "#NodeJS"
  - "#WebSocket"
  - "#real-time"
  - "#коммуникация"
  - "#ws"
  - "#сокеты"
info:
  - "[Документация WebSocket в MDN](https://developer.mozilla.org/ru/docs/Web/API/WebSockets_API)"
  - "[Документация библиотеки ws для Node.js](https://github.com/websockets/ws)"
  - "[Спецификация протокола WebSocket](https://tools.ietf.org/html/rfc6455)"
---

## Что такое WebSocket

WebSocket — это протокол связи, обеспечивающий полнодуплексный канал связи поверх TCP-соединения. В отличие от HTTP, WebSocket позволяет создать постоянное соединение между клиентом и сервером, что делает его идеальным для приложений, требующих обмена данными в реальном времени.

## Как сервер отправляет сообщения клиенту

В WebSocket-соединении сервер может отправлять сообщения клиенту в любой момент после того, как соединение установлено. Это происходит с использованием метода **`send()`** объекта WebSocket, который представляет собой подключение клиента.

### Основные шаги:

1. **Создание WebSocket-соединения** на сервере
2. **Отправка сообщения** клиенту с помощью метода `send()`

## Пример серверной стороны (Node.js с библиотекой ws)

```javascript
const WebSocket = require("ws")

// Создание WebSocket-сервера на порту 8080
const wss = new WebSocket.Server({ port: 8080 })

wss.on("connection", (ws) => {
  console.log("Новое соединение установлено")

  // Отправка сообщения клиенту при подключении
  ws.send("Добро пожаловать на сервер!")

  // Отправка сообщений через 5 секунд
  setInterval(() => {
    // Проверяем, что соединение всё ещё открыто
    if (ws.readyState === WebSocket.OPEN) {
      ws.send("Это сообщение отправлено сервером: " + new Date().toISOString())
    }
  }, 5000)

  // Обработка сообщений от клиента
  ws.on("message", (message) => {
    console.log("Получено сообщение от клиента:", message.toString())

    // Пример ответа на сообщение клиента
    ws.send(`Сервер получил ваше сообщение: "${message}"`)
  })

  // Обработка закрытия соединения
  ws.on("close", () => {
    console.log("Соединение закрыто")
  })
})

console.log("WebSocket сервер запущен на порту 8080")
```

## Пример клиентской стороны (JavaScript в браузере)

```javascript
// Создание WebSocket-соединения с сервером
const ws = new WebSocket("ws://localhost:8080")

// Обработка открытия соединения
ws.onopen = () => {
  console.log("Соединение с сервером установлено")

  // Отправляем сообщение серверу при успешном подключении
  ws.send("Привет, сервер!")
}

// Обработка полученных сообщений от сервера
ws.onmessage = (event) => {
  console.log("Сообщение от сервера:", event.data)

  // Можно добавить логику обработки сообщений
  const messageElement = document.createElement("div")
  messageElement.textContent = event.data
  document.getElementById("messages").appendChild(messageElement)
}

// Обработка ошибок
ws.onerror = (error) => {
  console.error("Ошибка WebSocket:", error)
}

// Обработка закрытия соединения
ws.onclose = (event) => {
  console.log("Соединение закрыто с кодом:", event.code, "причина:", event.reason)
}
```

## Способы отправки сообщений с сервера клиенту

### 1. Отправка в ответ на событие

Сервер может отправлять сообщения в ответ на действия клиента:

```javascript
ws.on("message", (message) => {
  // Обработка полученного сообщения
  console.log(`Получено сообщение: ${message}`)

  // Отправка ответа
  ws.send(
    JSON.stringify({
      type: "response",
      content: `Ответ на ваше сообщение: ${message}`,
      timestamp: Date.now(),
    }),
  )
})
```

### 2. Широковещательная рассылка (Broadcast)

Отправка сообщения всем подключенным клиентам:

```javascript
function broadcast(message) {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message)
    }
  })
}

// Использование:
broadcast("Важное объявление для всех клиентов!")
```

### 3. Отправка по расписанию

```javascript
// Отправка обновлений каждые 10 секунд
setInterval(() => {
  const data = {
    type: "update",
    value: Math.random(),
    timestamp: Date.now(),
  }

  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data))
    }
  })
}, 10000)
```

### 4. Отправка на основе событий сервера

```javascript
// Предположим, у нас есть event emitter для внутренних событий
const eventEmitter = new (require("events").EventEmitter)()

// Подписываемся на события
eventEmitter.on("new-data", (data) => {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(
        JSON.stringify({
          type: "new-data",
          data: data,
          timestamp: Date.now(),
        }),
      )
    }
  })
})

// Генерация события
// (например, при обновлении данных в БД)
function dataUpdated(newData) {
  eventEmitter.emit("new-data", newData)
}
```

## Передача различных типов данных

WebSocket позволяет отправлять как текстовые, так и бинарные данные:

```javascript
// Отправка текста
ws.send("Текстовое сообщение")

// Отправка JSON
ws.send(
  JSON.stringify({
    type: "notification",
    message: "Новое событие",
    date: new Date(),
  }),
)

// Отправка бинарных данных
const buffer = Buffer.from([0, 1, 2, 3, 4])
ws.send(buffer)
```

## Заключение

Протокол WebSocket обеспечивает двустороннюю связь в реальном времени между клиентом и сервером. Сервер может отправлять сообщения клиенту:

1. В любой момент, после установления соединения
2. В ответ на сообщение клиента
3. По расписанию или в результате других событий
4. Всем клиентам одновременно (broadcast)

Эта возможность делает WebSocket идеальным для чатов, игр, мониторинга в реальном времени, торговых платформ и других приложений, где требуется мгновенный обмен данными.

---

[[002 Node.js|Назад]]
