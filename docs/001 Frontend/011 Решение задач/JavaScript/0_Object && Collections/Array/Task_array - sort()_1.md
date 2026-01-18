---
uid: PP7rKIJbvAV5Qt1Xux_dQ
title: Task_array - sort()_1
tags:
  - "#JavaScript"
  - "#taskJS"
  - "#array"
  - "#sort"
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

```
// Есть задача функция принимает массив чисел,
// необхоимо вернуть массив с наибольшими числами в порядке убывания,
// например принимает[1, 2, 5, 3, 4, 6, 4,] - вернуть[6, 5]
```

\*\*Ответ

```js
const array = [1, 2, 5, 3, 4, 6, 4];

function sorted(array) {
  return array.sort((a, b) => b - a);
}

console.log(sorted(array));
```

---

[[011 Решение задач JS, TS и React|Назад]]
