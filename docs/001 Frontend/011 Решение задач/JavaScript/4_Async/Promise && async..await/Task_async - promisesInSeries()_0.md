---
uid: HcbhoNw4Vu2cHBu8QOk8h
title: Task_async - promisesInSeries()_0
tags:
  - "#JavaScript"
  - "#taskJS"
  - "#promise"
  - "#unknownINC"
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
/* PromisesInSeries 
Напишите функцию, которая принимает массив асинхронных функций и последовательно(следующая начинается, когда закончилась предыдущая) вызывает их, передавая в аргументы результат вызова предыдущей функции. 
Пример: */

const firstPromise = () =>
  new Promise((resolve) => setTimeout(() => resolve(300), 300));

const secondPromise = (a) =>
  new Promise((resolve) => setTimeout(() => resolve(a + 200), 200));

const thirdPromise = (b) =>
  new Promise((resolve) => setTimeout(() => resolve(b ** 2), 100));

const promisesInSeries = async (promises) => {
  let res;
  for (let i = 0; i < promises.length; i++) {
    res = await promises[i](res);
  }

  return res;

  // YOUR CODE HERE
};

promisesInSeries([firstPromise, secondPromise, thirdPromise]).then(console.log);
// (300 + 200)** 2 = 250 000
```

\*\*Ответ

```js

```

---

[[011 Решение задач JS, TS и React|Назад]]
