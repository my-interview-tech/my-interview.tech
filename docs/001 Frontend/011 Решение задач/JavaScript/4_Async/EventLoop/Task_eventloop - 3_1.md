---
uid: kXfkCKV8wndMLmRa1QNYc
title: Task_eventloop - 3_1
tags:
  - JavaScript
  - "#taskJS"
  - "#EventLoop"
  - "#itOne"
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
//! task
//! Что будет в консоли?

setTimeout(() => console.log(1));

function run() {
  return Promise.resolve(10).then(() => run());
}

run();

console.log(2);
//  // также нет
```

---

[[011 Решение задач JS, TS и React|Назад]]
