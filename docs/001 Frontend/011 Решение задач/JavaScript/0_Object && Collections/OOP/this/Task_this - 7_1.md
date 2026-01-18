---
uid: 21xcIhpJZDC5HlTvEV8CF
title: Task_this - 7_1
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
// Чему будет равен this в b1 и в b2 и почему ?

let a = {
  b1: function () {
    console.log(this);
  },
  b2: () => {
    console.log(this);
  },
};

a.b1();
a.b2();
```

\*\*Ответ

```js
let a = {
  b1: function () {
    console.log(this);
  },
  b2: () => {
    console.log(this);
  },
};

a.b1(); // a {}
a.b2(); // window{}
```

---

[[011 Решение задач JS, TS и React|Назад]]
