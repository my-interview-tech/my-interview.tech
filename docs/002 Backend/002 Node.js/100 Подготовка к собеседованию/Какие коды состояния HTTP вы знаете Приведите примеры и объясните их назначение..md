---
title: Какие коды состояния HTTP вы знаете Приведите примеры и объясните их назначение.
draft: false
tags:
  - "#NodeJS"
  - "#HTTP"
  - "#статус-коды"
  - "#веб-протоколы"
  - "#REST"
info:
  - "[Официальная спецификация HTTP](https://tools.ietf.org/html/rfc7231)"
  - "[MDN Web Docs: HTTP Status Codes](https://developer.mozilla.org/ru/docs/Web/HTTP/Status)"
  - "[HTTP Status Cats](https://http.cat/)"
---

# Коды состояния HTTP

Коды состояния HTTP (HTTP Status Codes) — это трехзначные числа, возвращаемые сервером в ответ на запрос клиента. Они указывают на результат обработки запроса и подразделяются на пять классов.

## 1xx — Информационные

Запрос принят, и обработка продолжается. Клиент должен ожидать финального ответа.

- **100 Continue** — клиент должен продолжить запрос или игнорировать этот ответ, если запрос уже завершен.
- **101 Switching Protocols** — сервер переключается на протокол, указанный в заголовке Upgrade (например, для WebSocket).
- **102 Processing** — сервер получил запрос и обрабатывает его, но ответ пока не готов.

```javascript
// Пример использования 101 Switching Protocols в Node.js для WebSocket
const server = http.createServer((req, res) => {
  if (req.headers.upgrade === "websocket") {
    res.writeHead(101, {
      Upgrade: "websocket",
      Connection: "Upgrade",
    })
    // Далее следует установка WebSocket соединения
  }
})
```

## 2xx — Успешные

Запрос был успешно принят, понят и обработан.

- **200 OK** — стандартный успешный ответ, обычно возвращает содержимое.
- **201 Created** — ресурс успешно создан (например, после POST-запроса).
- **202 Accepted** — запрос принят, но обработка еще не завершена.
- **204 No Content** — запрос выполнен успешно, но нет содержимого для возврата (например, DELETE).
- **206 Partial Content** — сервер успешно обработал частичный запрос (используется для загрузки по частям).

```javascript
// Пример ответа 201 Created при создании ресурса
app.post("/users", (req, res) => {
  const user = createUser(req.body)
  res.status(201).location(`/users/${user.id}`).json(user)
})

// Пример ответа 204 No Content при удалении
app.delete("/users/:id", (req, res) => {
  deleteUser(req.params.id)
  res.status(204).end()
})
```

## 3xx — Перенаправления

Клиент должен предпринять дополнительные действия для завершения запроса.

- **301 Moved Permanently** — ресурс перемещен навсегда, клиенты должны использовать новый URL.
- **302 Found** — временное перенаправление.
- **303 See Other** — ответ на запрос находится по другому URI (используется после POST).
- **304 Not Modified** — содержимое не изменилось с момента последнего запроса (кэширование).
- **307 Temporary Redirect** — временное перенаправление, сохраняет метод запроса.
- **308 Permanent Redirect** — постоянное перенаправление, сохраняет метод запроса.

```javascript
// Пример редиректа в Express.js
app.get("/old-page", (req, res) => {
  res.redirect(301, "/new-page") // 301 Moved Permanently
})

// Пример ответа 304 Not Modified для кэширования
app.get("/users/:id", (req, res) => {
  const user = getUser(req.params.id)
  const etag = computeETag(user)

  if (req.headers["if-none-match"] === etag) {
    return res.status(304).end() // Not Modified
  }

  res.setHeader("ETag", etag)
  res.json(user)
})
```

## 4xx — Ошибки клиента

Запрос содержит синтаксические ошибки или не может быть выполнен из-за ошибок на стороне клиента.

- **400 Bad Request** — неверный запрос (например, невалидный JSON).
- **401 Unauthorized** — требуется аутентификация пользователя.
- **403 Forbidden** — доступ запрещен (даже с аутентификацией).
- **404 Not Found** — ресурс не найден.
- **405 Method Not Allowed** — метод запроса не поддерживается для данного ресурса.
- **409 Conflict** — конфликт с текущим состоянием ресурса.
- **413 Payload Too Large** — размер запроса превышает лимит.
- **429 Too Many Requests** — слишком много запросов (используется для ограничения частоты).

```javascript
// Пример обработки ошибок в Express.js
app.post("/api/users", (req, res) => {
  if (!req.body.email) {
    return res.status(400).json({ error: "Email обязателен" })
  }

  if (!isAuthenticated(req)) {
    return res.status(401).json({ error: "Требуется аутентификация" })
  }

  if (!hasPermission(req.user, "create:users")) {
    return res.status(403).json({ error: "Доступ запрещен" })
  }

  // Обработка запроса при отсутствии ошибок...
})
```

## 5xx — Ошибки сервера

Сервер не смог выполнить запрос из-за ошибки на стороне сервера.

- **500 Internal Server Error** — общая ошибка сервера.
- **501 Not Implemented** — сервер не поддерживает функциональность, необходимую для запроса.
- **502 Bad Gateway** — промежуточный сервер получил неверный ответ от вышестоящего сервера.
- **503 Service Unavailable** — сервер временно недоступен (перегрузка или обслуживание).
- **504 Gateway Timeout** — прокси-сервер не получил своевременный ответ от вышестоящего сервера.

```javascript
// Обработка серверных ошибок в Express.js
app.use((err, req, res, next) => {
  console.error(err.stack)

  if (err.type === "database") {
    return res.status(503).json({
      error: "База данных временно недоступна",
      retry: true,
    })
  }

  // Общая обработка ошибок
  res.status(500).json({
    error: "Внутренняя ошибка сервера",
    id: req.id, // ID запроса для логирования
  })
})
```

## Практическое применение кодов состояния

### В REST API

При разработке RESTful API правильное использование кодов состояния HTTP критически важно:

- **GET** → 200 OK, 404 Not Found, 304 Not Modified
- **POST** → 201 Created, 400 Bad Request, 409 Conflict
- **PUT** → 200 OK, 204 No Content, 409 Conflict
- **PATCH** → 200 OK, 204 No Content, 400 Bad Request
- **DELETE** → 204 No Content, 404 Not Found

### Важность правильных кодов состояния

1. **Для клиентских приложений** — позволяют корректно обрабатывать различные сценарии
2. **Для разработчиков** — упрощают отладку и понимание API
3. **Для поисковых систем** — используются для индексации и понимания состояния сайта
4. **Для мониторинга** — позволяют отслеживать проблемы с приложением

Корректное использование кодов состояния HTTP делает ваше приложение более предсказуемым и профессиональным, следуя стандартам веб-разработки.

---

[[002 Node.js|Назад]]
