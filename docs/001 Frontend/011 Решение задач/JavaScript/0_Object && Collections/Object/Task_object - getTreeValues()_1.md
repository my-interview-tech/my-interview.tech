---
uid: 3yXnIK-R-TobSSIFHHS0Z
title: Task_object - getTreeValues()_1
tags:
  - "#JavaScript"
  - "#taskJS"
  - "#object"
  - "#for-of"
  - "#unknownINC"
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
Дана структура данных в виде дерева
Необходимо написать функцию, возвращающую значения всех вершин дерева:
getTreeValues(tree); // => [1, 2, 3, 4, 5, 6, 7]
*/

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

const getRes = (obj) => {
  // Ваш код здесь
};

console.log(getRes(tree));
```

\*\*Ответ

```js
const getRes = (tree) => {
  let res = [tree.value];

  if (tree.children) {
    for (let name of tree.children) {
      res = res.concat(getRes(name));
    }
  }

  return res;
};

console.log(getRes(tree));
```

---

[[011 Решение задач JS, TS и React|Назад]]
