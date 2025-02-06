---
title: Task_eventloop - 9
draft: false
tags:
  - "#JavaScript"
  - "#taskJS"
  - "#EventLoop"
  - "#itOne"
---
```js
// // В каком порядке будут выводится console.log и почему?

setTimeout(() => {
    console.log("timeOut");
}, 0);

console.log(1);

new Promise((resolve) => {
    console.log("Promise");
    setTimeout(() => {
        console.log(777);
        resolve();
    }, 0);
})
    .then(() => {
        console.log("then1");
    })
    .then(() => {
        console.log("then2");
    });

console.log(4);

setTimeout(() => {
    console.log("timeOut2");
}, 0);
```

___

[[011 Решение задач JS, TS и React|Назад]]