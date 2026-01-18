---
uid: wo9exAFwBFDuXmZB9dVD6
title: Task_array - sortArr()_1
tags:
  - "#JavaScript"
  - "#taskJS"
  - "#sort"
  - "#spread"
  - "#array"
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
// Напишите функцию сортировки массива
// (исходный массив должен остаться без изменений)

const array = [1, 5, 2, 4, 3];
```

\*\*Ответ

```js
const array = [1, 5, 2, 4, 3];

function sorted(array) {
  let newArr = [...array];
  return newArr.sort((a, b) => b - a);
}

console.log(sorted(array));
console.log(array);
```

---

[[011 Решение задач JS, TS и React|Назад]]
