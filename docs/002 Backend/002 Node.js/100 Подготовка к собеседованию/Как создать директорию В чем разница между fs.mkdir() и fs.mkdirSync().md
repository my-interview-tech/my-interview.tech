---
title: Как создать директорию В чем разница между fs.mkdir() и fs.mkdirSync()
draft: false
tags:
  - "#NodeJS"
  - "#fs"
  - "#файловая-система"
  - "#асинхронность"
  - "#директории"
  - "#mkdir"
info:
  - "[Документация Node.js по fs.mkdir()](https://nodejs.org/api/fs.html#fsmkdirpath-options-callback)"
  - "[Документация Node.js по fs.mkdirSync()](https://nodejs.org/api/fs.html#fsmkdirsyncpath-options)"
  - "[Руководство по работе с файлами в Node.js](https://nodejs.org/en/learn/manipulating-files/working-with-folders-in-nodejs)"
---

## Как создать директорию в Node.js

Для создания директории (папки) в Node.js используются два метода:

- **Асинхронный**: `fs.mkdir()`
- **Синхронный**: `fs.mkdirSync()`

Оба метода выполняют одну и ту же базовую функцию — создание директории, но различаются в способе выполнения и интеграции в асинхронный код.

## 1. Асинхронный метод: fs.mkdir()

**Рекомендуется** для асинхронных приложений, так как не блокирует поток выполнения.

```javascript
const fs = require("fs")

fs.mkdir("myFolder", { recursive: true }, (err) => {
  if (err) {
    console.error("Ошибка при создании директории:", err)
  } else {
    console.log("Директория успешно создана")
  }
})
```

### Разбор кода:

- `recursive: true` — позволяет создать **вложенные директории** (например, `parent/child`).
- Если директория **уже существует**, ошибка **не возникает** (с опцией `recursive: true`).
- Ошибки (например, недостаточно прав) обрабатываются через callback функцию.

### Использование с Promise API (Node.js 10+):

```javascript
const fs = require("fs").promises

async function createDirectory() {
  try {
    await fs.mkdir("myFolder", { recursive: true })
    console.log("Директория успешно создана")
  } catch (err) {
    console.error("Ошибка при создании директории:", err)
  }
}

createDirectory()
```

### Преимущества fs.mkdir():

- Не блокирует выполнение кода (лучше для серверных приложений).
- Хорошо интегрируется с Promise API и async/await.
- Подходит для веб-серверов, где важна масштабируемость.

## 2. Синхронный метод: fs.mkdirSync()

Выполняет те же функции, но **блокирует выполнение кода** до завершения операции.

```javascript
const fs = require("fs")

try {
  fs.mkdirSync("myFolder", { recursive: true })
  console.log("Директория успешно создана")
} catch (err) {
  console.error("Ошибка при создании директории:", err)
}
```

### Преимущества fs.mkdirSync():

- Код проще для понимания, так как можно использовать обычные `try...catch` блоки.
- Подходит для **скриптов CLI** или однократных операций.
- Удобно для синхронных скриптов инициализации.

## Разница между fs.mkdir() и fs.mkdirSync()

| Характеристика            | fs.mkdir()                           | fs.mkdirSync()                         |
| ------------------------- | ------------------------------------ | -------------------------------------- |
| **Тип выполнения**        | Асинхронный                          | Синхронный                             |
| **Блокирует поток**       | Нет                                  | Да                                     |
| **Обработка ошибок**      | Через callback                       | Через try/catch                        |
| **Возвращаемое значение** | undefined (результат в callback)     | undefined или path (с recursive: true) |
| **Оптимально для**        | Серверных приложений, веб-приложений | CLI-скриптов, тестов, простых утилит   |
| **Интеграция с Promise**  | fs.promises.mkdir()                  | Нет прямой интеграции                  |

## Дополнительные возможности при создании директорий

### Установка прав доступа

```javascript
// Асинхронно
fs.mkdir("myFolder", { recursive: true, mode: 0o755 }, callback)

// Синхронно
fs.mkdirSync("myFolder", { recursive: true, mode: 0o755 })
```

### Создание временных директорий

```javascript
const fs = require("fs")
const path = require("path")
const os = require("os")

// Создание временной директории
const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "app-"))
console.log(`Создана временная директория: ${tempDir}`)
```

### Проверка существования директории перед созданием

```javascript
const fs = require("fs")

// Проверка и создание директории (без recursive: true)
if (!fs.existsSync("myFolder")) {
  fs.mkdirSync("myFolder")
  console.log("Директория создана")
} else {
  console.log("Директория уже существует")
}
```

## Рекомендации по выбору метода

- **Используйте `fs.mkdir()`**, если приложение **асинхронное** и важна производительность.
- **Используйте `fs.promises.mkdir()`**, если работаете с современным Node.js и предпочитаете async/await.
- **Используйте `fs.mkdirSync()`**, если код выполняется **единоразово** и блокировка не критична.
- **Всегда указывайте `{ recursive: true }`**, если есть вероятность, что родительские директории могут не существовать.

## Итог

Выбор между `fs.mkdir()` и `fs.mkdirSync()` зависит от контекста использования:

- Для веб-серверов и асинхронных приложений: **fs.mkdir()** или **fs.promises.mkdir()**
- Для CLI-утилит и скриптов: **fs.mkdirSync()**

В обоих случаях опция `{ recursive: true }` значительно упрощает работу, позволяя создавать вложенные директории без дополнительных проверок.

---

[[002 Node.js|Назад]]
