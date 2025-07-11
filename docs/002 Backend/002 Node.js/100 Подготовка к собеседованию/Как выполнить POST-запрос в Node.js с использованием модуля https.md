---
title: Как выполнить POST-запрос в Node.js с использованием модуля https
draft: false
tags:
  - "#NodeJS"
  - "#HTTPS"
  - "#HTTP"
  - "#requests"
  - "#REST"
  - "#POST"
info:
  - https://nodejs.org/api/https.html#httpsrequestoptions-callback
  - https://nodejs.org/api/http.html#httprequestoptions-callback
---

Для выполнения **POST-запроса** в Node.js с использованием встроенного модуля `https` необходимо использовать метод `https.request()`. В отличие от `https.get()`, этот метод позволяет указать метод запроса и отправить данные в теле.

## Базовый пример POST-запроса

```javascript
const https = require("https")

// Данные для отправки в теле запроса
const data = JSON.stringify({
  name: "John Doe",
  age: 30,
})

// Настройка параметров запроса
const options = {
  hostname: "www.example.com", // Укажите нужный хост
  port: 443, // HTTPS использует порт 443
  path: "/api", // Укажите путь на сервере
  method: "POST", // Указываем, что это POST-запрос
  headers: {
    "Content-Type": "application/json", // Указываем тип содержимого
    "Content-Length": data.length, // Длина тела запроса
  },
}

// Создаем и отправляем запрос
const req = https.request(options, (res) => {
  let responseData = ""

  // Получение данных ответа
  res.on("data", (chunk) => {
    responseData += chunk
  })

  res.on("end", () => {
    console.log("Статус ответа:", res.statusCode)
    console.log("Заголовки ответа:", res.headers)
    console.log("Тело ответа:", responseData)

    try {
      // Если ответ в формате JSON, парсим его
      if (res.headers["content-type"]?.includes("application/json")) {
        const parsedData = JSON.parse(responseData)
        console.log("Данные ответа:", parsedData)
      }
    } catch (e) {
      console.error("Ошибка парсинга JSON:", e.message)
    }
  })
})

// Обработка возможных ошибок
req.on("error", (e) => {
  console.error("Ошибка при запросе:", e.message)
})

// Записываем данные в тело запроса
req.write(data)

// Завершаем запрос
req.end()
```

## Объяснение кода

1. **Подготовка данных**: Создаем объект `data`, который будет отправлен в теле запроса, и преобразуем его в строку JSON с помощью `JSON.stringify()`.
2. **Конфигурация запроса**: В объекте `options` указываем параметры запроса:

   - `hostname`: домен или IP-адрес сервера
   - `port`: используемый порт (443 для HTTPS)
   - `path`: путь к ресурсу на сервере
   - `method`: указываем метод запроса, в данном случае `POST`
   - `headers`: заголовки запроса, включая тип контента и его длину

3. **Отправка данных**: Используем `req.write(data)` для записи данных в тело запроса.

4. **Обработка ответа**: Обрабатываем события `data` для сбора ответа, и `end` когда весь ответ получен.

5. **Обработка ошибок**: Через событие `error` обрабатываем возможные ошибки запроса.

6. **Завершение запроса**: Вызываем `req.end()` для завершения запроса (обязательно!).

## POST-запрос с Promise API

Для удобства работы можно обернуть запрос в Promise:

```javascript
function httpsPost(hostname, path, data) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify(data)

    const options = {
      hostname,
      port: 443,
      path,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(postData),
      },
    }

    const req = https.request(options, (res) => {
      let responseData = ""

      res.on("data", (chunk) => {
        responseData += chunk
      })

      res.on("end", () => {
        try {
          if (res.statusCode >= 400) {
            reject(new Error(`HTTP Error: ${res.statusCode} ${responseData}`))
          } else {
            resolve({
              statusCode: res.statusCode,
              headers: res.headers,
              body: responseData,
              json: res.headers["content-type"]?.includes("application/json")
                ? JSON.parse(responseData)
                : null,
            })
          }
        } catch (e) {
          reject(e)
        }
      })
    })

    req.on("error", reject)
    req.write(postData)
    req.end()
  })
}

// Использование с async/await
async function createUser() {
  try {
    const userData = { name: "John", email: "john@example.com" }
    const response = await httpsPost("api.example.com", "/users", userData)
    console.log("Пользователь создан:", response.json)
  } catch (error) {
    console.error("Ошибка при создании пользователя:", error.message)
  }
}

createUser()
```

## POST-запрос с отправкой form-data

Для отправки данных формы (например, при загрузке файлов):

```javascript
const https = require("https")
const querystring = require("querystring")

// Данные формы
const formData = querystring.stringify({
  username: "john_doe",
  email: "john@example.com",
  message: "Hello, world!",
})

const options = {
  hostname: "www.example.com",
  port: 443,
  path: "/submit-form",
  method: "POST",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    "Content-Length": Buffer.byteLength(formData),
  },
}

const req = https.request(options, (res) => {
  let data = ""

  res.on("data", (chunk) => {
    data += chunk
  })

  res.on("end", () => {
    console.log("Форма отправлена. Ответ:", data)
  })
})

req.on("error", (e) => {
  console.error("Ошибка при отправке формы:", e.message)
})

// Отправляем данные формы
req.write(formData)
req.end()
```

## Расширенный пример с таймаутом и заголовками авторизации

```javascript
const https = require("https")

function postWithTimeout(options, data, timeoutMs = 5000) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify(data)

    const requestOptions = {
      ...options,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(postData),
        ...options.headers,
      },
    }

    const req = https.request(requestOptions, (res) => {
      let responseData = ""

      res.on("data", (chunk) => {
        responseData += chunk
      })

      res.on("end", () => {
        clearTimeout(timeoutId)
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          data: responseData,
        })
      })
    })

    // Устанавливаем таймаут
    const timeoutId = setTimeout(() => {
      req.destroy()
      reject(new Error(`Request timed out after ${timeoutMs}ms`))
    }, timeoutMs)

    req.on("error", (err) => {
      clearTimeout(timeoutId)
      reject(err)
    })

    req.write(postData)
    req.end()
  })
}

// Использование
async function authenticatedPost() {
  try {
    const response = await postWithTimeout(
      {
        hostname: "api.example.com",
        path: "/secure-endpoint",
        headers: {
          Authorization: "Bearer YOUR_ACCESS_TOKEN",
        },
      },
      { message: "Защищенные данные" },
      3000, // Таймаут в 3 секунды
    )

    console.log(`Ответ (${response.statusCode}):`, response.data)
  } catch (error) {
    console.error("Ошибка при запросе:", error.message)
  }
}

authenticatedPost()
```

---

[[002 Node.js|Назад]]
