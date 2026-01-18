---
uid: 88IY_vcsWMLvLuQ2nbTws
title: Task_object - readOnlyObj()_1
tags:
  - "#JavaScript"
  - "#taskJS"
  - "#object"
  - "#Object-defineProperty"
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
const readOnlyObj = {
  name: "some string",
  age: "",
};

readOnlyObj.name = "";
```

\*\*Ответ

```js
const readOnlyObj = {
  name: "some string",
  age: "",
};

Object.defineProperties(readOnlyObj, {
  name: {
    writable: false,
  },
});

readOnlyObj.name = "";
console.log(readOnlyObj.name);
```

---

[[011 Решение задач JS, TS и React|Назад]]
