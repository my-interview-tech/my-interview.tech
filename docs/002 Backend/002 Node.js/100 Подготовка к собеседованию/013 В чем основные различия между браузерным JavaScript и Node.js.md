---
title: В чем основные различия между браузерным JavaScript и Node.js?
draft: false
tags:
  - "#NodeJS"
  - "#JavaScript"
  - "#ECMAScript"
  - "#browser"
info:
---

Хотя оба используют JavaScript, браузер ориентирован на работу с пользовательским интерфейсом, а Node.js – на серверные задачи и обработку данных.

| **Критерий**               | **Браузерный JavaScript**                   | **Node.js**                                   |
| -------------------------- | ------------------------------------------- | --------------------------------------------- |
| **Среда выполнения**       | Работает в браузере                         | Работает в серверной среде                    |
| **Глобальный объект**      | `window`                                    | `global`                                      |
| **Доступ к DOM**           | Есть (`document`, `window`)                 | Нет                                           |
| **API для работы с сетью** | `fetch`, `XMLHttpRequest`                   | `http`, `https`, `fs`, `net`                  |
| **Файловая система**       | Нет доступа                                 | Есть (`fs`)                                   |
| **Многопоточность**        | Однопоточный с Web Workers                  | Однопоточный Event Loop + `Worker Threads`    |
| **Модули**                 | `ES Modules` (`import/export`)              | `CommonJS` (`require/module.exports`) и `ESM` |
| **Использование**          | Веб-интерфейсы, анимация, обработка событий | Серверные приложения, API, микросервисы       |

## Примеры конкретных различий

### 1. Работа с глобальными объектами

**Браузер:**

```javascript
// Глобальный объект window доступен везде
console.log(window) // Ссылка на глобальный объект окна браузера
console.log(this === window) // true в глобальном контексте

// Доступ к глобальным API браузера
navigator.geolocation.getCurrentPosition((position) => {
  console.log(`Широта: ${position.coords.latitude}, Долгота: ${position.coords.longitude}`)
})

// Хранение данных в localStorage
localStorage.setItem("user", "John")
const user = localStorage.getItem("user")
console.log(`Пользователь: ${user}`) // "Пользователь: John"
```

**Node.js:**

```javascript
// Глобальный объект global
console.log(global) // Глобальный объект Node.js
console.log(this === global) // false (в модулях this != global)

// Использование глобальных переменных процесса
console.log(`Версия Node.js: ${process.version}`)
console.log(`Платформа: ${process.platform}`)
console.log(`Аргументы командной строки: ${process.argv}`)
console.log(`Переменные окружения: ${process.env.NODE_ENV}`)

// Доступ к информации о системе
const os = require("os")
console.log(`Всего памяти: ${os.totalmem() / 1024 / 1024 / 1024} GB`)
console.log(`Свободной памяти: ${os.freemem() / 1024 / 1024 / 1024} GB`)
console.log(`Количество ядер CPU: ${os.cpus().length}`)
```

### 2. Работа с модулями

**Браузер (современный ES Modules):**

```javascript
// file: utils.js
export function formatDate(date) {
  return new Date(date).toLocaleDateString()
}

export const API_URL = "https://api.example.com"

export default class DataService {
  constructor(apiKey) {
    this.apiKey = apiKey
  }

  async fetchData() {
    const response = await fetch(`${API_URL}/data?key=${this.apiKey}`)
    return response.json()
  }
}

// file: app.js
import DataService, { formatDate, API_URL } from "./utils.js"

const service = new DataService("my-api-key")
service.fetchData().then((data) => {
  console.log(`Данные получены: ${formatDate(new Date())}`)
  console.log(data)
})
```

**Node.js (CommonJS):**

```javascript
// file: utils.js
function formatDate(date) {
  return new Date(date).toLocaleDateString()
}

const API_URL = "https://api.example.com"

class DataService {
  constructor(apiKey) {
    this.apiKey = apiKey
  }

  async fetchData() {
    const axios = require("axios")
    const response = await axios.get(`${API_URL}/data?key=${this.apiKey}`)
    return response.data
  }
}

module.exports = {
  formatDate,
  API_URL,
  DataService,
}

// file: app.js
const { formatDate, API_URL, DataService } = require("./utils")

const service = new DataService("my-api-key")
service.fetchData().then((data) => {
  console.log(`Данные получены: ${formatDate(new Date())}`)
  console.log(data)
})
```

