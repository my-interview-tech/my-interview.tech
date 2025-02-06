---
title: memoize()
draft: false
tags:
  - "#JavaScript"
  - "#taskJS"
  - "#currying"
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

___

[[011 Решение задач JS, TS и React|Назад]]