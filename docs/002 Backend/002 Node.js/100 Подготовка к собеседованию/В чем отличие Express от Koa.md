---
title: В чем отличие Express от Koa
draft: false
tags:
  - "#NodeJS"
  - "#Express"
  - "#Koa"
  - "#фреймворки"
  - "#middleware"
info:
  - "[Express.js документация](https://expressjs.com/)"
  - "[Koa.js документация](https://koajs.com/)"
  - "[Сравнение Node.js фреймворков](https://nodejs.dev/learn/nodejs-frameworks)"
---

# Сравнение Express.js и Koa.js

**Express.js** и **Koa.js** — два популярных фреймворка для создания серверных приложений на **Node.js**, созданные одной и той же командой разработчиков. Однако они имеют несколько принципиальных отличий в подходе к разработке.

## Краткое сравнение

| **Критерий**               | **Express**                               | **Koa**                                  |
| -------------------------- | ----------------------------------------- | ---------------------------------------- |
| **Создатели**              | TJ Holowaychuk и команда                  | Та же команда, что и Express             |
| **Первый релиз**           | 2010 год                                  | 2013 год                                 |
| **Архитектура**            | Монолитный подход                         | Минималистичный, модульный подход        |
| **Middleware**             | Линейная модель                           | Каскадная модель (двунаправленный поток) |
| **Обработка ошибок**       | Через параметр next(err)                  | Через try/catch и контекст               |
| **Асинхронность**          | Традиционные колбэки                      | Нативная поддержка async/await           |
| **Встроенный функционал**  | Маршрутизация, шаблоны, статические файлы | Минимальное ядро, всё через модули       |
| **Размер**                 | Больше (более функций из коробки)         | Меньше (минималистичное ядро)            |
| **Кривая обучения**        | Более плоская, легче начать               | Более крутая, требует понимания промисов |
| **Комьюнити и экосистема** | Очень большая                             | Меньше, но растёт                        |

## 1. Подход к архитектуре

### Express:

```javascript
const express = require("express")
const app = express()

// Встроенные middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))

// Маршрутизация
app.get("/", (req, res) => {
  res.send("Привет от Express!")
})

app.listen(3000, () => console.log("Express запущен на порту 3000"))
```

### Koa:

```javascript
const Koa = require("koa")
const Router = require("@koa/router")
const app = new Koa()
const router = new Router()

// Koa не имеет встроенных middleware, нужны отдельные модули
const bodyParser = require("koa-bodyparser")
const serve = require("koa-static")

app.use(bodyParser())
app.use(serve("public"))

// Маршрутизация через внешний модуль
router.get("/", (ctx) => {
  ctx.body = "Привет от Koa!"
})

app.use(router.routes()).use(router.allowedMethods())

app.listen(3000, () => console.log("Koa запущен на порту 3000"))
```

### Ключевые отличия в архитектуре:

| **Express**                                      | **Koa**                                            |
| ------------------------------------------------ | -------------------------------------------------- |
| Включает множество функций из коробки            | Минимальное ядро (~570 строк кода)                 |
| Встроенная маршрутизация                         | Маршрутизация через отдельные модули (@koa/router) |
| Обработка req и res напрямую (как в http модуле) | Абстракция через единый объект контекста (ctx)     |
| Подход "все инструменты включены"                | Подход "используй только то, что нужно"            |

## 2. Асинхронность и обработка ошибок

### Express (с колбэками):

```javascript
app.get("/users/:id", (req, res, next) => {
  // Асинхронная операция с колбэком
  database.getUser(req.params.id, (err, user) => {
    if (err) {
      return next(err) // Передача ошибки в middleware обработки ошибок
    }

    if (!user) {
      res.status(404).json({ error: "Пользователь не найден" })
      return
    }

    // Получение дополнительных данных
    database.getUserPosts(user.id, (err, posts) => {
      if (err) {
        return next(err)
      }

      user.posts = posts
      res.json(user)
    })
  })
})

// Обработчик ошибок
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: "Внутренняя ошибка сервера" })
})
```

### Express (с промисами и async/await):

```javascript
// Нужен middleware-обертка для поддержки async/await
const asyncHandler = require("express-async-handler")

app.get(
  "/users/:id",
  asyncHandler(async (req, res) => {
    try {
      const user = await database.getUser(req.params.id)

      if (!user) {
        return res.status(404).json({ error: "Пользователь не найден" })
      }

      const posts = await database.getUserPosts(user.id)
      user.posts = posts

      res.json(user)
    } catch (err) {
      // Необходимо явно обрабатывать ошибки или они будут переданы в Express
      res.status(500).json({ error: "Внутренняя ошибка сервера" })
    }
  }),
)
```

### Koa (с нативной поддержкой async/await):

