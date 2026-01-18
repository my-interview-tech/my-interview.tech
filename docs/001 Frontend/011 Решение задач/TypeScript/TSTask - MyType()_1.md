---
uid: CsfKROqNVrGlWQ2LXML9q
title: TSTask - MyType()_1
tags:
  - "#TypeScript"
  - "#tsTask"
  - "#types"
  - "#детскийМир"
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
type MyType = any;

const values: MyType[] = [
  {
    type: "number",
    value: 42,
  },
  {
    type: "string",
    message: "Hello, World!",
  },
  {
    type: "range",
    from: 0,
    to: 100,
  },
];

console.log(values);
```

\*\*Ответ

```ts
type MyType = {
  type: string;
  value?: number;
  message?: string;
  from?: number;
  to?: number;
};

const values: MyType[] = [
  {
    type: "number",
    value: 42,
  },
  {
    type: "string",
    message: "Hello, World!",
  },
  {
    type: "range",
    from: 0,
    to: 100,
  },
];

console.log(values);
```

---

[[011 Решение задач JS, TS и React|Назад]]
