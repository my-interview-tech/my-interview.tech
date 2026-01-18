---
uid: XUoZK5pJwFWDkDDN8x5fX
title: Task_currying - add()_1
tags:
  - "#JavaScript"
  - "#currying"
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
// Напишите функцию, которая складывает 2 числа.
// Работать функция должна как показано в примере ниже:

let add = function (a = 0) {
  // Ваш код здесь
};

console.log(add(1)(2)(3)()); // 6
console.log(add(1)(2)()); // 3
```

\*\*Ответ

```js
function add(a = 0) {
  let sum = a;
  const res = (b) => {
    if (typeof b === "undefined") return sum;
    sum += b;
    return res;
  };
  return res;
}

console.log(add(1)(2)(3)()); // 6
console.log(add(1)(2)()); // 3
```

---

[[011 Решение задач JS, TS и React|Назад]]
