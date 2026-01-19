---
title: Как прочитать содержимое директории (fs.readdir() fs.readdirSync())
draft: false
tags:
  - "#NodeJS"
  - "#fs"
  - "#файловая-система"
  - "#директории"
  - "#асинхронность"
info:
  - "[Документация Node.js по fs.readdir()](https://nodejs.org/api/fs.html#fs_fs_readdir_path_options_callback)"
  - "[Документация Node.js по fs.readdirSync()](https://nodejs.org/api/fs.html#fs_fs_readdirsync_path_options)"
  - "[Работа с файловой системой в Node.js](https://nodejs.dev/learn/the-nodejs-fs-module)"
---

### Как прочитать содержимое директории в Node.js?

Для получения списка файлов и папок внутри директории используются два метода:

- **Асинхронный**: `fs.readdir()`
- **Синхронный**: `fs.readdirSync()`

---

## 1. Асинхронный метод: `fs.readdir()`

Рекомендуется, так как не блокирует выполнение кода.

```javascript
const fs = require("fs")

fs.readdir("./myFolder", (err, files) => {
  if (err) {
    console.error("Ошибка при чтении директории:", err)
    return
  }
  console.log("Содержимое директории:", files)
})
```

### Разбор кода:

- `fs.readdir(path, callback)` – читает содержимое папки и передает его в `callback`.
- `files` – массив с именами файлов и папок.
- Ошибки (например, директория не существует) обрабатываются в `err`.

**Плюсы**:

- Не блокирует выполнение кода.
- Подходит для серверных приложений.

**Минусы**:

- Требует обработку ошибок через callback.

---

## 2. Синхронный метод: `fs.readdirSync()`

Блокирует выполнение кода до завершения операции.

```javascript
const fs = require("fs")

try {
  const files = fs.readdirSync("./myFolder")
  console.log("Содержимое директории:", files)
} catch (err) {
  console.error("Ошибка при чтении директории:", err)
}
```

**Плюсы**:

- Код проще, можно использовать `try...catch`.
- Подходит для CLI-скриптов и одноразовых операций.

**Минусы**:

- Блокирует выполнение кода.

---

## 3. Получение информации о файлах (`withFileTypes: true`)

Чтобы отличать **файлы от папок**, передайте `{ withFileTypes: true }`.

### Асинхронный вариант:

```javascript
fs.readdir("./myFolder", { withFileTypes: true }, (err, files) => {
  if (err) {
    console.error("Ошибка:", err)
    return
  }
  files.forEach((file) => {
    console.log(file.name, file.isDirectory() ? "(папка)" : "(файл)")
  })
})
```

### Синхронный вариант:

```javascript
const files = fs.readdirSync("./myFolder", { withFileTypes: true })

files.forEach((file) => {
  console.log(file.name, file.isDirectory() ? "(папка)" : "(файл)")
})
```

### Разбор кода:

- `file.isDirectory()` – проверяет, является ли элемент папкой.
- `file.isFile()` – проверяет, является ли элемент файлом.

---

## Разница между `fs.readdir()` и `fs.readdirSync()`

| Метод              | Асинхронность | Блокирует выполнение? | Использование        |
| ------------------ | ------------- | --------------------- | -------------------- |
| `fs.readdir()`     | Да            | Нет                   | Серверные приложения |
| `fs.readdirSync()` | Нет           | Да                    | CLI-скрипты, тесты   |

---

## Итог:

- **Используйте `fs.readdir()`**, если приложение **асинхронное** и важна производительность.
- **Используйте `fs.readdirSync()`**, если код выполняется **единоразово** и блокировка не критична.
- **Передавайте `{ withFileTypes: true }`, если нужно различать файлы и папки.**

---

[[002 Node.js|Назад]]
