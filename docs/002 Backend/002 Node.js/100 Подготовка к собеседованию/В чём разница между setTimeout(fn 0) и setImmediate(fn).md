---
title: В чём разница между setTimeout(fn, 0) и setImmediate(fn)?
draft: false
tags:
  - "#NodeJS"
  - "#setTimeout"
  - "#setImmediate"
  - "#EventLoop"
  - "#асинхронность"
info:
  - "[Документация Node.js: setTimeout](https://nodejs.org/api/timers.html#settimeoutcallback-delay-args)"
  - "[Документация Node.js: setImmediate](https://nodejs.org/api/timers.html#setimmediatecallback-args)"
  - "[Руководство по Event Loop в Node.js](https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/)"
---

# Разница между setTimeout(fn, 0) и setImmediate(fn)

Обе функции используются для **отложенного выполнения кода**, но работают по-разному из-за особенностей **event loop** в Node.js.

## setTimeout(fn, 0)

**setTimeout(fn, 0)** добавляет функцию `fn` в **таймерную очередь (Timers Queue)** и выполняет её **минимум через 1 мс**.

```javascript
setTimeout(() => console.log("setTimeout"), 0)
```

**Важно:** `setTimeout(fn, 0)` не выполняется сразу, а ждет завершения текущего кода и других задач event loop.

## setImmediate(fn)

**setImmediate(fn)** добавляет `fn` в **очередь `check`** и выполняет **сразу после I/O операций** (но перед `setTimeout`).

```javascript
setImmediate(() => console.log("setImmediate"))
```

**Важно:** если вызвать `setImmediate()` в основном потоке, он **обычно** выполняется **раньше `setTimeout(fn, 0)`**.

## Разница в приоритете выполнения

Порядок выполнения этих функций зависит от контекста:

```javascript
const fs = require("fs")

fs.readFile(__filename, () => {
  setTimeout(() => console.log("setTimeout"), 0)
  setImmediate(() => console.log("setImmediate"))
})
```

### Вывод:

```
setImmediate
setTimeout
```

После завершения I/O операции (`fs.readFile`) **сначала выполняется `setImmediate()`**, а уже потом `setTimeout()`.

## Сравнительная таблица

|                      | **setTimeout(fn, 0)**                                             | **setImmediate(fn)**                                  |
| -------------------- | ----------------------------------------------------------------- | ----------------------------------------------------- |
| **Где выполняется**  | В **таймерной** очереди                                           | В **check** очереди                                   |
| **Когда вызывается** | После **минимальной задержки** (обычно 1 мс)                      | **Сразу после I/O операций**                          |
| **Что быстрее?**     | Может быть медленнее, если в таймерной очереди есть другие задачи | Обычно выполняется **раньше**, если вызван внутри I/O |
| **Фаза Event Loop**  | Timers                                                            | Check                                                 |
| **Приоритет**        | Ниже (выполняется позже в цикле событий)                          | Выше (для операций после I/O)                         |

## Когда использовать?

- **setTimeout(fn, 0)** – если нужно просто отложить выполнение кода.
- **setImmediate(fn)** – если код должен выполняться **сразу после I/O операций**.

## Пример практического использования

```javascript
// Обработка данных после чтения файла
fs.readFile("large-file.json", (err, data) => {
  if (err) throw err

  // Используем setImmediate для обработки после I/O
  setImmediate(() => {
    const parsed = JSON.parse(data)
    processData(parsed)
  })

  // Это выполнится после setImmediate
  setTimeout(() => {
    console.log("Обработка завершена")
  }, 0)
})

// В основном потоке порядок выполнения менее предсказуем
setTimeout(() => console.log("Main setTimeout"), 0)
setImmediate(() => console.log("Main setImmediate"))
```

## Итог

- `setImmediate()` обычно выполняется **раньше**, если вызывается в контексте I/O операций.
- В основном потоке порядок выполнения зависит от множества факторов и может быть непредсказуемым.
- Выбор между этими методами зависит от требуемого порядка выполнения относительно других частей event loop.

---

[[002 Node.js|Назад]]
