---
title: Task_eventloop - 35
draft: false
tags:
  - "#JavaScript"
  - "#taskJS"
  - "#EventLoop"
---
```JS
const myPromise = (delay) => new Promise((res, rej) => setTimeout(res, delay))

setTimeout(() => console.log(1), 1000);

myPromise(1000).then(() => console.log(2));

setTimeout(() => console.log(3), 100);

myPromise(2000).then(() => console.log(4)); 

setTimeout(() => console.log(5), 2000);

myPromise(1000).then(() => console.log(6));

setTimeout(() => console.log(7), 1000);

myPromise(5000).then(() => console.log(8));
```

___

[[011 Решение задач JS, TS и React|Назад]]