---
title: Когда лучше использовать process.nextTick() а когда setImmediate()?
draft: false
tags:
  - NodeJS
  - nextTick
  - setImmediate
info:
---

**Когда использовать `process.nextTick()`:**

* Когда нужно выполнить код **до следующего оборота Event Loop**.  
* При обработке ошибок и чистке ресурсов перед переходом к другим задачам.  
* Когда необходимо **гарантированно выполнить код перед Promise.then и setTimeout**.

**Когда не использовать `process.nextTick()`:**

* Если вызывается **рекурсивно**, это может заблокировать Event Loop и затормозить выполнение программы.  

Злоупотребление `nextTick()` может привести к **"голоданию" (starvation)**, когда Node.js **не сможет обработать макрозадачи**.

**Плохой пример (зависнет навсегда):**

```javascript
function recursive() {   
	process.nextTick(recursive); 
} 

recursive(); // Event Loop не сможет перейти к другим задачам`
```
---

**`process.nextTick()` vs `setImmediate()`**

|Функция|Когда выполняется?|
|---|---|
|`process.nextTick()`|**Сразу после текущего кода**, перед микрозадачами|
|`setImmediate()`|**На следующем этапе Event Loop**, после макрозадач|

Пример:

```javascript
process.nextTick(() => console.log("nextTick")); 

setImmediate(() => console.log("setImmediate"));`
```

**Вывод:**

```nginx
nextTick setImmediate
```

`process.nextTick()` срабатывает **раньше**, чем `setImmediate()`.
