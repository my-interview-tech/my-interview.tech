---
uid: RzHIP8XyHD-e51gyznkjc
title: TSTask - nullable()
tags:
  - "#TypeScript"
  - "#tsTask"
  - "#nonnullable"
  - "#unknownINC"
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
const obj = {
  a: string,
  b: number,
};

const nullableObj = {
  a: string | null,
  b: number | null,
};
```

\*\*Ответ

```ts
type Nullable<T> = {
  [P in keyof T]: T[P] | null;
};
```

---

[[011 Решение задач JS, TS и React|Назад]]
