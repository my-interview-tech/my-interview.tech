---
title: Зачем нужен express.errorHandler и как он настраивается для разных сред
draft: false
tags:
  - "#NodeJS"
  - "#Express"
  - "#errorHandler"
  - "#обработка-ошибок"
  - "#middleware"
  - "#безопасность"
info:
  - "[Документация Express по обработке ошибок](https://expressjs.com/en/guide/error-handling.html)"
  - "[Архивированная документация express-error-handler](https://github.com/expressjs/express-error-handler)"
  - "[Лучшие практики обработки ошибок в Express](https://strongloop.com/strongblog/robust-node-applications-error-handling/)"
---

# Зачем нужен express.errorHandler и как он настраивается для разных сред

Middleware `express.errorHandler` — это специальный компонент в Express.js, предназначенный для централизованной обработки ошибок, возникающих в процессе обработки HTTP-запросов. Он помогает организовать эффективное управление ошибками в приложении и предоставляет пользователям информативные ответы.

> **Примечание**: Встроенный `express.errorHandler` был удален из Express 4.x, но концепция централизованной обработки ошибок остается важной частью разработки Express-приложений. В этой статье рассматриваются как устаревший `express.errorHandler`, так и современные подходы к обработке ошибок.

## Преимущества использования обработчика ошибок

### 1. Централизованная обработка ошибок

Все ошибки, не обработанные в middleware или маршрутах, автоматически передаются обработчику ошибок. Это позволяет:

- Применять единый подход к обработке ошибок
- Избегать дублирования кода
- Обеспечивать согласованный формат ответов
- Улучшать поддерживаемость кода

### 2. Повышение безопасности

Правильная настройка обработчика ошибок помогает предотвратить утечку чувствительной информации:

- Скрывает сообщения об ошибках стека вызовов в продакшн-окружении
- Предотвращает раскрытие внутренней структуры приложения
- Защищает от атак, основанных на анализе ошибок

### 3. Улучшение пользовательского опыта

Вместо стандартных HTTP-ошибок или подробных стеков вызовов, пользователи видят понятные сообщения:

- Информативные и дружественные сообщения об ошибках
- Рекомендации для решения проблемы
- Единый стиль оформления ошибок
- Возможность локализации сообщений об ошибках

### 4. Расширенные возможности

Централизованная обработка ошибок позволяет реализовать:

- Логирование ошибок с различными уровнями детализации
- Отправку уведомлений о критических ошибках
- Интеграцию с системами мониторинга
- Сбор метрик о возникающих ошибках

## Настройка обработчика ошибок для разных сред

### Для среды разработки (development)

В среде разработки важно получать максимально подробную информацию об ошибках для быстрой отладки:

```javascript
// Обработчик ошибок для среды разработки
if (process.env.NODE_ENV === "development") {
  app.use((err, req, res, next) => {
    console.error(err)

    res.status(err.status || 500).json({
      error: {
        message: err.message,
        status: err.status || 500,
        stack: err.stack,
        details: err.details || null,
      },
    })
  })
}
```

**Ключевые особенности:**

- Вывод полного стека вызовов
- Детальное логирование
- Максимум информации для отладки
- Возврат всех доступных сведений об ошибке

### Для тестовой среды (staging)

В тестовой среде стоит имитировать поведение продакшн-среды, но с расширенным логированием:

```javascript
// Обработчик ошибок для тестовой среды
if (process.env.NODE_ENV === "staging") {
  app.use((err, req, res, next) => {
    // Подробное логирование для анализа
    console.error(`[STAGING ERROR] ${err.message}`)
    console.error(err.stack)

    // Отправка ограниченной информации клиенту
    res.status(err.status || 500).json({
      error: {
        message: err.message,
        status: err.status || 500,
        requestId: req.id, // для трассировки
      },
    })
  })
}
```

**Ключевые особенности:**

- Подробное логирование для внутреннего анализа
- Ограниченная информация для пользователя
- Идентификаторы запросов для трассировки проблем
- Поведение, близкое к продакшн-среде

### Для продакшн-среды (production)

В продакшн-среде критически важно скрывать внутренние детали, но обеспечивать возможность анализа ошибок:

