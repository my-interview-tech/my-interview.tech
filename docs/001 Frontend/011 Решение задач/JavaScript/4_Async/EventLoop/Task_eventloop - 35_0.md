---
uid: hOHQ1Gzt4-J1jrYeCEmDE
title: Task_eventloop - 35_0
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

---

[[011 Решение задач JS, TS и React|Назад]]
