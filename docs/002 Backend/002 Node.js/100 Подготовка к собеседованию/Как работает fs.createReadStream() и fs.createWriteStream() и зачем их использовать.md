---
title: Как работает fs.createReadStream() и fs.createWriteStream() и зачем их использовать
draft: false
tags:
  - "#NodeJS"
  - "#fs"
  - "#потоки"
  - "#файловая-система"
  - "#производительность"
  - "#streams"
info:
  - "[Документация Node.js по потокам](https://nodejs.org/api/stream.html)"
  - "[fs.createReadStream() в документации](https://nodejs.org/api/fs.html#fs_fs_createreadstream_path_options)"
  - "[fs.createWriteStream() в документации](https://nodejs.org/api/fs.html#fs_fs_createwritestream_path_options)"
---

Методы `fs.createReadStream()` и `fs.createWriteStream()` в Node.js создают потоки для чтения и записи файлов, позволяя обрабатывать данные частями, без загрузки всего файла в память. Это особенно полезно для работы с большими файлами.

## fs.createReadStream(path, options)

Создает поток для чтения файла. Чтение происходит чанками (по частям), что значительно снижает нагрузку на оперативную память.

```javascript
const fs = require("fs")

const readStream = fs.createReadStream("input.txt", {
  encoding: "utf-8",
  highWaterMark: 16,
})

readStream.on("data", (chunk) => {
  console.log("Чанк данных:", chunk)
})

readStream.on("end", () => {
  console.log("Чтение завершено")
})

readStream.on("error", (err) => {
  console.error("Ошибка чтения:", err)
})
```

### Основные параметры

- **`path`** — путь к файлу, который необходимо прочитать
- **`options`** — объект с настройками:
  - **`encoding`** — кодировка (например, `"utf-8"`)
  - **`highWaterMark`** — размер буфера в байтах (по умолчанию 64 КБ)
  - **`start`** и **`end`** — для чтения определенного диапазона байтов файла

### Основные события потока чтения

- **`data`** — срабатывает при получении нового чанка данных
- **`end`** — когда файл полностью прочитан
- **`error`** — при возникновении ошибки
- **`close`** — когда файловый дескриптор закрыт

## fs.createWriteStream(path, options)

Создает поток для записи в файл. Данные записываются последовательно, что позволяет работать с большими объемами данных без загрузки всего содержимого в память.

```javascript
const fs = require("fs")

const writeStream = fs.createWriteStream("output.txt", {
  encoding: "utf-8",
})

writeStream.write("Первая строка\n")
writeStream.write("Вторая строка\n")
writeStream.end("Запись завершена")

writeStream.on("finish", () => {
  console.log("Файл записан")
})

writeStream.on("error", (err) => {
  console.error("Ошибка записи:", err)
})
```

### Основные параметры

- **`path`** — путь к файлу, в который будет производиться запись
- **`options`** — объект с настройками:
  - **`encoding`** — кодировка записи
  - **`flags`** — флаги для открытия файла (по умолчанию `'w'` — перезапись)
  - **`mode`** — права доступа к создаваемому файлу (по умолчанию `0o666`)

### Основные методы потока записи

- **`.write(data)`** — записывает данные в поток
- **`.end([data])`** — завершает поток, записав при необходимости последние данные
- **`.cork()`** и **`.uncork()`** — для буферизации записи и повышения производительности

### Основные события потока записи

- **`finish`** — когда все данные записаны в файловую систему
- **`error`** — при возникновении ошибки
- **`close`** — когда поток записи закрыт

## Зачем использовать потоки?

1. **Экономия памяти** — файл не загружается полностью в память, что критически важно при работе с большими файлами.

2. **Повышение производительности** — обработка данных по частям позволяет работать с файлами эффективнее, распределяя нагрузку на процессор и память.

3. **Обработка больших файлов** — потоки позволяют работать с файлами, размер которых превышает доступную оперативную память (гигабайтные и терабайтные файлы).

4. **Pipe (каналы данных)** — можно передавать данные напрямую между потоками, что очень эффективно, например, для копирования или преобразования файлов:

```javascript
const fs = require("fs")
const zlib = require("zlib")

// Копирование файла с компрессией
const readStream = fs.createReadStream("input.txt")
const writeStream = fs.createWriteStream("output.txt.gz")
const gzipStream = zlib.createGzip()

readStream
  .pipe(gzipStream) // сжимаем данные
  .pipe(writeStream) // записываем в файл

writeStream.on("finish", () => {
  console.log("Файл успешно сжат и сохранен")
})
```

## Пример практического использования

Вот пример копирования большого файла без перегрузки памяти:

```javascript
const fs = require("fs")

function copyFileWithStreams(source, destination) {
  const readStream = fs.createReadStream(source)
  const writeStream = fs.createWriteStream(destination)

  // Обработка ошибок
  readStream.on("error", (err) => console.error("Ошибка чтения:", err))
  writeStream.on("error", (err) => console.error("Ошибка записи:", err))

  // Отслеживание прогресса
  let bytesRead = 0
  readStream.on("data", (chunk) => {
    bytesRead += chunk.length
    console.log(`Прочитано: ${bytesRead} байт`)
  })

  // Завершение операции
  writeStream.on("finish", () => console.log("Копирование завершено"))

  // Копирование данных
  readStream.pipe(writeStream)
}

copyFileWithStreams("большой_файл.mp4", "копия_большого_файла.mp4")
```

В данном примере обработка происходит частями, что позволяет копировать файлы любого размера с минимальным использованием памяти.

---

[[002 Node.js|Назад]]
