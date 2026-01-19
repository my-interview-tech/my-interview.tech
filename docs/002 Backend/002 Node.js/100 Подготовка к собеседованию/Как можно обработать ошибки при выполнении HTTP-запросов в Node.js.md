---
title: Как можно обработать ошибки при выполнении HTTP-запросов в Node.js
draft: false
tags:
  - "#NodeJS"
  - "#HTTP"
  - "#обработка-ошибок"
  - "#запросы"
  - "#axios"
  - "#async-await"
info:
  - "[Документация Node.js по HTTP](https://nodejs.org/api/http.html)"
  - "[Документация по библиотеке Axios](https://axios-http.com/docs/intro)"
  - "[Руководство по обработке ошибок в Node.js](https://nodejs.org/en/learn/error-handling/error-handling-best-practices)"
---

При выполнении HTTP-запросов в Node.js важно правильно обрабатывать ошибки, которые могут возникать на разных уровнях: при установке соединения, при передаче данных, или при получении некорректных статус-кодов от сервера.

## 1. Обработка ошибок в нативных модулях http/https

### Базовая обработка ошибок с модулем https

```javascript
const https = require("https")

const options = {
  hostname: "api.example.com",
  port: 443,
  path: "/data",
  method: "GET",
}

const req = https.request(options, (res) => {
  let data = ""

  // Обработка поступающих данных
  res.on("data", (chunk) => {
    data += chunk
  })

  // Обработка завершения ответа
  res.on("end", () => {
    // Проверка статус-кода ответа
    if (res.statusCode >= 400) {
      console.error(`Ошибка с HTTP-статусом ${res.statusCode}: ${data}`)
      return
    }

    try {
      const parsedData = JSON.parse(data)
      console.log("Полученные данные:", parsedData)
    } catch (err) {
      console.error("Ошибка при парсинге JSON:", err.message)
    }
  })

  // Обработка ошибок на уровне ответа
  res.on("error", (err) => {
    console.error("Ошибка при получении ответа:", err.message)
  })
})

// Обработка ошибок на уровне запроса
req.on("error", (err) => {
  console.error("Ошибка при выполнении запроса:", err.message)

  // Дополнительная обработка в зависимости от типа ошибки
  if (err.code === "ECONNREFUSED") {
    console.error("Сервер недоступен или отказывает в соединении")
  } else if (err.code === "ENOTFOUND") {
    console.error("Доменное имя не найдено")
  } else if (err.code === "ETIMEDOUT") {
    console.error("Превышен таймаут соединения")
  }
})

// Обработка таймаута соединения
req.setTimeout(10000, () => {
  req.destroy()
  console.error("Запрос отменен из-за превышения таймаута")
})

// Завершение отправки запроса
req.end()
```

### Ключевые моменты обработки ошибок в нативных модулях

1. **Ошибки соединения**: Обрабатываются через событие `error` на объекте запроса.
2. **Ошибки ответа**: Обрабатываются через событие `error` на объекте ответа и проверку статус-кодов.
3. **Таймауты**: Обрабатываются через метод `setTimeout` на объекте запроса.
4. **Ошибки парсинга**: Обрабатываются через блоки try-catch при парсинге данных.

## 2. Обработка ошибок с использованием axios

Библиотека axios упрощает обработку ошибок при выполнении HTTP-запросов, предоставляя удобный Promise-интерфейс.

### Подход с использованием .then/.catch

```javascript
const axios = require("axios")

axios
  .get("https://api.example.com/data")
  .then((response) => {
    console.log("Полученные данные:", response.data)
  })
  .catch((error) => {
    if (error.response) {
      // Сервер ответил с кодом, отличным от 2xx
      console.error(`Ошибка с кодом ${error.response.status}:`, error.response.data)
    } else if (error.request) {
      // Запрос был отправлен, но ответ не был получен
      console.error("Не получен ответ от сервера:", error.request)
    } else {
      // Произошла ошибка при настройке запроса
      console.error("Ошибка при настройке запроса:", error.message)
    }

    // Дополнительная информация об ошибке
    if (error.code === "ECONNABORTED") {
      console.error("Запрос отменен из-за превышения таймаута")
    }

    if (error.config) {
      console.error("Конфигурация запроса, вызвавшего ошибку:", error.config)
    }
  })
```

### Подход с использованием async/await

