---
title: Как реализовать обработку ответа сервера в axios
draft: false
tags:
  - "#NodeJS"
  - "#axios"
  - "#HTTP"
  - "#REST"
  - "#асинхронность"
  - "#Promise"
info:
  - "[Документация Axios](https://axios-http.com/docs/intro)"
  - "[GitHub репозиторий Axios](https://github.com/axios/axios)"
  - "[Интерцепторы в Axios](https://axios-http.com/docs/interceptors)"
---

Axios — популярная HTTP-клиентская библиотека для Node.js и браузера, которая облегчает выполнение HTTP-запросов и обработку ответов. Ниже рассмотрены основные способы обработки ответов сервера в axios.

## Базовая обработка ответов

Основной способ обработки ответа сервера в axios — использование Promise API:

```javascript
const axios = require("axios")

axios
  .get("https://api.example.com/data")
  .then((response) => {
    // Обработка успешного ответа
    console.log("Статус:", response.status)
    console.log("Данные:", response.data)
  })
  .catch((error) => {
    // Обработка ошибки
    console.error("Ошибка запроса:", error.message)
  })
```

## Структура объекта ответа

Ответ сервера в axios представлен объектом со следующими свойствами:

- **`data`** — данные, полученные от сервера (преобразованные в зависимости от `responseType`)
- **`status`** — HTTP код состояния (например, 200, 404, 500)
- **`statusText`** — текстовое представление статуса HTTP
- **`headers`** — заголовки ответа
- **`config`** — конфигурация, использованная для запроса
- **`request`** — объект запроса

## Использование async/await

Более современный подход к обработке ответов — использование `async/await`:

```javascript
const axios = require("axios")

async function fetchData() {
  try {
    const response = await axios.get("https://api.example.com/data")
    console.log("Данные получены:", response.data)
    return response.data
  } catch (error) {
    console.error("Произошла ошибка:", error.message)
    throw error // Можно пробросить ошибку дальше
  }
}

// Использование функции
fetchData()
  .then((data) => console.log("Обработка данных:", data))
  .catch((err) => console.error("Ошибка обработана:", err))
```

## Обработка различных HTTP статусов

По умолчанию axios считает ошибкой любой ответ с кодом состояния вне диапазона 2xx:

```javascript
axios
  .get("https://api.example.com/data")
  .then((response) => {
    // Выполняется только для статусов 200-299
    console.log("Успешный ответ:", response.data)
  })
  .catch((error) => {
    if (error.response) {
      // Сервер вернул ответ со статусом вне диапазона 2xx
      console.error("Ошибка с ответом сервера:", error.response.status)
      console.error("Данные ошибки:", error.response.data)
    } else if (error.request) {
      // Запрос был сделан, но ответ не получен
      console.error("Нет ответа от сервера:", error.request)
    } else {
      // Произошла ошибка при настройке запроса
      console.error("Ошибка настройки запроса:", error.message)
    }
  })
```

## Интерцепторы для глобальной обработки ответов

Axios предоставляет мощный механизм интерцепторов, которые позволяют централизованно обрабатывать запросы и ответы:

```javascript
// Создаем новый экземпляр axios
const api = axios.create({
  baseURL: "https://api.example.com",
  timeout: 5000,
})

// Добавляем интерцептор ответов
api.interceptors.response.use(
  (response) => {
    // Обработка успешного ответа
    console.log(`Получен ответ со статусом: ${response.status}`)

    // Можно модифицировать ответ перед его дальнейшей обработкой
    if (response.data && response.data.results) {
      response.data = response.data.results
    }

    return response
  },
  (error) => {
    // Обработка ошибки
    if (error.response) {
      // Логируем информацию об ошибке
      console.error(
        `Ошибка ${error.response.status}: ${error.response.data.message || "Неизвестная ошибка"}`,
      )

      // Специфическая обработка определенных статусов
      if (error.response.status === 401) {
        // Например, перенаправление на страницу входа
        console.log("Требуется авторизация")
      }
    }

    // Отклоняем Promise с ошибкой для последующей обработки
    return Promise.reject(error)
  },
)

// Теперь все запросы через api будут проходить через интерцептор
api
  .get("/users")
  .then((response) => console.log(response.data))
  .catch((error) => console.error("Ошибка обработана в catch"))
```

## Обработка конкретных ошибок на основе статуса

Иногда нужно по-разному обрабатывать различные статусы ошибок:

```javascript
axios
  .get("/api/data")
  .then((response) => {
    // Обработка успешного ответа
  })
  .catch((error) => {
    switch (error.response?.status) {
      case 400:
        console.error("Неверный запрос:", error.response.data)
        break
      case 401:
        console.error("Требуется авторизация")
        // Перенаправление на страницу входа
        break
      case 403:
        console.error("Доступ запрещен")
        break
      case 404:
        console.error("Ресурс не найден")
        break
      case 500:
        console.error("Ошибка сервера")
        break
      default:
        console.error("Неизвестная ошибка:", error.message)
    }
  })
```

## Трансформация данных ответа

Axios позволяет автоматически трансформировать данные ответа до их передачи в обработчик:

```javascript
axios
  .get("/api/data", {
    transformResponse: [
      function (data) {
        // Преобразуем JSON-строку в объект
        let parsed
        try {
          parsed = JSON.parse(data)
        } catch (e) {
          return data
        }

        // Трансформируем данные
        if (parsed.items && Array.isArray(parsed.items)) {
          return parsed.items.map((item) => ({
            id: item.id,
            name: item.name.toUpperCase(), // Например, преобразуем имена в верхний регистр
            createdAt: new Date(item.created_at), // Преобразуем строку в объект Date
          }))
        }

        return parsed
      },
    ],
  })
  .then((response) => {
    // response.data уже содержит трансформированные данные
    console.log(response.data)
  })
```

## Обработка таймаутов

Важная часть обработки ответов — установка и обработка таймаутов:

```javascript
axios
  .get("/api/data", {
    timeout: 5000, // 5 секунд
  })
  .then((response) => {
    console.log("Данные получены вовремя")
  })
  .catch((error) => {
    if (error.code === "ECONNABORTED") {
      console.error("Запрос отменен из-за превышения времени ожидания")
      // Здесь можно выполнить повторный запрос или показать сообщение пользователю
    } else {
      console.error("Другая ошибка:", error.message)
    }
  })
```

## Заключение

Axios предоставляет множество способов для обработки ответов сервера:

1. **Базовая обработка** с использованием Promise API или async/await
2. **Обработка ошибок** различных типов и статусов
3. **Интерцепторы** для централизованной обработки всех ответов
4. **Трансформация данных** для автоматического преобразования ответов сервера

Выбор подхода зависит от сложности приложения и требований к обработке ответов.

---

[[002 Node.js|Назад]]
