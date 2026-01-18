---
uid: gGWrSZwshm39pIwB7GXW1
title: Task_currying - partial()_1
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
Напишите функцию partial, которая принимает функцию 
и несколько аргументов и возвращает новую функцию, 
которая вызывает исходную функцию с заданными аргументами.
Пример:
*/

function multiplyed(a, b, c = 1) {
  return a * b * c;
}

const partialMultiply = partial(multiplyed, 4);
console.log(partialMultiply(12, 2)); // 24
```

\*\*Ответ

```js
function partial(oper, numb) {
  return function (...args) {
    if (oper.length >= args.length) {
      return oper(numb, ...args);
    } else {
      return function (...args2) {
        return partial(...args2);
      };
    }
  };
}
```

---

[[011 Решение задач JS, TS и React|Назад]]
