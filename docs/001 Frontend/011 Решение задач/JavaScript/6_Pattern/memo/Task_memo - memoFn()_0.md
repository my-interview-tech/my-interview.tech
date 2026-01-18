---
uid: _W3tzG_irF-J_6-JDbITz
title: Task_memo - memoFn()_0
tags:
  - "#JavaScript"
  - "#memo"
  - "#taskJS"
  - "#ВКонтакте"
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
const memo = (fn) => {
  // Ваш код здесь
};

const plus = (a, b, c) => {
  console.log("plus", a, b, c);
  return a + b + c;
};

const divide = (a, b) => {
  console.log("divide", a, b);
  return a / b;
};

const memoPlus = memo(plus);
console.log(memoPlus(1, 2, 3)); // plus 1, 2, 3 -> 6
console.log(memoPlus(3, 1, 1)); // plus 3, 1, 1 -> 5
console.log(memoPlus(1, 2, 3)); // 6

const memoDivide = memo(divide);
console.log(memoDivide(4, 2)); // divide 4, 2 -> 2
console.log(memoDivide(6, 2)); // divide 6, 2 -> 3
console.log(memoDivide(4, 2)); // 2
```

\*\*Ответ

```js
// говорят можно решить через WeakMap
```

---

[[011 Решение задач JS, TS и React|Назад]]
