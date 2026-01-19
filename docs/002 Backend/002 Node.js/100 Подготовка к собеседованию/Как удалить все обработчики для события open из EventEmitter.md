---
title: Как удалить все обработчики для события open из EventEmitter
draft: false
tags:
  - "#NodeJS"
  - "#EventEmitter"
  - "#события"
  - "#обработчики"
  - "#removeAllListeners"
info:
  - "[Документация Node.js по EventEmitter](https://nodejs.org/api/events.html#emitterremovealllistenersname)"
---

Чтобы удалить все обработчики для конкретного события (например, `open`) из объекта `EventEmitter`, можно использовать метод **`removeAllListeners(event)`**.

## Пример:

```javascript
const EventEmitter = require("events")
const emitter = new EventEmitter()

// Добавляем несколько обработчиков для события 'open'
emitter.on("open", () => {
  console.log("Обработчик 1 для события open")
})

emitter.on("open", () => {
  console.log("Обработчик 2 для события open")
})

emitter.once("open", () => {
  console.log("Обработчик 3 для события open (один раз)")
})

// Удаляем все обработчики для события 'open'
emitter.removeAllListeners("open")

// Генерируем событие 'open', обработчики не сработают
emitter.emit("open")
// Ничего не происходит
```

## Пояснение:

- `removeAllListeners('open')` удаляет все обработчики, связанные с событием `open`.
- После вызова `removeAllListeners` обработчики, подписанные на событие `open`, больше не будут вызываться при эмиссии этого события.
- Если вызвать `removeAllListeners()` без аргументов, будут удалены обработчики для всех событий.

## Дополнительные возможности

```javascript
// Получение количества слушателей для события 'open'
const listenerCount = emitter.listenerCount("open")
console.log(`Количество обработчиков: ${listenerCount}`) // После removeAllListeners будет 0

// Удаление только одного обработчика
const handler = () => console.log("Конкретный обработчик")
emitter.on("open", handler)
emitter.removeListener("open", handler) // Удаляет только указанный обработчик
```

Этот метод полезен, когда необходимо очистить все слушатели для определённого события или для всех событий в объекте `EventEmitter`.

---

[[002 Node.js|Назад]]
