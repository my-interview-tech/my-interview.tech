---
uid: aLCOHo0h4WMZ5KFuqME0s
title: Task_eventloop - 29_1
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
console.log(1);

setTimeout(() => console.log(2), 0);

Promise
  .resolve()
  .then(() => console.log(3))
  .then(() => console.log(4));


console.log(5);
```

---

[[011 Решение задач JS, TS и React|Назад]]
