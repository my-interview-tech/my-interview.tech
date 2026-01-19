---
title: Какие модули в Node.js используются для выполнения HTTP-запросов
draft: false
tags:
  - "#NodeJS"
  - "#HTTP"
  - "#запросы"
  - "#axios"
  - "#fetch"
  - "#клиент-сервер"
info:
  - "[Официальная документация Node.js по модулю http](https://nodejs.org/api/http.html)"
  - "[Официальная документация Node.js по модулю https](https://nodejs.org/api/https.html)"
  - "[Axios - популярная библиотека для HTTP-запросов](https://axios-http.com/docs/intro)"
  - "[Руководство по Node Fetch](https://github.com/node-fetch/node-fetch)"
---

# Модули для выполнения HTTP-запросов в Node.js

В Node.js существует несколько встроенных и внешних модулей для выполнения HTTP-запросов. Каждый из них имеет свои особенности, преимущества и сценарии использования.

## Встроенные модули Node.js

### 1. Модуль `http`

Базовый встроенный модуль, предоставляющий функциональность для выполнения HTTP-запросов и создания HTTP-серверов.

**Особенности:**

- Поддерживает только незащищенные HTTP-соединения
- Низкоуровневый API
- Требует ручной обработки потоков и буферизации данных
- Входит в стандартную библиотеку Node.js

**Пример использования:**

```javascript
const http = require("http")

const options = {
  hostname: "www.example.com",
  port: 80,
  path: "/",
  method: "GET",
  headers: {
    "User-Agent": "Node.js HTTP Client",
  },
}

const req = http.request(options, (res) => {
  console.log(`Статус код: ${res.statusCode}`)
  console.log(`Заголовки: ${JSON.stringify(res.headers)}`)

  let data = ""

  // Получение данных по частям
  res.on("data", (chunk) => {
    data += chunk
  })

  // Завершение ответа
  res.on("end", () => {
    console.log("Данные:", data)
  })
})

// Обработка ошибок
req.on("error", (error) => {
  console.error("Ошибка:", error)
})

// Завершение запроса
req.end()
```

### 2. Модуль `https`

Аналогичен модулю `http`, но с поддержкой защищенных соединений через SSL/TLS.

**Особенности:**

- Поддерживает защищенные HTTPS-соединения
- Аналогичный API с модулем `http`
- Имеет дополнительные опции для SSL/TLS

**Пример использования:**

```javascript
const https = require("https")

const options = {
  hostname: "api.github.com",
  port: 443,
  path: "/users/octocat",
  method: "GET",
  headers: {
    "User-Agent": "Node.js HTTPS Client",
  },
}

const req = https.request(options, (res) => {
  let data = ""

  res.on("data", (chunk) => {
    data += chunk
  })

  res.on("end", () => {
    console.log(JSON.parse(data))
  })
})

req.on("error", (error) => {
  console.error("Ошибка:", error)
})

req.end()
```

### 3. Модуль `http2`

Обеспечивает поддержку протокола HTTP/2, появился в Node.js 8.4.0.

**Особенности:**

- Полная поддержка протокола HTTP/2
- Улучшенная производительность благодаря мультиплексированию
- Более сложный API по сравнению с http/https

**Пример использования:**

```javascript
const http2 = require("http2")

const client = http2.connect("https://example.com")

const req = client.request({
  ":path": "/",
  ":method": "GET",
})

req.on("response", (headers) => {
  console.log("Статус:", headers[":status"])
})

let data = ""
req.on("data", (chunk) => {
  data += chunk
})

req.on("end", () => {
  console.log("Результат:", data)
  client.close()
})

req.end()
```

## Внешние библиотеки

### 1. Axios

Одна из самых популярных библиотек для HTTP-запросов в экосистеме Node.js и браузере.

**Особенности:**

- Основана на промисах
- Поддерживает как Node.js, так и браузеры
- Интуитивный API с множеством дополнительных функций
- Автоматическая трансформация JSON-данных
- Перехват запросов и ответов
- Отмена запросов

**Установка:**

```bash
npm install axios
```

**Пример использования:**

```javascript
const axios = require("axios")

// Простой GET-запрос
axios
  .get("https://api.example.com/data")
  .then((response) => {
    console.log("Данные:", response.data)
    console.log("Статус:", response.status)
    console.log("Заголовки:", response.headers)
  })
  .catch((error) => {
    if (error.response) {
      // Сервер вернул статус не 2xx
      console.error("Ошибка данных:", error.response.data)
      console.error("Статус:", error.response.status)
    } else if (error.request) {
      // Запрос был сделан, но ответ не получен
      console.error("Ошибка запроса:", error.request)
    } else {
      // Что-то пошло не так при настройке запроса
      console.error("Ошибка:", error.message)
    }
  })

// POST-запрос с данными
axios
  .post("https://api.example.com/users", {
    name: "Иван",
    email: "ivan@example.com",
  })
  .then((response) => {
    console.log("Создан пользователь:", response.data)
  })
  .catch((error) => {
    console.error("Ошибка:", error)
  })

// Настраиваемый экземпляр axios
const api = axios.create({
  baseURL: "https://api.example.com",
  timeout: 5000,
  headers: {
    Authorization: "Bearer token123",
    "Content-Type": "application/json",
  },
})

api
  .get("/profile")
  .then((response) => console.log(response.data))
  .catch((error) => console.error(error))
```

