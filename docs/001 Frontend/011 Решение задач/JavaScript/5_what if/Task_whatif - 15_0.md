---
uid: J3h5z47M35fD1C1LHb7d5
title: Task_whatif - 15_0
tags:
  - "#JavaScript"
  - "#taskJS"
  - "#itOne"
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
console.log(1);

const p = new Promise((resolve, reject) => {
  console.log(2);
  resolve(3);
});

console.log(4);

setTimeout(() => console.log(5), 0);

console.log(6);

for (let i = 0; i < 10; i++) {
  p.then((res) => {
    console.log({ i, res });
    return { i, res };
  });
}

console.log(7);
```

\*\*Ответ

```js

```

---

[[011 Решение задач JS, TS и React|Назад]]
