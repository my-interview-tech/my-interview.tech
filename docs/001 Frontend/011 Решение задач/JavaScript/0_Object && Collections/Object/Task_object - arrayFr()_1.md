---
uid: D9a4ulKkF1jFqp_c9vyxK
title: Task_object - arrayFr()_1
tags:
  - "#JavaScript"
  - "#taskJS"
  - "#object"
  - "#SignalINC"
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
// Напишите функцию которая возвращает массив значение свойств объекта

const obj = {
  a: 1,
  b: 3,
  c: 2,
};

function arrayFr(obj) {
  // Ваш код здесь
}
```

\*\*Ответ

```js
const obj = {
  a: 1,
  b: 3,
  c: 2,
};

function arrayFr(obj) {
  return Object.values(obj);
}

console.log(arrayFr(obj));
```

---

[[011 Решение задач JS, TS и React|Назад]]
