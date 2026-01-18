---
uid: eQ0TENSpbfO1ePxB4Flxt
title: Task_eventloop - 6_0
tags:
  - "#JavaScript"
  - "#taskJS"
  - "#EventLoop"
  - "#СИБУР"
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
//! что будет в консоли, что выполнится

function task1() {
    console.log(1);

    setTimeout(function () {
        console.log(2);
    }, 0);

    const p = new Promise((resolve, reject) => {
        console.log(3);
        setTimeout(() => {
            resolve();
            reject();
        });
    });

    p.then(() => {
        console.log(4);
    }).catch(() => {
        console.log(5);
    });

    console.log(6);
}

task1();
```

---

[[011 Решение задач JS, TS и React|Назад]]
