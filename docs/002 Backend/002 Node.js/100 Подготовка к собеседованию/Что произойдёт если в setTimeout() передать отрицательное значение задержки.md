---
title: Что произойдёт если в setTimeout() передать отрицательное значение задержки?
draft: true
tags:
  - NodeJS
  - setTimeout
info:
---
Если в `setTimeout()` передать отрицательное значение задержки, оно **будет интерпретировано как 0**.

**Как работает `setTimeout()` с отрицательной задержкой?**

```javascript
setTimeout(() => console.log("Executed!"), -100); 

console.log("Start");`
```

**Вывод в консоли:**

```sql
Start Executed!
```

**Почему так?**
- Node.js и браузеры приводят отрицательные значения к **0**.
- Фактически, это равносильно `setTimeout(fn, 0)`, то есть выполнение колбэка **на следующем обороте Event Loop** после текущего кода и микрозадач.

**Что важнее?**  
Даже при `setTimeout(fn, 0)`, **промисы и `process.nextTick()` выполняются раньше**:

```javascript
setTimeout(() => console.log("setTimeout"), -1); 

Promise.resolve().then(() => console.log("Promise")); 

console.log("Sync Code");
```

**Вывод:**

```javascript
Sync Code Promise setTimeout
```

Передача отрицательной задержки в `setTimeout()` приведёт к тому, что таймер **будет выполнен как можно скорее, но не мгновенно**, а на следующем обороте Event Loop.