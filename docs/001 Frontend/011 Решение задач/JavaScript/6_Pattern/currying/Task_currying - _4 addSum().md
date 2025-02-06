---
title: addSum()
draft: false
tags:
  - "#JavaScript"
  - "#currying"
---
```js
// Напишите функцию, которая складывает 2 числа.
// Работать функция должна как показано в примере ниже:

let add = function (x, y = 0) {
 // Ваш код здесь
};

console.log(add(42)()(20)); // -> 42
console.log(add(20, 22)()); // -> 42
console.log(add(20)(22)()); // -> 42
console.log(add(42)()); // -> 42
console.log(add(20)()(22)); // -> 42
console.log(add(20)()()()()()()()()()()()(22)) // -> 42
console.log(add()(20)(22)) // -> 42
console.log(add()()()()(20)(22)()) // -> 42
console.log(add(20)()(22)()); // -> 42
console.log(add()(20)()(22)) // -> 42
console.log(add()()()()()(20)()()()(22)) // -> 42
```
___

[[011 Решение задач JS, TS и React|Назад]]