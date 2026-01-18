---
uid: lhr5icH8htS3G3pP9ffeC
title: Task_eventloop - 4_1
tags:
  - "#JavaScript"
  - "#taskJS"
  - "#EventLoop"
  - "#forEach"
  - "#детскийМир"
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

[1, 2].forEach((i) => console.log(i));
setTimeout(() => console.log(3));
new Promise((resolve) => {
  console.log(4);
  resolve(5);
}).then((i) => console.log(i));
console.log(6);
```

---

[[011 Решение задач JS, TS и React|Назад]]
