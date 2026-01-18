---
uid: Z6Hxp1DcZT06-iesmaBPC
title: Task_currying - compose()_1
tags:
  - "#JavaScript"
  - "#taskJS"
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
/*
Описание: 
Напишите функцию compose, которая принимает 
несколько функций и возвращает новую функцию, 
которая применяет эти функции в обратном порядке.
*/

function added(a) {
  return a + 1;
}

function multed(b) {
  return b * 2;
}

const composed = compose(multed, added);
console.log(composed(1)); // 8
```

\*\*Ответ

```js
function compose(multOper, addOper) {
  return function (...args) {
    return multOper(addOper(...args));
  };
}
```

---

[[011 Решение задач JS, TS и React|Назад]]
