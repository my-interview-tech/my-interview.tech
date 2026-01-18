---
uid: 29P7oa6KIbCfbzATj9FvK
title: Task_async - doSomething()_0
tags:
  - "#JavaScript"
  - "#taskJS"
  - "#async"
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
/*
Вывести в консоль среднее время, за которое выполняются p1-p4 Обратите внимание, что doSomenthing() выполняется(предоставит время) в 50% случаев, а в остальных будет reject
*/

const doSomething = (ms) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() <= 0.5) {
        reject("error");
      } else {
        resolve(ms);
      }
    }, ms);
  });
};

const getDelay = () => {
  let rand = 1000 + Math.random() * 2000;
  return Math.floor(rand);
};

const p1 = doSomething(getDelay());
const p2 = doSomething(getDelay());
const p3 = doSomething(getDelay());
const p4 = doSomething(getDelay());
```

\*\*Ответ

```js

```

---

[[011 Решение задач JS, TS и React|Назад]]
