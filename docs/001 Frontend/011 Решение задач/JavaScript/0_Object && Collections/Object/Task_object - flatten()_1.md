---
uid: sKfKq7em_p-BsQbWR21o9
title: Task_object - flatten()_1
tags:
  - "#JavaScript"
  - "#flat"
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
function flatten(array) {
  // Ваш код здесь
}

console.log(flatten([[1], [[2, 3]], [[[[[4]]]]]])); // -> [1, 2, 3, 4]
```

\*\*Ответ

```js
const arr = [[1], [[2, 3]], [[[4]]]];

function flatten(arr) {
  return arr.flat(Infinity);
}

console.log(flatten(arr)); // -> [1, 2, 3, 4]
```

```js
function flatten(array) {
  let newArr = [];

  for (let name of array) {
    if (Array.isArray(name)) {
      newArr = newArr.concat(flatten(name));
    } else {
      newArr.push(name);
    }
  }
  return newArr;
}

console.log(flatten([[1], [[2, 3]], [[[[[4]]]]]])); // -> [1, 2, 3, 4]
```

---

[[011 Решение задач JS, TS и React|Назад]]
