---
uid: fVk_v_5iPk-qFI-NHNGj1
title: Task_eventloop - 10_1
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
//! Что будет в консоли?

const a = setTimeout(() => console.log(2), 2000);
const d = setTimeout(() => console.log(6), 1000);

const c = new Promise((resolve) => {
  setTimeout(() => resolve(), 1000);
  console.log(4);
});
c.then(() => console.log(1));

const b = setTimeout(() => console.log(5), 1000);

console.log(3);
```

---

[[011 Решение задач JS, TS и React|Назад]]
