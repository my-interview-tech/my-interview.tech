---
title: Какие встроенные модули есть в Node.js? Какие из них самые часто используемые?
draft: false
tags:
  - "#NodeJS"
  - "#core-modules"
  - "#fs"
  - "#http"
  - "#stream"
info:
  - "[Документация Node.js](https://nodejs.org/api/)"
  - "[Руководство по встроенным модулям Node.js](https://nodejs.org/en/learn)"
  - "[Модули Node.js на русском](https://nodejsdev.ru/api/)"
---

Node.js включает в себя множество встроенных (core) модулей, которые обеспечивают работу с файловой системой, сетью, потоками и другими функциями без необходимости установки дополнительных пакетов.

## Основные встроенные модули в Node.js

### 1. **fs (File System)**

Обеспечивает API для взаимодействия с файловой системой.

```javascript
const fs = require("fs")

// Синхронное чтение
const data = fs.readFileSync("file.txt", "utf8")

// Асинхронное чтение
fs.readFile("file.txt", "utf8", (err, data) => {
  if (err) throw err
  console.log(data)
})

// Запись в файл
fs.writeFile("output.txt", "Привет, мир!", (err) => {
  if (err) throw err
  console.log("Файл сохранен")
})
```

### 2. **http / https**

Используется для создания HTTP-серверов и выполнения HTTP-запросов.

```javascript
const http = require("http")

// Создание HTTP-сервера
const server = http.createServer((req, res) => {
  res.statusCode = 200
  res.setHeader("Content-Type", "text/plain")
  res.end("Привет, мир!")
})

server.listen(3000, () => {
  console.log("Сервер запущен на http://localhost:3000/")
})

// Выполнение HTTP-запроса
http.get("http://example.com", (res) => {
  let data = ""
  res.on("data", (chunk) => {
    data += chunk
  })
  res.on("end", () => {
    console.log(data)
  })
})
```

### 3. **url**

Предоставляет утилиты для разбора и форматирования URL.

```javascript
const url = require("url")

const myURL = new URL("https://example.org/foo?bar=baz")
console.log(myURL.hostname) // example.org
console.log(myURL.searchParams.get("bar")) // baz

// Парсинг URL
const parsedUrl = url.parse("https://example.org/foo?bar=baz", true)
console.log(parsedUrl.hostname) // example.org
console.log(parsedUrl.query.bar) // baz
```

### 4. **path**

Предоставляет утилиты для работы с путями к файлам и директориям.

```javascript
const path = require("path")

// Объединение путей
console.log(path.join("/home", "user", "docs", "file.txt")) // /home/user/docs/file.txt

// Получение расширения файла
console.log(path.extname("file.txt")) // .txt

// Получение базового имени файла
console.log(path.basename("/home/user/file.txt")) // file.txt
```

### 5. **os**

Предоставляет информацию об операционной системе.

```javascript
const os = require("os")

console.log("Архитектура CPU:", os.arch())
console.log("Свободная память:", os.freemem() / 1024 / 1024, "МБ")
console.log("Всего памяти:", os.totalmem() / 1024 / 1024, "МБ")
console.log("Имя хоста:", os.hostname())
console.log("Тип ОС:", os.type())
console.log("Время работы:", os.uptime() / 60 / 60, "часов")
```

### 6. **events**

Основа для всех асинхронных операций в Node.js.

```javascript
const EventEmitter = require("events")

class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter()

// Регистрация обработчика события
myEmitter.on("event", (a, b) => {
  console.log(a, b)
})

// Генерация события
myEmitter.emit("event", "привет", "мир")
```

### 7. **crypto**

Предоставляет криптографические функции для шифрования, хеширования и т.д.

```javascript
const crypto = require("crypto")

// Создание хеша
const hash = crypto.createHash("sha256").update("Привет, мир!").digest("hex")
console.log(hash)

// Шифрование текста
const cipher = crypto.createCipher("aes-256-cbc", "пароль")
let encrypted = cipher.update("Секретный текст", "utf8", "hex")
encrypted += cipher.final("hex")
console.log(encrypted)
```

### 8. **util**

Набор служебных функций для внутреннего использования в Node.js.

```javascript
const util = require("util")
const fs = require("fs")

// Преобразование функции обратного вызова в промис
const readFile = util.promisify(fs.readFile)

// Теперь можно использовать с async/await
async function readFileData() {
  try {
    const data = await readFile("file.txt", "utf8")
    console.log(data)
  } catch (err) {
    console.error(err)
  }
}
```

### 9. **stream**

Работа с потоками данных для эффективной обработки ввода/вывода.

```javascript
const fs = require("fs")

// Чтение файла через поток
const readStream = fs.createReadStream("big-file.txt")
readStream.on("data", (chunk) => {
  console.log(`Получено ${chunk.length} байт данных`)
})
readStream.on("end", () => {
  console.log("Чтение завершено")
})

// Копирование файла через потоки
const readStream = fs.createReadStream("source.txt")
const writeStream = fs.createWriteStream("destination.txt")
readStream.pipe(writeStream)
```

### 10. **child_process**

Позволяет запускать дочерние процессы.

```javascript
const { exec, spawn } = require("child_process")

// Запуск команды через exec
exec("ls -la", (error, stdout, stderr) => {
  if (error) {
    console.error(`Ошибка выполнения: ${error}`)
    return
  }
  console.log(`stdout: ${stdout}`)
})

// Запуск процесса через spawn
const ls = spawn("ls", ["-la"])
ls.stdout.on("data", (data) => {
  console.log(`stdout: ${data}`)
})
```

## Самые часто используемые модули

1. **fs** — чтение и запись файлов (`fs.readFile`, `fs.writeFile`).
2. **http/https** — создание серверов и отправка запросов.
3. **path** — манипуляции с путями (`path.join()`, `path.resolve()`).
4. **events** — управление событиями (работа с `EventEmitter`).
5. **util** — полезные утилиты (особенно `util.promisify`).

Эти модули встроены в Node.js, поэтому их можно использовать без установки через NPM, просто импортируя через `require('module_name')` или ES модули `import`.

---

[[002 Node.js|Назад]]
