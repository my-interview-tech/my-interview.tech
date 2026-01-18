---
uid: hlPnz5wnf8wv8YBi8Ey59
title: Task_whatif - 11_1
tags:
  - "#JavaScript"
  - "#taskJS"
  - "#itOne"
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
// создать массив: [0,1,2,3,4,5,6,7,8,9]
```

\*\*Ответ

```js
const arr = Array.from({ length: 10 }, (__, i) => i);
// или:
const arr = [...Array(10).keys()];
```

---

[[011 Решение задач JS, TS и React|Назад]]
