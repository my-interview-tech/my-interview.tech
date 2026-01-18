---
uid: Wk_TDC_8gLuGsIL2BndHX
title: Task_polyfil - includes()_1
tags:
  - "#JavaScript"
  - "#taskJS"
  - "#polyfill"
  - "#includes"
  - "#БКС"
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
// Ваш код здесь
```

\*\*Ответ

```js
Array.prototype.myIncludes = myIncludes;

function myIncludes(el) {
  for (let i = 0; i < this.length; i++) {
    if (el === this[i]) {
      return true;
    }
  }
  return false;
}

[1, 2, 3].myIncludes("cat")[(1, 2, 3, "cat")].myIncludes("cat");
```

---

[[011 Решение задач JS, TS и React|Назад]]
