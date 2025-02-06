---
title: curry()
draft: false
tags:
  - "#JavaScript"
  - "#taskJS"
  - "#currying"
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
console.log(curriedMult(1)(2)(3)) // 6
```

___

[[011 Решение задач JS, TS и React|Назад]]