```javascript
// Обработчик ошибок для продакшн-среды
if (process.env.NODE_ENV === "production") {
  app.use((err, req, res, next) => {
    // Запись детальной информации в логи
    console.error(`[ERROR] ${new Date().toISOString()} - ${req.method} ${req.url}`)
    console.error(`Status: ${err.status || 500}, Message: ${err.message}`)
    console.error(err.stack)

    // Возможное уведомление о критических ошибках
    if (err.status === 500) {
      // alertDevTeam(err, req);
    }

    // Отправка безопасного и понятного ответа клиенту
    const statusCode = err.status || 500
    const message =
      statusCode === 500
        ? "Внутренняя ошибка сервера. Пожалуйста, попробуйте позже."
        : err.message || "Произошла ошибка"

    res.status(statusCode).json({
      error: {
        message,
        status: statusCode,
        requestId: req.id, // идентификатор для поддержки
      },
    })
  })
}
```

**Ключевые особенности:**

- Нет утечки внутренней информации
- Общие сообщения для серверных ошибок
- Подробное внутреннее логирование
- Уведомления для критических ошибок
- Идентификаторы запросов для службы поддержки

## Использование пакета express-error-handler (устаревший)

В более ранних версиях Express был доступен специализированный пакет:

```javascript
const express = require("express")
const errorHandler = require("express-error-handler")
const app = express()

// Маршруты приложения
app.get("/", (req, res) => {
  res.send("Главная страница")
})

// Маршрут, генерирующий ошибку
app.get("/error", (req, res, next) => {
  next(new Error("Тестовая ошибка"))
})

// Маршрут, который не существует (404)
app.use(errorHandler.httpError(404))

// Настройка обработчика ошибок с опциями для разных сред
app.use(
  errorHandler({
    server: app,
    static: {
      404: "./public/404.html",
      500: "./public/500.html",
    },
    handlers: {
      408: function requestTimeoutHandler(err, req, res) {
        res.status(408).send("Превышено время ожидания запроса")
      },
      500: function serverErrorHandler(err, req, res) {
        if (process.env.NODE_ENV === "development") {
          res.status(500).send(`<pre>${err.stack}</pre>`)
        } else {
          res.status(500).sendFile("./public/500.html", { root: __dirname })
        }
      },
    },
  }),
)

app.listen(3000, () => {
  console.log("Сервер запущен на порту 3000")
})
```

## Современный подход к обработке ошибок в Express

В современных приложениях часто используют структурированный подход с определением пользовательских классов ошибок:

```javascript
// errorTypes.js - определение классов ошибок
class AppError extends Error {
  constructor(message, status, details = null) {
    super(message)
    this.name = this.constructor.name
    this.status = status
    this.details = details
    Error.captureStackTrace(this, this.constructor)
  }
}

class NotFoundError extends AppError {
  constructor(resource = "Resource", details = null) {
    super(`${resource} не найден`, 404, details)
  }
}

class ValidationError extends AppError {
  constructor(message = "Ошибка валидации", details = null) {
    super(message, 400, details)
  }
}

class UnauthorizedError extends AppError {
  constructor(message = "Требуется авторизация", details = null) {
    super(message, 401, details)
  }
}

module.exports = {
  AppError,
  NotFoundError,
  ValidationError,
  UnauthorizedError,
}
```

```javascript
// errorHandler.js - настройка обработчика ошибок
const { AppError } = require("./errorTypes")

// Промежуточный слой для асинхронных ошибок
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next)
}

// Обработчик 404
const notFoundHandler = (req, res, next) => {
  const err = new AppError(`Маршрут ${req.originalUrl} не найден`, 404)
  next(err)
}

// Основной обработчик ошибок
const errorHandler = (err, req, res, next) => {
  const isDev = process.env.NODE_ENV === "development"

  // Логирование ошибки
  console.error(`${err.name}: ${err.message}`)
  if (isDev) console.error(err.stack)

  // Определение статуса и форматирование ответа
  const statusCode = err.status || 500
  const errorResponse = {
    success: false,
    status: statusCode,
    message: statusCode === 500 && !isDev ? "Внутренняя ошибка сервера" : err.message,
    requestId: req.id,
  }

  // В разработке добавляем дополнительную информацию
  if (isDev) {
    errorResponse.stack = err.stack
    errorResponse.details = err.details
  }

  res.status(statusCode).json(errorResponse)
}

module.exports = {
  asyncHandler,
  notFoundHandler,
  errorHandler,
}
```

