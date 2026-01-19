---
title: Безопасность cookies
draft: true
tags:
  - infosec
  - Cookie
info:
---

Cookies остаются важным механизмом хранения данных на стороне клиента, но они уязвимы для различных атак:

Угрозы безопасности для cookies:

- **XSS (Cross-Site Scripting)** – атакующий может внедрить JavaScript-код, который получает доступ к `document.cookie`
- **Сниффинг** – перехват незащищенных cookie при передаче по незащищенным каналам
- **CSRF (Cross-Site Request Forgery)** – использование cookies для отправки запросов от имени пользователя
- **Session Hijacking** – кража идентификатора сессии из cookie

Защита cookies:

- **HttpOnly** – запрет доступа к cookie через JavaScript:

```http
  Set-Cookie: sessionId=abc123; HttpOnly
```

- **Secure** – отправка cookie только по HTTPS:

```http
  Set-Cookie: sessionId=abc123; Secure
```

- **SameSite** – защита от CSRF-атак:

```http
  Set-Cookie: sessionId=abc123; SameSite=Strict
```

- **Domain и Path** – ограничение области действия cookie:

```http
  Set-Cookie: sessionId=abc123; Domain=example.com; Path=/app
```

- **Max-Age/Expires** – ограничение срока жизни cookie:

```http
  Set-Cookie: sessionId=abc123; Max-Age=3600
```

Хорошая практика для установки безопасных cookies на сервере (Node.js):

```javascript
res.cookie("sessionId", "abc123", {
  httpOnly: true,
  secure: true,
  sameSite: "strict",
  maxAge: 3600000, // 1 час в миллисекундах
  domain: "example.com",
  path: "/",
})
```

