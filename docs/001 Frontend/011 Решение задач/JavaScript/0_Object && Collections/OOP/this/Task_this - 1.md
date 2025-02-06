---
title: Task_this - 1
draft: false
tags:
  - "#JavaScript"
  - "#taskJS"
  - "#this"
---
```js
// "use strict";
const user = {
    name: "Oleg",
    one: () => {
         return () => {
            console.log(this);
         };
    },
    two: function () {
        return () => {
            console.log(this);
        };
    },
    three: function red() {
        return function () {
            console.log(this);
        };
    },
    four: () => {
        return function () {
            console.log(this);
        };
    },
};

user.one()() //
user.two()(); //
user.three()() //
user.four()() //
```

**Ответ**

```js
// "use strict";
const user = {
    name: "Oleg",
    one: () => {
        console.log(this);
    },
    two: function () {
        return () => {
            console.log(this);
        };
    },
    three: function red() {
        return function () {
            console.log(this);
        };
    },
    four: () => {
        return function () {
            console.log(this);
        };
    },
};

user.one()() // undefined
user.two()(); // user {}
user.three()() // undefined
user.four()() // undefined
```

___

[[011 Решение задач JS, TS и React|Назад]]