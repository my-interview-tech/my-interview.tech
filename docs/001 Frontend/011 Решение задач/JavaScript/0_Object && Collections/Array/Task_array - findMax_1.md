---
uid: R6ZLzEKujselOXeTUx1Hy
title: Task_array - findMax_1
tags:
  - "#JavaScript"
  - "#taskJS"
  - "#array"
  - "#sort"
  - "#SignalINC"
draft: false
technology: Решение задач
specialty: Frontend
tools: []
order: 0
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

```
// Напишите функцию поиска максимального числа

const array2 = [1, 2, 3, 4, 5, 6];
```

\*\*Ответ

```js
// Напишите функцию поиска максимального числа
const array = [1, 2, 3, 4, 5, 6];

function findMax(array) {
  return array.sort((a, b) => b - a)[0];
}

console.log(findMax(array));
```

---

[[011 Решение задач JS, TS и React|Назад]]
