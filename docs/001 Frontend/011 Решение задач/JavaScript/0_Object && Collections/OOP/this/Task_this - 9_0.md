---
uid: IQRsZjqE1Ignyr6ess7JK
title: Task_this - 9_0
tags:
  - "#JavaScript"
  - "#this"
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
"use strict";

const obj1 = {
  name: "Alice",
  func1: () => {
    return () => {
      console.log(this.name);
    };
  },
};

const obj2 = {
  name: "Bob",
  func2: obj1.func1(),
};

obj2.func2(); // und
```

\*\*Ответ

```js

```

---

[[011 Решение задач JS, TS и React|Назад]]
