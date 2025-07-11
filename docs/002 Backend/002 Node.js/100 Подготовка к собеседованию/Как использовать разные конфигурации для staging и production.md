---
title: Как использовать разные конфигурации для staging и production
draft: false
tags:
  - "#NodeJS"
  - "#конфигурация"
  - "#production"
  - "#staging"
  - "#переменные_окружения"
info:
  - https://nodejs.org/dist/latest-v18.x/docs/api/process.html#processenv
  - https://www.npmjs.com/package/dotenv
  - https://www.npmjs.com/package/config
---

Использование различных конфигураций для разных окружений (staging, production) - важная часть разработки, позволяющая адаптировать поведение приложения в зависимости от среды выполнения. В Node.js есть несколько подходов к организации конфигурации.

## 1. Использование переменных окружения

Самый простой и распространенный подход - использование переменных окружения через `process.env`.

### Настройка переменных окружения

```bash
# Для production
export NODE_ENV=production

# Для staging
export NODE_ENV=staging
```

### Использование в коде

```javascript
// config.js
const config = {
  development: {
    db: "mongodb://localhost/dev-db",
    port: 3000,
    logLevel: "debug",
  },
  staging: {
    db: "mongodb://localhost/staging-db",
    port: 4000,
    logLevel: "info",
  },
  production: {
    db: "mongodb://prod-db-server/prod-db",
    port: 8080,
    logLevel: "error",
  },
}

// Выбираем конфигурацию в зависимости от среды
const currentConfig = config[process.env.NODE_ENV || "development"]

module.exports = currentConfig
```

Использование конфигурации в приложении:

```javascript
const config = require("./config")
console.log(`Приложение запущено на порту: ${config.port}`)
```

## 2. Использование .env файлов с dotenv

Библиотека `dotenv` позволяет хранить настройки в отдельных файлах для разных окружений.

### Установка dotenv

```bash
npm install dotenv
```

### Создание файлов конфигурации

#### .env.production

```
DB_URI=mongodb://prod-db-server/prod-db
PORT=8080
LOG_LEVEL=error
```

#### .env.staging

```
DB_URI=mongodb://localhost/staging-db
PORT=4000
LOG_LEVEL=info
```

### Загрузка конфигурации в коде

```javascript
// Загружаем переменные из соответствующего файла
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV || "development"}`,
})

// Теперь переменные доступны через process.env
console.log(`DB URI: ${process.env.DB_URI}`)
console.log(`Port: ${process.env.PORT}`)
console.log(`Log Level: ${process.env.LOG_LEVEL}`)
```

### Запуск приложения с указанием окружения

```bash
NODE_ENV=production node app.js
# или
NODE_ENV=staging node app.js
```

## 3. Использование отдельных конфигурационных файлов

Более структурированный подход - создание отдельных файлов конфигурации для каждого окружения.

### Структура файлов

```
/config
  production.js
  staging.js
  development.js
  index.js
```

### Содержимое файлов

#### config/production.js

```javascript
module.exports = {
  db: "mongodb://prod-db-server/prod-db",
  port: 8080,
  logLevel: "error",
}
```

#### config/staging.js

```javascript
module.exports = {
  db: "mongodb://localhost/staging-db",
  port: 4000,
  logLevel: "info",
}
```

#### config/index.js

```javascript
const environment = process.env.NODE_ENV || "development"
const config = require(`./${environment}`)
module.exports = config
```

### Использование в приложении

```javascript
const config = require("./config")
console.log(`Приложение запущено на порту: ${config.port}`)
```

## 4. Использование библиотеки config

Библиотека `config` предлагает более комплексное решение с возможностью иерархических конфигураций.

### Установка

```bash
npm install config
```

### Структура файлов

```
/config
  default.json
  production.json
  staging.json
```

### Содержимое файлов

#### config/default.json (общие настройки)

```json
{
  "db": "mongodb://localhost/dev-db",
  "port": 3000,
  "logLevel": "debug"
}
```

#### config/production.json (перезаписывает настройки для production)

```json
{
  "db": "mongodb://prod-db-server/prod-db",
  "port": 8080,
  "logLevel": "error"
}
```

#### config/staging.json (перезаписывает настройки для staging)

```json
{
  "db": "mongodb://localhost/staging-db",
  "port": 4000,
  "logLevel": "info"
}
```

### Использование в коде

```javascript
const config = require("config")
console.log(`Приложение запущено на порту: ${config.get("port")}`)
```

### Запуск с указанием окружения

```bash
NODE_ENV=production node app.js
```

## Рекомендации и лучшие практики

1. **Используйте переменные окружения для критичных параметров** (пароли, ключи API и т.д.)
2. **Храните настройки по умолчанию в коде**, а среда выполнения должна переопределять их
3. **Не включайте секретные данные в исходный код** (используйте .env файлы, исключенные из репозитория)
4. **Документируйте все настройки** и их возможные значения
5. **Централизуйте конфигурацию** в одном месте для удобства поддержки

## Пример комплексного подхода

```javascript
// config.js
const dotenv = require("dotenv")

// Загружаем переменные окружения из файла
dotenv.config({
  path: `.env.${process.env.NODE_ENV || "development"}`,
})

// Базовая конфигурация
const config = {
  env: process.env.NODE_ENV || "development",
  isProduction: process.env.NODE_ENV === "production",
  isStaging: process.env.NODE_ENV === "staging",

  // Сервер
  port: parseInt(process.env.PORT, 10) || 3000,

  // База данных
  db: {
    uri: process.env.DB_URI || "mongodb://localhost/dev-db",
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },

  // Логирование
  logLevel: process.env.LOG_LEVEL || "debug",
}

module.exports = config
```

---

[[002 Node.js|Назад]]
