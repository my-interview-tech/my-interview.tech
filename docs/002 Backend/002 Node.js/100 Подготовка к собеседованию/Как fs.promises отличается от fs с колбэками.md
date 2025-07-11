---
title: Как fs.promises отличается от fs с колбэками
draft: false
tags:
  - "#NodeJS"
  - "#файловая-система"
  - "#асинхронность"
  - "#fs"
  - "#promises"
info:
  - "[Документация fs.promises](https://nodejs.org/api/fs.html#promise-api)"
  - "[Документация fs с колбэками](https://nodejs.org/api/fs.html#callback-api)"
  - "[Руководство по работе с файлами в Node.js](https://nodejs.org/en/learn/manipulating-files/nodejs-file-stats)"
---

Модуль `fs` в Node.js предоставляет два основных API для работы с файловой системой: традиционный на основе колбэков и современный на основе промисов (`fs.promises`). Рассмотрим их ключевые отличия.

## 1. Синтаксис

- **`fs.promises`** предоставляет API на основе **промисов** (Promises), что позволяет использовать **async/await** для работы с файлами.
- **`fs` с колбэками** использует традиционный подход с **колбэками**, что может привести к "callback hell" (глубокой вложенности).

## 2. Простота использования

### С использованием `fs.promises`:

```javascript
const fs = require("fs").promises

async function readFile() {
  try {
    const data = await fs.readFile("file.txt", "utf-8")
    console.log(data)
  } catch (error) {
    console.error(error)
  }
}

readFile()
```

### С использованием колбэков:

```javascript
const fs = require("fs")

fs.readFile("file.txt", "utf-8", (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  console.log(data)
})
```

## 3. Обработка ошибок

### С использованием `fs.promises`:

```javascript
try {
  const data = await fs.readFile("file.txt", "utf-8")
  // Обработка данных
} catch (error) {
  console.error("Error reading file:", error)
}
```

### С использованием колбэков:

```javascript
fs.readFile("file.txt", "utf-8", (err, data) => {
  if (err) {
    console.error("Error reading file:", err)
    return
  }
  // Обработка данных
})
```

## 4. Цепочки операций

### С использованием `fs.promises`:

```javascript
async function readFiles() {
  try {
    const data1 = await fs.readFile("file1.txt", "utf-8")
    const data2 = await fs.readFile("file2.txt", "utf-8")
    console.log(data1, data2)
  } catch (error) {
    console.error(error)
  }
}
```

### С использованием колбэков:

```javascript
fs.readFile("file1.txt", "utf-8", (err, data1) => {
  if (err) {
    console.error(err)
    return
  }
  fs.readFile("file2.txt", "utf-8", (err, data2) => {
    if (err) {
      console.error(err)
      return
    }
    console.log(data1, data2)
  })
})
```

## 5. Возвращаемые значения

### С использованием `fs.promises`:

```javascript
fs.readFile("file.txt", "utf-8")
  .then((data) => console.log(data))
  .catch((error) => console.error(error))
```

### С использованием колбэков:

```javascript
fs.readFile("file.txt", "utf-8", (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  console.log(data)
})
```

## Преимущества fs.promises

1. **Чистый синтаксис**: Промисы и `async/await` делают код более читаемым и упрощают обработку ошибок.
2. **Цепочка операций**: Легче обрабатывать несколько операций, избегая глубоких вложенных колбэков.
3. **Обработка ошибок**: Обработка ошибок становится проще с использованием `try/catch`, а не проверкой ошибок внутри колбэков.

## Преимущества fs с колбэками

1. **Совместимость**: Методы с колбэками доступны с самого начала работы Node.js, и многие старые библиотеки используют этот стиль.
2. **Контроль над выполнением**: В некоторых случаях использование колбэков может дать больше контроля (например, если нужно выполнять операции параллельно).

## Заключение

- Если вы работаете с современными версиями Node.js и вам важна читаемость и удобство работы с асинхронными операциями, **`fs.promises`** — это предпочтительный выбор.
- Если вам нужно работать с более старым кодом или специфическими библиотеками, использующими колбэки, тогда вам стоит использовать **`fs` с колбэками**.

---

[[002 Node.js|Назад]]