```javascript
router.get("/users/:id", async (ctx) => {
  try {
    const user = await database.getUser(ctx.params.id)

    if (!user) {
      ctx.status = 404
      ctx.body = { error: "Пользователь не найден" }
      return
    }

    const posts = await database.getUserPosts(user.id)
    user.posts = posts

    ctx.body = user
  } catch (err) {
    // Ошибки будут автоматически перехвачены центральным обработчиком
    ctx.status = 500
    ctx.body = { error: "Внутренняя ошибка сервера" }
    ctx.app.emit("error", err, ctx)
  }
})

// Обработчик ошибок
app.on("error", (err, ctx) => {
  console.error("Серверная ошибка:", err)
  // Дополнительная обработка, логирование, метрики и т.д.
})
```

### Ключевые отличия в обработке ошибок:

| **Express**                                                 | **Koa**                                                        |
| ----------------------------------------------------------- | -------------------------------------------------------------- |
| Передача ошибок через `next(err)`                           | Использование `try/catch` или перехват через `app.on('error')` |
| Для поддержки async/await нужны доп. библиотеки или обертки | Нативная поддержка async/await                                 |
| Последовательные обработчики для одного маршрута            | Лучшее управление потоком выполнения                           |
| Усложненное управление асинхронными ошибками                | Более предсказуемое поведение асинхронных ошибок               |

## 3. Middleware и поток выполнения

### Express (линейный поток):

```javascript
app.use((req, res, next) => {
  console.log("Middleware 1: начало")
  next() // Передача управления следующему middleware
  console.log("Middleware 1: конец") // Выполнится после всех middleware, но не обязательно после отправки ответа
})

app.use((req, res, next) => {
  console.log("Middleware 2: начало")
  next() // Передача управления следующему middleware
  console.log("Middleware 2: конец")
})

app.get("/", (req, res) => {
  console.log("Обработчик маршрута")
  res.send("Hello World") // Отправка ответа
})

// Вывод будет:
// Middleware 1: начало
// Middleware 2: начало
// Обработчик маршрута
// Middleware 2: конец
// Middleware 1: конец
```

### Koa (каскадный поток):

```javascript
app.use(async (ctx, next) => {
  console.log("Middleware 1: начало")
  const start = Date.now()

  await next() // Ожидание выполнения всех последующих middleware

  const ms = Date.now() - start
  console.log(`Middleware 1: конец, выполнено за ${ms}ms`)
  // Этот код ГАРАНТИРОВАННО выполнится после всех последующих middleware
})

app.use(async (ctx, next) => {
  console.log("Middleware 2: начало")

  await next() // Ожидание выполнения всех последующих middleware

  console.log("Middleware 2: конец")
  // Код здесь выполнится после обработчика маршрута, но до завершения первого middleware
})

router.get("/", async (ctx) => {
  console.log("Обработчик маршрута")
  ctx.body = "Hello World"

  // Имитация длительной операции
  await new Promise((resolve) => setTimeout(resolve, 100))
  console.log("Длительная операция завершена")
})

// Вывод будет:
// Middleware 1: начало
// Middleware 2: начало
// Обработчик маршрута
// Длительная операция завершена
// Middleware 2: конец
// Middleware 1: конец, выполнено за 100+ms
```

### Диаграмма потока выполнения:

**Express (линейный):**

```
       ┌────────────┐      ┌────────────┐      ┌────────────┐
request│ Middleware 1├─────►│ Middleware 2├─────►│   Route    │
       └─────┬──────┘      └─────┬──────┘      └─────┬──────┘
             │                   │                   │
             ▼                   ▼                   ▼
             │                   │                   │
             │                   │           res.send() ─────► response
             │                   │                   │
             └───────────────────┴───────────────────┘
```

**Koa (каскадный):**

```
       ┌────────────┐
request│ Middleware 1│
       └─────┬──────┘
             │
             ▼
       ┌────────────┐
       │ Middleware 2│
       └─────┬──────┘
             │
             ▼
       ┌────────────┐
       │   Route    │
       └─────┬──────┘
             │
             ▼
       ┌────────────┐
       │ Middleware 2│
       └─────┬──────┘
             │
             ▼
       ┌────────────┐
       │ Middleware 1├───────► response
       └────────────┘
```

## 4. Объект контекста vs req/res

### Express (разделенные объекты req и res):

```javascript
app.use((req, res, next) => {
  // Добавление данных в req
  req.startTime = Date.now()
  next()
})

app.get("/api/data", (req, res) => {
  // Использование данных из req
  const processingTime = Date.now() - req.startTime

  res.json({
    success: true,
    processingTime: `${processingTime}ms`,
    data: { message: "Hello from Express" },
  })
})
```

### Koa (единый объект контекста ctx):

```javascript
app.use(async (ctx, next) => {
  // Добавление данных в контекст
  ctx.state.startTime = Date.now()
  await next()
})

router.get("/api/data", async (ctx) => {
  // Использование данных из контекста
  const processingTime = Date.now() - ctx.state.startTime

  // Установка тела ответа
  ctx.body = {
    success: true,
    processingTime: `${processingTime}ms`,
    data: { message: "Hello from Koa" },
  }
})
```

### Объект контекста Koa включает:

