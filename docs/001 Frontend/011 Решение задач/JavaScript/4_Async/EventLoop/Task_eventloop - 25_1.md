---
uid: ZeBT2okBLEA3ZTygdNxYs
title: Task_eventloop - 25_1
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

const promise1 = new Promise((resolve, reject) => {
  console.log(2)
  resolve(3)
})

promise1.then(res => console.log(res))

console.log(4);
```

---

[[011 Решение задач JS, TS и React|Назад]]
