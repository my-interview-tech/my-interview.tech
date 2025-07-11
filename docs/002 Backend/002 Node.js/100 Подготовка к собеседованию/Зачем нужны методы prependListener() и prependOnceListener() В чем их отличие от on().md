---
title: Зачем нужны методы prependListener() и prependOnceListener() В чем их отличие от on()
draft: false
tags:
  - "#NodeJS"
  - "#EventEmitter"
  - "#events"
  - "#асинхронность"
  - "#обработка_событий"
info:
  - https://nodejs.org/api/events.html#emitterprependlistenereventname-listener
  - https://nodejs.org/api/events.html#emitterprependendlistenereventname-listener
---

Методы `prependListener()` и `prependOnceListener()` в Node.js позволяют добавлять обработчики событий **в начало очереди** слушателей для события. Это отличается от стандартного метода `on()`, который добавляет слушателей **в конец очереди**.

### 1. **`prependListener(event, listener)`**

- **Назначение**: Добавляет обработчик события в начало очереди обработчиков для данного события.
- **Особенность**: Обработчик сработает первым, если несколько обработчиков подписаны на одно и то же событие.

#### Пример:

```javascript
const EventEmitter = require("events")
const emitter = new EventEmitter()

// Обычный обработчик
emitter.on("event", () => {
  console.log("Обработчик 1")
})

// Обработчик, который будет вызван первым
emitter.prependListener("event", () => {
  console.log("Обработчик 2")
})

// Генерация события 'event'
emitter.emit("event")
// Вывод:
// Обработчик 2
// Обработчик 1
```

### 2. **`prependOnceListener(event, listener)`**

- **Назначение**: Добавляет обработчик события в начало очереди, но этот обработчик будет вызван **только один раз**, а затем удалён автоматически.
- **Особенность**: В отличие от `prependListener()`, обработчик добавляется в начало очереди, но будет удалён после первого вызова.

#### Пример:

```javascript
const EventEmitter = require("events")
const emitter = new EventEmitter()

// Обычный обработчик
emitter.on("event", () => {
  console.log("Обработчик 1")
})

// Обработчик, который будет вызван первым, но только один раз
emitter.prependOnceListener("event", () => {
  console.log("Обработчик 2")
})

// Генерация события 'event'
emitter.emit("event")
// Вывод:
// Обработчик 2
// Обработчик 1

// Генерация события 'event' второй раз
emitter.emit("event")
// Вывод:
// Обработчик 1
```

### Разница с методом `on()`:

- **`on()`** добавляет обработчик события в **конец** очереди. Все слушатели будут вызваны в том порядке, в котором они были добавлены.
- **`prependListener()`** и **`prependOnceListener()`** добавляют обработчики в **начало** очереди, при этом `prependOnceListener()` автоматически удаляет обработчик после его первого вызова.

### Когда использовать `prependListener()` и `prependOnceListener()`:

- Если важно, чтобы некоторые обработчики всегда выполнялись **до** других обработчиков (например, для логирования, предварительных проверок или условий), можно использовать `prependListener()`.
- Если обработчик должен сработать только один раз, но должен быть первым, например, для обработки события и выполнения какой-то одноразовой логики до других, можно использовать `prependOnceListener()`.

---

[[002 Node.js|Назад]]
