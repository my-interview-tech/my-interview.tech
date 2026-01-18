---
uid: M0Of4O1xXNPD4t48c6rip
title: Task_eventloop - 2_1
tags:
  - "#JavaScript"
  - "#taskJS"
  - "#EventLoop"
  - "#альфабанк"
  - "#сбербанк"
draft: false
technology: Решение задач
specialty: Frontend
tools: []
order: 0
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

```javascript
console.log("1");

setTimeout(() => console.log("2"), 0);

new Promise((resolve, reject) => {
  console.log("3");
  reject();
})
  .then(() => console.log("4"))
  .catch(() => console.log("5"))
  .catch(() => console.log("6"))
  .then(() => console.log("7"))
  .then(() => console.log("8"))
  .catch(() => console.log("9"));
```

// Пробос отказа

---

[[011 Решение задач JS, TS и React|Назад]]
