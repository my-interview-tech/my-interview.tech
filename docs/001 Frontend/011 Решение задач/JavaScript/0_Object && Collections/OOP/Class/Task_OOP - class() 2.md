---
title: Task_OOP - class() 2
draft: false
tags:
  - "#JavaScript"
  - "#taskJS"
  - "#class"
---
```js
var animal = { jumps: null };
var rabbit = { jumps: true };

rabbit.__proto__ = animal;

console.log( rabbit.jumps ); //

delete rabbit.jumps;
console.log( rabbit.jumps ); //

delete animal.jumps;
console.log( rabbit.jumps); //
```

___

[[011 Решение задач JS, TS и React|Назад]]