```javascript
ctx = {
  request: {}, // Расширенная версия req, с удобными методами и свойствами
  response: {}, // Расширенная версия res, с удобными методами и свойствами
  req: {}, // Стандартный Node.js req
  res: {}, // Стандартный Node.js res
  state: {}, // Рекомендуемое место для хранения данных по запросу
  app: {}, // Экземпляр приложения
  cookies: {}, // cookie-парсер/установщик
  throw: function, // Бросание ошибок с HTTP-статусами
  assert: function, // Проверка условий
  respond: true/false, // Автоматически отправлять ответ?
}
```

## 5. Примеры полных приложений

### Express:

```javascript
const express = require("express")
const bodyParser = require("body-parser")
const morgan = require("morgan")

const app = express()

// Middleware
app.use(morgan("dev")) // Логирование запросов
app.use(bodyParser.json())
app.use(express.static("public"))

// Маршруты
app.get("/", (req, res) => {
  res.send("Hello World!")
})

// Middleware для проверки API ключа
function verifyApiKey(req, res, next) {
  const apiKey = req.headers["x-api-key"]

  if (!apiKey || apiKey !== "secret-key") {
    return res.status(401).json({ error: "Неверный API ключ" })
  }

  next()
}

// Использование middleware для определенных маршрутов
app.post("/api/data", verifyApiKey, (req, res) => {
  console.log("Получены данные:", req.body)
  res.json({ success: true, data: req.body })
})

// Обработка 404 ошибок
app.use((req, res) => {
  res.status(404).send("Страница не найдена")
})

// Обработка ошибок
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send("Что-то сломалось!")
})

// Запуск сервера
app.listen(3000, () => console.log("Сервер запущен на порту 3000"))
```

### Koa:

```javascript
const Koa = require("koa")
const Router = require("@koa/router")
const bodyParser = require("koa-bodyparser")
const serve = require("koa-static")
const logger = require("koa-logger")

const app = new Koa()
const router = new Router()

// Глобальная обработка ошибок
app.use(async (ctx, next) => {
  try {
    await next()
    // Обработка 404, если маршрут не найден
    if (ctx.status === 404) {
      ctx.status = 404
      ctx.body = "Страница не найдена"
    }
  } catch (err) {
    ctx.status = err.status || 500
    ctx.body = { error: err.message }
    ctx.app.emit("error", err, ctx)
  }
})

// Middleware
app.use(logger()) // Логирование запросов
app.use(bodyParser())
app.use(serve("public"))

// Маршруты
router.get("/", (ctx) => {
  ctx.body = "Hello World!"
})

// Middleware для проверки API ключа
async function verifyApiKey(ctx, next) {
  const apiKey = ctx.headers["x-api-key"]

  if (!apiKey || apiKey !== "secret-key") {
    ctx.status = 401
    ctx.body = { error: "Неверный API ключ" }
    return
  }

  await next()
}

// Использование middleware для определенных маршрутов
router.post("/api/data", verifyApiKey, (ctx) => {
  console.log("Получены данные:", ctx.request.body)
  ctx.body = { success: true, data: ctx.request.body }
})

// Подключение маршрутов
app.use(router.routes()).use(router.allowedMethods())

// Обработка ошибок
app.on("error", (err, ctx) => {
  console.error("Ошибка сервера", err)
})

// Запуск сервера
app.listen(3000, () => console.log("Сервер запущен на порту 3000"))
```

## 6. Производительность и масштабируемость

### Сравнение производительности:

| **Метрика**                  | **Express**                        | **Koa**                                      |
| ---------------------------- | ---------------------------------- | -------------------------------------------- |
| Запросов в секунду (базовый) | ~9,000-12,000 RPS                  | ~10,000-14,000 RPS                           |
| Использование памяти         | Выше за счет встроенных middleware | Ниже за счет минималистичности               |
| Время отклика                | Отличное                           | Отличное, может быть немного быстрее Express |
| Кодовая база                 | Больше, сложнее поддерживать       | Меньше, легче аудит и поддержка              |

_Примечание: точные цифры зависят от аппаратного обеспечения, версий и конфигурации_

## 7. Когда использовать каждый из фреймворков

### Express подходит для:

- Быстрого старта проектов с минимальной настройкой
- Разработчиков, привыкших к традиционным колбэкам в Node.js
- Стабильных, долгосрочных проектов
- Проектов, где важна обширная экосистема middleware и документация
- Типовых REST API, веб-приложений и монолитных приложений
- Интеграции с устаревшими системами

### Koa подходит для:

- Проектов, требующих чистого асинхронного кода с async/await
- Разработчиков, предпочитающих современный синтаксис и практики
- Микросервисной архитектуры
- Сложных потоков обработки запросов
- Высоконагруженных приложений
- Проектов, где контроль над стеком технологий важнее экосистемы

## Заключение

Выбор между **Express** и **Koa** зависит от ваших предпочтений и требований проекта:

- **Express** — зрелый, хорошо документированный фреймворк с большой экосистемой, идеален для быстрого старта
- **Koa** — современный, элегантный фреймворк, ориентированный на асинхронное программирование и модульность

Оба фреймворка являются отличным выбором для создания веб-приложений на Node.js, и во многих случаях предпочтения в стиле программирования могут быть решающим фактором.

---

[[002 Node.js|Назад]]
