---
uid: htkDLnzOQZGbbDk2thuYG
title: Task_currying - memoize()_1
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
Напишите функцию memoize, которая принимает функцию и 
возвращает новую функцию, которая запоминает результаты 
выполнения исходной функции для заданных аргументов и 
возвращает сохраненный результат при повторном вызове 
с теми же аргументами.
*/

function fibonacci(n) {
  if (n <= 1) {
    return n;
  }
  return fibonacci(n - 1) + fibonacci(n - 2);
}

const memoizedFibonacci = memoize(fibonacci);
console.log(memoizedFibonacci(10)); // 55 (вычислено)
console.log(memoizedFibonacci(10)); // 55 (взято из кэша)
```

\*\*Ответ

```js
function memoize(operation) {
  return function (...args) {
    return operation(...args);
  };
}
```

---

[[011 Решение задач JS, TS и React|Назад]]
