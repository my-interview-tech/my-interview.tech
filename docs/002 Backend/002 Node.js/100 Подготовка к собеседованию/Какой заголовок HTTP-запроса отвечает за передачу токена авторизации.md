---
title: Какой заголовок HTTP-запроса отвечает за передачу токена авторизации
draft: false
tags:
  - "#NodeJS"
  - "#HTTP"
  - "#authentication"
  - "#API"
  - "#security"
  - "#JWT"
  - "#headers"
info:
  - https://developer.mozilla.org/ru/docs/Web/HTTP/Headers/Authorization
  - https://datatracker.ietf.org/doc/html/rfc7235#section-4.2
  - https://habr.com/ru/articles/502092/
---

# Заголовок HTTP-запроса для передачи токена авторизации

За передачу токена авторизации в HTTP-запросах отвечает заголовок **`Authorization`**.

## Формат и структура заголовка Authorization

Заголовок `Authorization` имеет следующий формат:

```
Authorization: <тип> <данные>
```

где:

- `<тип>` — схема аутентификации
- `<данные>` — данные аутентификации, формат которых зависит от используемой схемы

## Распространенные схемы аутентификации

### 1. Bearer (JWT и OAuth 2.0)

Наиболее часто используемая схема для передачи JWT (JSON Web Tokens) и OAuth 2.0 токенов доступа:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

### 2. Basic (Базовая аутентификация)

Передача имени пользователя и пароля в кодировке Base64:

```
Authorization: Basic QWxhZGRpbjpPcGVuU2VzYW1l
```

Здесь `QWxhZGRpbjpPcGVuU2VzYW1l` — это Base64-кодированная строка `username:password` (например, `Aladdin:OpenSesame`).

### 3. Digest (Дайджест-аутентификация)

Более защищенная альтернатива Basic-аутентификации:

```
Authorization: Digest username="Mufasa",
               realm="testrealm@host.com",
               nonce="dcd98b7102dd2f0e8b11d0f600bfb0c093",
               uri="/dir/index.html",
               response="6629fae49393a05397450978507c4ef1"
```

### 4. API Key

Некоторые API используют свои варианты передачи ключей API:

```
Authorization: ApiKey your-api-key-here
```

## Использование в Node.js

### Отправка запроса с токеном в Node.js

#### С использованием стандартного модуля https

```javascript
const https = require("https")

const options = {
  hostname: "api.example.com",
  path: "/data",
  method: "GET",
  headers: {
    Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  },
}

const req = https.request(options, (res) => {
  let data = ""

  res.on("data", (chunk) => {
    data += chunk
  })

  res.on("end", () => {
    console.log(JSON.parse(data))
  })
})

req.on("error", (error) => {
  console.error(error)
})

req.end()
```

#### С использованием библиотеки axios

```javascript
const axios = require("axios")

axios
  .get("https://api.example.com/data", {
    headers: {
      Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    },
  })
  .then((response) => {
    console.log(response.data)
  })
  .catch((error) => {
    console.error("Ошибка:", error)
  })
```

### Обработка заголовка Authorization в Express.js

```javascript
const express = require("express")
const app = express()

// Middleware для проверки Bearer-токена
function authenticateToken(req, res, next) {
  // Получаем значение заголовка Authorization
  const authHeader = req.headers["authorization"]

  // Проверяем наличие заголовка и что он начинается с "Bearer "
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Требуется аутентификация" })
  }

  // Извлекаем токен (отбрасываем "Bearer ")
  const token = authHeader.split(" ")[1]

  // Проверка токена (пример с JWT)
  try {
    const decoded = jwt.verify(token, "ваш_секретный_ключ")
    req.user = decoded // Сохраняем данные пользователя
    next() // Переходим к следующему middleware или обработчику маршрута
  } catch (err) {
    return res.status(403).json({ error: "Недействительный токен" })
  }
}

// Защищенный маршрут
app.get("/protected", authenticateToken, (req, res) => {
  res.json({ message: "Это защищенный ресурс", user: req.user })
})

app.listen(3000, () => {
  console.log("Сервер запущен на порту 3000")
})
```

## Безопасность и лучшие практики

1. **Всегда используйте HTTPS** — заголовок `Authorization` передается в открытом виде, поэтому соединение должно быть зашифровано.

2. **Установите подходящие сроки действия токенов** — короткие сроки для токенов доступа (например, 15 минут) и более длинные для токенов обновления.

3. **Валидируйте токены на сервере** — проверяйте подпись, срок действия и другие утверждения (claims).

4. **Не передавайте чувствительные данные в JWT** — помните, что содержимое JWT можно расшифровать, оно только защищено от изменений.

5. **Используйте secure и httpOnly cookie** как альтернативу для веб-приложений.

## Альтернативные способы передачи токенов

Хотя заголовок `Authorization` является стандартным и рекомендуемым способом передачи токенов, существуют альтернативные методы:

1. **URL-параметры запроса** — `https://api.example.com/data?token=your-token-here` (не рекомендуется, так как токены могут сохраняться в истории браузера, логах сервера и т.д.)

2. **Куки** — могут быть настроены как `httpOnly` и `secure` для повышения безопасности.

3. **Заголовок `X-API-Key`** — нестандартный заголовок, используемый некоторыми API.

В современной веб-разработке заголовок `Authorization` с схемой `Bearer` стал стандартом де-факто для передачи токенов JWT и OAuth 2.0, особенно в REST API и микросервисных архитектурах.

---

[[003 JSCore|Назад]]
