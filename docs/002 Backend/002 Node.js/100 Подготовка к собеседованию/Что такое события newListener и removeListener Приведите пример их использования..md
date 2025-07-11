---
title: Что такое события newListener и removeListener Приведите пример их использования.
draft: false
tags:
  - "#NodeJS"
  - "#EventEmitter"
  - "#events"
  - "#обработка-событий"
  - "#newListener"
  - "#removeListener"
info:
  - "[Документация по EventEmitter в Node.js](https://nodejs.org/api/events.html#event-newlistener)"
  - "[Руководство по событиям в Node.js](https://nodejs.org/en/docs/guides/event-driven-architecture/)"
  - "[Особые события EventEmitter](https://nodejs.org/api/events.html#events_event_removelistener)"
---

В Node.js объекты `EventEmitter` имеют два специальных события: **`newListener`** и **`removeListener`**. Эти события позволяют отслеживать добавление и удаление слушателей для событий.

### 1. **`newListener`**

- Это событие генерируется каждый раз, когда добавляется новый обработчик для какого-либо события. Оно позволяет вам отслеживать, когда добавляется новый слушатель, и даже выполнять какие-то действия до или после добавления слушателя.

#### Пример использования `newListener`:

```javascript
const EventEmitter = require("events")
const emitter = new EventEmitter()

// Подписка на событие 'newListener'
emitter.on("newListener", (event, listener) => {
  console.log(`Добавлен новый обработчик для события "${event}"`)
})

// Добавляем обработчик для события 'event1'
emitter.on("event1", () => {
  console.log("Событие event1 обработано")
})

// Добавляем обработчик для события 'event2'
emitter.on("event2", () => {
  console.log("Событие event2 обработано")
})

// В консоли будет:
// Добавлен новый обработчик для события "event1"
// Добавлен новый обработчик для события "event2"
```

Когда добавляется новый обработчик для какого-то события, генерируется событие `newListener`, и мы можем обработать его.

### 2. **`removeListener`**

- Это событие генерируется каждый раз, когда удаляется слушатель для какого-либо события. Оно позволяет отслеживать, когда удаляются обработчики событий, что может быть полезно для динамического управления слушателями.

#### Пример использования `removeListener`:

```javascript
const EventEmitter = require("events")
const emitter = new EventEmitter()

// Подписка на событие 'removeListener'
emitter.on("removeListener", (event, listener) => {
  console.log(`Удален обработчик для события "${event}"`)
})

// Добавляем обработчик для события 'event1'
const handler1 = () => {
  console.log("Событие event1 обработано")
}
emitter.on("event1", handler1)

// Удаляем обработчик для события 'event1'
emitter.removeListener("event1", handler1)

// В консоли будет:
// Удален обработчик для события "event1"
```

После того как обработчик для события `event1` был удалён, генерируется событие `removeListener`.

### Резюме:

- **`newListener`** — генерируется при добавлении нового слушателя для события.
- **`removeListener`** — генерируется при удалении слушателя для события.

Эти события полезны для отслеживания динамических изменений в обработчиках событий и могут быть использованы, например, для логирования или реализации сложной логики управления событиями.

---

[[002 Node.js|Назад]]