Использование этих модулей в приложении:

```javascript
const express = require("express")
const { asyncHandler, notFoundHandler, errorHandler } = require("./errorHandler")
const { ValidationError, UnauthorizedError } = require("./errorTypes")

const app = express()

// Промежуточные слои
app.use(express.json())

// Присвоение ID запросу для трассировки
app.use((req, res, next) => {
  req.id = Date.now().toString(36) + Math.random().toString(36).substring(2)
  next()
})

// Маршруты
app.get("/", (req, res) => {
  res.send("Главная страница")
})

// Пример маршрута с асинхронным обработчиком
app.get(
  "/users/:id",
  asyncHandler(async (req, res) => {
    const id = req.params.id

    // Пример проверки
    if (id === "invalid") {
      throw new ValidationError("Недопустимый ID пользователя")
    }

    // Пример для авторизации
    if (id === "admin" && !req.headers.authorization) {
      throw new UnauthorizedError("Доступ запрещен")
    }

    // Успешный ответ
    res.json({ id, name: "Пользователь " + id })
  }),
)

// Обработка 404
app.use(notFoundHandler)

// Обработка всех ошибок
app.use(errorHandler)

app.listen(3000, () => {
  console.log("Сервер запущен на порту 3000")
})
```

## Рекомендации по настройке обработчика ошибок

### 1. Разделение обработки по окружениям

- Используйте переменную окружения `NODE_ENV` для определения текущей среды
- Применяйте разные стратегии отображения ошибок для каждой среды

### 2. Структурированное логирование

- Используйте библиотеки вроде Winston или Bunyan для продвинутого логирования
- Сохраняйте контекст ошибки: URL, метод, параметры запроса, ID пользователя
- Настройте разные уровни логирования для разных типов ошибок

### 3. Управление таймаутами

- Настройте таймауты для длительных операций
- Обрабатывайте ошибки таймаута как отдельный случай

```javascript
// Пример таймаута для запроса
app.use((req, res, next) => {
  // Таймаут 30 секунд
  req.setTimeout(30000, () => {
    const err = new Error("Превышено время ожидания запроса")
    err.status = 408
    next(err)
  })
  next()
})
```

### 4. Проактивный мониторинг

- Интегрируйте обработчик ошибок с системами мониторинга (Sentry, New Relic)
- Настройте оповещения для критических ошибок
- Отслеживайте частоту и типы возникающих ошибок

### 5. Изоляция критических ошибок

- Обрабатывайте необработанные исключения и отказы промисов на уровне процесса
- Корректно завершайте соединения с базами данных при критических ошибках

```javascript
// Обработка необработанных исключений
process.on("uncaughtException", (err) => {
  console.error("НЕОБРАБОТАННОЕ ИСКЛЮЧЕНИЕ", err)
  // Запись в лог и оповещение команды
  process.exit(1) // Важно перезапустить процесс
})

// Обработка необработанных отказов промисов
process.on("unhandledRejection", (reason, promise) => {
  console.error("НЕОБРАБОТАННЫЙ ОТКАЗ ПРОМИСА", { reason, promise })
  // Запись в лог и оповещение команды
})
```

## Заключение

Грамотно настроенный обработчик ошибок в Express.js является важной частью надежного приложения. Он обеспечивает:

- Централизованное и согласованное управление ошибками
- Защиту конфиденциальной информации от утечек
- Улучшенный пользовательский опыт даже при возникновении проблем
- Упрощенную отладку и мониторинг

Несмотря на то, что оригинальный `express.errorHandler` больше не является частью основной библиотеки Express, принципы централизованной обработки ошибок остаются важной практикой в современной разработке на Node.js.

---

[[002 Node.js|Назад]]
