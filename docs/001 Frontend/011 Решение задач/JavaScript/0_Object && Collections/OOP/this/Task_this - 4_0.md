---
uid: FPUERuA_Blm3JQnAAD8h1
title: Task_this - 4_0
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
"useStrict";
var length = 4;

function cb() {
  console.log(this.length);
}

const object = {
  length: 5,
  method(cb) {
    cb();
  },
};

object.method(cb); //
```

\*\*Ответ

```js
"useStrict";
var length = 4;

function cb() {
  console.log(this.length);
}

const object = {
  length: 5,
  method(cb) {
    cb();
  },
};

object.method(cb); //
```

---

[[011 Решение задач JS, TS и React|Назад]]
