---
title: Как правильно обрабатывать ошибки при использовании async/await
draft: false
tags:
  - "#NodeJS"
  - "#JavaScript"
  - "#async-await"
  - "#обработка-ошибок"
  - "#promises"
  - "#error-handling"
info:
  - "[Документация MDN по async/await](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Statements/async_function)"
  - "[Обработка ошибок в Node.js](https://nodejs.dev/learn/error-handling-in-nodejs)"
  - "[JavaScript Error Objects](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Error)"
---

При использовании `async/await` в Node.js правильная обработка ошибок имеет решающее значение для создания надежного кода. Вот несколько основных подходов и рекомендаций:

### 1. Использование try/catch

Самый распространенный и рекомендуемый способ обработки ошибок с `async/await` - это использование блоков `try/catch`:

```javascript
async function fetchData() {
  try {
    const response = await fetch("https://api.example.com/data")
    const data = await response.json()
    return data
  } catch (error) {
    console.error("Ошибка при получении данных:", error)
    // Пробрасываем ошибку дальше или возвращаем значение по умолчанию
    throw error // или return { error: true };
  }
}
```

### 2. Обработка конкретных типов ошибок

Можно дифференцировать обработку ошибок в зависимости от их типа:

```javascript
async function fetchUserData(userId) {
  try {
    const response = await fetch(`https://api.example.com/users/${userId}`)

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Пользователь не найден")
      } else if (response.status === 401) {
        throw new Error("Не авторизован")
      } else {
        throw new Error(`Ошибка сервера: ${response.status}`)
      }
    }

    return await response.json()
  } catch (error) {
    if (error.name === "TypeError") {
      console.error("Ошибка сети:", error)
    } else {
      console.error("Произошла ошибка:", error.message)
    }
    throw error
  }
}
```

### 3. Создание собственных классов ошибок

Для более сложной обработки ошибок, создавайте собственные классы ошибок:

```javascript
class DatabaseError extends Error {
  constructor(message, query) {
    super(message)
    this.name = "DatabaseError"
    this.query = query
  }
}

class ValidationError extends Error {
  constructor(message, field) {
    super(message)
    this.name = "ValidationError"
    this.field = field
  }
}

async function createUser(userData) {
  try {
    // Валидация
    if (!userData.email) {
      throw new ValidationError("Email обязателен", "email")
    }

    // Сохранение в БД
    const query = "INSERT INTO users..."
    try {
      await db.query(query, [userData.email, userData.name])
    } catch (dbError) {
      throw new DatabaseError(`Ошибка базы данных: ${dbError.message}`, query)
    }

    return { success: true }
  } catch (error) {
    if (error instanceof ValidationError) {
      return { error: error.message, field: error.field }
    } else if (error instanceof DatabaseError) {
      console.error(`Ошибка выполнения запроса: ${error.query}`)
      return { error: "Ошибка сервера при сохранении данных" }
    } else {
      console.error("Неизвестная ошибка:", error)
      return { error: "Произошла неизвестная ошибка" }
    }
  }
}
```

### 4. Использование высокоуровневых обработчиков для Express

Если вы используете Express.js, можно создать высокоуровневый обработчик ошибок:

```javascript
// Обертка для асинхронных обработчиков маршрутов
const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)

// Использование
app.get(
  "/users/:id",
  asyncHandler(async (req, res) => {
    const user = await db.findUserById(req.params.id)
    if (!user) {
      const error = new Error("Пользователь не найден")
      error.statusCode = 404
      throw error
    }
    res.json(user)
  }),
)

// Глобальный обработчик ошибок
app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500
  const message = statusCode === 500 ? "Ошибка сервера" : error.message

  console.error(error)
  res.status(statusCode).json({ error: message })
})
```

### 5. Параллельное выполнение и обработка ошибок

При параллельном выполнении нескольких async-операций с помощью `Promise.all()`, одна ошибка приведет к отклонению всего промиса:

```javascript
async function fetchMultipleResources() {
  try {
    const results = await Promise.all([
      fetch("https://api.example.com/users"),
      fetch("https://api.example.com/products"),
      fetch("https://api.example.com/orders"),
    ])

    return await Promise.all(results.map((result) => result.json()))
  } catch (error) {
    console.error("Одна из операций завершилась ошибкой:", error)
    throw error
  }
}
```

Если вам нужно продолжить выполнение даже при ошибках, используйте `Promise.allSettled()`:

```javascript
async function fetchResourcesWithFallback() {
  const results = await Promise.allSettled([
    fetch("https://api.example.com/users").then((r) => r.json()),
    fetch("https://api.example.com/products").then((r) => r.json()),
    fetch("https://api.example.com/orders").then((r) => r.json()),
  ])

  return results.map((result) => {
    if (result.status === "fulfilled") {
      return result.value
    } else {
      console.error("Ошибка получения ресурса:", result.reason)
      return null // или значение по умолчанию
    }
  })
}
```

### 6. Использование библиотек для упрощения обработки ошибок

Для сложной логики обработки ошибок можно использовать библиотеки:

```javascript
// С использованием библиотеки express-async-errors
require("express-async-errors") // Автоматически ловит ошибки в async-обработчиках

// Теперь можно просто писать асинхронные обработчики без try/catch
app.get("/users/:id", async (req, res) => {
  const user = await db.findUserById(req.params.id)
  if (!user) throw new NotFoundError("Пользователь не найден")
  res.json(user)
})
```

### Заключение и лучшие практики

1. **Всегда используйте `try/catch`** с асинхронными функциями для надежной обработки ошибок.
2. **Создавайте собственные классы ошибок** для разных типов проблем.
3. **Логируйте ошибки** с достаточным контекстом для отладки.
4. **Избегайте неявного проглатывания ошибок** - всегда либо обрабатывайте ошибку, либо передавайте её дальше.
5. **Используйте высокоуровневые обработчики** для API и веб-приложений.
6. **Возвращайте осмысленные сообщения об ошибках** пользователям, не раскрывая внутренние детали реализации.

Правильно организованная обработка ошибок с async/await делает ваш код более надежным, упрощает отладку и улучшает опыт использования вашего приложения.

---

[[002 Node.js|Назад]]
