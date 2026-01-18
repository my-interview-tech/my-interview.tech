---
uid: Vz_GWNEDgxSGnWMRHFqka
title: Task_this - 6_1
tags:
  - "#JavaScript"
  - "#taskJS"
  - "#this"
  - "#СИБУР"
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
function printContext() {
  console.log(this);
}

const printContextBind = printContext.bind({ a: 1 }).bind({ a: 2 });
printContextBind(); //
printContextBind.call({ a: 3 }); //
new printContextBind(); //
```

\*\*Ответ

```js
function printContext() {
  console.log(this);
}

const printContextBind = printContext.bind({ a: 1 }).bind({ a: 2 });
printContextBind(); // { a: 1 }
printContextBind.call({ a: 3 }); // { a: 1 }
new printContextBind(); // printContext{}
```

---

[[011 Решение задач JS, TS и React|Назад]]
