---
title: Как создать HTTP-сервер в Node.js Приведите пример кода.
draft: false
tags:
  - "#NodeJS"
  - "#HTTP"
  - "#сервер"
  - "#http.createServer"
  - "#web"
info:
  - "[Документация Node.js по модулю http](https://nodejs.org/api/http.html)"
  - "[Руководство по созданию веб-сервера на Node.js](https://nodejs.org/en/learn/getting-started/introduction-to-nodejs)"
---

Чтобы создать HTTP-сервер в Node.js, можно использовать встроенный модуль `http`. Вот пример базового HTTP-сервера, который отвечает на запросы:

## Пример кода для HTTP-сервера:

```javascript
const http = require("http")

// Создание HTTP-сервера
const server = http.createServer((req, res) => {
  // Устанавливаем заголовки ответа
  res.writeHead(200, { "Content-Type": "text/plain" })

  // Отправляем ответ
  res.end("Hello, World!")
})

// Указываем порт и хост, на которых будет работать сервер
const PORT = 3000
const HOST = "127.0.0.1"

// Запуск сервера
server.listen(PORT, HOST, () => {
  console.log(`Server is running at http://${HOST}:${PORT}`)
})
```

## Объяснение:

1. **Импорт модуля `http`:** Мы используем встроенный модуль `http`, чтобы создать HTTP-сервер.
2. **`http.createServer()`:** Этот метод создает сервер. Он принимает функцию обратного вызова (callback), которая будет вызвана для каждого входящего запроса. В функции обратного вызова два параметра:
   - `req` — объект запроса, который содержит информацию о запросе.
   - `res` — объект ответа, с помощью которого мы отправляем ответ клиенту.
3. **`res.writeHead()`:** Метод для отправки HTTP-заголовков ответа (например, код состояния и тип контента).
4. **`res.end()`:** Метод для отправки тела ответа.
5. **`server.listen()`:** Запускает сервер, который будет слушать указанный порт и хост.

## Пример с маршрутизацией запросов

```javascript
const http = require("http")

const server = http.createServer((req, res) => {
  // Получаем URL и метод запроса
  const { url, method } = req

  // Обработка разных маршрутов
  if (url === "/" && method === "GET") {
    res.writeHead(200, { "Content-Type": "text/plain" })
    res.end("Главная страница")
  } else if (url === "/about" && method === "GET") {
    res.writeHead(200, { "Content-Type": "text/plain" })
    res.end("О нас")
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" })
    res.end("Страница не найдена")
  }
})

server.listen(3000, "127.0.0.1", () => {
  console.log("Сервер запущен на http://127.0.0.1:3000")
})
```

## Запуск:

1. Сохраните код в файл, например, `server.js`.
2. В терминале выполните команду:

```bash
node server.js
```

3. Откройте браузер и перейдите по адресу `http://127.0.0.1:3000`. Вы увидите сообщение "Hello, World!".

Этот код создаст простой сервер, который будет отвечать на все запросы текстом "Hello, World!" или будет обрабатывать разные маршруты, если вы используете второй пример.

---

[[002 Node.js|Назад]]
