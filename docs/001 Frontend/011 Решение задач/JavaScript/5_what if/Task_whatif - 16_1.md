---
uid: ZVpeKMgILNEubmhuiLOuv
title: Task_whatif - 16_1
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
// Избавиться от лишних меседжей
useEffect(() => {
  if (!message) {
    return;
  }
  const pauseID = setTimeout(() => {
    setMessage("");
  }, 7000);
}, [message]);
```

\*\*Ответ

```js
// Избавиться от лишних меседжей
useEffect(() => {
  if (!message) {
    return;
  }
  const pauseID = setTimeout(() => {
    setMessage("");
  }, 7000);
  return () => clearTimeout(pauseID);
}, [message]);
```

---

[[011 Решение задач JS, TS и React|Назад]]
