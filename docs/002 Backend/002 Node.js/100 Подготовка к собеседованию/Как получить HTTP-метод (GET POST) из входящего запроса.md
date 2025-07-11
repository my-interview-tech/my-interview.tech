---
title: Как получить HTTP-метод (GET POST) из входящего запроса
draft: false
tags:
  - "#NodeJS"
  - "#HTTP"
  - "#запросы"
  - "#express"
  - "#web-сервер"
info:
  - "[Документация Node.js по модулю http](https://nodejs.org/api/http.html#http_class_http_incomingmessage)"
  - "[Документация Express.js по объекту Request](https://expressjs.com/en/api.html#req)"
  - "[Работа с HTTP-запросами в Node.js](https://nodejs.dev/learn/the-nodejs-request-object)"
---

Чтобы получить HTTP-метод (например, `GET`, `POST` и другие) из входящего запроса в Node.js, можно использовать свойство `method` объекта запроса (`req`), который передается в обработчик маршрута.

### Пример с использованием модуля `http`:

```javascript
const http = require("http")

const server = http.createServer((req, res) => {
  // Получаем HTTP-метод из запроса
  const method = req.method

  res.writeHead(200, { "Content-Type": "text/plain" })
  res.end(`HTTP-метод запроса: ${method}`)
})

server.listen(3000, () => {
  console.log("Сервер запущен на порту 3000")
})
```

### Объяснение:

- `req.method` — это свойство объекта запроса, которое содержит HTTP-метод, использованный для текущего запроса. Например, для запроса `GET` метод будет равен `'GET'`, а для запроса `POST` — `'POST'`.
- В примере мы выводим метод запроса в ответе сервера.

### Пример с использованием Express.js:

Если вы используете фреймворк **Express.js**, это также можно сделать следующим образом:

```javascript
const express = require("express")
const app = express()

app.all("*", (req, res) => {
  // Получаем HTTP-метод
  const method = req.method
  res.send(`HTTP-метод запроса: ${method}`)
})

app.listen(3000, () => {
  console.log("Сервер Express запущен на порту 3000")
})
```

### Объяснение:

- В **Express.js** объект `req` предоставляет свойство `method`, которое работает так же, как в нативном `http`.
- Используем `app.all('*')`, чтобы обработать все возможные HTTP-методы для любых маршрутов.

### Итог:

Чтобы получить HTTP-метод из входящего запроса, достаточно обратиться к свойству `method` объекта запроса `req` в Node.js. Это может быть сделано как в нативном `http` модуле, так и в фреймворке Express.js.

---

[[002 Node.js|Назад]]
