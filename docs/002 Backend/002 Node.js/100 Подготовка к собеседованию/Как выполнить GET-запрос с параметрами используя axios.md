---
title: Как выполнить GET-запрос с параметрами используя axios
draft: false
tags:
  - "#NodeJS"
  - "#axios"
  - "#HTTP"
  - "#API"
  - "#requests"
  - "#параметры_запроса"
info:
  - https://axios-http.com/docs/req_config
  - https://www.npmjs.com/package/axios
---

Для выполнения **GET-запроса** с параметрами с помощью библиотеки **Axios** в Node.js, можно передать параметры в объекте `params`. Axios автоматически преобразует объект параметров в строку запроса и добавит её к URL.

### Базовый пример

```javascript
const axios = require("axios")

const params = {
  userId: 123,
  search: "node.js",
}

axios
  .get("https://api.example.com/data", { params })
  .then((response) => {
    console.log(response.data)
  })
  .catch((error) => {
    console.error("Error:", error)
  })
```

### Объяснение

1. **URL**: `'https://api.example.com/data'` — это базовый URL.
2. **params**: `{ userId: 123, search: 'node.js' }` — это объект с параметрами запроса. Axios автоматически преобразует его в строку запроса, и результат будет таким:
   ```
   https://api.example.com/data?userId=123&search=node.js
   ```

### Альтернативный способ с async/await

```javascript
const axios = require("axios")

async function fetchData() {
  try {
    const response = await axios.get("https://api.example.com/data", {
      params: {
        userId: 123,
        search: "node.js",
      },
    })
    console.log(response.data)
  } catch (error) {
    console.error("Error:", error)
  }
}

fetchData()
```

### Использование параметров с массивами

Axios также поддерживает массивы и вложенные объекты в параметрах:

```javascript
const axios = require("axios")

axios
  .get("https://api.example.com/data", {
    params: {
      ids: [1, 2, 3], // будет преобразовано в ids=1&ids=2&ids=3 или в ids[]=1&ids[]=2&ids[]=3
      filters: {
        category: "nodejs",
        status: "active",
      },
    },
    // Можно настроить формат сериализации массива
    paramsSerializer: (params) => {
      // Ваша кастомная логика сериализации
      return someQueryStringLib.stringify(params)
    },
  })
  .then((response) => console.log(response.data))
  .catch((error) => console.error("Error:", error))
```

### Ручная вставка параметров в URL

Если вы предпочитаете не использовать объект `params`, можно вручную включить параметры в URL:

```javascript
axios
  .get("https://api.example.com/data?userId=123&search=node.js")
  .then((response) => {
    console.log(response.data)
  })
  .catch((error) => {
    console.error("Error:", error)
  })
```

Однако способ с объектом `params` предпочтительнее, так как он автоматически:

- Правильно кодирует специальные символы
- Управляет сложными параметрами
- Делает код более читаемым для сложных запросов
- Предотвращает потенциальные проблемы с безопасностью

### Настройка заголовков с параметрами

Иногда требуется добавить не только параметры, но и заголовки:

```javascript
axios
  .get("https://api.example.com/data", {
    params: {
      userId: 123,
      search: "node.js",
    },
    headers: {
      Authorization: "Bearer YOUR_TOKEN",
      Accept: "application/json",
    },
  })
  .then((response) => console.log(response.data))
  .catch((error) => console.error("Error:", error))
```

### Пример с динамическими параметрами

```javascript
function getProducts(category, minPrice, maxPrice, sort) {
  return axios.get("https://api.example.com/products", {
    params: {
      ...(category && { category }), // добавляем параметр только если он определен
      ...(minPrice !== undefined && { minPrice }),
      ...(maxPrice !== undefined && { maxPrice }),
      ...(sort && { sort }),
    },
  })
}

// Использование
getProducts("electronics", 100, 500, "price_asc")
  .then((response) => console.log(response.data))
  .catch((error) => console.error("Error:", error))
```

### Преимущества Axios перед встроенным модулем https в Node.js

1. **Промисы и поддержка async/await**
2. **Автоматическая обработка JSON**
3. **Простая обработка параметров запроса**
4. **Интерцепторы для запросов и ответов**
5. **Автоматическое преобразование данных**
6. **Настройка таймаутов и отмена запросов**
7. **Согласованное API для браузера и Node.js**

---

[[002 Node.js|Назад]]
