---
uid: 2xJbUYA0XX1LbCdWJQa9u
title: Что такое (`interface`) в TypeScript?
tags:
  - "#TypeScript"
  - "#interface"
info: []
draft: false
technology: TypeScript
specialty: Frontend
tools: []
order: 21
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

`interface` определяет свойства и методы, которые объект должен реализовать. Другими словами, интерфейс - это определение кастомного типа данных, но без реализации.

```typescript
interface IEmployee {
  empCode: number;
  empName: string;
  getSalary: (number) => number; // arrow function
  getManagerName(number): string;
}
```

---

[[005 TypeScript|Назад]]
