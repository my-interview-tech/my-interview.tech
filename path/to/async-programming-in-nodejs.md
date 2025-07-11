---
title: Асинхронное программирование в Node.js
draft: false
tags:
  - "#NodeJS"
  - "#асинхронность"
  - "#колбэки"
  - "#промисы"
  - "#async-await"
  - "#конкурентность"
info:
---

Асинхронное программирование - фундаментальная концепция в Node.js, позволяющая выполнять операции ввода-вывода без блокировки основного потока выполнения. Рассмотрим три ключевых подхода к асинхронному программированию: колбэки, промисы и async/await.

## Колбэки (Callbacks)

Колбэки - базовый механизм асинхронного программирования в Node.js.

```javascript
const fs = require("fs")

fs.readFile("file.txt", "utf8", (err, data) => {
  if (err) {
    console.error("Ошибка при чтении файла:", err)
    return
  }
  console.log("Содержимое файла:", data)
})

console.log("Эта строка выполнится до завершения чтения файла")
```

### Проблема "Callback Hell"

```javascript
fs.readFile("file1.txt", "utf8", (err, data1) => {
  if (err) return console.error(err)

  fs.readFile("file2.txt", "utf8", (err, data2) => {
    if (err) return console.error(err)

    fs.readFile("file3.txt", "utf8", (err, data3) => {
      if (err) return console.error(err)

      console.log(data1, data2, data3)
    })
  })
})
```

### Шаблон "Error-First Callback"

```javascript
function readFileAsync(path, callback) {
  fs.readFile(path, "utf8", (err, data) => {
    if (err) return callback(err)
    callback(null, data)
  })
}
```

## Промисы (Promises)

Промисы позволяют избежать глубокой вложенности колбэков.

```javascript
const myPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    const success = true

    if (success) {
      resolve("Операция успешна")
    } else {
      reject(new Error("Произошла ошибка"))
    }
  }, 1000)
})

myPromise
  .then((result) => {
    console.log(result)
    return "Дополнительные данные"
  })
  .then((data) => {
    console.log(data)
  })
  .catch((error) => {
    console.error(error)
  })
  .finally(() => {
    console.log("Выполнится всегда")
  })
```

### Промисификация колбэк-функций

```javascript
// Ручная промисификация
function readFilePromise(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, "utf8", (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}

// Встроенная промисификация с Node.js 10+
const { promisify } = require("util")
const readFileAsync = promisify(fs.readFile)

// fs/promises с Node.js 14+
const fsPromises = require("fs/promises")
```

### Параллельное выполнение с Promise.all

```javascript
// Одновременное чтение нескольких файлов
Promise.all([
  readFilePromise("file1.txt"),
  readFilePromise("file2.txt"),
  readFilePromise("file3.txt"),
])
  .then(([data1, data2, data3]) => {
    console.log("Все файлы прочитаны:", data1, data2, data3)
  })
  .catch((err) => {
    console.error("Ошибка:", err)
  })
```

### Другие методы для работы с несколькими промисами

```javascript
// Promise.race - возвращает результат самого быстрого промиса
Promise.race([
  new Promise((resolve) => setTimeout(() => resolve("Быстрый"), 500)),
  new Promise((resolve) => setTimeout(() => resolve("Средний"), 1000)),
]).then((result) => console.log(result)) // 'Быстрый'

// Promise.allSettled - ждет завершения всех промисов (Node.js 12.9+)
Promise.allSettled([Promise.resolve("Успех"), Promise.reject("Ошибка")]).then((results) =>
  console.log(results),
)
// [{ status: 'fulfilled', value: 'Успех' }, { status: 'rejected', reason: 'Ошибка' }]

// Promise.any - возвращает первый успешный результат (Node.js 15+)
Promise.any([Promise.reject("Ошибка 1"), Promise.resolve("Успех 1")]).then((result) =>
  console.log(result),
) // 'Успех 1'
```

## Async/Await

Async/await - синтаксический сахар поверх промисов, который делает асинхронный код более похожим на синхронный.

```javascript
async function readFiles() {
  try {
    const data1 = await readFilePromise("file1.txt")
    const data2 = await readFilePromise("file2.txt")
    const data3 = await readFilePromise("file3.txt")

    console.log("Все файлы прочитаны:", data1, data2, data3)
    return [data1, data2, data3]
  } catch (err) {
    console.error("Произошла ошибка:", err)
    throw err
  }
}

// Функция с async всегда возвращает Promise
readFiles()
  .then((results) => console.log("Результаты:", results))
  .catch((err) => console.error("Ошибка:", err))
```

