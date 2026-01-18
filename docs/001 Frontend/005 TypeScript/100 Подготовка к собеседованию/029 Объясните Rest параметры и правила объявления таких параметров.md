---
uid: kv9FuNrnp7YEZOhpWLAUA
title: Объясните Rest параметры и правила объявления таких параметров
tags:
  - "#TypeScript"
  - "#rest"
info: []
draft: false
technology: TypeScript
specialty: Frontend
tools: []
order: 29
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

Rest параметры позволяют передавать функции различное количество аргументов (ноль или более). Это полезно, когда вы не знаете, сколько параметров получит функция. Все аргументы после оставшегося символа `...` будут сохранены в массиве.

Например:

```typescript
function Greet(greeting: string, ...names: string[]) {
  return greeting + " " + names.join(", ") + "!";
}

Greet("Hello", "Steve", "Bill"); // returns "Hello Steve, Bill!"

Greet("Hello"); // returns "Hello !"
```

---

[[005 TypeScript|Назад]]
