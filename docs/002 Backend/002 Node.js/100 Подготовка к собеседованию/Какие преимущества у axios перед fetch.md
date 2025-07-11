---
title: Какие преимущества у axios перед fetch
draft: false
tags:
  - "#NodeJS"
  - "#axios"
  - "#fetch"
  - "#HTTP"
  - "#API"
  - "#запросы"
info:
  - "[Документация Axios](https://axios-http.com/docs/intro)"
  - "[MDN Fetch API](https://developer.mozilla.org/ru/docs/Web/API/Fetch_API)"
  - "[Сравнение Axios и Fetch](https://blog.logrocket.com/axios-vs-fetch-best-http-requests/)"
---

# Преимущества Axios перед Fetch API

Axios и Fetch API — это два популярных способа выполнения HTTP-запросов в JavaScript/Node.js. Хотя Fetch является встроенным в браузеры, Axios предлагает ряд преимуществ, которые делают его популярным выбором для многих разработчиков.

## 1. Автоматическая обработка JSON

### Axios

Axios автоматически преобразует ответы в формат JSON без необходимости вызова дополнительных методов.

```javascript
// Axios
axios.get("https://api.example.com/data").then((response) => {
  // response.data уже содержит распарсенный JSON
  console.log(response.data)
})
```

### Fetch

Fetch требует ручного преобразования ответа в JSON с помощью метода `.json()`.

```javascript
// Fetch
fetch("https://api.example.com/data")
  .then((response) => response.json()) // Дополнительный шаг
  .then((data) => {
    console.log(data)
  })
```

## 2. Обработка ошибок

### Axios

Axios автоматически отклоняет промис при получении ответа с кодом ошибки (4xx, 5xx), что упрощает обработку ошибок.

```javascript
// Axios
axios
  .get("https://api.example.com/error")
  .then((response) => {
    console.log("Успешный ответ:", response.data)
  })
  .catch((error) => {
    // Перехватывает ошибки сети и ответы с HTTP-статусами ошибок
    if (error.response) {
      // Сервер ответил со статусом ошибки
      console.error("Статус ошибки:", error.response.status)
      console.error("Данные ошибки:", error.response.data)
    } else if (error.request) {
      // Запрос был отправлен, но ответ не получен
      console.error("Ошибка запроса:", error.request)
    } else {
      // Что-то произошло при настройке запроса
      console.error("Ошибка:", error.message)
    }
  })
```

### Fetch

Fetch не отклоняет промис при получении HTTP-ошибок, что требует дополнительной проверки статуса ответа.

```javascript
// Fetch
fetch("https://api.example.com/error")
  .then((response) => {
    // Проверка статуса ответа вручную
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }
    return response.json()
  })
  .then((data) => {
    console.log("Успешный ответ:", data)
  })
  .catch((error) => {
    // Перехватывает только ошибки сети или явно выброшенные ошибки
    console.error("Ошибка:", error)
  })
```

## 3. Таймауты и отмена запросов

### Axios

Axios имеет встроенную поддержку для таймаутов и отмены запросов.

```javascript
// Установка таймаута
axios
  .get("https://api.example.com/data", {
    timeout: 5000, // 5 секунд
  })
  .catch((error) => {
    if (axios.isCancel(error)) {
      console.log("Запрос был отменен:", error.message)
    } else if (error.code === "ECONNABORTED") {
      console.log("Запрос превысил таймаут")
    }
  })

// Отмена запроса
const source = axios.CancelToken.source()

axios.get("https://api.example.com/data", {
  cancelToken: source.token,
})

// Отмена запроса
source.cancel("Запрос отменен пользователем")
```

### Fetch

В Fetch таймауты реализуются через `setTimeout` и `Promise.race()`, а отмена запросов через `AbortController` (новее и не поддерживается всеми браузерами).

```javascript
// Установка таймаута
const fetchWithTimeout = (url, options, timeout = 5000) => {
  return Promise.race([
    fetch(url, options),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Запрос превысил таймаут")), timeout),
    ),
  ])
}

// Отмена запроса
const controller = new AbortController()
const signal = controller.signal

fetch("https://api.example.com/data", { signal })
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => {
    if (error.name === "AbortError") {
      console.log("Запрос был отменен")
    }
  })

// Отмена запроса
controller.abort()
```

## 4. Встроенный перехват запросов и ответов

### Axios

Axios предлагает интерцепторы для запросов и ответов, что позволяет обрабатывать их до отправки или получения.

