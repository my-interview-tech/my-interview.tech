---
title: Модуль Events и EventEmitter в Node.js
draft: false
tags:
  - "#NodeJS"
  - "#EventEmitter"
  - "#события"
  - "#асинхронность"
  - "#паттерны"
  - "#архитектура"
info:
---

`events` - это фундаментальный модуль Node.js, который реализует событийно-ориентированную архитектуру. Центральным элементом этого модуля является класс `EventEmitter`, который позволяет объектам испускать именованные события и подписывать слушателей на эти события.

## Основы EventEmitter

```javascript
const EventEmitter = require("events")

// Создание экземпляра EventEmitter
const myEmitter = new EventEmitter()

// Регистрация обработчика события
myEmitter.on("event", function (a, b) {
  console.log("Событие произошло с аргументами:", a, b)
})

// Генерация события
myEmitter.emit("event", "arg1", "arg2")
// Вывод: Событие произошло с аргументами: arg1 arg2
```

## Основные методы EventEmitter

### Добавление слушателей

```javascript
const EventEmitter = require("events")
const emitter = new EventEmitter()

// Добавление слушателя события (выполняется при каждом событии)
emitter.on("data", (data) => {
  console.log("Получены данные:", data)
})

// Добавление одноразового слушателя (выполняется только один раз)
emitter.once("connect", () => {
  console.log("Соединение установлено")
})

// Добавление слушателя в начало массива слушателей
emitter.prependListener("data", (data) => {
  console.log("Первый слушатель:", data)
})

// Добавление одноразового слушателя в начало массива
emitter.prependOnceListener("data", (data) => {
  console.log("Первый одноразовый слушатель:", data)
})
```

### Удаление слушателей

```javascript
function handler() {
  console.log("Обработчик события")
}

// Добавление слушателя
emitter.on("event", handler)

// Удаление конкретного слушателя
emitter.removeListener("event", handler)
// Альтернативный синтаксис
emitter.off("event", handler)

// Удаление всех слушателей для конкретного события
emitter.removeAllListeners("event")

// Удаление всех слушателей для всех событий
emitter.removeAllListeners()
```

### Получение информации о слушателях

```javascript
// Получение массива слушателей для события
const listeners = emitter.listeners("event")
console.log(listeners) // [Function, Function, ...]

// Получение количества слушателей для события
const count = emitter.listenerCount("event")
console.log(count) // например, 3

// Получение массива имен всех событий
const eventNames = emitter.eventNames()
console.log(eventNames) // ['event1', 'event2', ...]
```

### Настройка поведения EventEmitter

```javascript
// Установка максимального числа слушателей для события
// (по умолчанию 10, превышение вызывает предупреждение)
emitter.setMaxListeners(20)

// Получение текущего максимального числа слушателей
const maxListeners = emitter.getMaxListeners()
console.log(maxListeners) // 20

// Установка максимального числа слушателей глобально
EventEmitter.defaultMaxListeners = 15
```

## Наследование от EventEmitter

Один из самых распространенных паттернов в Node.js - создание классов, наследующих от EventEmitter:

```javascript
const EventEmitter = require("events")
const fs = require("fs")

// Пользовательский класс, наследующий от EventEmitter
class FileWatcher extends EventEmitter {
  constructor(filename) {
    super()
    this.filename = filename
    this.isWatching = false
  }

  // Метод для начала наблюдения за файлом
  watch() {
    if (this.isWatching) return

    this.isWatching = true
    this.emit("start", this.filename)

    fs.watchFile(this.filename, (curr, prev) => {
      this.emit("change", {
        filename: this.filename,
        timestamp: curr.mtime,
        previousTimestamp: prev.mtime,
      })
    })
  }

  // Метод для остановки наблюдения
  stop() {
    if (!this.isWatching) return

    fs.unwatchFile(this.filename)
    this.isWatching = false
    this.emit("stop", this.filename)
  }
}

// Использование класса
const watcher = new FileWatcher("example.txt")

watcher.on("start", (filename) => {
  console.log(`Начало наблюдения за ${filename}`)
})

watcher.on("change", (data) => {
  console.log(`Файл ${data.filename} изменен в ${data.timestamp}`)
})

watcher.on("stop", (filename) => {
  console.log(`Остановка наблюдения за ${filename}`)
})

// Запуск наблюдения
watcher.watch()

// Позже можно остановить
setTimeout(() => {
  watcher.stop()
}, 60000)
```

## Асинхронная природа событий

События в Node.js обрабатываются асинхронно:

