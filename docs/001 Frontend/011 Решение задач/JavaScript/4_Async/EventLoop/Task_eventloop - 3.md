---
title: Task_eventloop - 3
draft: false
tags:
  - JavaScript
  - "#taskJS"
  - "#EventLoop"
  - "#itOne"
---
```js
//! task
//! Что будет в консоли?

setTimeout(() => console.log(1));

function run() {
    return Promise.resolve(10).then(() => run());
}

run();

console.log(2);
//  // также нет 
```

___

[[011 Решение задач JS, TS и React|Назад]]