---
uid: ljkqhrGgMF0lGNVwzBw7j
title: Task_eventloop - 18_1
tags:
  - "#JavaScript"
  - "#taskJS"
  - "#EventLoop"
  - "#async"
  - "#альфабанк"
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
function print() {
  console.log(1);
}

async function foo() {
  console.log(2);
  await print();
  console.log(3);
}

console.log(4);

foo();

console.log(5);

//
```

---

[[011 Решение задач JS, TS и React|Назад]]
