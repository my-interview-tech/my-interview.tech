---
title: Что такое модуль querystring в Node.js и как его использовать
draft: false
tags:
  - "#NodeJS"
  - "#querystring"
  - "#URL"
  - "#HTTP"
  - "#веб-разработка"
info:
  - "[Документация Node.js - Query String](https://nodejs.org/api/querystring.html)"
  - "[Замена модуля querystring в новых версиях Node.js](https://nodejs.org/api/url.html#urlsearchparams)"
---

![[node-querystring.png|600]]

## Что такое модуль querystring в Node.js

`querystring` - это встроенный модуль Node.js, который предоставляет утилиты для парсинга и форматирования строк запросов URL. Он позволяет преобразовывать строки вида `name=value&name2=value2` в JavaScript-объекты и обратно, что очень полезно при работе с URL-параметрами в HTTP-запросах.

> ⚠️ Примечание: В новых версиях Node.js модуль `querystring` считается устаревшим, и рекомендуется использовать класс `URLSearchParams` из модуля `url`.

## Основные функции модуля querystring

### 1. Парсинг строки запроса (parse)

```javascript
const querystring = require("querystring")

// Преобразование строки запроса в объект
const parsedObject = querystring.parse("foo=bar&baz=qux&baz=quux")
console.log(parsedObject)
// { foo: 'bar', baz: ['qux', 'quux'] }
```

Обратите внимание, что одинаковые параметры автоматически преобразуются в массивы.

### 2. Формирование строки запроса (stringify)

```javascript
const querystring = require("querystring")

// Преобразование объекта в строку запроса
const queryString = querystring.stringify({
  foo: "bar",
  baz: ["qux", "quux"],
})
console.log(queryString)
// 'foo=bar&baz=qux&baz=quux'
```

### 3. Экранирование символов (escape/unescape)

```javascript
const querystring = require("querystring")

// Экранирование специальных символов для URL
const escapedValue = querystring.escape("привет мир")
console.log(escapedValue)
// '%D0%BF%D1%80%D0%B8%D0%B2%D0%B5%D1%82%20%D0%BC%D0%B8%D1%80'

// Декодирование экранированных символов
const unescapedValue = querystring.unescape(escapedValue)
console.log(unescapedValue)
// 'привет мир'
```

## Настройка разделителей и кодировки

При парсинге и форматировании можно указать свои разделители и кодировку:

```javascript
const querystring = require("querystring")

// Настройка разделителей
const customOptions = {
  delimiter: ";", // разделитель параметров (по умолчанию '&')
  equals: ":", // разделитель имени и значения (по умолчанию '=')
  maxKeys: 2, // максимальное количество ключей (по умолчанию 1000)
}

// Парсинг с пользовательскими разделителями
const parsedCustom = querystring.parse("foo:bar;baz:qux", ";", ":")
console.log(parsedCustom)
// { foo: 'bar', baz: 'qux' }

// То же самое, но с объектом настроек
const parsedWithOptions = querystring.parse("foo:bar;baz:qux", customOptions)
console.log(parsedWithOptions)
// { foo: 'bar', baz: 'qux' }

// Формирование строки с пользовательскими разделителями
const customString = querystring.stringify({ foo: "bar", baz: "qux" }, ";", ":")
console.log(customString)
// 'foo:bar;baz:qux'
```

## Практические примеры использования

### Обработка query-параметров в URL

```javascript
const http = require("http")
const url = require("url")
const querystring = require("querystring")

const server = http.createServer((req, res) => {
  // Получаем строку запроса из URL
  const parsedUrl = url.parse(req.url)
  const query = querystring.parse(parsedUrl.query)

  res.setHeader("Content-Type", "application/json")
  res.end(
    JSON.stringify({
      message: "Параметры запроса",
      query: query,
    }),
  )
})

server.listen(3000, () => {
  console.log("Сервер запущен на порту 3000")
})

// При запросе http://localhost:3000/?name=John&age=30 вернет:
// {"message":"Параметры запроса","query":{"name":"John","age":"30"}}
```

### Создание формы с query-параметрами

```javascript
const querystring = require("querystring")

function buildSearchUrl(baseUrl, params) {
  const queryParams = querystring.stringify(params)
  return `${baseUrl}?${queryParams}`
}

const searchUrl = buildSearchUrl("https://example.com/search", {
  q: "node.js",
  category: "programming",
  sort: "date",
  page: 1,
})

console.log(searchUrl)
// https://example.com/search?q=node.js&category=programming&sort=date&page=1
```

## Современный подход с использованием URLSearchParams

В современных версиях Node.js рекомендуется использовать класс `URLSearchParams` вместо модуля `querystring`:

```javascript
// Создание объекта URLSearchParams
const params = new URLSearchParams()
params.append("foo", "bar")
params.append("baz", "qux")
params.append("baz", "quux")

console.log(params.toString())
// 'foo=bar&baz=qux&baz=quux'

// Парсинг строки
const searchParams = new URLSearchParams("foo=bar&baz=qux&baz=quux")

// Получение всех значений для параметра 'baz'
console.log(searchParams.getAll("baz"))
// ['qux', 'quux']

// Проверка наличия параметра
console.log(searchParams.has("foo")) // true

// Получение первого значения параметра
console.log(searchParams.get("foo")) // 'bar'

// Добавление параметра
searchParams.append("new", "value")

// Преобразование обратно в строку
console.log(searchParams.toString())
// 'foo=bar&baz=qux&baz=quux&new=value'
```

## Особенности и ограничения

1. **Модуль `querystring` не обрабатывает вложенные объекты** - для работы со сложными структурами данных нужно использовать дополнительную логику или библиотеки:

```javascript
// Неправильно: вложенные объекты будут сериализованы как строки
const querystring = require("querystring")
console.log(querystring.stringify({ user: { name: "John", age: 30 } }))
// 'user=[object%20Object]'

// Для вложенных объектов лучше использовать библиотеки вроде qs:
// const qs = require('qs');
// console.log(qs.stringify({ user: { name: 'John', age: 30 } }));
// 'user[name]=John&user[age]=30'
```

2. **Модуль `querystring` устарел** - в новом коде рекомендуется использовать `URLSearchParams`:

```javascript
const url = new URL("https://example.com")
url.searchParams.append("foo", "bar")
url.searchParams.append("baz", "qux")
console.log(url.toString())
// 'https://example.com/?foo=bar&baz=qux'
```

## Заключение

Хотя модуль `querystring` остается частью Node.js, для новых проектов рекомендуется использовать `URLSearchParams`, который обладает более богатым API и полностью соответствует веб-стандартам. Тем не менее, понимание работы модуля `querystring` остается важным, особенно при поддержке существующего кода.

---

[[002 Node.js|Назад]]
