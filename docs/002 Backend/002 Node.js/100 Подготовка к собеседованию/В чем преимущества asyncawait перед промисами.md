---
title: В чем преимущества asyncawait перед промисами
draft: false
tags:
  - "#NodeJS"
  - "#JavaScript"
  - "#асинхронность"
  - "#asyncawait"
  - "#промисы"
  - "#ES6"
info:
  - "[MDN: async function](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Statements/async_function)"
  - "[MDN: await](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Operators/await)"
  - "[JavaScript.info: Async/await](https://javascript.info/async-await)"
---

`async/await` — это синтаксический сахар, построенный поверх промисов (Promises), который был добавлен в JavaScript с ES2017 (ES8). Он предлагает более удобный способ работы с асинхронным кодом, сохраняя при этом все преимущества промисов.

## Основные преимущества async/await перед промисами

### 1. Более читаемый и понятный код

Одним из главных преимуществ `async/await` является то, что код выглядит и читается как синхронный, хотя выполняется асинхронно. Это упрощает понимание логики программы и уменьшает вероятность ошибок.

#### Сравнение с промисами:

```javascript
// Использование промисов
function getUserData(userId) {
  return fetch(`/api/users/${userId}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Ошибка получения данных пользователя")
      }
      return response.json()
    })
    .then((userData) => {
      return fetch(`/api/posts?userId=${userData.id}`)
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Ошибка получения постов пользователя")
      }
      return response.json()
    })
}

// Использование async/await
async function getUserData(userId) {
  const userResponse = await fetch(`/api/users/${userId}`)
  if (!userResponse.ok) {
    throw new Error("Ошибка получения данных пользователя")
  }

  const userData = await userResponse.json()
  const postsResponse = await fetch(`/api/posts?userId=${userData.id}`)

  if (!postsResponse.ok) {
    throw new Error("Ошибка получения постов пользователя")
  }

  return postsResponse.json()
}
```

### 2. Упрощение обработки ошибок

С `async/await` вы можете использовать обычные блоки `try-catch` для обработки ошибок, что делает код более понятным, особенно по сравнению с цепочками `.catch()`.

```javascript
// Обработка ошибок с промисами
function fetchData() {
  return fetch("/api/data")
    .then((response) => response.json())
    .then((data) => {
      return processData(data)
    })
    .catch((error) => {
      console.error("Произошла ошибка:", error)
      return { error: true, message: error.message }
    })
}

// Обработка ошибок с async/await
async function fetchData() {
  try {
    const response = await fetch("/api/data")
    const data = await response.json()
    return processData(data)
  } catch (error) {
    console.error("Произошла ошибка:", error)
    return { error: true, message: error.message }
  }
}
```

### 3. Отсутствие вложенности (избежание "callback hell")

Промисы уже решили проблему "callback hell", но с `async/await` код становится еще более линейным и плоским, что значительно улучшает его читаемость.

```javascript
// Вложенный код с промисами
function getDataWithPromises() {
  return step1().then((result1) => {
    return step2(result1).then((result2) => {
      return step3(result1, result2).then((result3) => {
        return {
          result1,
          result2,
          result3,
        }
      })
    })
  })
}

// Линейный код с async/await
async function getDataWithAsync() {
  const result1 = await step1()
  const result2 = await step2(result1)
  const result3 = await step3(result1, result2)

  return {
    result1,
    result2,
    result3,
  }
}
```

### 4. Более простая отладка кода

При отладке кода с `async/await` стек вызовов в отладчике более понятен, так как функции выполняются последовательно. Также легче устанавливать точки останова (breakpoints) в асинхронном коде.

### 5. Условное выполнение асинхронных операций

С `async/await` легче реализовать условное выполнение асинхронных операций, что с промисами требует более сложного кода.

```javascript
// Условное выполнение с промисами
function conditionalFetch(url, shouldFetch) {
  if (shouldFetch) {
    return fetch(url).then((response) => response.json())
  } else {
    return Promise.resolve({ default: true })
  }
}

// Условное выполнение с async/await
async function conditionalFetch(url, shouldFetch) {
  if (shouldFetch) {
    const response = await fetch(url)
    return response.json()
  } else {
    return { default: true }
  }
}
```

### 6. Возможность использования в циклах

Использование асинхронных операций в циклах с `async/await` значительно проще:

```javascript
// Последовательное выполнение с промисами
function processItems(items) {
  return items.reduce((promise, item) => {
    return promise.then(() => processItem(item))
  }, Promise.resolve())
}

// Последовательное выполнение с async/await
async function processItems(items) {
  for (const item of items) {
    await processItem(item)
  }
}

// Параллельное выполнение с async/await
async function processItemsParallel(items) {
  const promises = items.map((item) => processItem(item))
  await Promise.all(promises)
}
```

### 7. Автоматическое оборачивание результата в Promise

Любая `async` функция автоматически возвращает Promise, что упрощает интеграцию с другим асинхронным кодом.

```javascript
// Эти функции эквивалентны
function withPromise() {
  return Promise.resolve(42)
}

async function withAsync() {
  return 42 // автоматически оборачивается в Promise
}
```

## Ограничения и особенности async/await

Несмотря на преимущества, у `async/await` есть некоторые особенности:

1. **Требуется поддержка окружения** - для старых браузеров нужна транспиляция
2. **Всегда возвращает Promise** - нельзя избежать асинхронного поведения
3. **Нельзя использовать в обычных функциях** - только в функциях, объявленных с `async`
4. **Ожидание происходит последовательно** - для параллельного выполнения нужно использовать `Promise.all()` или другие методы

## Пример практического использования в Node.js

Асинхронная работа с базой данных и файловой системой:

```javascript
const fs = require("fs").promises
const { MongoClient } = require("mongodb")

// С промисами
function saveUserDataToFile(userId) {
  let userData
  let client

  return MongoClient.connect("mongodb://localhost:27017")
    .then((mongoClient) => {
      client = mongoClient
      return client.db("users").collection("profiles").findOne({ id: userId })
    })
    .then((user) => {
      userData = user
      return fs.writeFile(`users/${userId}.json`, JSON.stringify(userData, null, 2))
    })
    .then(() => {
      console.log(`Данные пользователя ${userId} сохранены в файл`)
      return userData
    })
    .finally(() => {
      if (client) client.close()
    })
}

// С async/await
async function saveUserDataToFile(userId) {
  let client

  try {
    client = await MongoClient.connect("mongodb://localhost:27017")
    const userData = await client.db("users").collection("profiles").findOne({ id: userId })

    await fs.writeFile(`users/${userId}.json`, JSON.stringify(userData, null, 2))
    console.log(`Данные пользователя ${userId} сохранены в файл`)

    return userData
  } finally {
    if (client) await client.close()
  }
}
```

## Заключение

`async/await` представляет собой мощный инструмент, который делает асинхронный код более читаемым и управляемым. Хотя это просто синтаксический сахар над промисами, его преимущества в плане читаемости, упрощения обработки ошибок и отладки делают его предпочтительным выбором в большинстве случаев.

Промисы остаются основой асинхронного программирования в JavaScript, и для использования `async/await` необходимо понимать, как работают промисы, поскольку `async/await` строится на их основе.

---

[[002 Node.js|Назад]]
