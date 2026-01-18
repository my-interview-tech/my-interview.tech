---
uid: l0tEvNoBL6RdwNwkNtmF2
title: Task_polyfill - some()_1
tags:
  - "#JavaScript"
  - "#taskJS"
  - "#polyfill"
  - "#some"
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
// Условие: написать полифил для метода some
// [2, 5, 8, 1, 4].some((element) => element > 10); ---> false
// [12, 5, 8, 1, 4].some((element) => element > 10); ---> true

Array.prototype.mySome = function (cb) {
  // Ваш код здесь
};
```

\*\*Ответ

```javascript
// Условие: написать полифил для метода some
// [2, 5, 8, 1, 4].some((element) => element > 10); ---> false
// [12, 5, 8, 1, 4].some((element) => element > 10); ---> true

Array.prototype.mySome = function (cb) {
  for (let i = 0; i < this.length; i++) {
    if (cb(this[i], i, this)) {
      return true;
    }
  }
  return false;
};
```

```js
Array.prototype.mySome = mySome;

function mySome(cb) {
  for (let i = 0; i < this.length; i++) {
    if (cb(this[i])) {
      return true;
    }
  }
  return false;
}

[2, 5, 8, 1, 4]
  .mySome((element) => element > 10) // false
  [(2, 5, 8, 1, 4)].mySome((element) => element < 10); // true
```

---

[[011 Решение задач JS, TS и React|Назад]]
