---
uid: FCAq9G5dATTWSnqYEfqBw
title: Task_eventloop - 32_0
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
Promise.resolve()
  .then(function a() {
    console.log('a');
    Promise.resolve().then(function c() {console.log('c');});
  })
  .then(function b() {
    console.log('b');
    Promise.resolve().then(function d() {console.log('d');});
  });

Promise.resolve()
  .then(function e() {
    console.log('e');
    Promise.resolve().then(function v() {console.log('v');});
  })
  .then(function n() {
    console.log('n');
    Promise.resolve().then(function m() {console.log('m');});
  });
```

---

[[011 Решение задач JS, TS и React|Назад]]
