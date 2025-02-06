---
title: Task_whatIf - 6
draft: false
tags:
  - "#JavaScript"
  - "#taskJS"
  - "#IIFE"
---
```js
(function () {
  f();

  f = function () {
    console.log(1); //
  };
})();

function f(){
  console.log(2) //
}
f();

```

___

[[011 Решение задач JS, TS и React|Назад]]