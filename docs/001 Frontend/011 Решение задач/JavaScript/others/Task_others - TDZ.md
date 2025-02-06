---
title: TDZ
draft: false
tags:
  - "#JavaScript"
  - "#taskJS"
  - "#var"
  - "#let"
  - "#const"
  - "#TDZ"
---
```js
//Что будет выводится в консоль?
let b = 5;

function foo(a = b, b) {
    console.log(a, b) //
}

foo(undefined, 2) //
```

___

[[011 Решение задач JS, TS и React|Назад]]