```javascript
const axios = require("axios")

async function fetchData() {
  try {
    const response = await axios.get("https://api.example.com/data", {
      timeout: 5000, // Таймаут 5 секунд
      headers: {
        Accept: "application/json",
      },
    })

    console.log("Полученные данные:", response.data)
    return response.data
  } catch (error) {
    handleAxiosError(error)
    throw error // Повторно выбрасываем ошибку для обработки на верхнем уровне
  }
}

// Выделение обработки ошибок в отдельную функцию
function handleAxiosError(error) {
  if (error.response) {
    // Категоризация ошибок по статус-кодам
    switch (error.response.status) {
      case 400:
        console.error("Ошибка в запросе:", error.response.data)
        break
      case 401:
      case 403:
        console.error("Ошибка авторизации:", error.response.data)
        break
      case 404:
        console.error("Ресурс не найден:", error.response.config.url)
        break
      case 500:
        console.error("Внутренняя ошибка сервера")
        break
      default:
        console.error(`HTTP ошибка ${error.response.status}:`, error.response.data)
    }
  } else if (error.request) {
    console.error("Не получен ответ от сервера")
  } else {
    console.error("Ошибка при настройке запроса:", error.message)
  }
}

// Использование функции
fetchData().catch((err) => {
  console.error("Ошибка в главном потоке:", err.message)
})
```

## 3. Централизованная обработка ошибок в приложении

Для обеспечения последовательной обработки ошибок HTTP в большом приложении, полезно реализовать централизованную систему:

```javascript
const axios = require("axios")

// Создание экземпляра axios с настроенными параметрами
const api = axios.create({
  baseURL: "https://api.example.com",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
})

// Перехватчик ответов для единообразной обработки ошибок
api.interceptors.response.use(
  (response) => response, // Успешный ответ проходит без изменений
  (error) => {
    // Логирование ошибки
    logHttpError(error)

    // Автоматические повторные попытки для временных ошибок
    if (isRetryableError(error) && error.config && error.config.__retryCount < 3) {
      error.config.__retryCount = error.config.__retryCount || 0
      error.config.__retryCount += 1

      // Экспоненциальная задержка между попытками
      const delay = error.config.__retryCount * 1000
      return new Promise((resolve) => {
        setTimeout(() => resolve(api(error.config)), delay)
      })
    }

    // Преобразование в стандартизированный формат ошибки для приложения
    return Promise.reject(normalizeError(error))
  },
)

// Проверка, подходит ли ошибка для повторной попытки
function isRetryableError(error) {
  return (
    error.code === "ECONNRESET" ||
    error.code === "ETIMEDOUT" ||
    (error.response && (error.response.status === 503 || error.response.status === 429))
  )
}

// Логирование ошибок HTTP
function logHttpError(error) {
  const logData = {
    timestamp: new Date().toISOString(),
    method: error.config?.method?.toUpperCase(),
    url: error.config?.url,
    status: error.response?.status,
    data: error.response?.data,
    message: error.message,
  }

  console.error("HTTP Error:", JSON.stringify(logData))

  // Тут может быть код для записи в файл логов или отправки в сервис мониторинга
}

// Нормализация ошибок для единого формата в приложении
function normalizeError(error) {
  const normalized = new Error(error.message || "HTTP Error")
  normalized.isHttpError = true
  normalized.status = error.response?.status || 0
  normalized.data = error.response?.data
  normalized.originalError = error
  return normalized
}

// Пример использования
async function fetchUsers() {
  try {
    return await api.get("/users")
  } catch (error) {
    // Обработка уже нормализованной ошибки
    if (error.isHttpError && error.status === 401) {
      // Возможно, перенаправление на страницу авторизации
      console.error("Требуется авторизация")
    }
    throw error
  }
}
```

## 4. Рекомендации по обработке ошибок HTTP

1. **Дифференцируйте типы ошибок**:

   - Ошибки сети (не удалось подключиться)
   - Ошибки HTTP (некорректный статус-код)
   - Ошибки формата данных (невалидный JSON)

2. **Обрабатывайте таймауты**:

   - Устанавливайте разумные значения таймаутов
   - Имейте стратегию для повторных попыток

3. **Используйте информативные сообщения об ошибках**:

   - Включайте URL, метод, параметры запроса
   - Логируйте данные ответа, если они доступны

4. **Реализуйте автоматические повторные попытки**:

   - Для временных ошибок (503, 429)
   - С экспоненциальной задержкой

5. **Логируйте ошибки для анализа**:
   - Сохраняйте контекст запроса
   - Отслеживайте частоту и паттерны ошибок

---

[[002 Node.js|Назад]]
