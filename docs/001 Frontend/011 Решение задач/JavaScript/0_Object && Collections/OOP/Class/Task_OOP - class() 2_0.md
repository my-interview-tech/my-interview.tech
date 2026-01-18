---
uid: oakufwlA5fWMnloph8uJi
title: Task_OOP - class() 2_0
tags:
  - "#JavaScript"
  - "#taskJS"
  - "#class"
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
var animal = { jumps: null };
var rabbit = { jumps: true };

rabbit.__proto__ = animal;

console.log(rabbit.jumps); //

delete rabbit.jumps;
console.log(rabbit.jumps); //

delete animal.jumps;
console.log(rabbit.jumps); //
```

### Ответ

```js

```

---

[[011 Решение задач JS, TS и React|Назад]]
