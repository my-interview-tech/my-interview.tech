---
title: compose()
draft: false
tags:
  - "#JavaScript"
  - "#taskJS"
  - "#currying"
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

___

[[011 Решение задач JS, TS и React|Назад]]