```javascript
// Интерцептор запросов
axios.interceptors.request.use(
  (config) => {
    // Добавление заголовка авторизации ко всем запросам
    config.headers.Authorization = `Bearer ${getToken()}`
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Интерцептор ответов
axios.interceptors.response.use(
  (response) => {
    // Логирование всех успешных ответов
    console.log(`Успешный ответ от ${response.config.url}`)
    return response
  },
  (error) => {
    // Обработка всех ошибок ответов
    if (error.response && error.response.status === 401) {
      // Обновление токена или перенаправление на страницу логина
      refreshToken()
    }
    return Promise.reject(error)
  },
)
```

### Fetch

Fetch не имеет встроенной системы перехвата. Для аналогичных возможностей требуется создание обертки или использование внешних библиотек.

```javascript
// Создание обертки для fetch с возможностями перехвата
const fetchWithInterceptors = async (url, options = {}) => {
  // Имитация интерцептора запроса
  const modifiedOptions = {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${getToken()}`,
    },
  }

  try {
    const response = await fetch(url, modifiedOptions)

    // Имитация интерцептора ответа
    if (response.status === 401) {
      await refreshToken()
      return fetchWithInterceptors(url, options) // Повторный запрос с новым токеном
    }

    return response
  } catch (error) {
    // Обработка ошибок
    console.error("Ошибка сети:", error)
    throw error
  }
}
```

## 5. Кросс-браузерная и Node.js совместимость

### Axios

Axios обеспечивает совместимость между браузерами и Node.js средами из коробки. Одинаковый API может использоваться как в браузере, так и на сервере.

```javascript
// Одинаковый код работает и в браузере, и в Node.js
const axios = require("axios") // или import axios from 'axios';

axios.get("https://api.example.com/data").then((response) => console.log(response.data))
```

### Fetch

Fetch встроен в современные браузеры, но для Node.js требуется полифил (например, node-fetch) или использование глобального объекта, предоставляемого некоторыми версиями Node.js.

```javascript
// В браузере
fetch("https://api.example.com/data")
  .then((response) => response.json())
  .then((data) => console.log(data))

// В Node.js (требуется полифил)
const fetch = require("node-fetch")
// Или в Node.js 18+ (экспериментальная функция)
// import fetch from 'node:fetch';

fetch("https://api.example.com/data")
  .then((response) => response.json())
  .then((data) => console.log(data))
```

## 6. Расширенные функции по умолчанию

### Axios

- Автоматическая трансформация запросов и ответов
- Поддержка загрузки файлов и мониторинг прогресса
- Защита от XSRF (Cross-Site Request Forgery)

```javascript
// Загрузка файла и отслеживание прогресса
const formData = new FormData()
formData.append("file", fileInput.files[0])

axios.post("https://api.example.com/upload", formData, {
  onUploadProgress: (progressEvent) => {
    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
    console.log(`Загружено ${percentCompleted}%`)
  },
})
```

### Fetch

Базовая функциональность, которую необходимо дополнять вручную для более сложных сценариев.

## 7. Создание экземпляров с настраиваемыми конфигурациями

### Axios

Axios позволяет создавать новые экземпляры с собственными конфигурациями, что удобно для работы с разными API.

```javascript
// Создание экземпляра для API пользователей
const userAPI = axios.create({
  baseURL: "https://api.example.com/users",
  timeout: 3000,
  headers: { "X-Custom-Header": "user-api" },
})

// Создание экземпляра для API продуктов
const productAPI = axios.create({
  baseURL: "https://api.example.com/products",
  timeout: 5000,
  headers: { "X-Custom-Header": "product-api" },
})

// Использование экземпляров
userAPI.get("/profile/1")
productAPI.get("/categories")
```

### Fetch

Fetch не имеет встроенной поддержки для создания конфигурируемых экземпляров. Требуется написание собственных оберток для аналогичной функциональности.

## Заключение

Axios предлагает ряд преимуществ по сравнению с Fetch API:

1. Автоматическая трансформация JSON
2. Улучшенная обработка ошибок
3. Встроенная поддержка таймаутов и отмены запросов
4. Система интерцепторов для запросов и ответов
5. Единый API для браузеров и Node.js
6. Расширенные функции по умолчанию
7. Возможность создания настраиваемых экземпляров

Однако, выбор между Axios и Fetch зависит от конкретных требований проекта:

- **Выбирайте Axios**, если нужны расширенные функции, удобные интерцепторы и не хотите писать обертки.
- **Выбирайте Fetch**, если хотите минимизировать зависимости, используете только современные браузеры, или вам не нужны дополнительные функции Axios.

В Node.js, где Fetch не является встроенным (до Node.js 18), Axios часто предпочтительнее благодаря его стабильности и функциональности.

---

[[002 Node.js|Назад]]
