---
uid: YaTEVU1o250XPLim42ne0
title: Task_eventloop - 12_0
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

console.log(1);

setTimeout(() => {
  console.log(2);
});

requestAnimationFrame(() => {
  console.log(6);
});

new Promise((res) => {
  console.log(3);
  res();
}).then(() => {
  console.log(5);
  queueMicrotask(() => {
    console.log(7);
  });
});

console.log(4);
```

---

[[011 Решение задач JS, TS и React|Назад]]
