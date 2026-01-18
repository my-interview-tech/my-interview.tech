---
uid: 9X-Bbi_RhBBdjYy6WzVh1
title: Task_whatif - 13_1
tags:
  - "#JavaScript"
  - "#taskJS"
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
// Достать width с помощью диструктуризации
const product = {
  price: 3990,
  options: [
    {
      id: 1,
      title: "256ГБ",
      price: 450,
    },
    {
      id: 2,
      title: "512ГБ",
      price: 990,
    },
  ],
  info: []{
    screen: {
      size: {
        width: 1920,
        height: 1080,
      },
    },
  },
};
```

\*\*Ответ

```js
const {
  info: []{
    screen: {
      size: { width },
    },
  },
} = product;
console.log(width);
```

---

[[011 Решение задач JS, TS и React|Назад]]
