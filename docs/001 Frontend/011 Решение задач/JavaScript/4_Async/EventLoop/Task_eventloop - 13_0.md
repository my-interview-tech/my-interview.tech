---
uid: wVXZHrZQfcG1JEFX967KO
title: Task_eventloop - 13_0
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

setTimeout(() => console.log(3), 2000);
console.log(4);

new Promise((res, rej) => {
  setTimeout(() => res());
})
  .then(() => console.log(1))
  .catch(() => console.log(2));

queueMicrotask(() => {
  console.log(5);
  queueMicrotask(() => {
    requestAnimationFrame(() => {
      console.log(8);
    });
    queueMicrotask(() => {
      console.log(7);
    });
  });
});

requestAnimationFrame(() => {
  console.log(3);
  requestAnimationFrame(() => {
    console.log(6);
  });
});

console.log(9);
```

---

[[011 Решение задач JS, TS и React|Назад]]
