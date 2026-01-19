---
title: Что такое Middleware в Express.js и как это работает
draft: false
tags:
  - "#NodeJS"
  - "#ExpressJS"
  - "#Middleware"
  - "#HTTP"
  - "#WebServer"
info:
  - "[Документация Express.js](https://expressjs.com/en/guide/using-middleware.html)"
  - "[MDN Web Docs - Express Web Framework](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Introduction)"
---

![[Pasted image middleware-express.png|600]]

**Middleware** в Express.js — это функции, которые имеют доступ к объекту запроса (request), объекту ответа (response) и следующей функции middleware в цикле запрос-ответ приложения.

Middleware функции могут выполнять следующие задачи:

- Выполнять любой код
- Изменять объекты запроса и ответа
- Завершать цикл запрос-ответ
- Вызывать следующую функцию middleware в стеке

## Базовая структура Middleware

```javascript
function middleware(req, res, next) {
  // Выполнение кода

  // Модификация объектов req или res
  req.customProperty = "значение"

  // Вызов следующей middleware функции
  next()

  // Или завершение цикла запрос-ответ
  // res.send('Ответ');
}
```

## Типы Middleware в Express.js

1. **Уровень приложения (Application-level middleware)**:

```javascript
const express = require("express")
const app = express()

// Middleware без пути (выполняется для каждого запроса)
app.use((req, res, next) => {
  console.log("Время запроса:", Date.now())
  next()
})

// Middleware с путем (выполняется только для указанного пути)
app.use("/user/:id", (req, res, next) => {
  console.log("Запрос к ID:", req.params.id)
  next()
})
```

2. **Уровень маршрутизатора (Router-level middleware)**:

```javascript
const router = express.Router()

router.use((req, res, next) => {
  console.log("Время запроса к маршрутизатору:", Date.now())
  next()
})

app.use("/api", router)
```

3. **Обработка ошибок (Error-handling middleware)**:

```javascript
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send("Что-то сломалось!")
})
```

4. **Встроенные middleware**:

   - `express.static`: Для обслуживания статических файлов
   - `express.json`: Для парсинга JSON-запросов
   - `express.urlencoded`: Для парсинга URL-encoded запросов

5. **Сторонние middleware**:
   - `cookie-parser`: Для работы с cookies
   - `cors`: Для включения CORS
   - `helmet`: Для безопасности HTTP-заголовков

## Порядок выполнения Middleware

В Express.js порядок добавления middleware важен — они выполняются в том порядке, в котором были определены.

```javascript
// Этот middleware выполнится первым
app.use((req, res, next) => {
  console.log("Первый middleware")
  next()
})

// Этот middleware выполнится вторым
app.use((req, res, next) => {
  console.log("Второй middleware")
  next()
})

// Обработчик маршрута выполнится последним
app.get("/", (req, res) => {
  res.send("Ответ от сервера")
})
```

## Цепочка Middleware

Использование нескольких middleware для одного маршрута:

```javascript
const authenticate = (req, res, next) => {
  // Проверка аутентификации
  if (req.isAuthenticated()) {
    return next()
  }
  res.status(401).send("Требуется аутентификация")
}

const authorize = (req, res, next) => {
  // Проверка авторизации
  if (req.user.role === "admin") {
    return next()
  }
  res.status(403).send("Доступ запрещен")
}

// Использование цепочки middleware
app.get("/admin/dashboard", authenticate, authorize, (req, res) => {
  res.send("Панель администратора")
})
```

В данном примере запрос проходит последовательно через:

1. Проверку аутентификации (`authenticate`)
2. Проверку авторизации (`authorize`)
3. Обработчик маршрута

Если любой middleware в цепочке не вызывает `next()`, цикл запрос-ответ завершается, и следующие middleware не выполняются.

---

[[002 Node.js|Назад]]
