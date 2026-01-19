---
title: Что делает переменная NODE_ENV и зачем она нужна
draft: false
tags:
  - "#NodeJS"
  - "#environment"
  - "#переменные-окружения"
  - "#production"
  - "#development"
info:
  - https://nodejs.org/dist/latest-v18.x/docs/api/process.html#processenv
  - https://expressjs.com/ru/advanced/best-practice-performance.html
  - https://habr.com/ru/articles/710838/
---

**NODE_ENV** — это переменная окружения (environment variable), которая используется в Node.js для определения среды выполнения приложения. Эта переменная не встроена в Node.js по умолчанию, но стала стандартом де-факто в экосистеме Node.js.

### Основное назначение NODE_ENV

1. **Определение окружения запуска** - указывает, в каком режиме работает приложение:

   - `development` (разработка)
   - `production` (промышленная эксплуатация)
   - `test` (тестирование)
   - и другие пользовательские значения

2. **Включение или отключение функций** - на основе значения NODE_ENV приложение может:

   - Включать подробное логирование в режиме разработки
   - Минимизировать логи в production-режиме
   - Использовать кэширование только в production
   - Включать информативные сообщения об ошибках для разработчиков

3. **Оптимизация производительности** - многие фреймворки и библиотеки используют NODE_ENV для:
   - Оптимизации маршрутизации
   - Использования механизмов кэширования
   - Отключения отладочных инструментов

### Как устанавливать NODE_ENV

**В Windows:**

```bash
set NODE_ENV=production
```

**В Unix/Linux/macOS:**

```bash
export NODE_ENV=production
```

**При запуске приложения:**

```bash
NODE_ENV=production node app.js
```

**В package.json:**

```json
"scripts": {
  "start": "NODE_ENV=production node app.js",
  "dev": "NODE_ENV=development nodemon app.js"
}
```

### Пример использования NODE_ENV в коде

```javascript
// Определение среды выполнения
const isProduction = process.env.NODE_ENV === "production"

// Конфигурация на основе среды
const config = {
  databaseUrl: isProduction ? "mongodb://prod-server/mydb" : "mongodb://localhost/mydb-dev",
  logLevel: isProduction ? "error" : "debug",
  enableCache: isProduction,
}

// Условное логирование
if (!isProduction) {
  console.log("Запуск в режиме разработки")
  console.log("Конфигурация:", config)
}
```

### Использование в Express.js

В Express.js значение NODE_ENV существенно влияет на производительность:

```javascript
const express = require("express")
const app = express()

// Express автоматически настраивает многие параметры
// на основе значения NODE_ENV
console.log(`Режим запуска: ${app.get("env")}`)
// app.get('env') возвращает process.env.NODE_ENV || 'development'

if (app.get("env") === "development") {
  // Включаем подробные ошибки
  app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.render("error", {
      message: err.message,
      error: err, // В production этот объект не отправляется
    })
  })
}
```

### Влияние на производительность

Установка `NODE_ENV=production` может значительно повысить производительность приложения:

- В Express.js производительность может увеличиться до 3 раз
- Отключаются отладочные инструменты и подробные логи
- Включается кэширование шаблонов и других ресурсов
- Оптимизируются маршруты и HTTP-заголовки

NODE_ENV — это небольшая, но очень важная деталь, которая существенно влияет на поведение, производительность и безопасность Node.js-приложений, поэтому её правильная настройка критически важна, особенно в production-среде.

---

[[003 JSCore|Назад]]
