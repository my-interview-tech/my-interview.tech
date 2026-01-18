---
uid: 3cnmgyW9lb_Ni_TsktAKl
title: Что делает тип Omit?
tags:
  - "#TypeScript"
  - "#omit"
info: null
draft: false
technology: TypeScript
specialty: Frontend
tools: []
order: 35
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

`Omit` - это форма служебного типа, которая упрощает преобразования общих типов. `Omit` _позволяет вам создать тип, передав текущий тип и выбрав ключи, которые нужно пропустить в новом типе._

```typescript
Omit<Type, Keys>;
```

Например:

```typescript
interface Todo {
  title: string;
  description: string;
  completed: boolean;
  createdAt: number;
}

type TodoPreview = Omit<Todo, "description">;
```

---

[[005 TypeScript|Назад]]
