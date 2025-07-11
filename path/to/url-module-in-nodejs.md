---
title: Модуль URL в Node.js и работа с веб-адресами
draft: false
tags:
  - "#NodeJS"
  - "#URL"
  - "#парсинг"
  - "#queryString"
  - "#backend"
info:
---

`url` - это встроенный модуль Node.js, который предоставляет утилиты для разбора и форматирования URL-адресов. Модуль реализует API для URL-объектов в соответствии со стандартом WHATWG URL API, используемым в веб-браузерах.

## Два API для работы с URL

В Node.js существует два API для работы с URL:

1. **Устаревший API** (`url.parse()`) - доступен с ранних версий Node.js
2. **WHATWG URL API** - современный API, совместимый с браузерами

## WHATWG URL API (рекомендуемый)

### Создание URL-объекта

```javascript
const { URL } = require("url")

// Создание URL-объекта
const myUrl = new URL("https://example.com:8080/path/name?query=string#hash")

console.log(myUrl)
// URL {
//   href: 'https://example.com:8080/path/name?query=string#hash',
//   origin: 'https://example.com:8080',
//   protocol: 'https:',
//   username: '',
//   password: '',
//   host: 'example.com:8080',
//   hostname: 'example.com',
//   port: '8080',
//   pathname: '/path/name',
//   search: '?query=string',
//   searchParams: URLSearchParams { 'query' => 'string' },
//   hash: '#hash'
// }
```

### Работа с параметрами запроса (URLSearchParams)

```javascript
const { URL } = require("url")

const myUrl = new URL("https://example.com/path?name=John&age=30")

// Получение объекта URLSearchParams
const params = myUrl.searchParams

// Получение значений параметров
console.log(params.get("name")) // 'John'
console.log(params.get("age")) // '30'

// Проверка наличия параметра
console.log(params.has("name")) // true
console.log(params.has("gender")) // false

// Добавление параметров
params.append("gender", "male")
console.log(myUrl.href) // 'https://example.com/path?name=John&age=30&gender=male'

// Удаление параметров
params.delete("age")
console.log(myUrl.href) // 'https://example.com/path?name=John&gender=male'

// Установка нового значения параметра
params.set("name", "Alice")
console.log(myUrl.href) // 'https://example.com/path?name=Alice&gender=male'

// Получение всех пар ключ-значение
for (const [key, value] of params.entries()) {
  console.log(`${key}: ${value}`)
}

// Сортировка параметров
params.sort()
console.log(myUrl.search) // '?gender=male&name=Alice'
```

### Форматирование и изменение URL

```javascript
const { URL } = require("url")

let myUrl = new URL("https://user:pass@example.com:8080/path/name?query=string#hash")

// Изменение компонентов URL
myUrl.protocol = "http:"
myUrl.hostname = "test.example.com"
myUrl.port = "3000"
myUrl.pathname = "/new/path"
myUrl.search = "?newquery=value"
myUrl.hash = "#newhash"
myUrl.username = "newuser"
myUrl.password = "newpass"

console.log(myUrl.href)
// 'http://newuser:newpass@test.example.com:3000/new/path?newquery=value#newhash'
```

### Разрешение относительных URL

```javascript
const { URL } = require("url")

// Базовый URL как точка отсчета
const baseUrl = "https://example.com/base/"

// Разрешение относительного URL
const relativeUrl = new URL("relative/path", baseUrl)
console.log(relativeUrl.href) // 'https://example.com/base/relative/path'

// Разрешение абсолютного пути
const absolutePath = new URL("/absolute/path", baseUrl)
console.log(absolutePath.href) // 'https://example.com/absolute/path'

// Разрешение полного URL
const fullUrl = new URL("https://another.com/path", baseUrl)
console.log(fullUrl.href) // 'https://another.com/path'
```

## Устаревший API (для обратной совместимости)

Хотя WHATWG URL API рекомендуется для новой разработки, устаревший API всё ещё используется в некоторых приложениях:

```javascript
const url = require("url")

// Парсинг URL с помощью legacy API
const parsedUrl = url.parse("https://user:pass@example.com:8080/path/name?query=string#hash", true)

console.log(parsedUrl)
// Url {
//   protocol: 'https:',
//   slashes: true,
//   auth: 'user:pass',
//   host: 'example.com:8080',
//   port: '8080',
//   hostname: 'example.com',
//   hash: '#hash',
//   search: '?query=string',
//   query: { query: 'string' },
//   pathname: '/path/name',
//   path: '/path/name?query=string',
//   href: 'https://user:pass@example.com:8080/path/name?query=string#hash'
// }

// Форматирование URL
const formattedUrl = url.format({
  protocol: "https",
  hostname: "example.com",
  pathname: "/path/name",
  query: {
    name: "John",
    age: 30,
  },
  hash: "section",
})

console.log(formattedUrl)
// 'https://example.com/path/name?name=John&age=30#section'
```

## Интеграция с path модулем

URL модуль часто используется вместе с модулем path для работы с файловыми URL:

```javascript
const { URL } = require("url")
const path = require("path")

// Создание файлового URL
const fileUrl = new URL(`file://${path.resolve(__dirname, "file.txt")}`)
console.log(fileUrl.href)
// Например: 'file:///Users/username/project/file.txt'

// Преобразование файлового URL в путь
const filePath = new URL("file:///Users/username/project/file.txt")
console.log(filePath.pathname)
// В POSIX: '/Users/username/project/file.txt'
// В Windows требуется дополнительная обработка пути
```

## Кодирование и декодирование URL-компонентов

```javascript
const { URL } = require("url")

