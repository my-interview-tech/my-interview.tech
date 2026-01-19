---
title: Как работает механизм событий в Node.js и что такое EventEmitter
draft: false
tags:
  - "#NodeJS"
  - "#EventEmitter"
  - "#событийно-ориентированное"
  - "#паттерны"
  - "#обработчики"
info:
  - "[Документация Node.js - Events](https://nodejs.org/api/events.html)"
  - "[Understanding Node.js Event-Driven Architecture](https://www.freecodecamp.org/news/understanding-node-js-event-driven-architecture-223292fcbc2d/)"
---

![[Pasted image node-events.png|600]]

## Что такое EventEmitter в Node.js

**EventEmitter** — это базовый класс в Node.js, который является основой для событийно-ориентированной архитектуры. Он предоставляет механизм для создания, регистрации и обработки пользовательских событий.

EventEmitter позволяет реализовать паттерн Observer («наблюдатель»), где объекты, называемые «наблюдателями», подписываются на события, и когда события происходят, эти наблюдатели уведомляются и могут выполнять соответствующие действия.

## Базовое использование EventEmitter

```javascript
const EventEmitter = require("events")

// Создаем экземпляр EventEmitter
const myEmitter = new EventEmitter()

// Регистрируем обработчик события 'event'
myEmitter.on("event", function (a, b) {
  console.log("Событие произошло с аргументами:", a, b)
})

// Генерируем событие 'event'
myEmitter.emit("event", "arg1", "arg2")
// Вывод: Событие произошло с аргументами: arg1 arg2
```

## Принципы работы механизма событий

1. **Регистрация обработчиков**: Функции-обработчики регистрируются с помощью методов `on()`, `once()`, `addListener()` и хранятся в списках для каждого типа события.

2. **Генерация событий**: Когда происходит событие, вызывается метод `emit()` с именем события и необходимыми аргументами.

3. **Вызов обработчиков**: Все зарегистрированные для данного события обработчики вызываются синхронно один за другим в порядке их регистрации.

## Основные методы EventEmitter

```javascript
const EventEmitter = require("events")
const emitter = new EventEmitter()

// Добавление обработчика события
emitter.on("data", (data) => {
  console.log("Получены данные:", data)
})

// Добавление одноразового обработчика
emitter.once("initialize", () => {
  console.log("Инициализация произошла один раз")
})

// Удаление определенного обработчика
const handler = (data) => console.log(data)
emitter.on("message", handler)
emitter.removeListener("message", handler)

// Удаление всех обработчиков для события
emitter.removeAllListeners("message")

// Получение массива обработчиков для события
const listeners = emitter.listeners("data")

// Получение количества обработчиков для события
const count = emitter.listenerCount("data")

// Установка максимального количества обработчиков
emitter.setMaxListeners(20) // По умолчанию 10
```

## Создание собственных классов на основе EventEmitter

Большинство встроенных модулей Node.js (например, HTTP, Stream) созданы на основе EventEmitter. Вы можете создавать собственные классы, наследующие от EventEmitter:

```javascript
const EventEmitter = require("events")
const fs = require("fs")

class FileWatcher extends EventEmitter {
  constructor(filename) {
    super()
    this.filename = filename
    this.isWatching = false
  }

  watch() {
    if (this.isWatching) return

    this.isWatching = true
    this.emit("start", this.filename)

    fs.watchFile(this.filename, (curr, prev) => {
      this.emit("change", {
        filename: this.filename,
        timestamp: curr.mtime,
      })
    })
  }

  stop() {
    if (!this.isWatching) return

    fs.unwatchFile(this.filename)
    this.isWatching = false
    this.emit("stop", this.filename)
  }
}

// Использование
const watcher = new FileWatcher("example.txt")

watcher.on("start", (filename) => {
  console.log(`Начато наблюдение за ${filename}`)
})

watcher.on("change", (data) => {
  console.log(`Файл ${data.filename} изменен в ${data.timestamp}`)
})

watcher.on("stop", (filename) => {
  console.log(`Наблюдение за ${filename} остановлено`)
})

watcher.watch()
```

## Асинхронная vs синхронная обработка событий

По умолчанию, обработчики событий в EventEmitter вызываются синхронно в порядке их регистрации:

```javascript
const EventEmitter = require("events")
const emitter = new EventEmitter()

emitter.on("event", () => {
  console.log("A")
})

emitter.on("event", () => {
  console.log("B")
})

emitter.emit("event")
// Вывод: A, затем B
```

Для асинхронной обработки событий можно использовать `setImmediate()`, `process.nextTick()` или `Promise`:

```javascript
emitter.on("async-event", () => {
  setImmediate(() => {
    console.log("Асинхронная обработка")
  })
})
```

## Особые события

EventEmitter имеет несколько специальных типов событий:

1. **error**: Если для события 'error' нет обработчиков, то исключение будет выброшено и программа завершится:

```javascript
emitter.emit("error", new Error("Что-то пошло не так"))
// Если нет обработчика, программа завершится
```

2. **newListener**: Вызывается перед добавлением нового обработчика

```javascript
emitter.on("newListener", (event, listener) => {
  console.log(`Добавлен обработчик для ${event}`)
})
```

3. **removeListener**: Вызывается после удаления обработчика

```javascript
emitter.on("removeListener", (event, listener) => {
  console.log(`Обработчик для ${event} удален`)
})
```

## Обработка ошибок

Правильная обработка ошибок критически важна при работе с EventEmitter:

```javascript
const emitter = new EventEmitter()

// Обработчик ошибок должен присутствовать
emitter.on("error", (err) => {
  console.error("Произошла ошибка:", err.message)
  // Логика обработки ошибок
})

// Теперь при генерации события 'error' программа не завершится
emitter.emit("error", new Error("Тестовая ошибка"))
```

## Утечки памяти и управление обработчиками

При работе с EventEmitter важно предотвращать утечки памяти, связанные с забытыми обработчиками:

```javascript
// Предупреждение при добавлении более 10 обработчиков (по умолчанию)
for (let i = 0; i < 11; i++) {
  emitter.on("many-listeners", () => {
    console.log(`Обработчик ${i}`)
  })
}
// Выведет предупреждение: (node:1234) MaxListenersExceededWarning

// Увеличение лимита обработчиков
emitter.setMaxListeners(20)

// Установка глобального лимита
EventEmitter.defaultMaxListeners = 15
```

## Цепочка обработчиков

```javascript
const { EventEmitter } = require("events")

// Цепочка вызовов
new EventEmitter()
  .on("data", (data) => {
    console.log("Получены данные:", data)
  })
  .on("end", () => {
    console.log("Поток завершен")
  })
  .emit("data", "Пример данных")
  .emit("end")
```

## Преимущества событийно-ориентированной архитектуры

1. **Слабая связанность**: Компоненты системы не зависят напрямую друг от друга
2. **Масштабируемость**: Легко добавлять новые обработчики событий
3. **Гибкость**: Можно динамически регистрировать и отменять обработчики
4. **Параллельная обработка**: События могут обрабатываться несколькими обработчиками

## Альтернативы EventEmitter

1. **RxJS**: Более мощная библиотека для реактивного программирования
2. **EventTarget**: Web API интерфейс, похожий на EventEmitter, но с другим API
3. **Pub/Sub библиотеки**: Redis PubSub, MQTT и другие для распределенных систем

---

[[002 Node.js|Назад]]
