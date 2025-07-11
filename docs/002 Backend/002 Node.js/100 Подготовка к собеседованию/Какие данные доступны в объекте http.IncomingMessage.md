---
title: Какие данные доступны в объекте http.IncomingMessage
draft: false
tags:
  - "#NodeJS"
  - "#HTTP"
  - "#API"
  - "#request"
  - "#IncomingMessage"
info:
  - "[Документация Node.js по http.IncomingMessage](https://nodejs.org/api/http.html#class-httpincomingmessage)"
  - "[Руководство по HTTP в Node.js](https://nodejs.org/en/learn/modules/anatomy-of-an-http-transaction)"
---

Объект `http.IncomingMessage` в Node.js представляет собой объект, который передается в обработчик запросов при создании HTTP-сервера (например, при использовании модуля `http` или фреймворка Express). Он содержит данные о входящем HTTP-запросе. В этом объекте доступны различные свойства и методы, которые позволяют работать с запросом и извлекать нужную информацию.

### Основные данные и методы объекта `http.IncomingMessage`:

1. **`req.method`**:

   - HTTP-метод запроса (например, `GET`, `POST`, `PUT`, `DELETE` и т.д.).
   - Пример: `'GET'`, `'POST'`.

2. **`req.url`**:

   - URL запроса, включая путь и query-строку (например, `/users?id=123`).
   - Пример: `'/home'`, `'/search?query=node'`.

3. **`req.headers`**:

   - Заголовки HTTP-запроса. Это объект, где ключи — это названия заголовков, а значения — их значения (все заголовки преобразуются в строки).
   - Пример:
     ```javascript
     {
       'user-agent': 'Mozilla/5.0',
       'accept': 'text/html,application/xhtml+xml',
     }
     ```

4. **`req.httpVersion`**:

   - Версия HTTP-протокола, используемая в запросе (например, `'1.1'` или `'2'`).
   - Пример: `'1.1'`, `'2'`.

5. **`req.socket`** (или `req.connection`):

   - Сокетное соединение, через которое был выполнен запрос. Это объект типа `net.Socket`, который позволяет работать с низкоуровневыми деталями соединения.
   - Пример: объект типа `net.Socket`, с помощью которого можно управлять соединением.

6. **`req.query`** (в Express.js):

   - В Express.js можно получить параметры query-строки, если используется middleware (например, `express.urlencoded()`) или объект запроса.
   - Пример: `req.query.id` для строки запроса `/users?id=123` — вернет `123`.

7. **`req.body`** (в Express.js):

   - Данные тела запроса (например, для POST-запросов). Обычно доступно в Express с использованием middleware для парсинга тела (например, `express.json()` или `express.urlencoded()`).
   - Пример: `{ "name": "John" }`, если запрос был с JSON-данными.

8. **`req.params`** (в Express.js):

   - Параметры, извлеченные из URL, если они указаны в маршруте. Например, для маршрута `/user/:id` можно получить параметр `id` через `req.params.id`.
   - Пример: для запроса `/user/123` в маршруте `/user/:id`, доступ к параметру через `req.params.id` вернет `123`.

9. **`req.complete`**:

   - Булевое значение, указывающее, получены ли все данные запроса.

10. **`req.setTimeout()`**:

    - Метод для установки таймаута запроса. Позволяет задать максимальное время ожидания ответа от сервера.
    - Пример:
      ```javascript
      req.setTimeout(5000, () => {
        console.log("Request timed out")
      })
      ```

11. **`req.statusCode`** и **`req.statusMessage`**:

    - Для ответов содержат HTTP-статус и сообщение.

12. **`req.pipe()`**:

    - Метод для перенаправления потока данных из запроса (например, для обработки файлов). Чаще используется при работе с потоками.
    - Пример:
      ```javascript
      req.pipe(res)
      ```

13. **`req.on(event, callback)`**:
    - Методы для работы с событиями запроса, например:
      - `'data'` – срабатывает при получении фрагмента данных
      - `'end'` – срабатывает по завершении запроса
      - `'error'` – срабатывает при ошибке
      - `'close'` – срабатывает при закрытии соединения

### Пример использования:

```javascript
const http = require("http")

const server = http.createServer((req, res) => {
  // Метод запроса
  console.log(req.method) // GET, POST и т.д.

  // URL запроса
  console.log(req.url) // /home, /search?query=node и т.д.

  // Заголовки запроса
  console.log(req.headers)

  // Версия HTTP
  console.log(req.httpVersion)

  // Тело запроса (в случае POST и других)
  req.on("data", (chunk) => {
    console.log("Data:", chunk.toString())
  })

  // Отправка ответа
  res.writeHead(200, { "Content-Type": "text/plain" })
  res.end("Hello, World!")
})

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000/")
})
```

### Заключение:

Объект `http.IncomingMessage` в Node.js предоставляет множество полезных данных, которые позволяют эффективно обрабатывать входящие HTTP-запросы, включая информацию о методе запроса, заголовках, URL, а также доступ к телу запроса и другим свойствам.

---

[[002 Node.js|Назад]]