```javascript
const EventEmitter = require("events")
const emitter = new EventEmitter()

// Регистрация обработчика
emitter.on("event", () => {
  console.log("Обработчик события")
})

// Генерация события
console.log("Перед генерацией события")
emitter.emit("event")
console.log("После генерации события")

// Вывод:
// Перед генерацией события
// Обработчик события
// После генерации события
```

Однако важно понимать, что `emit()` вызывает обработчики синхронно в том порядке, в котором они были добавлены. Если нужна асинхронная обработка, используйте `setImmediate()` или `process.nextTick()`:

```javascript
emitter.on("event", () => {
  setImmediate(() => {
    console.log("Асинхронная обработка события")
  })
})

console.log("Перед генерацией события")
emitter.emit("event")
console.log("После генерации события")

// Вывод:
// Перед генерацией события
// После генерации события
// Асинхронная обработка события
```

## Обработка ошибок

В EventEmitter есть специальное событие `'error'`, которое вызывается при возникновении ошибки. Если не установлен слушатель для этого события, ошибка будет выброшена и может завершить программу:

```javascript
const emitter = new EventEmitter()

// Правильная обработка ошибок
emitter.on("error", (err) => {
  console.error("Произошла ошибка:", err)
})

// Теперь emit('error') не завершит программу
emitter.emit("error", new Error("Тестовая ошибка"))
```

## Шаблон EventEmitter с обратным вызовом

Иногда удобно комбинировать колбэки и события:

```javascript
function findPattern(files, pattern, callback) {
  const emitter = new EventEmitter()
  let pending = files.length

  for (const file of files) {
    // Асинхронный поиск в файле
    searchInFile(file, pattern, (err, matches) => {
      if (err) {
        emitter.emit("error", err)
        if (callback) callback(err)
        callback = null
        return
      }

      // Генерация события для каждого найденного совпадения
      if (matches.length) {
        emitter.emit("match", file, matches)
      }

      // Проверка завершения всех файлов
      if (--pending === 0) {
        emitter.emit("end")
        if (callback) callback(null)
      }
    })
  }

  return emitter
}

// Использование
const finder = findPattern(["file1.txt", "file2.txt"], /pattern/, (err) => {
  if (err) console.error("Обработка ошибки в колбэке:", err)
  else console.log("Поиск завершен")
})

finder.on("match", (file, matches) => {
  console.log(`Найдены совпадения в ${file}:`, matches)
})

finder.on("error", (err) => {
  console.error("Обработка ошибки в событии:", err)
})

finder.on("end", () => {
  console.log("Все файлы обработаны")
})
```

## Продвинутые возможности

### Использование символов для событий

Начиная с Node.js 4.0, можно использовать символы в качестве имен событий, что предотвращает конфликты:

```javascript
const EventEmitter = require("events")

// Создание уникального символа для события
const DATA_EVENT = Symbol("data")

const emitter = new EventEmitter()

// Использование символа вместо строки
emitter.on(DATA_EVENT, (data) => {
  console.log("Получены данные:", data)
})

emitter.emit(DATA_EVENT, { id: 1, name: "Test" })
```

### Необработанные отклонения промисов

В Node.js события также используются для обработки необработанных исключений и отклонений промисов:

```javascript
// Обработка необработанных отклонений промисов
process.on("unhandledRejection", (reason, promise) => {
  console.error("Необработанное отклонение промиса:", reason)
  // Логирование или другие действия
})

// Проверка
Promise.reject(new Error("Тестовая ошибка"))
```

### Создание безопасных обработчиков

Обработчики событий могут вызывать ошибки, которые нужно корректно обрабатывать:

```javascript
function safeListener(event, handler) {
  return function (...args) {
    try {
      handler.apply(this, args)
    } catch (err) {
      console.error(`Ошибка в обработчике ${event}:`, err)
    }
  }
}

emitter.on(
  "data",
  safeListener("data", (data) => {
    // Здесь может произойти ошибка
    const result = JSON.parse(data)
    console.log(result)
  }),
)

// Даже если данные некорректны, программа не завершится
emitter.emit("data", "некорректный JSON")
```

## Практические примеры использования EventEmitter

### Создание простого HTTP-сервера с логированием

