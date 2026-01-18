---
uid: X_7TXn9p6QsEZbXWaZIT8
title: Task_eventloop - 1_1
tags:
  - "#JavaScript"
  - "#taskJS"
  - "#EventLoop"
  - "#promiseAll"
  - "#promiseAny"
  - "#promiseRace"
  - "#promiseAllSettled"
draft: false
technology: Решение задач
specialty: Frontend
tools: []
order: 0
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
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

---

[[011 Решение задач JS, TS и React|Назад]]
