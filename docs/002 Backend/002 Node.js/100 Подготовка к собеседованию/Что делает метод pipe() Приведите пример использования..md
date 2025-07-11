---
title: Что делает метод pipe() Приведите пример использования.
draft: false
tags:
  - "#NodeJS"
  - "#Streams"
  - "#pipe"
  - "#потоки"
  - "#производительность"
  - "#файловая-система"
  - "#HTTP"
info:
  - https://nodejs.org/api/stream.html#readablepipedestination-options
  - https://nodejs.org/en/learn/manipulating-files/nodejs-file-streams
  - https://habr.com/ru/articles/479048/
---

# Что делает метод pipe() в Node.js

Метод `pipe()` в Node.js используется для соединения потоков чтения (Readable streams) с потоками записи (Writable streams). Он автоматически управляет потоком данных так, чтобы целевой поток не был перегружен более быстрым источником.

## Принцип работы pipe()

### Основные функции

1. **Передача данных между потоками**: Автоматически считывает данные из Readable-потока и записывает их в Writable-поток.
2. **Управление обратным давлением (backpressure)**: Предотвращает перегрузку целевого потока.
3. **Автоматическая обработка событий**: Управляет событиями `data`, `end`, `error` и `close`.

### Синтаксис

```javascript
readableStream.pipe(writableStream, { end: true })
```

Параметры:

- `writableStream` - поток записи, куда передаются данные
- `options` - объект опций:
  - `end` - если `true` (по умолчанию), то Writable-поток будет автоматически закрыт при завершении Readable-потока

## Примеры использования pipe()

### 1. Копирование файла

Один из самых простых примеров - копирование файла с использованием потоков:

```javascript
const fs = require("fs")

// Создаем потоки чтения и записи
const readStream = fs.createReadStream("source.txt")
const writeStream = fs.createWriteStream("destination.txt")

// Соединяем потоки с помощью pipe()
readStream.pipe(writeStream)

// Обработка событий
writeStream.on("finish", () => {
  console.log("Файл успешно скопирован")
})

readStream.on("error", (err) => {
  console.error("Ошибка чтения:", err)
})

writeStream.on("error", (err) => {
  console.error("Ошибка записи:", err)
})
```

### 2. Сервер для отдачи файлов

`pipe()` отлично подходит для создания HTTP-сервера, который эффективно отдает файлы:

```javascript
const http = require("http")
const fs = require("fs")
const path = require("path")

http
  .createServer((req, res) => {
    // Проверяем путь и тип запроса
    if (req.method === "GET" && req.url === "/download") {
      // Путь к файлу
      const filePath = path.join(__dirname, "large-file.mp4")

      // Проверяем существование файла
      fs.stat(filePath, (err, stats) => {
        if (err) {
          res.statusCode = 404
          res.end("Файл не найден")
          return
        }

        // Устанавливаем заголовки
        res.setHeader("Content-Type", "video/mp4")
        res.setHeader("Content-Length", stats.size)
        res.setHeader("Content-Disposition", "attachment; filename=video.mp4")

        // Создаем поток чтения и передаем данные в ответ
        const fileStream = fs.createReadStream(filePath)
        fileStream.pipe(res)

        // Обработка ошибок
        fileStream.on("error", (error) => {
          res.statusCode = 500
          res.end("Ошибка сервера")
          console.error(error)
        })
      })
    } else {
      res.statusCode = 404
      res.end("Страница не найдена")
    }
  })
  .listen(3000, () => {
    console.log("Сервер запущен на порту 3000")
  })
```

### 3. Преобразование данных с помощью Transform-потоков

`pipe()` можно использовать в цепочке с Transform-потоками для обработки данных:

```javascript
const fs = require("fs")
const zlib = require("zlib")

// Создаем потоки
const readStream = fs.createReadStream("large-file.txt")
const writeStream = fs.createWriteStream("large-file.txt.gz")
const gzipStream = zlib.createGzip()

// Соединяем потоки в цепочку: чтение -> сжатие -> запись
readStream
  .pipe(gzipStream) // Сжимаем данные
  .pipe(writeStream) // Записываем сжатые данные

writeStream.on("finish", () => {
  console.log("Сжатие файла успешно завершено")
})
```

## Преимущества использования pipe()

### 1. Управление памятью

Благодаря потоковой передаче данных, `pipe()` позволяет работать с файлами любого размера, не загружая их целиком в память.

### 2. Автоматическое управление скоростью потока

Встроенный механизм обратного давления (backpressure) позволяет:

- Приостанавливать чтение, если целевой поток не успевает обрабатывать данные
- Возобновлять чтение, когда целевой поток готов принимать больше данных

### 3. Понятный и лаконичный код

Сравните эти два подхода:

#### Без pipe():

```javascript
const fs = require("fs")

const readStream = fs.createReadStream("source.txt")
const writeStream = fs.createWriteStream("destination.txt")

readStream.on("data", (chunk) => {
  const canContinue = writeStream.write(chunk)

  if (!canContinue) {
    readStream.pause()
  }
})

writeStream.on("drain", () => {
  readStream.resume()
})

readStream.on("end", () => {
  writeStream.end()
})

readStream.on("error", (err) => {
  console.error("Ошибка чтения:", err)
  writeStream.end()
})

writeStream.on("error", (err) => {
  console.error("Ошибка записи:", err)
  readStream.destroy()
})
```

#### С pipe():

```javascript
const fs = require("fs")

fs.createReadStream("source.txt")
  .pipe(fs.createWriteStream("destination.txt"))
  .on("error", (err) => console.error("Ошибка:", err))
```

## Особенности и ограничения

1. **Автоматическое закрытие потока**: По умолчанию `pipe()` закрывает целевой поток, когда исходный поток завершается. Чтобы изменить это поведение, установите `{ end: false }`.

2. **Обработка ошибок**: `pipe()` автоматически не передает ошибки, поэтому рекомендуется добавлять обработчики ошибок для обоих потоков.

3. **Цепочечное соединение**: С помощью `pipe()` можно создавать длинные цепочки преобразования данных:

```javascript
readStream.pipe(transformStream1).pipe(transformStream2).pipe(writeStream)
```

## Заключение

Метод `pipe()` — это мощный инструмент для работы с потоками в Node.js, который позволяет эффективно передавать и обрабатывать данные с минимальными затратами памяти и простым кодом. Он особенно полезен при работе с большими файлами, HTTP-запросами/ответами и любыми операциями, требующими потоковой обработки данных.

---

[[003 JSCore|Назад]]
