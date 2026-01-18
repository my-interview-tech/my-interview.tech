---
uid: L1Zr47KndjIL7yOx3q1v4
title: Task_number - descendingOrder()_1
tags:
  - "#JavaScript"
  - "#taskJS"
  - "#number"
  - "#домКлик"
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
/*
Ваша задача состоит в том, чтобы создать функцию,
которая может принимать любое не отрицательное целое число в качестве аргумента
и возвращать его с цифрами в порядке убывания.
По сути, переставьте цифры, чтобы получить максимально возможное число
*/

function descendingOrder(n) {
  // Ваш код здесь
}

console.log(descendingOrder(0) === 0);
console.log(descendingOrder(1) === 1);
console.log(descendingOrder(111) === 111);
console.log(descendingOrder(15) === 51);
console.log(descendingOrder(1021) === 2110);
console.log(descendingOrder(123456789) === 987654321);
```

\*\*Ответ

```js
function descendingOrder(n) {
  if (typeof n !== "number") return "undefined";

  return Number(
    ("" + n)
      .split("")
      .sort((a, b) => b - a)
      .join(""),
  );
}

console.log(descendingOrder(0) === 0);
console.log(descendingOrder(1) === 1);
console.log(descendingOrder(111) === 111);
console.log(descendingOrder(15) === 51);
console.log(descendingOrder(1021) === 2110);
console.log(descendingOrder(123456789) === 987654321);
```

---

[[011 Решение задач JS, TS и React|Назад]]
