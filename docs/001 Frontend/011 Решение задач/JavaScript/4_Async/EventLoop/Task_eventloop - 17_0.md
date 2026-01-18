---
uid: wKTqJC7UAfjULhAfwS_GS
title: Task_eventloop - 17_0
tags:
  - "#JavaScript"
  - "#taskJS"
  - "#EventLoop"
  - "#астон"
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
setTimeout(() => console.log("a"));

Promise.resolve()
  .then((first) => {
    console.log("first:", first);
    return "b";
  })
  .then(
    Promise.resolve().then((second) => {
      console.log("second:", second);
      return "c";
    }),
  )
  .then((third) => console.log("third:", third));

console.log("d");

// d
// first: 1. undefined
// second:1. undefined
// third: b
// a
```

---

[[011 Решение задач JS, TS и React|Назад]]
