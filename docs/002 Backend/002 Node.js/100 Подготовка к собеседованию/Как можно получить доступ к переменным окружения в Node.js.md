---
title: Как можно получить доступ к переменным окружения в Node.js
draft: false
tags:
  - "#NodeJS"
  - "#переменные-окружения"
  - "#env"
  - "#process"
  - "#конфигурация"
  - "#dotenv"
info: []
---

Переменные окружения — это значения, доступные для приложения за пределами его кода. В Node.js они широко используются для конфигурации приложения в разных средах (разработка, тестирование, продакшн) и хранения чувствительных данных.

## Доступ к переменным окружения через process.env

Самый распространенный способ доступа к переменным окружения в Node.js — это использование глобального объекта `process.env`, который содержит все переменные окружения, доступные процессу Node.js:

```javascript
// Чтение переменной окружения
const port = process.env.PORT || 3000
const nodeEnv = process.env.NODE_ENV || "development"

console.log(`Приложение запущено в режиме ${nodeEnv} на порту ${port}`)
```

## Переменная NODE_ENV и её значение

Переменная `NODE_ENV` заслуживает особого внимания, так как она часто используется в Node.js приложениях для определения текущей среды выполнения. Хотя она не имеет специальной обработки в самом Node.js, многие фреймворки и библиотеки используют её для:

1. **Оптимизации производительности** (например, Express работает быстрее в режиме `production`)
2. **Включения/отключения функций отладки**
3. **Выбора конфигурации базы данных или других сервисов**
4. **Кеширования и минификации ресурсов**

Обычно используются следующие значения:

- `development` — для локальной разработки
- `test` — для запуска тестов
- `production` — для рабочей среды

```javascript
if (process.env.NODE_ENV === "production") {
  // Включаем оптимизации для продакшн-среды
  app.use(compression())
  app.use(cacheMiddleware)
} else {
  // Включаем инструменты разработки
  app.use(logger("dev"))
}
```

## Установка переменных окружения

### В командной строке Linux/macOS

```bash
# Временная установка (для текущей сессии)
export NODE_ENV=production
export PORT=8080

# Запуск приложения с переменными
NODE_ENV=production PORT=8080 node app.js
```

### В командной строке Windows

```cmd
# В cmd.exe
set NODE_ENV=production
set PORT=8080

# В PowerShell
$env:NODE_ENV = "production"
$env:PORT = "8080"
```

## Использование .env файлов с пакетом dotenv

Для более удобного управления переменными окружения, особенно в процессе разработки, можно использовать пакет `dotenv`, который загружает переменные из файла `.env` в `process.env`:

```bash
# Установка пакета
npm install dotenv
```

Создайте файл `.env` в корне проекта:

```
PORT=4000
DATABASE_URL=mongodb://localhost/mydatabase
API_KEY=your_secret_api_key
NODE_ENV=development
```

Затем в начале вашего приложения:

```javascript
// Загрузка переменных из .env в process.env
require("dotenv").config()

// Теперь переменные доступны через process.env
const port = process.env.PORT
const dbUrl = process.env.DATABASE_URL
const apiKey = process.env.API_KEY

console.log(`Сервер запущен на порту ${port}`)
```

## Разные .env файлы для разных сред

В более сложных проектах полезно иметь отдельные файлы для разных сред:

```javascript
// Загрузка переменных в зависимости от окружения
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV || "development"}`,
})
```

С такой структурой файлов:

- `.env.development` — для разработки
- `.env.test` — для тестирования
- `.env.production` — для продакшна

## Безопасность переменных окружения

1. **Никогда не добавляйте .env файлы в Git** (добавьте их в .gitignore)
2. **Не храните чувствительные данные непосредственно в коде**
3. **Обеспечьте валидацию переменных окружения** перед запуском приложения
4. **Используйте разные переменные** для разных сред

## Проверка и валидация переменных окружения

Хорошей практикой является проверка наличия необходимых переменных при запуске приложения:

```javascript
// Проверка наличия обязательных переменных
function validateEnv() {
  const requiredEnvs = ["DATABASE_URL", "API_KEY"]

  for (const env of requiredEnvs) {
    if (!process.env[env]) {
      console.error(`Ошибка: Не установлена переменная окружения ${env}`)
      process.exit(1)
    }
  }

  console.log("Все необходимые переменные окружения установлены")
}

validateEnv()
```

## Пример создания конфигурационного объекта

Часто удобно создать единый объект конфигурации на основе переменных окружения:

```javascript
// config.js
require("dotenv").config()

module.exports = {
  port: parseInt(process.env.PORT || "3000", 10),
  nodeEnv: process.env.NODE_ENV || "development",
  isProduction: process.env.NODE_ENV === "production",
  database: {
    url: process.env.DATABASE_URL,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
  },
  api: {
    key: process.env.API_KEY,
    timeout: parseInt(process.env.API_TIMEOUT || "5000", 10),
  },
  logger: {
    level: process.env.LOG_LEVEL || (process.env.NODE_ENV === "production" ? "info" : "debug"),
  },
}
```

Затем в приложении:

```javascript
const config = require("./config")

console.log(`Запуск сервера на порту ${config.port} в режиме ${config.nodeEnv}`)
```

---

[[002 Node.js|Назад]]
