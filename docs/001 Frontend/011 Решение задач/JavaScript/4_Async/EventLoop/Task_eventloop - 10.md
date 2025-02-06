---
title: Task_eventloop - 10
draft: false
tags:
  - "#JavaScript"
  - "#taskJS"
  - "#EventLoop"
  - "#unknownINC"
---
```js
//! Что будет в консоли?

const a = setTimeout(() => console.log(2), 2000);
const d = setTimeout(() => console.log(6), 1000);

const c = new Promise( (resolve) => {
    setTimeout(() => resolve(), 1000);
    console.log(4);
 });
 c.then(() => console.log(1));

 const b = setTimeout(() => console.log(5), 1000);

 console.log(3);
```

___

[[011 Решение задач JS, TS и React|Назад]]