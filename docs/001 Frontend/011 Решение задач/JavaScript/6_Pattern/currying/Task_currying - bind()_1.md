---
uid: 2wRRBIrmiMxiUJdt9eYTJ
title: Task_currying - bind()_1
tags:
  - "#JavaScript"
  - "#taskJS"
  - "#currying"
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
/*
Описание: 
Напишите функцию bind, которая принимает 
функцию и контекст, и возвращает новую функцию, 
которая вызывает исходную функцию с заданным контекстом.
*/

const person = {
  name: "John",
  sayHello: function () {
    console.log(`Hello, ${this.name}!`);
  },
};

const boundSayHello = bind(person.sayHello, person);
boundSayHello(); // Hello, John!
```

\*\*Ответ

```js
function bind(objName, obj) {
  return function () {
    return objName.call(obj);
  };
}
```

---

[[011 Решение задач JS, TS и React|Назад]]
