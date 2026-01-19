---
title: EventEmitter и событийно-ориентированная архитектура в Node.js
draft: true
tags:
  - "#NodeJS"
  - "#EventEmitter"
  - "#events"
  - "#асинхронность"
  - "#архитектура"
info:
---

`EventEmitter` - это класс в Node.js, который является основой событийно-ориентированной архитектуры. Он позволяет объектам генерировать (emit) и слушать (listen) события, обеспечивая асинхронный поток выполнения программы.

## Основы EventEmitter

```javascript
const EventEmitter = require("events")

// Создание экземпляра EventEmitter
const myEmitter = new EventEmitter()

// Добавление обработчика события
myEmitter.on("event", function (a, b) {
  console.log(a, b, this)
})

// Генерация события
myEmitter.emit("event", "аргумент1", "аргумент2")
```

## Основные методы EventEmitter

### Регистрация обработчиков событий

```javascript
const EventEmitter = require("events")
const emitter = new EventEmitter()

// Регистрация обработчика события (слушает все события данного типа)
emitter.on("data", (data) => {
  console.log("Получены данные:", data)
})

// Регистрация обработчика, который сработает только один раз
emitter.once("connect", () => {
  console.log("Соединение установлено")
})

// Создание обработчика с приоритетом (добавляется в начало массива слушателей)
emitter.prependListener("data", (data) => {
  console.log("Этот обработчик выполнится первым:", data)
})

// Создание одноразового обработчика с приоритетом
emitter.prependOnceListener("error", (err) => {
  console.error("Произошла ошибка:", err)
})
```

### Генерация событий

```javascript
const EventEmitter = require("events")
const emitter = new EventEmitter()

emitter.on("event", (a, b) => {
  console.log(a, b)
})

// Генерация события с аргументами
emitter.emit("event", "а", "б")
```

### Управление обработчиками

```javascript
const EventEmitter = require("events")
const emitter = new EventEmitter()

// Функция обработчик
function dataHandler(data) {
  console.log("Данные:", data)
}

// Регистрация обработчика
emitter.on("data", dataHandler)

// Удаление конкретного обработчика
emitter.removeListener("data", dataHandler)
// Альтернативный синтаксис
emitter.off("data", dataHandler)

// Удаление всех обработчиков для указанного события
emitter.removeAllListeners("data")

// Удаление всех обработчиков для всех событий
emitter.removeAllListeners()
```

### Получение информации о слушателях

```javascript
const EventEmitter = require("events")
const emitter = new EventEmitter()

emitter.on("data", () => console.log("Обработчик 1"))
emitter.on("data", () => console.log("Обработчик 2"))

// Получение массива функций-слушателей для указанного события
const listeners = emitter.listeners("data")
console.log("Количество слушателей:", listeners.length)

// Получение количества слушателей
const count = emitter.listenerCount("data")
console.log("Количество слушателей:", count)

// Получение массива имен всех событий, для которых зарегистрированы слушатели
const eventNames = emitter.eventNames()
console.log("События с обработчиками:", eventNames)
```

## Создание класса на основе EventEmitter

```javascript
const EventEmitter = require("events")

// Создание класса, наследующего EventEmitter
class MyStream extends EventEmitter {
  constructor() {
    super()
    // Инициализация
  }

  write(data) {
    this.emit("data", data)
  }

  end() {
    this.emit("end")
  }

  error(err) {
    this.emit("error", err)
  }
}

// Использование класса
const stream = new MyStream()

stream.on("data", (data) => {
  console.log("Получены данные:", data)
})

stream.on("end", () => {
  console.log("Поток завершен")
})

stream.on("error", (err) => {
  console.error("Ошибка:", err)
})

stream.write("Привет, мир!")
stream.end()
```

## Обработка ошибок

Событие `error` имеет особый статус в Node.js. Если произошло событие `error`, и для него нет обработчиков, Node.js выбросит исключение, что может привести к аварийному завершению программы.

```javascript
const EventEmitter = require("events")
const emitter = new EventEmitter()

// Обязательно добавляйте обработчик для события 'error'
emitter.on("error", (err) => {
  console.error("Произошла ошибка:", err)
  // Обработка ошибки без завершения программы
})

// Теперь генерация события error не приведет к аварийному завершению
emitter.emit("error", new Error("Что-то пошло не так"))
```

