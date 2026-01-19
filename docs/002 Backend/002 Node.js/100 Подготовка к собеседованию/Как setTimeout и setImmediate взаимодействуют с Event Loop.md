---
title: Как setTimeout и setImmediate взаимодействуют с Event Loop
draft: false
tags:
  - "#NodeJS"
  - "#Event-Loop"
  - "#setTimeout"
  - "#setImmediate"
  - "#асинхронность"
info:
  - "[Документация Node.js - Event Loop](https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/)"
  - "[Официальная документация Node.js по setTimeout](https://nodejs.org/api/timers.html#settimeoutcallback-delay-args)"
  - "[Официальная документация Node.js по setImmediate](https://nodejs.org/api/timers.html#setimmediatecallback-args)"
---

**`setTimeout`** и **`setImmediate`** — это две асинхронные функции в Node.js, которые взаимодействуют с Event Loop по-разному, определяя порядок и время выполнения колбэков.

## setTimeout в Event Loop

**`setTimeout(callback, delay)`** — планирует выполнение колбэка после указанного временного интервала (в миллисекундах).

- Колбэки `setTimeout` обрабатываются в фазе **Timers** цикла событий
- Минимальная задержка составляет **1 мс** (даже если указан 0)
- Планируется на самое раннее возможное время, но не гарантирует точное время исполнения

```javascript
console.log("Начало")

setTimeout(() => {
  console.log("setTimeout")
}, 0)

console.log("Конец")

// Вывод:
// Начало
// Конец
// setTimeout
```

## setImmediate в Event Loop

**`setImmediate(callback)`** — планирует немедленное выполнение колбэка после завершения текущей фазы событий ввода-вывода.

- Колбэки `setImmediate` обрабатываются в отдельной фазе **Check** цикла событий
- Всегда выполняются после операций ввода-вывода в текущем цикле
- Предназначен для выполнения кода в следующем цикле событий сразу после завершения I/O операций

```javascript
console.log("Начало")

setImmediate(() => {
  console.log("setImmediate")
})

console.log("Конец")

// Вывод:
// Начало
// Конец
// setImmediate
```

## Порядок выполнения: setTimeout vs setImmediate

Порядок выполнения `setTimeout(fn, 0)` и `setImmediate(fn)` может быть **непредсказуемым**, если они вызываются в основном модуле:

```javascript
setTimeout(() => console.log("setTimeout"), 0)
setImmediate(() => console.log("setImmediate"))

// Порядок вывода может меняться при каждом запуске
```

Однако внутри колбэка ввода-вывода, `setImmediate` **всегда выполняется перед** `setTimeout`:

```javascript
const fs = require("fs")

fs.readFile(__filename, () => {
  setTimeout(() => console.log("setTimeout"), 0)
  setImmediate(() => console.log("setImmediate"))
})

// Вывод всегда будет:
// setImmediate
// setTimeout
```

## Фазы Event Loop и место setTimeout и setImmediate

Event Loop в Node.js проходит через следующие фазы:

1. **Timers**: Выполняются колбэки `setTimeout` и `setInterval`
2. **Pending callbacks**: Выполняются отложенные I/O колбэки
3. **Idle, prepare**: Внутренние операции
4. **Poll**: Получение новых событий I/O, выполнение связанных колбэков
5. **Check**: Здесь выполняются колбэки `setImmediate`
6. **Close callbacks**: Обработчики закрытия соединений

Таким образом, `setTimeout` и `setImmediate` выполняются в разных фазах цикла событий, что объясняет их поведение в разных контекстах.

---

[[002 Node.js|Назад]]
