---
uid: kpR-K0bB1vNc39YpS-F2c
title: Task_eventloop - 27_1
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
console.log(1)

const foo = () => (new Promise((resolve, reject) => {
  console.log(2);
  resolve(3)
}))

console.log(4)

foo().then(res => console.log(res))

console.log(5)
```

---

[[011 Решение задач JS, TS и React|Назад]]
