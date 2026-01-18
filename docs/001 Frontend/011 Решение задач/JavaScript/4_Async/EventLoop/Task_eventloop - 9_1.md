---
uid: T8gZhT55K_lAMr3JVAN5C
title: Task_eventloop - 9_1
tags:
  - "#JavaScript"
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
// // В каком порядке будут выводится console.log и почему?

setTimeout(() => {
  console.log("timeOut");
}, 0);

console.log(1);

new Promise((resolve) => {
  console.log("Promise");
  setTimeout(() => {
    console.log(777);
    resolve();
  }, 0);
})
  .then(() => {
    console.log("then1");
  })
  .then(() => {
    console.log("then2");
  });

console.log(4);

setTimeout(() => {
  console.log("timeOut2");
}, 0);
```

---

[[011 Решение задач JS, TS и React|Назад]]
