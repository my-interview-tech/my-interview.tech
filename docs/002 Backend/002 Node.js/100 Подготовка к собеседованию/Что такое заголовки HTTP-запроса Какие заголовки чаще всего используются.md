---
title: Что такое заголовки HTTP-запроса Какие заголовки чаще всего используются
draft: false
tags:
  - "#NodeJS"
  - "#HTTP"
  - "#headers"
  - "#веб-разработка"
  - "#API"
  - "#сеть"
info:
  - https://developer.mozilla.org/ru/docs/Web/HTTP/Headers
  - https://expressjs.com/ru/api.html#res.set
  - https://habr.com/ru/articles/758000/
---

# HTTP-заголовки (HTTP Headers)

**HTTP-заголовки** — это пары ключ-значение, которые передаются в запросах и ответах между клиентом и сервером для предоставления дополнительной информации о запросе или ответе. Они играют важную роль в работе веб-приложений и API, предоставляя метаданные для HTTP-транзакций.

## Структура HTTP-заголовков

Заголовки отправляются после стартовой строки запроса или ответа и имеют формат:

```
Имя-Заголовка: значение
```

Заголовки разделяются символами переноса строки (CRLF), а сами заголовки отделяются от тела запроса или ответа пустой строкой:

```
GET /index.html HTTP/1.1
Host: example.com
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64)
Accept: text/html,application/xhtml+xml
Accept-Language: ru,en-US;q=0.9,en;q=0.8

[Тело запроса, если есть]
```

## Категории заголовков

### 1. Общие заголовки (General Headers)

Заголовки, применимые как к запросам, так и к ответам, но не имеющие отношения к передаваемым данным.

### 2. Заголовки запроса (Request Headers)

Содержат информацию о запросе и о клиенте.

### 3. Заголовки ответа (Response Headers)

Содержат дополнительную информацию об ответе сервера.

### 4. Заголовки сущности (Entity Headers)

Содержат информацию о теле сущности (content-length, content-type и т.д.).

## Наиболее часто используемые HTTP-заголовки

### Заголовки запроса

1. **Accept**

   - Определяет, какие типы содержимого клиент может обработать
   - Пример: `Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8`

2. **Accept-Language**

   - Указывает предпочтительные языки для ответа
   - Пример: `Accept-Language: ru,en-US;q=0.9,en;q=0.8`

3. **Accept-Encoding**

   - Указывает предпочтительные методы сжатия
   - Пример: `Accept-Encoding: gzip, deflate, br`

4. **Authorization**

   - Содержит данные аутентификации для доступа к защищенному ресурсу
   - Пример: `Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

5. **Content-Type**

   - Указывает тип содержимого в теле запроса
   - Пример: `Content-Type: application/json`

6. **User-Agent**

   - Информация о клиенте, отправляющем запрос
   - Пример: `User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36`

7. **Cookie**

   - Отправляет хранимые куки на сервер
   - Пример: `Cookie: session_id=12345; user_id=789`

8. **Host**

   - Указывает хост и порт сервера, к которому выполняется запрос (обязательный для HTTP/1.1)
   - Пример: `Host: api.example.com`

9. **Referer**

   - URL страницы, с которой был выполнен запрос
   - Пример: `Referer: https://example.com/about.html`

10. **Origin**
    - Источник запроса в кросс-доменных запросах
    - Пример: `Origin: https://example.com`

### Заголовки ответа

1. **Access-Control-Allow-Origin**

   - Определяет, может ли результат запроса быть доступен скрипту с указанного источника
   - Пример: `Access-Control-Allow-Origin: *`

2. **Cache-Control**

   - Директивы для механизмов кэширования
   - Пример: `Cache-Control: max-age=3600, public`

3. **Content-Type**

   - Указывает тип возвращаемого содержимого
   - Пример: `Content-Type: application/json; charset=utf-8`

4. **Content-Length**

   - Размер тела ответа в байтах
   - Пример: `Content-Length: 2048`

5. **ETag**

   - Идентификатор версии ресурса для кэширования
   - Пример: `ETag: "33a64df551425fcc55e4d42a148795d9f25f89d4"`

6. **Location**

   - URL для перенаправления (обычно с кодами ответа 3xx)
   - Пример: `Location: https://example.com/new-page`

7. **Set-Cookie**

   - Устанавливает куки в браузере
   - Пример: `Set-Cookie: session_id=12345; Path=/; HttpOnly; Secure`

8. **WWW-Authenticate**
   - Указывает метод аутентификации, необходимый для доступа к ресурсу
   - Пример: `WWW-Authenticate: Basic realm="User Visible Realm"`

## Использование заголовков в Node.js

### Пример отправки запроса с заголовками

```javascript
const https = require("https")

const options = {
  hostname: "api.example.com",
  path: "/data",
  method: "GET",
  headers: {
    Accept: "application/json",
    Authorization: "Bearer token123",
    "User-Agent": "MyNodeApp/1.0",
  },
}

const req = https.request(options, (res) => {
  console.log(`Статус: ${res.statusCode}`)
  console.log("Заголовки ответа:", res.headers)

  res.on("data", (chunk) => {
    console.log(`Получено: ${chunk}`)
  })
})

req.end()
```

### Пример обработки и установки заголовков в Express.js

```javascript
const express = require("express")
const app = express()

app.get("/api/user", (req, res) => {
  // Чтение заголовков запроса
  const token = req.headers.authorization
  const acceptType = req.headers.accept

  console.log(`Токен: ${token}`)
  console.log(`Запрошенный тип: ${acceptType}`)

  // Установка заголовков ответа
  res.setHeader("Content-Type", "application/json")
  res.setHeader("Cache-Control", "no-cache")
  res.setHeader("X-Powered-By", "Express")

  // Отправка ответа
  res.json({ name: "John", age: 30 })
})

app.listen(3000, () => {
  console.log("Сервер запущен на порту 3000")
})
```

## Специальные заголовки для безопасности

1. **Content-Security-Policy (CSP)**

   - Помогает предотвратить XSS и другие атаки внедрения кода
   - Пример: `Content-Security-Policy: default-src 'self'; script-src 'self' trusted-scripts.com`

2. **Strict-Transport-Security (HSTS)**

   - Требует HTTPS-соединения для всех будущих запросов
   - Пример: `Strict-Transport-Security: max-age=31536000; includeSubDomains`

3. **X-Content-Type-Options**

   - Предотвращает MIME-снифинг браузера
   - Пример: `X-Content-Type-Options: nosniff`

4. **X-XSS-Protection**
   - Включает защиту от XSS в браузере
   - Пример: `X-XSS-Protection: 1; mode=block`

## Заключение

HTTP-заголовки являются важной частью HTTP-протокола, обеспечивая передачу метаданных между клиентом и сервером. Правильное использование HTTP-заголовков позволяет:

- Улучшить кэширование и производительность
- Обеспечить безопасность приложения
- Настроить аутентификацию и авторизацию
- Оптимизировать передачу контента
- Поддерживать различные функции HTTP, такие как куки, редиректы и кросс-доменные запросы

Понимание и правильное использование заголовков является необходимым навыком для разработчиков веб-приложений и API.

---

[[003 JSCore|Назад]]
