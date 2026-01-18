---
uid: fSkjliiIJFAHZF3WYGdix
title: Task_whatIf - 7_0
tags:
  - "#JavaScript"
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
var b = {
  p: "b",
  b: function () {
    console.log(this.p);
  },
};

var a = {
  p: "a",
  a: function () {
    var b1 = b.b;
    a.b2 = b1;
    b1();
    b.b();
    a.b2();
  },
};
a.a();
```

\*\*Ответ

```js

```

---

[[011 Решение задач JS, TS и React|Назад]]