```javascript
const EventEmitter = require("events")
const http = require("http")

class Logger extends EventEmitter {
  log(message) {
    this.emit("log", { message, timestamp: new Date() })
  }
}

const logger = new Logger()

// Логирование в консоль
logger.on("log", (data) => {
  console.log(`[${data.timestamp.toISOString()}] ${data.message}`)
})

// Логирование в файл (пример)
logger.on("log", (data) => {
  // Здесь можно добавить запись в файл
})

// Создание HTTP-сервера с логированием
const server = http.createServer((req, res) => {
  logger.log(`${req.method} ${req.url}`)

  res.writeHead(200, { "Content-Type": "text/plain" })
  res.end("Hello World\n")
})

server.listen(3000, () => {
  logger.log("Сервер запущен на порту 3000")
})
```

### Реализация паттерна Pub/Sub (Издатель/Подписчик)

```javascript
const EventEmitter = require("events")

class PubSub extends EventEmitter {
  constructor() {
    super()
    this.topics = {}
  }

  // Публикация сообщения в топик
  publish(topic, ...data) {
    this.emit(topic, ...data)
    return this
  }

  // Подписка на топик
  subscribe(topic, listener) {
    this.on(topic, listener)
    return this
  }

  // Отписка от топика
  unsubscribe(topic, listener) {
    this.removeListener(topic, listener)
    return this
  }
}

// Использование
const messageBroker = new PubSub()

// Обработчик для сообщений в топике 'user'
const userSubscriber = (user) => {
  console.log("Получено сообщение в топике user:", user)
}

// Подписка
messageBroker.subscribe("user", userSubscriber)

// Публикация
messageBroker.publish("user", { id: 1, name: "John" })
messageBroker.publish("user", { id: 2, name: "Alice" })

// Отписка
messageBroker.unsubscribe("user", userSubscriber)

// Это сообщение не будет обработано, так как мы отписались
messageBroker.publish("user", { id: 3, name: "Bob" })
```

### Реализация асинхронного итератора с EventEmitter

В Node.js 10+ можно использовать асинхронные итераторы для работы с событиями:

```javascript
const EventEmitter = require("events")

// Функция, создающая асинхронный итератор из событий
function createEventIterator(emitter, eventName, timeout = 0) {
  let done = false
  let error = null

  // Создаем и возвращаем итератор
  return {
    [Symbol.asyncIterator]() {
      return {
        next() {
          if (done || error) {
            return Promise.resolve({
              done: true,
              value: undefined,
            })
          }

          return new Promise((resolve, reject) => {
            // Тайм-аут для ограничения ожидания
            let timeoutId = null
            if (timeout > 0) {
              timeoutId = setTimeout(() => {
                cleanup()
                resolve({ done: true })
              }, timeout)
            }

            // Функция очистки слушателей
            function cleanup() {
              emitter.removeListener(eventName, onEvent)
              emitter.removeListener("error", onError)
              if (timeoutId) clearTimeout(timeoutId)
            }

            // Слушатель события
            function onEvent(...args) {
              cleanup()
              resolve({ value: args, done: false })
            }

            // Слушатель ошибки
            function onError(err) {
              cleanup()
              error = err
              reject(err)
            }

            // Устанавливаем слушатели
            emitter.once(eventName, onEvent)
            emitter.once("error", onError)
          })
        },

        return() {
          done = true
          return Promise.resolve({ done: true })
        },
      }
    },
  }
}

// Пример использования
async function example() {
  const emitter = new EventEmitter()

  // Генерация событий
  setTimeout(() => emitter.emit("tick", 1), 100)
  setTimeout(() => emitter.emit("tick", 2), 200)
  setTimeout(() => emitter.emit("tick", 3), 300)
  setTimeout(() => emitter.emit("end"), 400)

  // Использование асинхронного итератора для событий
  try {
    for await (const [value] of createEventIterator(emitter, "tick", 500)) {
      console.log("Получено значение:", value)
    }
    console.log("Итерация завершена")
  } catch (err) {
    console.error("Ошибка:", err)
  }
}

example()
```

## Заключение

EventEmitter является фундаментальной частью архитектуры Node.js, которая реализует паттерн Observer (Наблюдатель). Основные преимущества использования событийно-ориентированной архитектуры:

1. **Слабая связанность** - компоненты не зависят напрямую друг от друга
2. **Асинхронность** - естественная интеграция с асинхронной моделью Node.js
3. **Масштабируемость** - возможность добавлять новые обработчики без изменения основной логики
4. **Отделение ответственности** - четкое разделение между источниками событий и их обработчиками

Модуль events используется во многих ключевых компонентах Node.js, включая потоки (streams), HTTP-серверы, сокеты и другие. Понимание и эффективное использование EventEmitter является важным навыком для разработки на Node.js.

---

[[Назад]]
