---
title: Как использовать Promises и async/await в Node.js эффективно
draft: false
tags:
  - "#NodeJS"
  - "#Promises"
  - "#AsyncAwait"
  - "#Асинхронность"
  - "#ОбработкаОшибок"
info:
  - "[Документация Node.js - Promises](https://nodejs.org/api/promises.html)"
  - "[Документация MDN - async function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)"
  - "[Dr. Axel Rauschmayer: Async/await](https://2ality.com/2016/10/async-function-tips.html)"
---

![[Pasted image node-promises-async.png|600]]

## Promises и async/await в Node.js

**Promises** (обещания) и **async/await** — это механизмы JavaScript для работы с асинхронным кодом, которые активно используются в Node.js. Правильное применение этих инструментов позволяет создавать более читаемый, управляемый и надежный асинхронный код.

## Базовые концепции Promises

Promise представляет результат асинхронной операции, который может находиться в одном из трех состояний:

- **pending** (ожидание) — начальное состояние, операция выполняется
- **fulfilled** (выполнено) — операция успешно завершена
- **rejected** (отклонено) — операция завершилась с ошибкой

```javascript
// Создание Promise
const myPromise = new Promise((resolve, reject) => {
  // Асинхронная операция
  setTimeout(() => {
    const success = true

    if (success) {
      resolve("Операция выполнена успешно!")
    } else {
      reject(new Error("Произошла ошибка"))
    }
  }, 1000)
})

// Использование Promise
myPromise
  .then((result) => {
    console.log(result)
  })
  .catch((error) => {
    console.error(error)
  })
  .finally(() => {
    console.log("Очистка ресурсов")
  })
```

## Async/await синтаксис

Синтаксис `async/await` — это синтаксический сахар поверх Promises, который делает асинхронный код похожим на синхронный:

```javascript
async function fetchData() {
  try {
    // await приостанавливает выполнение функции до выполнения промиса
    const response = await fetch("https://api.example.com/data")
    const data = await response.json()
    console.log(data)
    return data
  } catch (error) {
    console.error("Ошибка получения данных:", error)
    throw error
  }
}

// Вызов async функции всегда возвращает Promise
fetchData()
  .then((data) => console.log("Обработка данных:", data))
  .catch((error) => console.error("Обработка ошибки:", error))
```

## Эффективное использование Promise.all для параллельного выполнения

```javascript
async function fetchMultipleResources() {
  try {
    // Запускаем все запросы параллельно
    const results = await Promise.all([
      fetch("https://api.example.com/users"),
      fetch("https://api.example.com/posts"),
      fetch("https://api.example.com/comments"),
    ])

    // Обрабатываем результаты
    const [users, posts, comments] = await Promise.all(results.map((response) => response.json()))

    return { users, posts, comments }
  } catch (error) {
    console.error("Ошибка при получении данных:", error)
    throw error
  }
}
```

## Promise.race, Promise.allSettled и Promise.any

### Promise.race

Возвращает результат или ошибку самого быстрого промиса:

```javascript
async function fetchWithTimeout(url, timeout) {
  const fetchPromise = fetch(url)
  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => reject(new Error("Тайм-аут запроса")), timeout)
  })

  return Promise.race([fetchPromise, timeoutPromise])
}

fetchWithTimeout("https://api.example.com/data", 5000)
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error("Ошибка:", error))
```

### Promise.allSettled

Ждет завершения всех промисов (успешного или с ошибкой) и возвращает массив результатов:

```javascript
async function fetchAllResources(urls) {
  const promises = urls.map((url) => fetch(url).then((r) => r.json()))

  const results = await Promise.allSettled(promises)

  // Фильтрация успешных результатов
  const successful = results
    .filter((result) => result.status === "fulfilled")
    .map((result) => result.value)

  // Фильтрация ошибок
  const failed = results
    .filter((result) => result.status === "rejected")
    .map((result) => result.reason)

  return { successful, failed }
}
```

### Promise.any

Возвращает результат первого успешно выполненного промиса:

```javascript
async function fetchFromMultipleAPIs() {
  try {
    const result = await Promise.any([
      fetch("https://api1.example.com/data").then((r) => r.json()),
      fetch("https://api2.example.com/data").then((r) => r.json()),
      fetch("https://api3.example.com/data").then((r) => r.json()),
    ])

    return result
  } catch (error) {
    // AggregateError содержит все ошибки
    console.error("Все API вернули ошибки:", error.errors)
    throw error
  }
}
```

## Последовательное выполнение асинхронных операций

```javascript
async function processDataSequentially(items) {
  const results = []

  for (const item of items) {
    // Каждая операция ждет завершения предыдущей
    const result = await processItem(item)
    results.push(result)
  }

  return results
}
```

Альтернативный подход с reduce:

```javascript
async function processDataSequentially(items) {
  return items.reduce(async (previousPromise, item) => {
    // Ждем завершения предыдущей операции
    const results = await previousPromise
    // Выполняем текущую операцию
    const result = await processItem(item)
    // Добавляем результат к массиву
    return [...results, result]
  }, Promise.resolve([]))
}
```

## Правильная обработка ошибок

### Использование try/catch с async/await

