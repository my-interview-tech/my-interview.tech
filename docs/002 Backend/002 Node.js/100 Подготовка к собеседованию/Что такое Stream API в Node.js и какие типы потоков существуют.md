---
title: Что такое Stream API в Node.js и какие типы потоков существуют
draft: false
tags:
  - "#NodeJS"
  - "#Stream"
  - "#Потоки"
  - "#ОбработкаДанных"
  - "#Производительность"
info:
  - "[Документация Node.js - Stream](https://nodejs.org/api/stream.html)"
  - "[Node.js Streams: Everything you need to know](https://www.freecodecamp.org/news/node-js-streams-everything-you-need-to-know-c9141306be93/)"
---

![[Pasted image node-streams.png|600]]

## Что такое Stream API в Node.js

**Stream (поток)** — это абстракция в Node.js для работы с потоковыми данными, которая позволяет читать или записывать данные по частям (чанками), не загружая весь файл в память. Потоки особенно полезны при работе с большими объемами данных или данными, которые поступают частями.

Streams в Node.js реализуют интерфейс EventEmitter, что позволяет подписываться на различные события в процессе потоковой обработки данных.

## Преимущества использования потоков

1. **Эффективное использование памяти**: Данные обрабатываются небольшими частями, а не загружаются целиком
2. **Экономия времени**: Обработка может начаться до того, как все данные будут получены
3. **Композиция**: Потоки можно объединять в цепочки с помощью метода `pipe()`
4. **Бэкпрешер (Backpressure)**: Автоматическое управление скоростью передачи данных между потоками

## Типы потоков в Node.js

В Node.js существует 4 базовых типа потоков:

### 1. Readable (Читаемые потоки)

Потоки, из которых можно читать данные. Например, `fs.createReadStream()` для чтения файла.

```javascript
const fs = require("fs")

// Создание читаемого потока из файла
const readableStream = fs.createReadStream("file.txt", {
  encoding: "utf8",
  highWaterMark: 64 * 1024, // размер буфера (64KB)
})

// Обработка данных по мере их поступления
readableStream.on("data", (chunk) => {
  console.log(`Получен чанк данных: ${chunk.length} байт`)
  // Обработка данных
})

readableStream.on("end", () => {
  console.log("Чтение завершено")
})

readableStream.on("error", (err) => {
  console.error("Ошибка при чтении:", err)
})
```

### 2. Writable (Записываемые потоки)

Потоки, в которые можно записывать данные. Например, `fs.createWriteStream()` для записи в файл.

```javascript
const fs = require("fs")

// Создание записываемого потока в файл
const writableStream = fs.createWriteStream("output.txt")

// Запись данных в поток
writableStream.write("Первая строка данных\n")
writableStream.write("Вторая строка данных\n")

// Завершение записи
writableStream.end("Последняя строка данных")

// Обработка событий
writableStream.on("finish", () => {
  console.log("Запись завершена")
})

writableStream.on("error", (err) => {
  console.error("Ошибка при записи:", err)
})
```

### 3. Duplex (Двунаправленные потоки)

Потоки, которые сочетают в себе возможности чтения и записи. Например, сокеты TCP.

```javascript
const { Duplex } = require("stream")

// Создание пользовательского Duplex потока
class MyDuplex extends Duplex {
  constructor(options) {
    super(options)
    this.data = ["Первая строка", "Вторая строка", "Третья строка"]
    this.index = 0
  }

  // Реализация метода для чтения
  _read(size) {
    if (this.index < this.data.length) {
      this.push(this.data[this.index] + "\n")
      this.index++
    } else {
      // Сигнализируем о конце данных
      this.push(null)
    }
  }

  // Реализация метода для записи
  _write(chunk, encoding, callback) {
    console.log(`Получено: ${chunk.toString()}`)
    callback()
  }
}

// Использование Duplex потока
const duplex = new MyDuplex()

duplex.on("data", (chunk) => {
  console.log(`Прочитано: ${chunk.toString()}`)
})

duplex.write("Это будет записано в поток")
```

### 4. Transform (Преобразующие потоки)

Особый тип Duplex потоков, которые могут изменять данные при их передаче. Например, потоки сжатия/распаковки.

```javascript
const { Transform } = require("stream")

// Создание преобразующего потока для перевода текста в верхний регистр
class UppercaseTransform extends Transform {
  _transform(chunk, encoding, callback) {
    // Преобразование входных данных
    const upperChunk = chunk.toString().toUpperCase()

    // Отправка преобразованных данных
    this.push(upperChunk)

    // Сигнализируем о завершении обработки текущего чанка
    callback()
  }
}

// Использование
const fs = require("fs")
const upperCaseTransform = new UppercaseTransform()

const readStream = fs.createReadStream("input.txt")
const writeStream = fs.createWriteStream("output.txt")

// Создание цепочки потоков с преобразованием
readStream.pipe(upperCaseTransform).pipe(writeStream)

writeStream.on("finish", () => {
  console.log("Преобразование завершено")
})
```

## Режимы потоков

Потоки могут работать в двух режимах:

### 1. Бинарный режим

По умолчанию потоки работают в бинарном режиме, передавая данные в виде буферов (Buffer).

