---
uid: ZmAAeeodFsYJok5TBq2BE
title: Task_object - includes()_1
tags:
  - "#JavaScript"
  - "#taskJS"
  - "#object"
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
// Напиши функцию includes(value) для объекта, которая принимает value и возращает true,
// если есть поле value с этим значением и false, если нет. Объект следующий:

const tree = {
  value: 1,
  children: [
    {
      value: 2,
      children: [{ value: 4 }, { value: 5 }],
    },
    {
      value: 3,
      children: [{ value: 6 }, { value: 7 }],
    },
  ],
};

function includes(value, tree) {}

console.log(includes(1, tree));
console.log(includes(11, tree)); // false
console.log(includes(2, tree));
console.log(includes(3, tree));
console.log(includes(4, tree));
console.log(includes(5, tree));
console.log(includes(6, tree));
console.log(includes(7, tree));
console.log(includes(77, tree)); // false
```

\*\*Ответ

```js
function includes(value, tree) {
  if (tree.value === value) {
    return true;
  }
  if (Array.isArray(tree.children)) {
    for (let i = 0; i < tree.children.length; i++) {
      if (includes(value, tree.children[i])) {
        return true;
      }
    }
  }
  return false;
}
```

---

[[011 Решение задач JS, TS и React|Назад]]
