---
title: Task_eventloop - 5
draft: false
tags:
  - "#JavaScript"
  - "#taskJS"
  - "#EventLoop"
  - "#async"
  - "#промсвязьбанк"
---
```js
//! что будет в консоли, что выполнится

Promise.resolve("a")
    .catch((v) => {
        throw v + "b";
    })
    .catch((v) => v + "c")
    .then((v) => v + "d")
    .then(() => console.log("e"));

console.log("f");
```

___

[[011 Решение задач JS, TS и React|Назад]]