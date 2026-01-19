---
title: В каких случаях setImmediate() может выполняться раньше чем setTimeout(fn, 0) ?
draft: false
tags:
  - NodeJS
  - setImmediate
  - setTimeout
  - EventLoop
info:
---

В **Node.js** `setImmediate()` и `setTimeout(fn, 0)` добавляют колбэки в **разные очереди** Event Loop:

- **`setImmediate()`** → в очередь **Check**.
- **`setTimeout(fn, 0)`** → в очередь **Timers**.

**`setImmediate()` выполняется раньше, если код выполняется внутри I/O-фазы

Если `setImmediate()` и `setTimeout(fn, 0)` вызываются **внутри I/O-колбэка**, то `setImmediate()` выполнится **раньше**, потому что Node.js обрабатывает `setImmediate()` сразу после I/O перед `setTimeout()`.

```javascript
const fs = require("fs");

fs.readFile(__filename, () => {
	setTimeout(() => console.log("setTimeout"), 0);
	setImmediate(() => console.log("setImmediate"));
});`
```

```
setImmediate setTimeout
```

Здесь `setImmediate()` выполняется раньше, потому что он выполняется в **Check-фазе** после I/O, а `setTimeout(0)` откладывается до следующего цикла в **Timers-фазе**.

---

**Когда `setTimeout(fn, 0)` выполняется раньше?**

Если оба вызова находятся **в основном потоке (не внутри I/O)**, порядок их выполнения не гарантирован — зависит от состояния Event Loop.

Пример:

```javascript
setTimeout(() => console.log("setTimeout"), 0)
setImmediate(() => console.log("setImmediate"))
```

Результат может быть разным:

```
setTimeout
setImmediate
```

или

```
setImmediate
setTimeout
```

**Вывод:**  
`setImmediate()` гарантированно выполняется раньше `setTimeout(fn, 0)`, только если оба вызова находятся внутри I/O-колбэка. В остальных случаях порядок не определён.

---

[[002 Node.js|Назад]]
