---
title: Что делает process.nextTick() в Node.js?
draft: false
tags:
  - NodeJS
  - nextTick
  - starvation
info:
---
`process.nextTick()` — это специальный механизм в **Node.js**, который позволяет выполнить колбэк **немедленно после текущего блока кода**, но **до выполнения микрозадач (Promise.then) и макрозадач (setTimeout, setImmediate)**.

**Как работает `process.nextTick()`**

- **Код внутри `process.nextTick()` выполняется перед обработкой других микрозадач (Promise.then, queueMicrotask)**.

- Используется для **приоритетных задач**, которые должны быть обработаны **до** следующего оборота Event Loop.

- Может вызвать **"звёздную смерть" (starvation)**, если внутри `nextTick` бесконечно добавлять новые вызовы (так как Event Loop не сможет перейти к макрозадачам).

```javascript
console.log("Start");  

process.nextTick(() => {   
	console.log("nextTick 1"); 
});  

Promise.resolve().then(() => {   
	console.log("Promise"); 
});  

process.nextTick(() => {   
	console.log("nextTick 2"); 
});  

setTimeout(() => {   
	console.log("setTimeout"); 
}, 0);  

console.log("End");`
```

1. `"Start"` → выполняется синхронно.
2. `process.nextTick(() => { console.log("nextTick 1") })` → добавляется в очередь **nextTick**.
3. `Promise.resolve().then(() => { console.log("Promise") })` → добавляется в **очередь микрозадач**.
4. `process.nextTick(() => { console.log("nextTick 2") })` → добавляется в **очередь nextTick**.
5. `setTimeout(() => { console.log("setTimeout") }, 0);` → добавляется в **очередь макрозадач**.
6. `"End"` → выполняется синхронно.
7. **Очередь nextTick** выполняется **перед микрозадачами**:
    - `"nextTick 1"`
    - `"nextTick 2"`
8. **Очередь микрозадач (Promise)**:
    - `"Promise"`
9. **Очередь макрозадач (setTimeout)**:
    - `"setTimeout"`

