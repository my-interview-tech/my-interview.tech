---
uid: gs9Sp-Bn0Xy7PIvoruYhT
title: Task_this - 10_1
tags:
  - JavaScript
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
const myObj = {
  a: 10,
  method1() {
    const printThis = () => console.log(this);
    printThis();
  },
  method2: () => {
    const printThis = () => console.log(this);
    printThis();
  },
};

myObj.method1(); //
myObj.method2(); //

const res = myObj.method1.call({ a: 1 }); //
myObj.method2.call({ a: 1 }); //
```

\*\*Ответ

```js
const myObj = {
  a: 10,
  method1() {
    const printThis = () => console.log(this);
    printThis();
  },
  method2: () => {
    const printThis = () => console.log(this);
    printThis();
  },
};

myObj.method1(); //  myObj{}
myObj.method2(); //  undefined

const res = myObj.method1.call({ a: 1 }); // {a : 1}
myObj.method2.call({ a: 1 }); // undefined
```

---

[[011 Решение задач JS, TS и React|Назад]]
