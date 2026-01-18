---
uid: gCUTStN80UGv3CvvLLPRr
title: TSTask - getProperty()_0
tags:
  - TypeScript
  - tsTask
draft: false
technology: Решение задач
specialty: Frontend
tools: []
order: 0
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

```ts
// Исправь код
const X = { a: 1, b: 2, c: 3, d: 4 }

function getProperty(obj, key){
	return obj[key]
}

getProperty(X, 'a') getProperty(X, 'm') // Error
```

\*\*Ответ

```ts
const X = { a: 1, b: 2, c: 3, d: 4 };

function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
```

// НЕМНОГО НЕ ПОЙМУ, ЧТО ЗДЕСЬ НАДО БЫЛО ДЕЛАТЬ

---

[[011 Решение задач JS, TS и React|Назад]]
