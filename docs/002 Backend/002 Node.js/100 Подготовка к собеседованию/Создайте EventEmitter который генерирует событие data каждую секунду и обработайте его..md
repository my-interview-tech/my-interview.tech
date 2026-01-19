---
title: Создайте EventEmitter который генерирует событие data каждую секунду и обработайте его.
draft: false
tags:
  - "#NodeJS"
  - "#EventEmitter"
  - "#events"
  - "#асинхронность"
  - "#setInterval"
  - "#обработка-событий"
info:
  - "[Документация по EventEmitter в Node.js](https://nodejs.org/api/events.html)"
  - "[Руководство по работе с событиями в Node.js](https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/)"
  - "[Лучшие практики использования EventEmitter](https://nodejs.org/en/docs/guides/dont-block-the-event-loop/)"
---

Вот пример кода, который создаёт объект `EventEmitter`, генерирует событие `data` каждую секунду и обрабатывает его:

```javascript
const EventEmitter = require("events")

class DataEmitter extends EventEmitter {
  start() {
    setInterval(() => {
      // Генерируем событие 'data' каждую секунду
      this.emit("data", `Data emitted at ${new Date().toLocaleTimeString()}`)
    }, 1000)
  }
}

// Создаём экземпляр DataEmitter
const dataEmitter = new DataEmitter()

// Подписываемся на событие 'data'
dataEmitter.on("data", (message) => {
  console.log(message) // Выводим данные в консоль
})

// Запускаем генерацию события
dataEmitter.start()
```

### Пояснение:

1. **DataEmitter** наследует от `EventEmitter` и имеет метод `start()`, который каждую секунду генерирует событие `data` с текущей меткой времени.
2. Мы подписываемся на событие `data` с помощью метода `on()` и выводим сообщение в консоль.
3. Событие генерируется с интервалом 1 секунду благодаря `setInterval()`.

### Результат:

Каждую секунду в консоли будет выводиться сообщение с текущим временем, например:

```
Data emitted at 14:25:30
Data emitted at 14:25:31
Data emitted at 14:25:32
...
```

---

[[002 Node.js|Назад]]
