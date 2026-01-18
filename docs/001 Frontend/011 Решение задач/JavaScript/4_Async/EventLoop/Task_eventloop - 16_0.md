---
uid: n1YZnIgjG1-ulc1JrnKnP
title: Task_eventloop - 16_0
tags:
  - "#JavaScript"
  - "#taskJS"
  - "#EventLoop"
  - "#астон"
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
Promise.reject("a")
  .catch((p) => p + "b")
  .catch((p) => p + "c")
  .then((p) => p + "d")
  .then((p) => p + "f")
  .catch((p) => p + "h")
  .finally((p) => p + "e")
  .then((p) => console.log(p));

// abdf
```

---

[[011 Решение задач JS, TS и React|Назад]]
