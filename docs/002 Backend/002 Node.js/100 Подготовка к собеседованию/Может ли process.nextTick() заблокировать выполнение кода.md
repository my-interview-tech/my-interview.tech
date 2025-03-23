---
title: Может ли process.nextTick() заблокировать выполнение кода?
draft: true
tags:
  - NodeJS
  - nextTick
  - EventLoop
  - setImmediate
info:
---
`process.nextTick()` может заблокировать выполнение кода, если используется **рекурсивно**.

Проблема в том, что `nextTick()` выполняет колбэки **до следующего оборота Event Loop**, поэтому, если внутри него постоянно вызывать `process.nextTick()`, Event Loop **не сможет перейти к другим задачам** (таймерам, I/O, промисам).

**Пример блокировки:**

```javascript
process.nextTick(function repeat() {   
	console.log("Blocked!");   
	process.nextTick(repeat); // Бесконечный цикл 
});
```

**Решение:**

- Использовать `setImmediate()` вместо `nextTick()`, чтобы дать Event Loop обработать другие задачи.
- Ограничивать количество вызовов `nextTick()`.