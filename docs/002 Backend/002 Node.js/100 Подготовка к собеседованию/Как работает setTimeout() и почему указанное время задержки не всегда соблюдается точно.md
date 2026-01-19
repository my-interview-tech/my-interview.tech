---
title: Как работает setTimeout() и почему указанное время задержки не всегда соблюдается точно
draft: false
tags:
  - "#NodeJS"
  - "#setTimeout"
  - "#setImmediate"
  - "#EventLoop"
  - "#асинхронность"
  - "#таймеры"
info:
  - "[Документация Node.js по таймерам](https://nodejs.org/api/timers.html)"
  - "[Event Loop и таймеры](https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/)"
  - "[MDN Web Docs: setTimeout](https://developer.mozilla.org/ru/docs/Web/API/setTimeout)"
---

Функция **`setTimeout(fn, delay)`** используется для **отложенного выполнения кода** после указанного времени `delay` (в миллисекундах). Однако в реальности задержка может быть **больше**, чем указано.

## Как setTimeout() работает в цикле событий (Event Loop)

1. **Код попадает в стек вызовов (Call Stack)**

   - При вызове `setTimeout()` таймер регистрируется, но сама функция не выполняется сразу.

2. **Таймер начинает отсчет времени (`delay`)**

   - Node.js использует **libuv** и **таймерную очередь (Timers Queue)** для управления таймерами.

3. **После истечения времени `delay`**

   - Функция **не выполняется мгновенно**, а **ставится в очередь (Timers Queue)**.

4. **Когда стек вызовов освобождается**
   - Event loop берет задачу из очереди и выполняет её.

**Важно**: Если в стеке вызовов есть другие задачи, `setTimeout()` придется ждать их завершения!

## Почему setTimeout() не всегда срабатывает ровно через delay?

### 1. Event Loop занят выполнением других задач

Если в основном потоке запущен сложный код, таймер придется ждать, пока стек вызовов освободится.

```javascript
setTimeout(() => console.log("Таймер сработал"), 10)

// Долгая синхронная задача
const start = Date.now()
while (Date.now() - start < 100) {} // 100 мс блокировки

console.log("Конец выполнения")
```

**Вывод:** Таймер должен был сработать через **10 мс**, но сработает **только после 100 мс**, так как поток был заблокирован.

### 2. Минимальная задержка в Node.js (~1 мс)

Даже при `setTimeout(fn, 0)` код не выполнится мгновенно, а **будет ждать хотя бы один цикл event loop**.

```javascript
setTimeout(() => console.log("setTimeout с 0 мс"), 0)
console.log("Этот лог выполнится первым")
```

**Вывод:** `setTimeout(0)` выполнится **после основного кода**, но не мгновенно.

### 3. Приоритетность очередей Event Loop

**Если код связан с I/O (например, `fs.readFile`)**, то `setImmediate()` может выполниться раньше, чем `setTimeout()`.

```javascript
const fs = require("fs")

fs.readFile(__filename, () => {
  setTimeout(() => console.log("setTimeout"), 0)
  setImmediate(() => console.log("setImmediate"))
})
```

**Вывод:** `setImmediate()` выполнится **раньше** `setTimeout()`, так как у них разные очереди, и в контексте I/O колбэка очередь Check (для setImmediate) обрабатывается раньше.

## Факторы, влияющие на точность setTimeout()

| Фактор                             | Почему влияет на `setTimeout()`                                                                               |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| **Загруженность Event Loop**       | Если поток блокируется, таймер ждет                                                                           |
| **Минимальная задержка в Node.js** | Даже `setTimeout(fn, 0)` выполняется **не мгновенно**                                                         |
| **Разные очереди Event Loop**      | `setTimeout()` работает в **Timers Queue**, а `setImmediate()` — в **Check Queue** (может выполниться раньше) |
| **Приоритет других задач**         | Микрозадачи (Promise, process.nextTick) выполняются раньше таймеров                                           |

## Практические решения

### Для реализации точных интервалов

```javascript
function preciseSetTimeout(callback, delay) {
  const start = Date.now()

  function check() {
    const diff = Date.now() - start
    if (diff >= delay) {
      callback()
    } else {
      setImmediate(check)
    }
  }

  setImmediate(check)
}
```

### Для периодических задач без наложения

```javascript
function setIntervalWithoutOverlap(fn, delay) {
  let timer

  function next() {
    timer = setTimeout(() => {
      fn()
      next()
    }, delay)
  }

  next()

  return {
    clear: () => clearTimeout(timer),
  }
}
```

## Заключение

`setTimeout()` **не гарантирует точную задержку**, а лишь ставит код в очередь **не раньше указанного времени**. Реальная задержка зависит от **загруженности Event Loop** и **других задач в очереди**. Для критичных к времени операций следует использовать более точные механизмы или компенсировать эти ограничения в коде.

---

[[002 Node.js|Назад]]
