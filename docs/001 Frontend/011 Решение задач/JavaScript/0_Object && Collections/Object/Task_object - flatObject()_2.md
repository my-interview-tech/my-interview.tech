---
uid: BQFUMXSYYPjhJsSu9Zn2l
title: Task_object - flatObject()_2
tags:
  - "#JavaScript"
  - "#taskJS"
  - "#object"
  - "#for-in"
  - "#recursion"
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
// Напишите функцию, которая возвращает новый объект,
// в котором все примитивные элементы вложенных объектов были рекурсивно "подняты"

const obj = {
  a: {
    b: {
      c: 1,
      d: 2,
      e: 3,
    },
    f: {
      g: 4,
      h: 5,
    },
    i: 6,
    j: 7,
  },
};

const flatObject = (obj) => {
  // Ваш код здесь
};

console.log(flatObject(obj)); // { c: 1, d: 2, e: 3, g: 4, h: 5, i: 6, j: 7 }
```

\*\*Ответ

```js
const flatObject = (obj) => {
  let res = {};

  for (let name in obj) {
    if (typeof obj[name] !== "object") {
      res[name] = obj[name];
    } else {
      let flatNested = flatObject(obj[name]);
      for (let flatName in flatNested) {
        res[flatName] = flatNested[flatName];
      }
    }
  }

  return res;
};
```

---

[[011 Решение задач JS, TS и React|Назад]]
