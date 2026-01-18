---
uid: zWFl_iUZANX1xrJFJU5s0
title: Task_async - run() 2_1
tags:
  - "#JavaScript"
  - "#taskJS"
  - "#async"
  - "#unknownINC"
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
// необходимо дописать функцию в которой элементы массива будут
// последовательно выводится в консоль спустя промежуток времени
// указанный в атрибуте  timeout

const run = (arr) => {};
const arr = [
  { name: "first", timeout: 3000 },
  { name: "second", timeout: 5000 },
  { name: "third", timeout: 2000 },
];

console.log(run(arr));
```

\*\*Ответ

```js
const run = (arr) => {
  arr.forEach((item, index) => {
    setTimeout(() => {
      console.log(item.name);
    }, item.timeout);
  });
};

const arr = [
  { name: "first", timeout: 3000 },
  { name: "second", timeout: 5000 },
  { name: "third", timeout: 2000 },
];

run(arr);
```

---

[[011 Решение задач JS, TS и React|Назад]]
