---
uid: pYzXdQSKmOCtxnO-ghh4g
title: Task_array - arraySubset()_1
tags:
  - "#JavaScript"
  - "#taskJS"
  - "#array"
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
/*
Напишите функцию, которая проверяет, является ли второй массив подмножеством первого. То есть есть ли элементы второго массива в первом.
*/

function arraySubset(source, subset) {
  // todo
}

console.log(arraySubset([2, 1, 3], [1, 2, 3])) // -> true
console.log(arraySubset([2, 1, 1, 3], [1, 2, 3])) // -> true
console.log(arraySubset([1, 1, 1, 3], [1, 3, 3])) // -> false
console.log(arraySubset([1, 2], [1, 2, 3])) // -> false
```

\*\*Ответ

```js
function arraySubset(source, subset) {
  const sourceSet = new Set(source);
  for (let i = 0; i < subset.length; i++) {
    if (!sourceSet.has(subset[i])) {
      return false;
    }
    sourceSet.delete(subset[i]);
  }
  return true;
}
```

---

[[011 Решение задач JS, TS и React|Назад]]
