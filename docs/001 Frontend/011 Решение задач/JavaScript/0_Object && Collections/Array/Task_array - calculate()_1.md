---
uid: BKAlT_vBfJaP-2vMVewUg
title: Task_array - calculate()_1
tags:
  - "#JavaScript"
  - "#array"
  - "#taskJS"
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
function calculate(arr) {
  // Ваш код здесь
}

console.log(calculate([5, 0, -5, 20, 88, 17, -32])); // 22
```

### Ответ

```js
function calculate(arr) {
  let newArr = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] % 2 !== 0 && arr[i] > 0) {
      newArr.push(arr[i]);
    }
  }
  return newArr.reduce((acc, el) => {
    return (acc = acc + el);
  }, 0);
}

console.log(calculate([5, 0, -5, 20, 88, 17, -32])); // 22
```

---

[[011 Решение задач JS, TS и React|Назад]]
