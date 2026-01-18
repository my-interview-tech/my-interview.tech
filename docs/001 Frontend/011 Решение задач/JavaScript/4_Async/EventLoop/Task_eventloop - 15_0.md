---
uid: "-FuUlcZbsvz_n0WijE1AI"
title: Task_eventloop - 15_0
tags:
  - "#JavaScript"
  - "#taskJS"
  - "#EventLoop"
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
//! Что будет в консоли?

try {
  new Promise((res, rej) => {
    a++;
    console.log(a);
    res(a);
  })
    .then((i) => {
      console.log(i);
      a++;
      console.log(a);
      return a + i;
    })
    .catch((error) => {
      console.log(error);
      a++;
      return a;
    })
    .then((value) => console.log(value))
    .catch((error) => console.log(error));
  let a = 1;
} catch (e) {
  console.log(e);
}
```

---

[[011 Решение задач JS, TS и React|Назад]]