```javascript
const readableStream = fs.createReadStream("binary-file.jpg")
// chunk будет типа Buffer
```

### 2. Объектный режим

В объектном режиме потоки могут работать с объектами JavaScript.

```javascript
const { Readable } = require("stream")

// Создание потока в объектном режиме
const objectModeStream = new Readable({
  objectMode: true,
  read() {},
})

// Отправка объектов в поток
objectModeStream.push({ name: "Алексей", age: 30 })
objectModeStream.push({ name: "Мария", age: 25 })
objectModeStream.push(null) // Конец потока

// Обработка объектов
objectModeStream.on("data", (obj) => {
  console.log(`Получен объект:`, obj)
})
```

## Метод pipe() и цепочки потоков

Метод `pipe()` позволяет соединять потоки, направляя вывод одного потока на вход другого:

```javascript
const fs = require("fs")
const zlib = require("zlib")

// Создаем цепочку потоков для чтения, сжатия и записи файла
fs.createReadStream("input.txt")
  .pipe(zlib.createGzip()) // Сжимаем данные
  .pipe(fs.createWriteStream("input.txt.gz")) // Записываем сжатые данные
  .on("finish", () => {
    console.log("Сжатие завершено")
  })
```

### Обработка ошибок в цепочке потоков

Метод `pipe()` автоматически не передает события ошибок вниз по цепочке. Нужно обрабатывать ошибки для каждого потока:

```javascript
const fs = require("fs")
const zlib = require("zlib")

const readStream = fs.createReadStream("input.txt")
const gzipStream = zlib.createGzip()
const writeStream = fs.createWriteStream("input.txt.gz")

// Обработка ошибок для всех потоков
readStream.on("error", handleError)
gzipStream.on("error", handleError)
writeStream.on("error", handleError)

function handleError(err) {
  console.error("Ошибка в потоке:", err)
  // Очистка ресурсов, если необходимо
}

// Создание цепочки
readStream.pipe(gzipStream).pipe(writeStream)
```

## Механизм Backpressure (Обратное давление)

Backpressure - это механизм, который регулирует скорость передачи данных между потоками, чтобы предотвратить перегрузку памяти:

```javascript
const fs = require("fs")

const readStream = fs.createReadStream("bigFile.txt")
const writeStream = fs.createWriteStream("output.txt")

// Отслеживание backpressure
readStream.on("data", (chunk) => {
  // Пытаемся записать данные
  const canContinue = writeStream.write(chunk)

  // Если поток записи перегружен - приостанавливаем чтение
  if (!canContinue) {
    console.log("Применяется backpressure - приостановка чтения")
    readStream.pause()
  }
})

// Когда поток записи готов принимать больше данных
writeStream.on("drain", () => {
  console.log("Буфер записи пуст - возобновление чтения")
  readStream.resume()
})

// Метод pipe() автоматически реализует логику backpressure
// Поэтому используйте его, когда возможно:
// readStream.pipe(writeStream);
```

## Создание собственных потоков

Для создания собственных потоков можно наследоваться от базовых классов:

```javascript
const { Readable, Writable, Transform, Duplex } = require("stream")

// Пример создания читаемого потока
class CounterStream extends Readable {
  constructor(max, options) {
    super(options)
    this.max = max
    this.current = 0
  }

  _read(size) {
    this.current += 1

    if (this.current <= this.max) {
      const buf = Buffer.from(`${this.current}\n`, "utf8")
      this.push(buf)
    } else {
      this.push(null) // Сигнализируем о конце
    }
  }
}

// Использование собственного потока
const counter = new CounterStream(5)
counter.pipe(process.stdout)
```

## Мультиплексирование и демультиплексирование потоков

```javascript
const { PassThrough } = require("stream")
const fs = require("fs")

// Создаем общий проходной поток
const multiplexer = new PassThrough()

// Направляем один поток во множество назначений
multiplexer
  .pipe(fs.createWriteStream("output1.txt"))
  .on("finish", () => console.log("output1 готов"))

multiplexer
  .pipe(fs.createWriteStream("output2.txt"))
  .on("finish", () => console.log("output2 готов"))

// Записываем данные в мультиплексор
fs.createReadStream("input.txt").pipe(multiplexer)
```

## Асинхронные итераторы для потоков

В современном Node.js можно использовать асинхронные итераторы для работы с потоками:

```javascript
const fs = require("fs")
const { createReadStream } = fs

async function processFile(filePath) {
  const stream = createReadStream(filePath, { encoding: "utf8" })

  try {
    for await (const chunk of stream) {
      console.log(`Получено ${chunk.length} символов`)
      // Обработка chunk
    }
    console.log("Обработка завершена")
  } catch (error) {
    console.error("Ошибка обработки:", error)
  }
}

processFile("input.txt")
```

## Заключение

Stream API в Node.js обеспечивает эффективную обработку данных, предоставляя четыре типа потоков:

- **Readable**: для чтения данных из источника
- **Writable**: для записи данных в назначение
- **Duplex**: для одновременного чтения и записи
- **Transform**: для изменения данных в процессе передачи

Понимание потоков и их правильное использование позволяет создавать высокопроизводительные приложения Node.js, особенно при работе с большими объемами данных или в сценариях обработки реального времени.

---

[[002 Node.js|Назад]]