### Параллельное выполнение с async/await

```javascript
async function readFilesParallel() {
  try {
    const [data1, data2, data3] = await Promise.all([
      readFilePromise("file1.txt"),
      readFilePromise("file2.txt"),
      readFilePromise("file3.txt"),
    ])

    console.log("Все файлы прочитаны параллельно:", data1, data2, data3)
    return [data1, data2, data3]
  } catch (err) {
    console.error("Произошла ошибка:", err)
    throw err
  }
}
```

### Циклы и итерации с async/await

```javascript
// Последовательное выполнение
async function processFilesSequentially(filePaths) {
  const results = []

  for (const path of filePaths) {
    const data = await readFilePromise(path)
    results.push(data)
  }

  return results
}

// Параллельное выполнение
async function processFilesParallel(filePaths) {
  const promises = filePaths.map((path) => readFilePromise(path))
  return await Promise.all(promises)
}
```

## Управление потоком асинхронных операций

### Ограничение параллельных операций

```javascript
async function processWithConcurrencyLimit(items, concurrency, processor) {
  const results = []
  const running = new Set()

  for (const item of items) {
    const promise = processor(item)
    results.push(promise)
    running.add(promise)

    promise.finally(() => running.delete(promise))

    if (running.size >= concurrency) {
      await Promise.race(running)
    }
  }

  return Promise.all(results)
}

// Пример использования
async function processUrls(urls) {
  // Ограничиваем до 3 одновременных запросов
  return processWithConcurrencyLimit(urls, 3, async (url) => {
    const response = await fetch(url)
    return response.json()
  })
}
```

## Обработка ошибок

### С использованием async/await

```javascript
async function processDataWithAsync() {
  try {
    const data = await fetchData()

    if (!data) throw new Error("Данные пусты")

    const result = await processData(data)
    await saveResult(result)

    return result
  } catch (err) {
    console.error("Произошла ошибка:", err)

    if (err instanceof NetworkError) {
      return await retryFetchData()
    } else if (err instanceof ValidationError) {
      logError(err)
      return defaultResult
    } else {
      throw err
    }
  } finally {
    cleanup()
  }
}
```

## Таймеры и асинхронность

### Промисификация setTimeout

```javascript
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

// Использование
async function example() {
  console.log("Начало")
  await delay(1000) // Пауза на 1 секунду
  console.log("Прошла 1 секунда")
}

// Реализация функции retry
async function retry(fn, maxAttempts = 3, delay = 1000) {
  let lastError

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn()
    } catch (err) {
      console.log(`Попытка ${attempt} не удалась:`, err)
      lastError = err

      if (attempt < maxAttempts) {
        await new Promise((resolve) => setTimeout(resolve, delay))
      }
    }
  }

  throw lastError
}
```

## Асинхронные итераторы и генераторы

```javascript
// Асинхронный генератор
async function* readFilesGenerator(files) {
  for (const file of files) {
    yield await readFilePromise(file)
  }
}

// Использование
async function processFiles() {
  const files = ["file1.txt", "file2.txt", "file3.txt"]

  for await (const data of readFilesGenerator(files)) {
    console.log("Прочитан файл:", data)
  }
}
```

## Лучшие практики асинхронного программирования

1. **Избегайте смешивания подходов** - используйте либо колбэки, либо промисы, либо async/await в рамках одного модуля.

2. **Всегда обрабатывайте ошибки** - в каждом подходе к асинхронному программированию.

3. **Используйте Promise.all для параллельного выполнения** - когда операции могут выполняться одновременно.

4. **Добавляйте таймауты** - для предотвращения "вечного ожидания":

```javascript
function withTimeout(promise, ms) {
  const timeout = new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout")), ms))

  return Promise.race([promise, timeout])
}
```

## Заключение

Асинхронное программирование в Node.js эволюционировало от колбэков к промисам и async/await, обеспечивая все более удобные инструменты для обработки неблокирующих операций:

1. **Колбэки** - традиционный подход, но может привести к "аду колбэков" при глубокой вложенности.
2. **Промисы** - обеспечивают более структурированный подход и цепочки операций.
3. **Async/await** - делают асинхронный код более читаемым и поддерживаемым.

Современный Node.js-разработчик должен уверенно владеть всеми тремя подходами, понимая их особенности, преимущества и ограничения.

---

[[Назад]]
