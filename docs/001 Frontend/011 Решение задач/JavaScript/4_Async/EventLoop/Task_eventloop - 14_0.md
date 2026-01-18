---
uid: H5YM5N9Ub8VlEA67vh6gF
title: Task_eventloop - 14_0
tags:
  - "#JavaScript"
  - "#task"
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

```js
//! Что будет в консоли?
function test() {
  return new Promise((res) => {
    console.log("5");
    setTimeout(() => res(6), 1000);
  });
}

console.log("1");

test()
  .then((v) => {
    throw new Error(v);
  })
  .then((v) => {
    throw new Error(v * 2);
  })
  .finally(() => console.log("2"))
  .catch((v) => console.log(v));

Promise.resolve("3")
  .finally(() => {
    throw new Error("4");
  })
  .then((v) => console.log(v))
  .catch((v) => console.log(v));

console.log("2");
```

---

[[011 Решение задач JS, TS и React|Назад]]
