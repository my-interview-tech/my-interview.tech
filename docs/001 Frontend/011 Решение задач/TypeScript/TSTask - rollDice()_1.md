---
uid: s2XUyjxCmpXzRYawy5O6F
title: TSTask - rollDice()_1
tags:
  - "#TypeScript"
  - "#tsTask"
  - "#СравниРУ"
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
// Типизируй функцию

function rollDice(): 1 | 2 | 3 | 4 | 5 | 6 {
  return Math.floor(Math.random() * 6) + 1;
}
```

\*\*Ответ

```ts
function rollDice(): number {
  return Math.floor(Math.random() * 6) + 1;
}

console.log(rollDice());
```

---

[[011 Решение задач JS, TS и React|Назад]]
