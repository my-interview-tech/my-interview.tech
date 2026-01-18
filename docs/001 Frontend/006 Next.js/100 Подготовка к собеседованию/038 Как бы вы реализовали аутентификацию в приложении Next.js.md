---
uid: kx6fTk0UG54Cwb3nlZcO6
title: Как бы вы реализовали аутентификацию в приложении Next.js?
tags:
  - NextJS
  - Authentication
  - JWT
  - getServerSideProps
  - getInitialProps
info:
  - "https://nextjs.org/docs/app/building-your-application/authentication"
draft: false
technology: Next.js
specialty: Frontend
tools: []
order: 38
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

Для реализации аутентификации в приложении Next.js с использованием JWT (JSON Web Tokens), вы можете следовать следующим шагам:

1. **Установка необходимых пакетов:**  
   Установите `jsonwebtoken` и `cookie-parser` для работы с JWT и обработки cookies.

```bash
    npm install jsonwebtoken cookie-parser
```

2. **Создание API маршрута для логина:**  
   Создайте API маршрут (например, `/api/login`), который будет проверять учетные данные пользователя и генерировать JWT.

```javascript
// pages/api/login.js
import jwt from "jsonwebtoken";
import cookie from "cookie";

export default function handler(req, res) {
  if (req.method === "POST") {
    const { username, password } = req.body;

    // Проверка учетных данных (например, сравнение с базой данных)
    if (username === "example" && password === "password") {
      const token = jwt.sign({ username }, "your-secret-key", {
        expiresIn: "1h",
      });

      res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          sameSite: "strict",
          maxAge: 3600,
          path: "/",
        }),
      );

      res.status(200).json({ message: "Logged in successfully" });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
```

3. **Создание middleware для защиты маршрутов:**  
   Создайте middleware функцию для проверки JWT из cookies. Если токен валиден, разрешите доступ; в противном случае перенаправьте на страницу входа или отправьте ошибку.

```javascript
// lib/auth.js
import jwt from "jsonwebtoken";
import cookie from "cookie";

export function requireAuth(handler) {
  return async (req, res) => {
    const { token } = cookie.parse(req.headers.cookie || "");

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      const decoded = jwt.verify(token, "your-secret-key");
      req.user = decoded;
      return handler(req, res);
    } catch (error) {
      return res.status(401).json({ message: "Invalid token" });
    }
  };
}
```

4. **Использование middleware в защищенных маршрутах:**  
   Используйте middleware в `getServerSideProps` или `getInitialProps` страниц, которые требуют защиты.

```javascript
// pages/protected.js
import { requireAuth } from "../lib/auth";

export const getServerSideProps = requireAuth(async (req, res) => {
  return {
    props: {
      user: req.user,
    },
  };
});

export default function ProtectedPage({ user }) {
  return <div>Welcome, {user.username}!</div>;
}
```

5. **Обработка выхода из системы:**  
   Создайте API маршрут для выхода из системы, который будет очищать cookie с токеном.

```javascript
// pages/api/logout.js
import cookie from "cookie";

export default function handler(req, res) {
  if (req.method === "POST") {
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        expires: new Date(0),
        path: "/",
      }),
    );

    res.status(200).json({ message: "Logged out successfully" });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
```

Эти шаги помогут вам реализовать аутентификацию на основе JWT в приложении Next.js.

---

[[006 Next.js|Назад]]
