---
title: Task_eventloop - 33
draft: false
tags:
  - "#JavaScript"
  - "#taskJS"
  - "#EventLoop"
---
```JS
const promise = new Promise((resolve, reject) => {
    console.log(1);

    setTimeout(() => {
        console.log(1);

        resolve(2);

        console.log(3);
    }, 0);

    console.log(4);
});

promise.then((res) => console.log(res));

console.log(5);
```

___

[[011 Решение задач JS, TS и React|Назад]]