---
title: Как выполнить HTTP GET-запрос в Node.js с использованием встроенного модуля https
draft: false
tags:
  - "#NodeJS"
  - "#HTTPS"
  - "#HTTP"
  - "#requests"
  - "#networking"
info:
  - https://nodejs.org/api/https.html
  - https://nodejs.org/api/http.html#httpgetoptions-callback
---

В Node.js можно выполнить HTTP GET-запрос с помощью встроенного модуля `https`. Метод `https.get()` автоматически отправляет GET-запрос и возвращает объект ответа. Это базовый подход, не требующий установки сторонних библиотек.

### Базовый пример GET-запроса

```javascript
const https = require("https")

const url = "https://www.example.com" // Укажите нужный URL

https
  .get(url, (res) => {
    let data = ""

    // Чтение данных по мере поступления
    res.on("data", (chunk) => {
      data += chunk
    })

    // Когда все данные получены
    res.on("end", () => {
      console.log("Response Body:", data) // Выводим тело ответа
    })
  })
  .on("error", (e) => {
    console.error(`Ошибка при запросе: ${e.message}`) // Обработка ошибок
  })
```

### Объяснение кода

1. **Импорт модуля**: `const https = require('https')` — подключаем встроенный модуль HTTPS.
2. **Отправка запроса**: `https.get(url, callback)` — отправляем GET-запрос по указанному URL.
3. **Обработка ответа**:
   - Используем событие `data` для получения фрагментов данных
   - Используем событие `end` для обработки всех данных после завершения запроса
4. **Обработка ошибок**: Через обработчик события `error` отлавливаем возможные сетевые ошибки.

### Расширенный пример с обработкой JSON

```javascript
const https = require("https")

const url = "https://api.example.com/data"

https
  .get(url, (res) => {
    const statusCode = res.statusCode
    const contentType = res.headers["content-type"]

    // Проверка статуса ответа
    if (statusCode !== 200) {
      console.error(`Ошибка запроса. Статус: ${statusCode}`)
      res.resume() // Потребляем ответ, чтобы освободить память
      return
    }

    // Проверка типа контента
    if (!/^application\/json/.test(contentType)) {
      console.error(`Неожиданный тип контента: ${contentType}`)
      res.resume()
      return
    }

    let rawData = ""

    res.on("data", (chunk) => {
      rawData += chunk
    })

    res.on("end", () => {
      try {
        const parsedData = JSON.parse(rawData)
        console.log("Полученные данные:", parsedData)
      } catch (e) {
        console.error(`Ошибка парсинга JSON: ${e.message}`)
      }
    })
  })
  .on("error", (e) => {
    console.error(`Ошибка соединения: ${e.message}`)
  })
```

### Пример с дополнительными параметрами

```javascript
const https = require("https")
const url = require("url")

// Полная конфигурация запроса
const options = {
  hostname: "api.example.com",
  port: 443,
  path: "/data?param1=value1&param2=value2",
  method: "GET",
  headers: {
    Authorization: "Bearer YOUR_TOKEN",
    Accept: "application/json",
  },
  timeout: 5000, // Таймаут в миллисекундах
}

const req = https.request(options, (res) => {
  let data = ""

  res.on("data", (chunk) => {
    data += chunk
  })

  res.on("end", () => {
    console.log("Статус ответа:", res.statusCode)
    console.log("Заголовки ответа:", res.headers)

    try {
      if (res.headers["content-type"].includes("application/json")) {
        const parsedData = JSON.parse(data)
        console.log("Данные:", parsedData)
      } else {
        console.log("Текстовые данные:", data)
      }
    } catch (e) {
      console.error("Ошибка обработки ответа:", e.message)
    }
  })
})

req.on("timeout", () => {
  console.error("Запрос превысил время ожидания")
  req.destroy()
})

req.on("error", (e) => {
  console.error("Ошибка запроса:", e.message)
})

// Для методов, отличных от GET, необходимо явно завершить запрос
req.end()
```

### Использование с Promise для современного асинхронного стиля

```javascript
function httpsGet(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        const { statusCode } = res

        if (statusCode !== 200) {
          res.resume()
          reject(new Error(`Запрос не удался, статус: ${statusCode}`))
          return
        }

        let data = ""
        res.on("data", (chunk) => {
          data += chunk
        })
        res.on("end", () => resolve(data))
      })
      .on("error", reject)
  })
}

// Использование
async function fetchData() {
  try {
    const data = await httpsGet("https://api.example.com/data")
    console.log("Полученные данные:", data)
  } catch (error) {
    console.error("Ошибка при запросе:", error.message)
  }
}

fetchData()
```

---

[[002 Node.js|Назад]]
