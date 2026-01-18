---
uid: U8lCImz231Qbjjs-_N-Ai
title: Task_this - 3_1
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
const user = {
  test: function () {
    const fun = function () {
      console.log(this);
    };
    fun();
  },
};
user.test(); //
```

\*\*Ответ

```js
"use strict";
const user = {
  test: function () {
    const fun = function () {
      console.log(this);
    };
    fun();
  },
};
user.test(); // undefined
```

---

[[011 Решение задач JS, TS и React|Назад]]
