---
title: Что такое EventEmitter и как создать его экземпляр
draft: false
tags:
  - "#NodeJS"
  - "#EventEmitter"
  - "#события"
  - "#асинхронность"
  - "#паттерны"
info:
  - https://nodejs.org/api/events.html
  - https://habr.com/ru/articles/424511/
---

**EventEmitter** — это встроенный класс в Node.js, который реализует паттерн "Наблюдатель" и предоставляет механизм для обработки событий и асинхронного программирования. EventEmitter позволяет объектам генерировать (emit) события и подписываться (listen) на них.

### Основные принципы работы с EventEmitter:

1. **Создание событий**: Объект EventEmitter генерирует событие, используя метод `emit()`
2. **Подписка на события**: Другие объекты могут "слушать" события с помощью методов `on()` или `addListener()`
3. **Асинхронное выполнение**: Когда событие генерируется, все подписанные обработчики вызываются асинхронно

### Создание экземпляра EventEmitter:

```javascript
// Импортируем модуль events
const EventEmitter = require("events")

// Создаём экземпляр EventEmitter
const myEmitter = new EventEmitter()

// Подписываемся на событие
myEmitter.on("event", () => {
  console.log("Событие произошло!")
})

// Генерируем событие
myEmitter.emit("event") // Вывод: "Событие произошло!"
```

### Наследование от EventEmitter:

Многие встроенные классы Node.js наследуются от EventEmitter, например, HTTP-сервер, потоки (Streams) и т.д. Вы также можете создавать собственные классы, расширяющие EventEmitter:

```javascript
const EventEmitter = require("events")

class MyEventEmitter extends EventEmitter {
  constructor() {
    super()
    this.init()
  }

  init() {
    setInterval(() => {
      // Генерируем событие с данными
      this.emit("tick", { time: new Date() })
    }, 1000)
  }
}

const emitter = new MyEventEmitter()

emitter.on("tick", (data) => {
  console.log(`Текущее время: ${data.time}`)
})
```

### Основные методы EventEmitter:

- **emitter.on(event, listener)** — добавляет слушатель для события
- **emitter.emit(event, [...args])** — генерирует событие с опциональными аргументами
- **emitter.once(event, listener)** — добавляет одноразовый слушатель
- **emitter.off(event, listener)** — удаляет слушатель (псевдоним для removeListener)
- **emitter.removeListener(event, listener)** — удаляет слушатель
- **emitter.removeAllListeners([event])** — удаляет все слушатели события
- **emitter.listeners(event)** — возвращает массив слушателей для события
- **emitter.setMaxListeners(n)** — устанавливает максимальное количество слушателей

### Пример передачи данных с событием:

```javascript
const EventEmitter = require("events")
const myEmitter = new EventEmitter()

// Подписка на событие 'data' с параметрами
myEmitter.on("data", (data, timestamp) => {
  console.log(`Получены данные: ${JSON.stringify(data)}`)
  console.log(`Время: ${timestamp}`)
})

// Генерация события с несколькими аргументами
myEmitter.emit("data", { user: "Иван", id: 123 }, new Date().toISOString())
```

### Обработка ошибок в EventEmitter:

По соглашению, если слушатель события завершается с ошибкой, он должен генерировать событие 'error':

```javascript
const myEmitter = new EventEmitter()

myEmitter.on("error", (err) => {
  console.error("Произошла ошибка:", err.message)
})

// Если нет обработчика 'error', приложение завершится с необработанным исключением
myEmitter.emit("error", new Error("Что-то пошло не так"))
```

EventEmitter — это краеугольный камень асинхронного программирования в Node.js, который используется во многих встроенных модулях и является фундаментом для создания реактивных приложений.

---

[[003 JSCore|Назад]]
