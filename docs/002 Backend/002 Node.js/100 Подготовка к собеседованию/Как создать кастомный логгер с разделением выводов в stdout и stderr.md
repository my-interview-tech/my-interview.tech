---
title: Как создать кастомный логгер с разделением выводов в stdout и stderr
draft: false
tags:
  - "#NodeJS"
  - "#логирование"
  - "#stdout"
  - "#stderr"
  - "#winston"
  - "#console"
info:
  - "[Документация по process.stdout и process.stderr](https://nodejs.org/api/process.html#processstdout)"
  - "[Документация пакета winston](https://www.npmjs.com/package/winston)"
---

Для создания кастомного логгера с разделением выводов в **`stdout`** и **`stderr`** можно использовать стандартный модуль **`console`** или создать свой собственный класс логгера. Основная идея заключается в том, чтобы у вас было два потока: один для обычных логов (stdout), а другой — для ошибок (stderr).

## 1. Создание собственного класса логгера

```javascript
class Logger {
  constructor() {
    // Можно использовать process.stdout и process.stderr для вывода в разные потоки
    this.infoStream = process.stdout
    this.errorStream = process.stderr
  }

  // Метод для обычных логов (stdout)
  log(message) {
    this.infoStream.write(`[INFO] ${message}\n`)
  }

  // Метод для логов ошибок (stderr)
  error(message) {
    this.errorStream.write(`[ERROR] ${message}\n`)
  }

  // Метод для предупреждений (stdout)
  warn(message) {
    this.infoStream.write(`[WARN] ${message}\n`)
  }

  // Метод для дебага (stdout)
  debug(message) {
    this.infoStream.write(`[DEBUG] ${message}\n`)
  }
}
```

### Пример использования:

```javascript
const logger = new Logger()

logger.log("This is an informational message.")
logger.warn("This is a warning message.")
logger.error("This is an error message.")
logger.debug("This is a debug message.")
```

### Вывод:

```
[INFO] This is an informational message.
[WARN] This is a warning message.
[ERROR] This is an error message.
[DEBUG] This is a debug message.
```

### Пояснение:

- **`process.stdout.write()`** — используется для вывода обычных сообщений.
- **`process.stderr.write()`** — используется для вывода сообщений об ошибках.

## 2. Использование библиотеки Winston для более сложных сценариев

Если вам нужно больше возможностей (например, логирование в файлы, консоль с различными уровнями логирования), вы можете использовать популярную библиотеку **[winston](https://www.npmjs.com/package/winston)**. Вот пример настройки:

#### Установка:

```bash
npm install winston
```

#### Пример с winston:

```javascript
const winston = require("winston")

// Конфигурация логгера
const logger = winston.createLogger({
  level: "info", // Уровень логирования
  transports: [
    // Логирование в консоль
    new winston.transports.Console({
      format: winston.format.simple(),
      stderrLevels: ["error"], // Отправка ошибок в stderr
    }),
    // Логирование в файл (опционально)
    new winston.transports.File({ filename: "combined.log" }),
  ],
})

// Пример использования
logger.info("This is an info message.")
logger.warn("This is a warning message.")
logger.error("This is an error message.")
```

### В чем преимущества использования `winston`:

- Поддержка множества транспортов (консоль, файлы, базы данных и т.д.).
- Легко настраиваемые уровни логирования (`info`, `warn`, `error`).
- Возможность отправлять сообщения в разные потоки и форматы.
- Поддержка логирования в файл, что удобно для продакшн-сред.

## 3. Разделение вывода через `console.log` и `console.error`

Если вы хотите сделать это проще и без сторонних библиотек, можно использовать стандартные **`console.log()`** и **`console.error()`** для разделения вывода в **`stdout`** и **`stderr`**:

```javascript
// Обычное сообщение
console.log("This is a normal log message.")

// Сообщение об ошибке
console.error("This is an error message.")
```

## Заключение:

- Для простых нужд можно создать кастомный логгер с использованием стандартных потоков **`stdout`** и **`stderr`**.
- Для более сложных и гибких решений рекомендуется использовать библиотеки, такие как **`winston`**, которые обеспечивают дополнительные возможности для логирования и управления выводом.

---

[[002 Node.js|Назад]]
