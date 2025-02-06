---
title: Task_eventloop - 29
draft: false
tags:
  - "#JavaScript"
  - "#taskJS"
  - "#EventLoop"
---
```JS
console.log(1);

setTimeout(() => console.log(2), 0);

Promise
  .resolve()
  .then(() => console.log(3))
  .then(() => console.log(4));


console.log(5);
```

___

[[011 Решение задач JS, TS и React|Назад]]