---
uid: pN9HDDRQxMAWuTlQYqBoI
title: Task_this - 2_1
tags:
  - "#JavaScript"
  - "#this"
  - "#taskJS"
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
"use strict";
const user = {
  name: "Bob",
  funcFunc() {
    return function () {
      console.log(this);
    };
  },
  funcArrow() {
    return () => {
      console.log(this);
    };
  },
  arrowFunc: () => {
    return function () {
      console.log(this);
    };
  },
  arrowArrow: () => {
    return () => {
      console.log(this);
    };
  },
};

const user2 = {
  name: "Jim",
  funcFunc: user.funcFunc(),
  funcArrow: user.funcArrow(),
  arrowFunc: user.arrowFunc(),
  arrowArrow: user.arrowArrow(),
};

user2.funcFunc(); //
user2.funcArrow(); //
user2.arrowFunc(); //
user2.arrowArrow(); //
```

\*\*Ответ

```js
"use strict";
const user = {
  name: "Bob",
  funcFunc() {
    return function () {
      console.log(this);
    };
  },
  funcArrow() {
    return () => {
      console.log(this);
    };
  },
  arrowFunc: () => {
    return function () {
      console.log(this);
    };
  },
  arrowArrow: () => {
    return () => {
      console.log(this);
    };
  },
};

user.funcFunc()(); // undefined
user.funcArrow()(); // user {}
user.arrowFunc()(); //  undefined
user.arrowArrow()(); // undefined

const user2 = {
  name: "Jim",
  funcFunc: user.funcFunc(),
  funcArrow: user.funcArrow(),
  arrowFunc: user.arrowFunc(),
  arrowArrow: user.arrowArrow(),
};

user2.funcFunc(); // user2{}
user2.funcArrow(); // user {}
user2.arrowFunc(); // user2 {}
user2.arrowArrow(); // window
```

---

[[011 Решение задач JS, TS и React|Назад]]
