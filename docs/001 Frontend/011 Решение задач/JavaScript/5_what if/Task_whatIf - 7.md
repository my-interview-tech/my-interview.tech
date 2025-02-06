---
title: Task_whatIf - 7
draft: false
tags:
  - "#JavaScript"
  - "#taskJS"
---
```js
var b = {
  p: "b",
  b: function () {
    console.log(this.p);//
  },
};

var a = {
  p: "a",
  a: function () {
    var b1 = b.b;
    a.b2 = b1; //
    b1();  //
    b.b();  //
    a.b2(); //
  },
};

a.a(); //
```

___

[[011 Решение задач JS, TS и React|Назад]]