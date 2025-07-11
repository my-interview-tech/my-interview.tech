---
title: Потоки (Streams) в Node.js и работа с большими объемами данных
draft: false
tags:
  - "#NodeJS"
  - "#Streams"
  - "#потоки"
  - "#буферизация"
  - "#pipes"
  - "#производительность"
info:
---

`Stream` (поток) - это абстракция в Node.js для работы с потоковой передачей данных. Потоки позволяют эффективно обрабатывать данные по частям, не загружая их целиком в память, что особенно важно при работе с большими файлами или сетевыми соединениями.

## Основные типы потоков

В Node.js существует четыре основных типа потоков:

1. **Readable** - потоки для чтения данных (например, чтение из файла)
2. **Writable** - потоки для записи данных (например, запись в файл)
3. **Duplex** - потоки, которые являются одновременно Readable и Writable (например, сокеты TCP)
4. **Transform** - потоки Duplex, которые могут изменять данные при их передаче (например, компрессия)

## Работа с потоками для чтения (Readable)

```javascript
const fs = require("fs")

// Создание читаемого потока
const readableStream = fs.createReadStream("input.txt", {
  encoding: "utf8",
  highWaterMark: 64 * 1024, // Размер буфера (64KB)
})

// Обработка событий
readableStream.on("data", (chunk) => {
  console.log(`Получен фрагмент данных (${chunk.length} байт)`)
  // Обработка фрагмента данных
})

readableStream.on("end", () => {
  console.log("Чтение завершено")
})

readableStream.on("error", (err) => {
  console.error("Ошибка при чтении:", err)
})
```

### Режимы потоков для чтения

Readable потоки могут работать в двух режимах:

1. **Flowing mode** - данные автоматически считываются и передаются через события
2. **Paused mode** - необходимо явно вызывать метод `read()` для получения данных

```javascript
// Переключение в flowing mode
readableStream.on("data", (chunk) => {
  // При подписке на событие 'data', поток автоматически переходит в flowing mode
})

// Переключение в paused mode
readableStream.pause()
readableStream.resume() // Обратно в flowing mode

// Использование метода read() в paused mode
let chunk
while (null !== (chunk = readableStream.read())) {
  console.log(`Прочитано ${chunk.length} байт`)
}
```

## Работа с потоками для записи (Writable)

```javascript
const fs = require("fs")

// Создание потока для записи
const writableStream = fs.createWriteStream("output.txt", {
  encoding: "utf8",
})

// Запись данных
writableStream.write("Первая строка данных\n", "utf8")
writableStream.write("Вторая строка данных\n", "utf8")

// Завершение записи
writableStream.end("Последняя строка данных\n")

// Обработка событий
writableStream.on("finish", () => {
  console.log("Запись завершена")
})

writableStream.on("error", (err) => {
  console.error("Ошибка при записи:", err)
})
```

### Обработка обратного давления (backpressure)

Когда поток для записи не может принимать данные так быстро, как они отправляются, возникает обратное давление. Правильная обработка обратного давления критически важна для производительности:

```javascript
// Пример обработки обратного давления
function writeData(writableStream, data, callback) {
  let i = 0

  function write() {
    let ok = true

    do {
      if (i === data.length) {
        // Если данные закончились, завершаем поток
        writableStream.end(callback)
        return
      }

      // Запись следующего фрагмента данных
      const chunk = data[i++]
      ok = writableStream.write(chunk)
    } while (i < data.length && ok)

    if (i < data.length) {
      // Если поток сигнализирует о заполнении,
      // ждем событие 'drain' перед продолжением
      writableStream.once("drain", write)
    }
  }

  write()
}

const data = Array(1000).fill("Много данных для записи\n")
writeData(writableStream, data, () => console.log("Все данные записаны"))
```

## Конвейер потоков (pipe)

Метод `pipe()` позволяет соединять потоки, автоматически управляя потоком данных и обратным давлением:

```javascript
const fs = require("fs")
const zlib = require("zlib")

// Создание потоков
const readableStream = fs.createReadStream("input.txt")
const gzipStream = zlib.createGzip()
const writableStream = fs.createWriteStream("output.txt.gz")

// Соединение потоков: чтение -> сжатие -> запись
readableStream.pipe(gzipStream).pipe(writableStream)

// Обработка завершения
writableStream.on("finish", () => {
  console.log("Процесс сжатия и записи завершен")
})

// Обработка ошибок
readableStream.on("error", handleError)
gzipStream.on("error", handleError)
writableStream.on("error", handleError)

function handleError(err) {
  console.error("Ошибка:", err)
  // Очистка ресурсов
}
```

### pipeline API (с Node.js 10)

Начиная с Node.js 10, доступен API `pipeline`, который упрощает обработку ошибок и очистку ресурсов:

```javascript
const { pipeline } = require("stream")
const fs = require("fs")
const zlib = require("zlib")

pipeline(
  fs.createReadStream("input.txt"),
  zlib.createGzip(),
  fs.createWriteStream("output.txt.gz"),
  (err) => {
    if (err) {
      console.error("Ошибка в конвейере:", err)
    } else {
      console.log("Конвейер успешно завершен")
    }
  },
)

// С промисами (Node.js 15+)
const { pipeline } = require("stream/promises")

async function run() {
  try {
    await pipeline(
      fs.createReadStream("input.txt"),
      zlib.createGzip(),
      fs.createWriteStream("output.txt.gz"),
    )
    console.log("Конвейер успешно завершен")
  } catch (err) {
    console.error("Ошибка в конвейере:", err)
  }
}

run()
```

## Создание пользовательских потоков

### Создание потока для чтения

```javascript
const { Readable } = require("stream")

class CounterStream extends Readable {
  constructor(max) {
    super()
    this.max = max
    this.counter = 0
  }

  _read() {
    this.counter++

    if (this.counter <= this.max) {
      const buf = Buffer.from(`${this.counter}\n`, "utf8")
      this.push(buf)
    } else {
      // Сигнализирует о конце потока
      this.push(null)
    }
  }
}

const counterStream = new CounterStream(10)
counterStream.pipe(process.stdout)

// Альтернативный способ с использованием factory
const counterStream2 = new Readable({
  objectMode: true, // Для работы с объектами, а не только буферами
  highWaterMark: 2, // Максимальное количество объектов в буфере
  read(size) {
    this.counter = this.counter || 0
    this.counter++

    if (this.counter <= 10) {
      this.push({ value: this.counter })
    } else {
      this.push(null)
    }
  },
})

counterStream2.on("data", (data) => {
  console.log(data) // { value: 1 }, { value: 2 }, ...
})
```

### Создание потока для записи

```javascript
const { Writable } = require("stream")

class ConsoleWriteStream extends Writable {
  constructor(options) {
    super(options)
  }

  _write(chunk, encoding, callback) {
    // Обработка поступающих данных
    console.log(`Получены данные: ${chunk.toString()}`)

    // Вызов callback для сигнализации о завершении обработки
    callback()
  }
}

const consoleStream = new ConsoleWriteStream()
process.stdin.pipe(consoleStream)

// Альтернативный способ с использованием factory
const consoleStream2 = new Writable({
  objectMode: true, // Для работы с объектами
  write(chunk, encoding, callback) {
    console.log("Объект:", chunk)
    callback()
  },
})

consoleStream2.write({ data: "пример объекта" })
consoleStream2.end()
```

### Создание трансформирующего потока

```javascript
const { Transform } = require("stream")

class UppercaseTransform extends Transform {
  constructor(options) {
    super(options)
  }

  _transform(chunk, encoding, callback) {
    // Преобразование данных в верхний регистр
    const upperChunk = chunk.toString().toUpperCase()

    // Передача преобразованных данных дальше
    this.push(upperChunk)

    // Сигнализация о завершении обработки
    callback()
  }
}

const uppercaseStream = new UppercaseTransform()

process.stdin.pipe(uppercaseStream).pipe(process.stdout)

// С использованием factory
const reverseStream = new Transform({
  transform(chunk, encoding, callback) {
    const reversed = chunk.toString().split("").reverse().join("")
    callback(null, reversed)
  },
})

process.stdin.pipe(reverseStream).pipe(process.stdout)
```

## Опции и оптимизация потоков

### Важные опции потоков

```javascript
const stream = require("stream")

const readableOptions = {
  highWaterMark: 16 * 1024, // Размер внутреннего буфера (16KB)
  encoding: "utf8", // Кодировка
  objectMode: false, // Режим объектов
  emitClose: true, // Генерировать событие 'close' после 'end'
  autoDestroy: true, // Автоматическое уничтожение после 'end'
  defaultEncoding: "utf8", // Кодировка по умолчанию
}

const writableOptions = {
  highWaterMark: 16 * 1024, // Размер буфера (16KB)
  decodeStrings: true, // Декодировать строки в буферы
  objectMode: false, // Режим объектов
  emitClose: true, // Генерировать событие 'close' после 'finish'
  autoDestroy: true, // Автоматическое уничтожение после 'finish'
  defaultEncoding: "utf8", // Кодировка по умолчанию
}
```

### Оптимизация потоков для работы с большими файлами

```javascript
const fs = require("fs")
const crypto = require("crypto")
const { pipeline } = require("stream")

// Расчет хеша большого файла без загрузки его в память
function calculateFileHash(filename, algorithm = "sha256") {
  return new Promise((resolve, reject) => {
    const hash = crypto.createHash(algorithm)
    const fileStream = fs.createReadStream(filename, {
      highWaterMark: 64 * 1024, // Оптимальный размер буфера для файловых операций
    })

    fileStream.on("error", reject)

    fileStream.on("data", (chunk) => {
      hash.update(chunk)
    })

    fileStream.on("end", () => {
      resolve(hash.digest("hex"))
    })
  })
}

// Копирование большого файла с минимальным использованием памяти
function copyLargeFile(source, destination) {
  return new Promise((resolve, reject) => {
    pipeline(
      fs.createReadStream(source, { highWaterMark: 1024 * 1024 }),
      fs.createWriteStream(destination),
      (err) => {
        if (err) reject(err)
        else resolve()
      },
    )
  })
}
```

