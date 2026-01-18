---
uid: km25rCL6DA6sn1aSlu-tN
title: Task_async - for(setTimeout)_1
tags:
  - "#JavaScript"
  - "#taskJS"
  - "#астон"
  - "#for"
  - "#async"
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
for (var i = 0; i < 10; i++) {
  setTimeout(function () {
    console.log(i);
  }, 1000);
}

// 10..... потому что сработает после выполнения синхронного кода, особенности var
// если let то 1, 2, 3, 4,
```

\*\*Ответ

```js

```

---

[[011 Решение задач JS, TS и React|Назад]]
