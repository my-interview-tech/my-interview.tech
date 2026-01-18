---
uid: Er8S_8nPEbLfO26-juaiz
title: Task_eventloop - 26_1
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
setTimeout(() => console.log(1), 0);

const p = new Promise((resolve, reject) => {
    console.log(2);
    resolve()
})

const p2 = new Promise((resolve, reject) => reject(0))

p.then(() => console.log(4))

console.log(5)

console.log(6, p2)
```

---

[[011 Решение задач JS, TS и React|Назад]]
