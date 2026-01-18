---
uid: BWvfJ7ZyJqdiwlwXFiCYW
title: Task_currying - addSum()_0
tags:
  - "#JavaScript"
  - "#currying"
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
// Напишите функцию, которая складывает 2 числа.
// Работать функция должна как показано в примере ниже:

let add = function (x, y = 0) {
  // Код здесь
};

console.log(add(42)()(20)); // -> 42
console.log(add(20, 22)()); // -> 42
console.log(add(20)(22)()); // -> 42
console.log(add(42)()); // -> 42
console.log(add(20)()(22)); // -> 42
console.log(add(20)()()()()()()()()()()()(22)); // -> 42
console.log(add()(20)(22)); // -> 42
console.log(add()()()()(20)(22)()); // -> 42
console.log(add(20)()(22)()); // -> 42
console.log(add()(20)()(22)); // -> 42
console.log(add()()()()()(20)()()()(22)); // -> 42
```

\*\*Ответ

```js
function add(a, b) {
  if (!a) {
    return add;
  }
  if (!b) {
    return function calc(c) {
      if (!c) return calc;
      return a + c;
    };
  }

  return a + b;
}
```

---

[[011 Решение задач JS, TS и React|Назад]]