**Node.js (поддержка ES модулей с Node.js 14+):**

```javascript
// file: utils.mjs (расширение .mjs для ES модулей)
export function formatDate(date) {
  return new Date(date).toLocaleDateString()
}

export const API_URL = "https://api.example.com"

export default class DataService {
  constructor(apiKey) {
    this.apiKey = apiKey
  }

  async fetchData() {
    const { default: axios } = await import("axios")
    const response = await axios.get(`${API_URL}/data?key=${this.apiKey}`)
    return response.data
  }
}

// file: app.mjs
import DataService, { formatDate } from "./utils.mjs"

const service = new DataService("my-api-key")
service.fetchData().then((data) => {
  console.log(`Данные получены: ${formatDate(new Date())}`)
  console.log(data)
})
```

### 3. Работа с сетью

**Браузер:**

```javascript
// Использование Fetch API
fetch("https://api.example.com/users")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }
    return response.json()
  })
  .then((data) => console.log("Получены данные пользователей:", data))
  .catch((error) => console.error("Ошибка:", error))

// WebSockets
const socket = new WebSocket("wss://echo.websocket.org")

socket.addEventListener("open", () => {
  console.log("Соединение установлено")
  socket.send("Привет, сервер!")
})

socket.addEventListener("message", (event) => {
  console.log("Получено сообщение:", event.data)
})

socket.addEventListener("error", (error) => {
  console.error("Ошибка WebSocket:", error)
})
```

**Node.js:**

```javascript
// HTTP запрос с использованием встроенного модуля
const https = require("https")

const options = {
  hostname: "api.example.com",
  path: "/users",
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    "User-Agent": "Node.js HTTP Client",
  },
}

const req = https
  .request(options, (res) => {
    let data = ""

    res.on("data", (chunk) => {
      data += chunk
    })

    res.on("end", () => {
      console.log("Статус ответа:", res.statusCode)
      console.log("Данные пользователей:", JSON.parse(data))
    })
  })
  .on("error", (err) => {
    console.error("Ошибка:", err.message)
  })

req.end()

// WebSockets с использованием библиотеки ws
const WebSocket = require("ws")
const ws = new WebSocket("wss://echo.websocket.org")

ws.on("open", () => {
  console.log("Соединение установлено")
  ws.send("Привет, сервер!")
})

ws.on("message", (data) => {
  console.log("Получено сообщение:", data.toString())
})

ws.on("error", (error) => {
  console.error("Ошибка WebSocket:", error)
})
```

### 4. Работа с файловой системой

**Браузер:**

```javascript
// Ограниченный доступ через File API
document.getElementById("fileInput").addEventListener("change", (event) => {
  const file = event.target.files[0]

  if (file) {
    // Чтение файла как текст
    const reader = new FileReader()
    reader.onload = (e) => {
      const content = e.target.result
      console.log("Содержимое файла:", content)

      // Создание и скачивание файла
      const modifiedContent = content.toUpperCase()
      const blob = new Blob([modifiedContent], { type: "text/plain" })
      const url = URL.createObjectURL(blob)

      const a = document.createElement("a")
      a.href = url
      a.download = "modified_" + file.name
      a.click()

      URL.revokeObjectURL(url)
    }
    reader.readAsText(file)
  }
})
```

**Node.js:**

```javascript
// Полный доступ к файловой системе
const fs = require("fs")
const path = require("path")

// Синхронное чтение
try {
  const configPath = path.join(__dirname, "config.json")
  const data = fs.readFileSync(configPath, "utf8")
  console.log("Конфигурация:", JSON.parse(data))
} catch (err) {
  console.error("Ошибка при чтении файла:", err)
}

// Асинхронное чтение
fs.readFile("logs.txt", "utf8", (err, data) => {
  if (err) {
    console.error("Ошибка при чтении файла:", err)
    return
  }
  console.log("Содержимое логов:", data.split("\n").length, "строк")
})

// С использованием промисов (Node.js 10+)
const fsPromises = require("fs").promises

async function processFiles() {
  try {
    // Создание каталога
    await fsPromises.mkdir("output", { recursive: true })

    // Запись файла
    await fsPromises.writeFile("output/data.json", JSON.stringify({ date: new Date() }))

    // Чтение каталога
    const files = await fsPromises.readdir("output")
    console.log("Созданные файлы:", files)

    // Чтение и модификация файла
    const content = await fsPromises.readFile("output/data.json", "utf8")
    const data = JSON.parse(content)
    data.processed = true

    // Обновление файла
    await fsPromises.writeFile("output/data.json", JSON.stringify(data, null, 2))
    console.log("Файл обновлен")
  } catch (error) {
    console.error("Ошибка при обработке файлов:", error)
  }
}

processFiles()
```

