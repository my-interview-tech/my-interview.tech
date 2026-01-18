---
uid: hfIrddGnfclNwCoE2drDl
title: Task_this - 1_1
tags:
  - "#JavaScript"
  - "#taskJS"
  - "#this"
draft: false
technology: Решение задач
specialty: Frontend
tools: []
order: 0
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
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

user.one()(); //
user.two()(); //
user.three()(); //
user.four()(); //
```

\*\*Ответ

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

user.one()(); // undefined
user.two()(); // user {}
user.three()(); // undefined
user.four()(); // undefined
```

---

[[011 Решение задач JS, TS и React|Назад]]
