---
title: Task_this - 9
draft: false
tags:
  - "#JavaScript"
  - "#this"
  - "#taskJS"
---
```js
"use strict";

const obj1 = {
    name: "Alice",
    func1: () => {
        return () => {
            console.log(this.name);
        };
    },
};

const obj2 = {
    name: "Bob",
    func2: obj1.func1(),
};

obj2.func2(); // und
```

___

[[011 Решение задач JS, TS и React|Назад]]