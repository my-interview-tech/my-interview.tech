---
title: Task_eventloop - 1
draft: false
tags:
  - "#JavaScript"
  - "#taskJS"
  - "#EventLoop"
  - "#promiseAll"
  - "#promiseAny"
  - "#promiseRace"
  - "#promiseAllSettled"
---
```js
const firstPromise = new Promise((resolve, reject) => {
    setTimeout(resolve, 500, "один");
});

const secondPromise = new Promise((resolve, reject) => {
    setTimeout(reject, 100, "два");
});

Promise.all([firstPromise, secondPromise])
    .then((res) => console.log(res))
    .catch((err) => console.log(err)); //
Promise.allSettled([firstPromise, secondPromise])
    .then((res) => console.log(res))
    .catch((err) => console.log(err)); // 
Promise.any([firstPromise, secondPromise])
    .then((res) => console.log(res))
    .catch((err) => console.log(err)); // 
Promise.race([firstPromise, secondPromise])
    .then((res) => console.log(res))
    .catch((err) => console.log(err)); // 
```

___

[[011 Решение задач JS, TS и React|Назад]]