---
uid: yWUr-H48GqQ5DpDP6dYhg
title: Task_eventloop - 24_1
tags:
  - JavaScript
  - "#taskJS"
  - "#EventLoop"
draft: false
technology: Решение задач
specialty: Frontend
tools: []
order: 0
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

```JS
const p = new Promise((resolve, reject) =>
        reject(Error('All is broken :(')))
    .catch((error) => console.log(1, error.message))
    .catch((error) => console.log(2, error.message));
```

---

[[011 Решение задач JS, TS и React|Назад]]
