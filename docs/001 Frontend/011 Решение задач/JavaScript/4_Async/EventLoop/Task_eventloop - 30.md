---
title: Task_eventloop - 30
draft: false
tags:
  - "#JavaScript"
  - "#taskJS"
  - "#EventLoop"
---
```JS
Promise
    .resolve()
    .then(() => console.log(1))
    .then(() =>
        setTimeout(() =>
            console.log(2), 0)
    )
    .then(() => console.log(3));

Promise
    .resolve()
    .then(() => console.log(4))
    .then(() =>
        setTimeout(() =>
            console.log(5), 0)
    )
    .then(() => console.log(6));
```

___

[[011 Решение задач JS, TS и React|Назад]]