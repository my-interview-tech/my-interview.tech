---
uid: SyjTAkLWDGfZmUcAc01gn
title: Как объявить переменную в TypeScript?
tags:
  - "#TypeScript"
  - "#var"
  - "#let"
  - "#const"
draft: false
technology: TypeScript
specialty: Frontend
tools: []
order: 8
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

Вы можете создавать переменные тремя способами: `var`, `let` и `const`.

`var` - это старый стиль объявления переменных.

`let` - это способ объявления переменных в TypeScript по умолчанию. По сравнению с `var` `let` уменьшает количество ошибок времени компиляции и повышает читаемость кода.

```typescript
let num: number = 1;
```

`const` создает постоянную переменную, значение которой не может измениться. Он использует те же правила области видимости, что и let, и помогает снизить общую сложность программы.

```typescript
const num: number = 100;
```

---

[[005 TypeScript|Назад]]