// Кодирование компонентов URL
const encodedString = encodeURIComponent("строка с пробелами & специальными символами")
console.log(encodedString)
// '%D1%81%D1%82%D1%80%D0%BE%D0%BA%D0%B0%20%D1%81%20%D0%BF%D1%80%D0%BE%D0%B1%D0%B5%D0%BB%D0%B0%D0%BC%D0%B8%20%26%20%D1%81%D0%BF%D0%B5%D1%86%D0%B8%D0%B0%D0%BB%D1%8C%D0%BD%D1%8B%D0%BC%D0%B8%20%D1%81%D0%B8%D0%BC%D0%B2%D0%BE%D0%BB%D0%B0%D0%BC%D0%B8'

// Декодирование компонентов URL
const decodedString = decodeURIComponent(encodedString)
console.log(decodedString)
// 'строка с пробелами & специальными символами'

// Использование в URL
const myUrl = new URL("https://example.com/search")
myUrl.searchParams.set("q", "строка с пробелами & специальными символами")
console.log(myUrl.href)
// 'https://example.com/search?q=%D1%81%D1%82%D1%80%D0%BE%D0%BA%D0%B0+%D1%81+%D0%BF%D1%80%D0%BE%D0%B1%D0%B5%D0%BB%D0%B0%D0%BC%D0%B8+%26+%D1%81%D0%BF%D0%B5%D1%86%D0%B8%D0%B0%D0%BB%D1%8C%D0%BD%D1%8B%D0%BC%D0%B8+%D1%81%D0%B8%D0%BC%D0%B2%D0%BE%D0%BB%D0%B0%D0%BC%D0%B8'
```

## Модуль querystring

Для более сложной работы с параметрами запроса (особенно с устаревшим API) можно использовать модуль `querystring`:

```javascript
const querystring = require("querystring")

// Разбор строки запроса
const parsedQuery = querystring.parse("name=John&age=30&city=New%20York")
console.log(parsedQuery)
// { name: 'John', age: '30', city: 'New York' }

// Создание строки запроса
const stringifiedQuery = querystring.stringify({
  name: "John",
  age: 30,
  interests: ["programming", "music", "sports"],
})
console.log(stringifiedQuery)
// 'name=John&age=30&interests=programming&interests=music&interests=sports'

// Настройка разделителей
const customQuery = querystring.stringify({ a: 1, b: 2 }, ";", ":")
console.log(customQuery)
// 'a:1;b:2'
```

## Безопасность и валидация URL

```javascript
const { URL } = require("url")

function isValidUrl(string) {
  try {
    new URL(string)
    return true
  } catch (err) {
    return false
  }
}

console.log(isValidUrl("https://example.com")) // true
console.log(isValidUrl("invalid-url")) // false

// Проверка домена
function isSameDomain(urlString, domain) {
  try {
    const url = new URL(urlString)
    return url.hostname === domain
  } catch (err) {
    return false
  }
}

console.log(isSameDomain("https://example.com/path", "example.com")) // true
console.log(isSameDomain("https://subdomain.example.com", "example.com")) // false
```

## Практические примеры использования

### Построение URL для API запросов

```javascript
const { URL } = require("url")

function buildApiUrl(baseUrl, endpoint, params = {}) {
  const url = new URL(endpoint, baseUrl)

  // Добавление параметров запроса
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.append(key, value)
  }

  return url.href
}

const apiUrl = buildApiUrl("https://api.example.com", "/users", {
  limit: 10,
  sort: "name",
  order: "asc",
})

console.log(apiUrl)
// 'https://api.example.com/users?limit=10&sort=name&order=asc'
```

### Обработка URL из HTTP-запроса

```javascript
const http = require("http")
const { URL } = require("url")

const server = http.createServer((req, res) => {
  // Получение полного URL из запроса
  const requestUrl = new URL(req.url, `http://${req.headers.host}`)

  console.log("Путь:", requestUrl.pathname)
  console.log("Параметры запроса:", Object.fromEntries(requestUrl.searchParams))

  // Маршрутизация на основе URL
  if (requestUrl.pathname === "/api/users") {
    const limit = requestUrl.searchParams.get("limit") || 10
    // Обработка запроса...
    res.end(`Получение списка пользователей (лимит: ${limit})`)
  } else {
    res.statusCode = 404
    res.end("Не найдено")
  }
})

server.listen(3000, () => {
  console.log("Сервер запущен на http://localhost:3000")
})
```

## Сравнение двух API для работы с URL

| Функциональность                 | WHATWG URL API                | Устаревший API                                            |
| -------------------------------- | ----------------------------- | --------------------------------------------------------- |
| Глобальная доступность           | Да (`URL`, `URLSearchParams`) | Нет (только через `require('url')`)                       |
| Совместимость с браузерами       | Да                            | Нет                                                       |
| Парсинг относительных URL        | Да (требует базовый URL)      | Да (не требует базовый URL)                               |
| Работа с параметрами запроса     | Объект `URLSearchParams`      | Требует `querystring`                                     |
| Типы данных параметров           | Всегда строки                 | Может быть разных типов (при использовании `querystring`) |
| Рекомендуется для новых проектов | Да                            | Нет                                                       |

## Заключение

Модуль URL в Node.js предоставляет мощные инструменты для работы с веб-адресами:

1. **WHATWG URL API** - современный и рекомендуемый способ работы с URL, совместимый с браузерами.
2. **Устаревший API** - поддерживается для обратной совместимости.

Разбор, форматирование и манипуляция URL-адресами являются критически важными задачами при разработке веб-приложений и API, и модуль URL предоставляет все необходимые для этого инструменты.

---

[[Назад]]