## Настройка максимального количества слушателей

По умолчанию EventEmitter выдает предупреждение, если на одно событие зарегистрировано более 10 слушателей. Это сделано для выявления потенциальных утечек памяти. Данное ограничение можно изменить:

```javascript
const EventEmitter = require("events")
const emitter = new EventEmitter()

// Установка максимального количества слушателей для конкретного экземпляра
emitter.setMaxListeners(20)

// Установка максимального количества слушателей для всех новых экземпляров
EventEmitter.defaultMaxListeners = 15

// Получение текущего ограничения
console.log(emitter.getMaxListeners())
```

## Примеры использования EventEmitter

### Простой логгер

```javascript
const EventEmitter = require("events")

class Logger extends EventEmitter {
  log(message) {
    this.emit("message", message)
  }
}

const logger = new Logger()

logger.on("message", (message) => {
  console.log("Лог:", message)
  // Можно сохранить в файл, отправить по сети и т.д.
})

logger.log("Приложение запущено")
logger.log("Получен запрос от пользователя")
```

### Управление очередью задач

```javascript
const EventEmitter = require("events")

class TaskQueue extends EventEmitter {
  constructor() {
    super()
    this.queue = []
    this.running = false
    this.on("next", this.next.bind(this))
  }

  add(task) {
    this.queue.push(task)
    if (!this.running) {
      this.emit("next")
    }
    return this
  }

  next() {
    if (this.queue.length === 0) {
      this.running = false
      this.emit("empty")
      return
    }

    const task = this.queue.shift()
    this.running = true

    task(() => {
      this.emit("next")
    })
  }
}

// Использование
const queue = new TaskQueue()

queue.on("empty", () => {
  console.log("Все задачи выполнены")
})

// Добавление задач в очередь
queue
  .add((done) => {
    console.log("Задача 1")
    setTimeout(done, 1000)
  })
  .add((done) => {
    console.log("Задача 2")
    setTimeout(done, 500)
  })
  .add((done) => {
    console.log("Задача 3")
    setTimeout(done, 200)
  })
```

### Асинхронное чтение из файла

```javascript
const EventEmitter = require("events")
const fs = require("fs")

class FileReader extends EventEmitter {
  constructor(filePath) {
    super()
    this.filePath = filePath
    this.lines = []
  }

  read() {
    fs.readFile(this.filePath, "utf8", (err, content) => {
      if (err) {
        this.emit("error", err)
        return
      }

      this.lines = content.split("\n")
      this.emit("ready", this.lines)

      // Генерируем событие для каждой строки
      this.lines.forEach((line, index) => {
        this.emit("line", line, index)
      })

      this.emit("end")
    })

    return this
  }
}

// Использование
const reader = new FileReader("example.txt")

reader.on("ready", (lines) => {
  console.log(`Файл содержит ${lines.length} строк`)
})

reader.on("line", (line, index) => {
  console.log(`${index + 1}: ${line}`)
})

reader.on("end", () => {
  console.log("Чтение завершено")
})

reader.on("error", (err) => {
  console.error("Ошибка чтения файла:", err)
})

reader.read()
```

## Важные моменты при работе с EventEmitter

1. **Обработка ошибок** - всегда добавляйте обработчик для события 'error', чтобы избежать аварийного завершения программы.
2. **Утечки памяти** - не забывайте удалять неиспользуемые обработчики, особенно в долгоживущих приложениях.
3. **Порядок выполнения** - обработчики выполняются в том порядке, в котором они были зарегистрированы, если не используются методы с префиксом 'prepend'.
4. **Асинхронность** - обработчики событий выполняются синхронно, но часто используются для организации асинхронных потоков данных.
5. **Контекст this** - при использовании стрелочных функций контекст this не привязывается к объекту EventEmitter, в отличие от обычных функций.

В Node.js многие встроенные модули наследуют от EventEmitter, включая HTTP-серверы, потоки (streams) и процессы, что делает событийно-ориентированное программирование естественным подходом при разработке на Node.js.

---

[[Назад]]
