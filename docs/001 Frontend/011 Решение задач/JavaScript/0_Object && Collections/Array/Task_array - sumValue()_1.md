---
uid: YwIpGH_qkeoL_NbV9oaKm
title: Task_array - sumValue()_1
tags:
  - "#JavaScript"
  - "#taskJS"
  - "#array"
  - "#reduce"
  - "#object"
  - "#сбербанк"
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
const arr = [1, 2, 3, 4, 4]; // '1:1, 2:1, 3:1, 4:2'

function objSum(arr) {
  // Ваш код здесь
}

console.log(objSum(arr)); // {'1:1, 2:1, 3:1, 4:2'}
```

\*\*Ответ

```js
function objSum(arr) {
  return arr.reduce((acc, el) => {
    acc[el] = (acc[el] | 0) + 1;
    return acc;
  }, {});
}

console.log(objSum(arr)); // {'1:1, 2:1, 3:1, 4:2'}
```

---

[[011 Решение задач JS, TS и React|Назад]]
