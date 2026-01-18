---
uid: K6Q9Uqyoco95ub_Oc17xo
title: Task_eventloop - 11_1
tags:
  - "#JavaScript"
  - "#taskJS"
  - "#EventLoop"
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
const asyncMethod = (el) => {
  return new Promise((resolve) => setTimeout(() => resolve(el * 2), 0));
};

const someMethod = (data) => {
  const results = [];

  data.forEach(async (el) => {
    let r = await asyncMethod(el);
    console.log(r, el);
    results.push(r);
  });
  return results;
};

const start = () => {
  const results = someMethod([1, 2, 4]);
  if (results instanceof Promise) {
    results.then((res) => console.log(res));
  } else {
    console.log(results);
  }
};

start();
```

---

[[011 Решение задач JS, TS и React|Назад]]
