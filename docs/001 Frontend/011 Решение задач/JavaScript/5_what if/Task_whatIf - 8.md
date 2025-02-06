---
title: Task_whatIf - 8
draft: false
tags:
  - "#JavaScript"
  - "#taskJS"
---
```js
let i = 10;
let arr = [];
while (--i) {
  arr.push(function () {
    console.log(i); //
  });
}

console.log(arr[5]()); //
console.log(arr[6]()); //

```

___

[[011 Решение задач JS, TS и React|Назад]]