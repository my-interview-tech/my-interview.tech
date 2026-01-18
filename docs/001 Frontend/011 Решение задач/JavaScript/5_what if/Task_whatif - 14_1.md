---
uid: mmR8FyxVdJK2yqWU5mSe4
title: Task_whatif - 14_1
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
// Что печатает цикл и как сделать нормально?
let i = 10;

while (--i) {
  setTimeout(() => {
    console.log(i);
  }, 0);
}
```

\*\*Ответ

```js
// Что печатает цикл и как сделать нормально?
let i = 10;

while (--i) {
  const j = i;
  setTimeout(() => {
    console.log(i);
    console.log(j);
  }, 0);
}
```

---

[[011 Решение задач JS, TS и React|Назад]]
