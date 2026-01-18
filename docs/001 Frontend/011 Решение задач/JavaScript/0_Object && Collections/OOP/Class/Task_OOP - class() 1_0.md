---
uid: N-NLBwpDwD-IR0zUPejkr
title: Task_OOP - class() 1_0
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
class First {
  constructor(type = "first") {
    this.type = type;
    this.init();
  }

  init() {
    console.log(this.type);
  }
}

class Second extends First {
  type = "second";
}
const first = new Second("foo"); //
const second = new Second(); //
second.init(); //
```

### Ответ

```js

```

---

[[011 Решение задач JS, TS и React|Назад]]
