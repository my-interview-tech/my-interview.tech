---
title: Напишите код который подсчитывает количество обработчиков для события error
draft: false
tags:
  - "#NodeJS"
  - "#EventEmitter"
  - "#события"
  - "#обработчики"
  - "#listenerCount"
info:
  - "[Документация Node.js по EventEmitter](https://nodejs.org/api/events.html)"
  - "[Паттерн событий в Node.js](https://nodejs.dev/learn/the-nodejs-event-emitter)"
  - "[Работа с listeners в Node.js](https://nodejs.org/api/events.html#events_emitter_listenercount_eventname)"
---

Для подсчёта количества обработчиков для события `error` можно воспользоваться методом `listenerCount()` объекта `EventEmitter`, который возвращает количество обработчиков для указанного события:

```javascript
const EventEmitter = require("events")

const emitter = new EventEmitter()

// Добавляем обработчики для события 'error'
emitter.on("error", () => {
  console.log("Обработчик 1")
})

emitter.on("error", () => {
  console.log("Обработчик 2")
})

// Подсчитываем количество обработчиков для события 'error'
const count = emitter.listenerCount("error")
console.log(`Количество обработчиков для события 'error': ${count}`)

// Генерируем событие 'error'
emitter.emit("error")
```

### Пояснение:

1. Мы создаём экземпляр `EventEmitter`.
2. Добавляем два обработчика для события `error`.
3. Используем метод `listenerCount()` для подсчёта количества обработчиков события `error`.
4. После этого генерируем событие `error`, чтобы продемонстрировать работу обработчиков.

### Результат:

В консоли будет выведено:

```
Количество обработчиков для события 'error': 2
Обработчик 1
Обработчик 2
```

Метод `listenerCount()` возвращает количество обработчиков для указанного события.

---

[[002 Node.js|Назад]]
