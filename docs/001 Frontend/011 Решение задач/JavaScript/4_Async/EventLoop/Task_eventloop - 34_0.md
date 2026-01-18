---
uid: Jbq2buqNv2-TGyNoBSiPu
title: Task_eventloop - 34_0
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

const promise1 = Promise.resolve().then(() => {
    console.log(2);
    setTimeout(() => console.log(3), 0)
});

const timer1 = setTimeout(() => {
    console.log(4)
    Promise.resolve().then(() => console.log(5))
}, 0)

console.log(6);
```

---

[[011 Решение задач JS, TS и React|Назад]]