### 2. node-fetch

Версия Fetch API для Node.js, обеспечивающая единообразный интерфейс для запросов в браузере и Node.js.

**Особенности:**

- Реализация Fetch API, знакомого браузерным разработчикам
- Основана на промисах
- Легковесная альтернатива axios
- Близка к стандарту

**Установка:**

```bash
npm install node-fetch
```

**Пример использования:**

```javascript
const fetch = require("node-fetch")

// Простой GET-запрос
fetch("https://api.example.com/data")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }
    return response.json()
  })
  .then((data) => {
    console.log("Данные:", data)
  })
  .catch((error) => {
    console.error("Ошибка при получении данных:", error)
  })

// POST-запрос с JSON
fetch("https://api.example.com/users", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    name: "Иван",
    email: "ivan@example.com",
  }),
})
  .then((response) => response.json())
  .then((data) => console.log("Создан пользователь:", data))
  .catch((error) => console.error("Ошибка:", error))
```

> **Примечание**: В Node.js 18+ `fetch` доступен глобально без установки дополнительных пакетов.

### 3. got

Современная альтернатива request с лучшим API и поддержкой.

**Особенности:**

- Основан на промисах
- Автоматическое повторение запросов
- Поддержка перенаправлений
- Встроенная поддержка HTTP/2
- Кеширование и многое другое

**Установка:**

```bash
npm install got
```

**Пример использования:**

```javascript
const got = require("got")

// Простой GET-запрос
;(async () => {
  try {
    const response = await got("https://api.example.com/data")
    console.log("Тело ответа:", response.body)

    // Автоматический парсинг JSON
    const jsonResponse = await got("https://api.example.com/data").json()
    console.log("JSON-данные:", jsonResponse)
  } catch (error) {
    console.error("Ошибка:", error)
  }
})()

// POST-запрос
got
  .post("https://api.example.com/users", {
    json: {
      name: "Иван",
      email: "ivan@example.com",
    },
    responseType: "json",
  })
  .then((response) => {
    console.log("Создан пользователь:", response.body)
  })
  .catch((error) => {
    console.error("Ошибка:", error)
  })
```

### 4. superagent

Библиотека с упором на читаемость и гибкость.

**Особенности:**

- Цепочка методов для удобного построения запросов
- Поддержка промисов и традиционных колбэков
- Поддержка для загрузки файлов и форм
- Расширяемость с помощью плагинов

**Установка:**

```bash
npm install superagent
```

**Пример использования:**

```javascript
const superagent = require("superagent")

// GET-запрос с параметрами
superagent
  .get("https://api.example.com/search")
  .query({ q: "nodejs" })
  .set("Authorization", "Bearer token123")
  .end((err, res) => {
    if (err) {
      console.error("Ошибка:", err)
      return
    }
    console.log("Результаты поиска:", res.body)
  })

// POST-запрос с промисами
superagent
  .post("https://api.example.com/users")
  .send({ name: "Иван", email: "ivan@example.com" })
  .set("Content-Type", "application/json")
  .then((res) => {
    console.log("Создан пользователь:", res.body)
  })
  .catch((err) => {
    console.error("Ошибка:", err)
  })
```

## Сравнение модулей для HTTP-запросов

| Модуль     | Преимущества                                   | Недостатки                                  | Когда использовать                                                             |
| ---------- | ---------------------------------------------- | ------------------------------------------- | ------------------------------------------------------------------------------ |
| http/https | Встроенные модули, не требуют установки        | Низкоуровневый API, сложный в использовании | Базовые запросы, низкоуровневый контроль, минимальные зависимости              |
| axios      | Легкий в использовании, широкие возможности    | Дополнительная зависимость                  | Большинство проектов, особенно для взаимодействия с REST API                   |
| node-fetch | Стандартизированный Fetch API, как в браузере  | Меньше возможностей, чем у axios            | Для простых запросов или при желании использовать API, совместимый с браузером |
| got        | Богатый функционал, хорошая производительность | Специфический API                           | Сложные запросы с повторами, таймаутами, перенаправлениями                     |
| superagent | Гибкий и читаемый синтаксис                    | Более тяжелый, чем некоторые альтернативы   | Сложные запросы с цепочкой трансформаций                                       |

## Заключение

Node.js предлагает несколько способов выполнения HTTP-запросов:

1. **Встроенные модули** (`http`, `https`, `http2`) для базовых запросов и полного контроля
2. **Внешние библиотеки** для более удобного API:
   - `axios` — для большинства случаев
   - `node-fetch` — для совместимости с браузерным Fetch API
   - `got` — для продвинутых возможностей
   - `superagent` — для цепочки методов и гибкости

Выбор модуля зависит от конкретных потребностей проекта, требований к функциональности, размера пакета и личных предпочтений.

---

[[002 Node.js|Назад]]