## Обработка ошибок в потоках

```javascript
const fs = require("fs")
const { pipeline } = require("stream")

// Обработка ошибок при использовании pipe
function pipeExample() {
  const source = fs.createReadStream("non-existent-file.txt")
  const destination = fs.createWriteStream("output.txt")

  source.on("error", (err) => {
    console.error("Ошибка источника:", err)
    // Важно: закрыть поток назначения при ошибке источника
    destination.destroy(err)
  })

  destination.on("error", (err) => {
    console.error("Ошибка назначения:", err)
    // Важно: закрыть поток источника при ошибке назначения
    source.destroy(err)
  })

  source.pipe(destination)
}

// Более простой и надежный подход с pipeline
function pipelineExample() {
  pipeline(
    fs.createReadStream("non-existent-file.txt"),
    fs.createWriteStream("output.txt"),
    (err) => {
      if (err) {
        console.error("Ошибка конвейера:", err)
      } else {
        console.log("Конвейер завершен успешно")
      }
    },
  )
}
```

## Практические примеры использования потоков

### Реализация HTTP-сервера для потоковой передачи файлов

```javascript
const http = require("http")
const fs = require("fs")
const path = require("path")

const server = http.createServer((req, res) => {
  if (req.url === "/video" && req.method === "GET") {
    const videoPath = path.join(__dirname, "video.mp4")
    const stat = fs.statSync(videoPath)
    const fileSize = stat.size
    const range = req.headers.range

    if (range) {
      // Обработка запроса диапазона для потоковой передачи видео
      const parts = range.replace(/bytes=/, "").split("-")
      const start = parseInt(parts[0], 10)
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1
      const chunkSize = end - start + 1

      const fileStream = fs.createReadStream(videoPath, { start, end })

      res.writeHead(206, {
        "Content-Range": `bytes ${start}-${end}/${fileSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": chunkSize,
        "Content-Type": "video/mp4",
      })

      fileStream.pipe(res)
    } else {
      // Отправка всего файла
      res.writeHead(200, {
        "Content-Length": fileSize,
        "Content-Type": "video/mp4",
      })

      fs.createReadStream(videoPath).pipe(res)
    }
  } else {
    res.statusCode = 404
    res.end("Не найдено")
  }
})

server.listen(3000, () => {
  console.log("Сервер запущен на порту 3000")
})
```

### Реализация парсера CSV-файлов с использованием потоков

```javascript
const fs = require("fs")
const { Transform } = require("stream")
const { createReadStream } = require("fs")
const { createInterface } = require("readline")

// Создаем трансформирующий поток для обработки CSV
class CSVParser extends Transform {
  constructor(options = {}) {
    options.objectMode = true
    super(options)
    this.delimiter = options.delimiter || ","
    this.headers = null
  }

  _transform(line, encoding, callback) {
    const values = line.split(this.delimiter)

    if (!this.headers) {
      // Первая строка содержит заголовки
      this.headers = values
      callback()
    } else {
      // Преобразуем строки в объекты
      const obj = {}
      for (let i = 0; i < this.headers.length; i++) {
        obj[this.headers[i]] = values[i]
      }
      this.push(obj)
      callback()
    }
  }
}

// Пример использования
function parseCSVFile(filePath) {
  const csvParser = new CSVParser()

  // Создаем поток для чтения файла построчно
  const lineReader = createInterface({
    input: createReadStream(filePath),
    crlfDelay: Infinity,
  })

  // Обработка каждой строки
  lineReader.on("line", (line) => {
    csvParser.write(line)
  })

  // Обработка окончания файла
  lineReader.on("close", () => {
    csvParser.end()
  })

  // Обработка результатов парсинга
  csvParser.on("data", (data) => {
    console.log("Строка CSV:", data)
  })

  csvParser.on("end", () => {
    console.log("Парсинг CSV завершен")
  })
}

// Вызов функции
parseCSVFile("data.csv")
```

## Заключение

Потоки в Node.js предоставляют эффективный способ обработки данных, особенно когда речь идет о больших объемах информации. Главные преимущества:

1. **Эффективное использование памяти** - обработка данных по частям, а не целиком.
2. **Композиция операций** - объединение нескольких потоков в конвейеры обработки.
3. **Обработка обратного давления** - автоматическое управление скоростью передачи данных.
4. **Асинхронная обработка** - естественная интеграция с асинхронной природой Node.js.

Потоки используются во многих частях экосистемы Node.js: файловая система, HTTP-серверы, компрессия, криптография, и т.д. Понимание принципов работы с потоками является ключевым навыком для разработки эффективных Node.js приложений.

---

[[Назад]]