### 5. Безопасность и ограничения

**Браузер:**

```javascript
// Ограничения Same-Origin Policy
fetch("https://different-origin.com/api/data")
  .then((response) => response.json())
  .catch((error) => console.error("CORS ошибка:", error))
// Это вызовет ошибку CORS, если сервер не настроен соответствующим образом

// Ограниченный доступ к хранилищу
try {
  // Попытка хранить большой объем данных
  const hugeData = new Array(10 * 1024 * 1024).fill("A").join("")
  localStorage.setItem("hugeData", hugeData) // Может вызвать исключение QUOTA_EXCEEDED_ERR
} catch (e) {
  console.error("Ошибка при хранении данных:", e)
}

// Доступ только к определенным API браузера
try {
  // Требуется разрешение пользователя
  navigator.mediaDevices
    .getUserMedia({ audio: true, video: true })
    .then((stream) => console.log("Доступ к камере и микрофону получен"))
    .catch((error) => console.error("Доступ запрещен:", error))
} catch (e) {
  console.error("API не поддерживается:", e)
}
```

**Node.js:**

```javascript
// Полный доступ к системе
const { exec } = require("child_process")

// Выполнение системных команд
exec("ls -la", (error, stdout, stderr) => {
  if (error) {
    console.error(`Ошибка выполнения: ${error}`)
    return
  }
  console.log(`Результат: ${stdout}`)
})

// Доступ к сетевым интерфейсам
const os = require("os")
const networkInterfaces = os.networkInterfaces()

for (const name of Object.keys(networkInterfaces)) {
  for (const interface of networkInterfaces[name]) {
    if (interface.family === "IPv4" && !interface.internal) {
      console.log(`Сетевой интерфейс: ${name}, IP: ${interface.address}`)
    }
  }
}

// Прямой доступ к процессам
console.log(`ID текущего процесса: ${process.pid}`)
console.log(`Рабочая директория: ${process.cwd()}`)
console.log(`Время работы: ${process.uptime()} секунд`)

// Управление памятью
const memoryUsage = process.memoryUsage()
console.log(`Использование памяти RSS: ${memoryUsage.rss / 1024 / 1024} MB`)
console.log(`Heap total: ${memoryUsage.heapTotal / 1024 / 1024} MB`)
console.log(`Heap used: ${memoryUsage.heapUsed / 1024 / 1024} MB`)
```

## Общие черты

Несмотря на различия, браузерный JavaScript и Node.js имеют много общего:

1. **Язык**: оба используют JavaScript и поддерживают ECMAScript
2. **Асинхронность**: оба используют событийно-ориентированную модель с callback-функциями, промисами и async/await
3. **Однопоточность**: основной поток выполнения в обоих случаях один
4. **JSON**: работа с JSON встроена в обе среды
5. **Многие встроенные объекты**: Array, Object, String, Date, Math и другие работают одинаково

## Переносимость кода

Код, который работает с базовыми возможностями JavaScript (обработка данных, алгоритмы, бизнес-логика), часто может быть перенесен между браузером и Node.js без изменений. Для создания универсального кода используются:

```javascript
// Код, который работает и в браузере, и в Node.js
function isomorphicFetch(url, options = {}) {
  // Проверка окружения
  const isBrowser = typeof window !== "undefined" && typeof window.document !== "undefined"

  if (isBrowser) {
    // Браузерный код
    return fetch(url, options).then((response) => response.json())
  } else {
    // Node.js код
    const fetchModule = require("node-fetch")
    return fetchModule(url, options).then((response) => response.json())
  }
}

// Пример использования
isomorphicFetch("https://api.example.com/data")
  .then((data) => console.log("Данные:", data))
  .catch((error) => console.error("Ошибка:", error))
```

Для создания универсального кода также используются:

- Общие библиотеки (lodash, moment и т.д.)
- Изоморфные фреймворки (Next.js, Nuxt.js)
- Transpilers (Babel, TypeScript)
- Инструменты сборки (Webpack, Parcel, Rollup)

---

[[002 Node.js|Назад]]
