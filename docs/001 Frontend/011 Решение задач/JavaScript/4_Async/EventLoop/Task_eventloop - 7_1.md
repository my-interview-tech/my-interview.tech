---
uid: WpOWxjPmRDkvAB8H1y0-x
title: Task_eventloop - 7_1
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

```js
//! что будет в консоли, что выполнится

function task2() {
  const innerFunc1 = async () => console.log(1);
  const innerFunc2 = async () => {
    console.log(2);
    await innerFunc1();
    console.log(3);
  };
  innerFunc2();
  console.log(4);
}

task2();
```

---

[[011 Решение задач JS, TS и React|Назад]]
