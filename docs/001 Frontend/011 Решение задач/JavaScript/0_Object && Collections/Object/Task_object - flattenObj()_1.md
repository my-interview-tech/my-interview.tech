---
uid: L0gQzY_xYJcxuGVX3Za-L
title: Task_object - flattenObj()_1
tags:
  - "#JavaScript"
  - "#taskJS"
  - object
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
const arr1 = [
  {
    id: 1,
    next: [{ id: 2 }, { id: 3 }, { id: 4 }],
  },
  { id: 5, next: [{ id: 6 }, { id: 7 }, { id: 8 }] },
];

function flattenObj(arr) {
  // Ваш код здесь
}

console.log(flattenObj(arr1));
//[ { id: 1 },
// { id: 2 },
// { id: 3 },
// { id: 4 },
// { id: 5 },
// { id: 6 },
// { id: 7 },
// { id: 8 } ]
```

\*\*Ответ

```js
function flattenObj(arr) {
  let stack = [];

  for (let i = 0; i < arr.length; i++) {
    if (typeof arr[i] === "object") {
      stack.push({ id: arr[i].id });
      if (Array.isArray(arr[i].next)) {
        stack = stack.concat(flattenObj(arr[i].next));
      }
    }
  }

  return stack;
}
```

---

[[011 Решение задач JS, TS и React|Назад]]
