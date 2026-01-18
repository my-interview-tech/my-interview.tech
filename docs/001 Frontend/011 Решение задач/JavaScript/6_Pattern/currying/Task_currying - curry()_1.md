---
uid: "-fa0P-7ApmkbUnl3uJ5Cg"
title: Task_currying - curry()_1
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
Напишите функцию curry, которая принимает функцию 
и возвращает ее каррированную версию. 
Каррирование - это процесс преобразования функции 
с множеством аргументов в последовательность функций, 
каждая из которых принимает только один аргумент.
Пример:
*/

function add(a, b, c) {
  return a + b + c;
}

function multiply(a, b, c) {
  return a * b * c;
}

console.log(curriedAdd(1)(2)(3)); // 6
console.log(curriedMult(1)(2)(3)); // 6
```

\*\*Ответ

```js
/*
Описание: 
Напишите функцию curry, которая принимает функцию 
и возвращает ее каррированную версию. 
Каррирование - это процесс преобразования функции 
с множеством аргументов в последовательность функций, 
каждая из которых принимает только один аргумент.
Пример:
*/

function add(a, b, c) {
  return a + b + c;
}

function multiply(a, b, c) {
  return a * b * c;
}

function curry(oper) {
  return function curried(...args) {
    if (args.length >= oper.length) {
      return oper(...args);
    } else {
      return function (...args2) {
        return curried(...args, ...args2);
      };
    }
  };
}

const curriedAdd = curry(add);
const curriedMult = curry(multiply);
```

---

[[011 Решение задач JS, TS и React|Назад]]
