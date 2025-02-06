---
title: partial()
draft: false
tags:
  - "#JavaScript"
  - "#taskJS"
  - "#currying"
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

___

[[011 Решение задач JS, TS и React|Назад]]