---
uid: ifRukqAlTJfvffowayLx8
title: Task_eventloop - 33_1
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
const promise = new Promise((resolve, reject) => {
    console.log(1);

    setTimeout(() => {
        console.log(1);

        resolve(2);

        console.log(3);
    }, 0);

    console.log(4);
});

promise.then((res) => console.log(res));

console.log(5);
```

---

[[011 Решение задач JS, TS и React|Назад]]
