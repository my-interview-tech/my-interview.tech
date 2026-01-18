---
uid: Sphnc_jbWT5S2fKlKS55n
title: Task_eventloop - 31_0
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
fetch('https://www.google.com')
  .then(() => console.log(1));

Promise.resolve()
  .then(() => console.log(2));

Promise.reject()
  .catch(() => console.log(3));
```

---

[[011 Решение задач JS, TS и React|Назад]]
