---
title: Как работает модуль http в Node.js
draft: false
tags:
  - "#NodeJS"
  - "#http"
  - "#серверы"
  - "#запросы"
  - "#web"
  - "#API"
info:
  - "[Документация Node.js по модулю http](https://nodejs.org/api/http.html)"
  - "[Руководство по созданию HTTP-сервера в Node.js](https://nodejs.org/en/learn/getting-started/introduction-to-nodejs)"
  - "[HTTP запросы в Node.js](https://nodejs.dev/learn/making-http-requests-with-nodejs)"
---

Модуль **`http`** в **Node.js** предоставляет функции для создания HTTP-серверов и клиентов. Он позволяет разрабатывать серверы, которые могут обрабатывать запросы и отправлять ответы, а также делать HTTP-запросы к другим серверам.

### Основные особенности модуля `http`:

1. **Создание HTTP-сервера:** Модуль **`http`** позволяет создать сервер, который может обрабатывать входящие HTTP-запросы, выполнять логику и отправлять ответы.

   Пример создания простого HTTP-сервера:

   ```javascript
   const http = require("http")

   const server = http.createServer((req, res) => {
     res.writeHead(200, { "Content-Type": "text/plain" })
     res.end("Hello, World!")
   })

   server.listen(3000, () => {
     console.log("Server running at http://localhost:3000/")
   })
   ```

   **Объяснение:**

   - **`http.createServer()`** — создает новый HTTP-сервер. Он принимает колбэк, который выполняется при каждом запросе.
   - **`req`** (Request) — объект, содержащий информацию о запросе (например, путь, заголовки, метод).
   - **`res`** (Response) — объект для отправки ответа клиенту. В данном случае отправляется текст "Hello, World!" с кодом статуса 200 (OK).
   - **`server.listen(3000)`** — сервер слушает порт 3000 и начинает обрабатывать входящие запросы.

2. **Отправка HTTP-запросов (клиент):** Модуль **`http`** также может быть использован для отправки HTTP-запросов к другим серверам (например, для работы с API).

   Пример отправки GET-запроса:

   ```javascript
   const http = require("http")

   http
     .get("http://example.com", (res) => {
       let data = ""

       res.on("data", (chunk) => {
         data += chunk
       })

       res.on("end", () => {
         console.log(data)
       })
     })
     .on("error", (err) => {
       console.log("Error: " + err.message)
     })
   ```

   **Объяснение:**

   - **`http.get()`** — используется для отправки GET-запроса. В качестве аргумента передается URL, и колбэк вызывается, когда ответ получен.
   - **`res.on('data')`** — прослушивает события передачи данных. Ответ от сервера поступает по частям (chunks).
   - **`res.on('end')`** — вызывается, когда данные полностью получены.
   - **`.on('error')`** — прослушивает ошибки, если они возникают при выполнении запроса.

3. **Обработка различных HTTP-методов:** В HTTP-запросах могут быть использованы различные методы, такие как **GET**, **POST**, **PUT**, **DELETE** и другие. Сервер может обрабатывать запросы по этим методам.

   Пример обработки различных методов:

   ```javascript
   const http = require("http")

   const server = http.createServer((req, res) => {
     if (req.method === "GET") {
       res.writeHead(200, { "Content-Type": "text/plain" })
       res.end("GET request received")
     } else if (req.method === "POST") {
       res.writeHead(200, { "Content-Type": "text/plain" })
       res.end("POST request received")
     } else {
       res.writeHead(405, { "Content-Type": "text/plain" })
       res.end("Method Not Allowed")
     }
   })

   server.listen(3000, () => {
     console.log("Server running at http://localhost:3000/")
   })
   ```

   **Объяснение:**

   - В этом примере сервер обрабатывает **GET** и **POST** запросы, отвечая разными сообщениями. Для всех остальных методов возвращается ошибка **405 Method Not Allowed**.

4. **Заголовки HTTP:** Вы можете работать с HTTP-заголовками для управления метаданными запроса и ответа (например, указание типа контента, авторизации, кэширования).

   Пример установки заголовков:

   ```javascript
   const http = require("http")

   const server = http.createServer((req, res) => {
     res.writeHead(200, {
       "Content-Type": "text/html",
       "X-Custom-Header": "MyHeaderValue",
     })
     res.end("<h1>Hello, World!</h1>")
   })

   server.listen(3000, () => {
     console.log("Server running at http://localhost:3000/")
   })
   ```

   **Объяснение:**

   - **`res.writeHead()`** позволяет установить код состояния и заголовки ответа.
   - В данном примере заголовок `X-Custom-Header` добавляется в ответ.

5. **Обработка ошибок:** Важным аспектом работы с HTTP-сервером является обработка ошибок, таких как неправильные URL, отсутствие доступа к серверу и другие.

   Пример обработки ошибок:

   ```javascript
   const http = require("http")

   const server = http.createServer((req, res) => {
     if (req.url === "/error") {
       res.writeHead(500, { "Content-Type": "text/plain" })
       res.end("Internal Server Error")
     } else {
       res.writeHead(200, { "Content-Type": "text/plain" })
       res.end("Hello, World!")
     }
   })

   server.listen(3000, () => {
     console.log("Server running at http://localhost:3000/")
   })
   ```

   **Объяснение:**

   - В этом примере, если запрашивается путь `/error`, сервер возвращает ошибку **500 Internal Server Error**.

### Подведем итоги:

- **`http.createServer()`** позволяет создавать серверы, обрабатывающие HTTP-запросы.
- **`http.get()`** и **`http.request()`** позволяют отправлять HTTP-запросы другим серверам.
- Модуль **`http`** в Node.js позволяет работать с HTTP-заголовками, кодами состояния и методами запросов, а также предоставляет базовую функциональность для создания серверов и обработки ошибок.

---

[[002 Node.js|Назад]]
