---
title: Какие методы в fs используются для чтения файла
draft: false
tags:
  - "#NodeJS"
  - "#fs"
  - "#чтение-файлов"
  - "#потоки"
  - "#асинхронность"
info:
  - "[Официальная документация Node.js по fs](https://nodejs.org/api/fs.html)"
  - "[Node.js file system tutorial](https://www.tutorialspoint.com/nodejs/nodejs_file_system.htm)"
  - "[Using Node.js to Read Really, Really Large Datasets](https://medium.com/@adamhooper/using-node-js-to-read-really-really-large-files-pt-1-d2057fe76b33)"
---

# Методы чтения файлов в модуле fs

В Node.js для чтения файлов с помощью модуля **`fs`** существует несколько методов, как асинхронных, так и синхронных. Каждый имеет свои особенности и оптимален для различных сценариев.

## Асинхронные методы

### 1. fs.readFile()

- Читает весь файл асинхронно и возвращает его содержимое через колбэк.
- Подходит для небольших файлов, так как загружает весь файл в память.

```javascript
const fs = require("fs")

fs.readFile("file.txt", "utf8", (err, data) => {
  if (err) {
    console.error("Ошибка чтения файла:", err)
    return
  }
  console.log("Содержимое файла:", data)
})
```

### 2. fs.promises.readFile()

- Версия на Промисах, появившаяся в более новых версиях Node.js.
- Работает аналогично `fs.readFile()`, но возвращает промис вместо колбэка.

```javascript
const fs = require("fs").promises
// или
// const { promises: fsPromises } = require('fs');

fs.readFile("file.txt", "utf8")
  .then((data) => {
    console.log("Содержимое файла:", data)
  })
  .catch((err) => {
    console.error("Ошибка чтения файла:", err)
  })

// Также можно использовать с async/await
async function readFileContent() {
  try {
    const data = await fs.readFile("file.txt", "utf8")
    console.log("Содержимое файла:", data)
  } catch (err) {
    console.error("Ошибка чтения файла:", err)
  }
}
```

### 3. fs.createReadStream()

- Создаёт поток для чтения файла по частям.
- Оптимален для больших файлов, так как не загружает весь файл в память.
- Позволяет обрабатывать данные по мере их поступления.

```javascript
const fs = require("fs")

const stream = fs.createReadStream("file.txt", "utf8")

stream.on("data", (chunk) => {
  console.log("Получен фрагмент данных:", chunk)
})

stream.on("end", () => {
  console.log("Чтение файла завершено")
})

stream.on("error", (err) => {
  console.error("Ошибка при чтении потока:", err)
})
```

### 4. fs.open(), fs.read(), fs.close()

- Низкоуровневые методы, предоставляющие более тонкий контроль над процессом чтения.
- Позволяют читать определенные части файла.

```javascript
const fs = require("fs")
const buffer = Buffer.alloc(1024)

fs.open("file.txt", "r", (err, fd) => {
  if (err) {
    console.error("Ошибка открытия файла:", err)
    return
  }

  fs.read(fd, buffer, 0, buffer.length, 0, (err, bytesRead, buffer) => {
    if (err) {
      console.error("Ошибка чтения файла:", err)
    } else {
      console.log("Прочитано байт:", bytesRead)
      console.log("Содержимое:", buffer.slice(0, bytesRead).toString())
    }

    fs.close(fd, (err) => {
      if (err) console.error("Ошибка закрытия файла:", err)
    })
  })
})
```

## Синхронные методы

### 1. fs.readFileSync()

- Синхронная версия метода `fs.readFile()`.
- Блокирует выполнение программы до завершения чтения файла.
- Проще в использовании, но не рекомендуется для больших файлов и продакшн-среды.

```javascript
const fs = require("fs")

try {
  const data = fs.readFileSync("file.txt", "utf8")
  console.log("Содержимое файла:", data)
} catch (err) {
  console.error("Ошибка чтения файла:", err)
}
```

### 2. fs.openSync(), fs.readSync(), fs.closeSync()

- Синхронные версии низкоуровневых методов.
- Блокируют выполнение программы, но предоставляют тонкий контроль.

```javascript
const fs = require("fs")
const buffer = Buffer.alloc(1024)

try {
  const fd = fs.openSync("file.txt", "r")
  const bytesRead = fs.readSync(fd, buffer, 0, buffer.length, 0)

  console.log("Прочитано байт:", bytesRead)
  console.log("Содержимое:", buffer.slice(0, bytesRead).toString())

  fs.closeSync(fd)
} catch (err) {
  console.error("Ошибка при работе с файлом:", err)
}
```

## Важные параметры и опции

- **Кодировка**: Определяет, как интерпретировать содержимое файла.

  ```javascript
  fs.readFile("file.txt", "utf8", callback) // Чтение как текст
  fs.readFile("image.png", callback) // Чтение как буфер (для бинарных файлов)
  ```

- **Флаги**: Определяют режим доступа к файлу.

  ```javascript
  fs.readFile("file.txt", { encoding: "utf8", flag: "r" }, callback)
  ```

- **Опции потока**: Настройки для работы с потоками чтения.
  ```javascript
  const stream = fs.createReadStream("file.txt", {
    encoding: "utf8",
    highWaterMark: 64 * 1024, // Размер буфера в байтах (64KB)
  })
  ```

## Рекомендации по выбору метода

1. **Для небольших файлов** (конфигурации, настройки):

   - Асинхронно: `fs.promises.readFile()` с async/await
   - Синхронно (только при запуске): `fs.readFileSync()`

2. **Для больших файлов** (логи, данные, медиа):

   - `fs.createReadStream()` для обработки по частям

3. **Для специфичных задач** (случайный доступ, частичное чтение):

   - Низкоуровневые методы `fs.open()`, `fs.read()`, `fs.close()`

4. **В современных проектах** предпочтительнее использовать:
   - Версии на промисах из `fs.promises`
   - Потоки для больших файлов
   - Избегать синхронных методов в основном потоке выполнения

## Сравнение производительности

| Метод            | Потребление памяти  | Скорость | Блокировка потока |
| ---------------- | ------------------- | -------- | ----------------- |
| readFile         | Высокое (весь файл) | Средняя  | Нет               |
| readFileSync     | Высокое (весь файл) | Высокая  | Да                |
| createReadStream | Низкое (по частям)  | Средняя  | Нет               |
| open/read/close  | Контролируемое      | Высокая  | Зависит от версии |

---

[[002 Node.js|Назад]]
