---
uid: 7J9M1W0x73SDlCO_eZiuB
title: Task_eventloop - 5_0
tags:
  - "#JavaScript"
  - "#taskJS"
  - "#EventLoop"
  - "#async"
  - "#промсвязьбанк"
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
//! что будет в консоли, что выполнится

Promise.resolve("a")
  .catch((v) => {
    throw v + "b";
  })
  .catch((v) => v + "c")
  .then((v) => v + "d")
  .then(() => console.log("e"));

console.log("f");
```

---

[[011 Решение задач JS, TS и React|Назад]]
