---
uid: q3xgiU139WZ9_o7ygqVCa
title: >-
  Как вы можете обрабатывать запросы (CORS) в Next.js при отправке запросов API
  в другой домен?
tags:
  - NextJS
  - CORS
  - proxy
  - next-connect
info:
  - >-
    https://www.geeksforgeeks.org/how-to-use-cors-in-next-js-to-handle-cross-origin-requests/
draft: false
technology: Next.js
specialty: Frontend
tools: []
order: 35
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

Для обработки запросов CORS (Cross-Origin Resource Sharing) в Next.js при отправке запросов API на другой домен, можно использовать несколько подходов:

1. Настройка сервера или API endpoint

На сервере или API endpoint, который получает ваши запросы, необходимо настроить заголовки CORS, чтобы разрешить запросы с домена вашего Next.js приложения. Например, если вы используете Express.js, вы можете добавить middleware для обработки CORS:

```javascript
const express = require("express");
const cors = require("cors");
const app = express();

app.use(
  cors({
    origin: "https://your-nextjs-app-domain.com",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
```

2. Использование serverless функций в Next.js как прокси

Вы можете создать serverless функцию в Next.js, которая будет выступать в качестве прокси для ваших запросов. Это позволяет обойти ограничения CORS, так как запросы будут исходить от сервера Next.js, а не от клиента.

Создайте файл `pages/api/proxy.js`:

```javascript
export default async function handler(req, res) {
  const { method, body } = req;
  const url = "https://external-api-domain.com/endpoint";

  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: req.headers.authorization || "",
    },
    body:
      method === "POST" || method === "PUT" ? JSON.stringify(body) : undefined,
  });

  const data = await response.json();

  res.status(response.status).json(data);
}
```

Теперь вы можете отправлять запросы к `/api/proxy` вместо прямого обращения к внешнему API:

```javascript
fetch("/api/proxy", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer your-token",
  },
  body: JSON.stringify({ key: "value" }),
})
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error("Error:", error));
```

3. Использование библиотеки `next-connect` для обработки CORS

Вы можете использовать библиотеку `next-connect` для более удобной обработки CORS в ваших API маршрутах:

Установите библиотеку:

```bash
npm install next-connect
```

Создайте файл `pages/api/example.js`:

```javascript
import nextConnect from "next-connect";
import cors from "cors";

const handler = nextConnect()
  .use(
    cors({
      origin: "https://your-nextjs-app-domain.com",
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"],
    }),
  )
  .get((req, res) => {
    res.json({ message: "GET request successful" });
  })
  .post((req, res) => {
    res.json({ message: "POST request successful" });
  });

export default handler;
```

Теперь вы можете отправлять запросы к `/api/example` с правильными заголовками CORS.

Эти методы помогут вам эффективно обрабатывать запросы CORS в вашем Next.js приложении.

---

[[006 Next.js|Назад]]
