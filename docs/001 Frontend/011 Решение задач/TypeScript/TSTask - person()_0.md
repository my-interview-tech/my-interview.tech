---
uid: FoyoQvof1jYxViCJ27tRQ
title: TSTask - person()_0
tags:
  - "#TypeScript"
  - "#tsTask"
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
type Optional<T extends {}, O extends keyof T> = any;

type Person = { name: string; age: number; phone: number };
type OptionalAge = Optional<Person, "age">; // {name:string, age?:number, phone:number}
type OptionalAgePhone = Optional<Person, "age" | "phone">; // {name:string; age?:number;phone?:number }
```

\*\*Ответ

```ts

```

---

[[011 Решение задач JS, TS и React|Назад]]