```javascript
async function fetchUserData(userId) {
  try {
    const response = await fetch(`https://api.example.com/users/${userId}`)

    if (!response.ok) {
      throw new Error(`HTTP ошибка: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error(`Ошибка при получении данных пользователя ${userId}:`, error)
    // Можно возвращать дефолтные значения
    return { id: userId, name: "Неизвестно", error: error.message }
  }
}
```

### Комбинирование .catch с async/await

```javascript
async function loadData() {
  // .catch позволяет обработать ошибки без блока try/catch
  const data = await fetchData().catch((error) => {
    console.error("Ошибка при загрузке:", error)
    return defaultData // Возвращаем дефолтные данные в случае ошибки
  })

  // Продолжаем работать с данными
  return processData(data)
}
```

## Использование util.promisify в Node.js

Метод `util.promisify()` преобразует функции, основанные на коллбэках, в промисы:

```javascript
const fs = require("fs")
const util = require("util")

// Преобразуем fs.readFile в версию, возвращающую Promise
const readFile = util.promisify(fs.readFile)

async function readConfig() {
  try {
    // Теперь можем использовать await
    const data = await readFile("config.json", "utf8")
    return JSON.parse(data)
  } catch (error) {
    console.error("Ошибка при чтении конфига:", error)
    return {} // Возвращаем пустой объект в случае ошибки
  }
}
```

## Промисификация API на основе событий

```javascript
function streamToPromise(stream) {
  return new Promise((resolve, reject) => {
    const data = []

    stream.on("data", (chunk) => data.push(chunk))
    stream.on("end", () => resolve(Buffer.concat(data)))
    stream.on("error", (error) => reject(error))
  })
}

async function readFileStream(filePath) {
  const fileStream = fs.createReadStream(filePath)
  const fileData = await streamToPromise(fileStream)
  return fileData.toString("utf8")
}
```

## Отмена промисов с AbortController

```javascript
async function fetchWithAbort(url, timeout) {
  // Создаём контроллер отмены
  const controller = new AbortController()
  const { signal } = controller

  // Таймер для отмены запроса по истечении времени
  const id = setTimeout(() => controller.abort(), timeout)

  try {
    // Передаём сигнал запросу
    const response = await fetch(url, { signal })
    clearTimeout(id)
    return await response.json()
  } catch (error) {
    if (error.name === "AbortError") {
      throw new Error(`Запрос к ${url} был отменен из-за таймаута ${timeout}мс`)
    }
    throw error
  }
}
```

## Оптимизация цепочек промисов

Вместо многоуровневых цепочек:

```javascript
// Избегайте такого кода
fetchUser(userId)
  .then((user) => {
    return fetchPosts(user.id).then((posts) => {
      return fetchComments(posts[0].id).then((comments) => {
        return {
          user,
          posts,
          comments,
        }
      })
    })
  })
  .then((result) => console.log(result))
```

Используйте async/await:

```javascript
// Более читаемый вариант
async function getUserData(userId) {
  const user = await fetchUser(userId)
  const posts = await fetchPosts(user.id)
  const comments = await fetchComments(posts[0].id)

  return { user, posts, comments }
}

getUserData(123)
  .then((result) => console.log(result))
  .catch((error) => console.error(error))
```

## Управление памятью и утечки

```javascript
async function processLargeData(dataSource) {
  // Обрабатываем данные по частям для снижения нагрузки на память
  for await (const chunk of dataSource) {
    await processChunk(chunk)
    // Убеждаемся, что ссылки на chunk больше не нужны
    // для сборки мусора
  }
}
```

## Повторные попытки при асинхронных сбоях

```javascript
async function fetchWithRetry(url, options = {}, maxRetries = 3) {
  let lastError

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fetch(url, options)
    } catch (error) {
      lastError = error

      // Пропускаем ожидание на последней попытке
      if (attempt < maxRetries) {
        // Экспоненциальная задержка между попытками
        const delay = Math.min(1000 * Math.pow(2, attempt - 1), 10000)
        console.log(`Попытка ${attempt} не удалась, повтор через ${delay}мс...`)
        await new Promise((resolve) => setTimeout(resolve, delay))
      }
    }
  }

  throw new Error(`После ${maxRetries} попыток не удалось: ${lastError.message}`)
}
```

## Использование промисов с функциями обратного вызова

Функции, требующие как промисы, так и колбэки:

```javascript
function loadUserWithCallback(userId, callback) {
  // Поддержка обоих стилей
  const promise = fetchUser(userId)

  if (callback) {
    promise.then((user) => callback(null, user)).catch((error) => callback(error))
    return undefined
  }

  // Возвращаем промис, если колбэк не предоставлен
  return promise
}

// Использование с колбэком
loadUserWithCallback(123, (error, user) => {
  if (error) {
    console.error(error)
    return
  }
  console.log(user)
})

// Использование с промисом
const user = await loadUserWithCallback(123)
```

## Заключение

Промисы и async/await в Node.js предоставляют мощные инструменты для работы с асинхронными операциями. Их эффективное использование позволяет:

1. Писать более чистый и понятный асинхронный код
2. Правильно обрабатывать ошибки и крайние случаи
3. Оптимизировать выполнение параллельных и последовательных операций
4. Избегать "ада колбэков" и повышать поддерживаемость кода

Комбинируя различные методы промисов (all, race, allSettled, any) с синтаксисом async/await, можно создавать гибкие и высокопроизводительные приложения, которые эффективно обрабатывают асинхронные задачи.

---

[[002 Node.js|Назад]]
