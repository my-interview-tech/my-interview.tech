---
uid: bPr5c4M5DWnyMyNKW2aKX
title: Как проверить на null или undefined?
tags:
  - "#TypeScript"
  - "#null"
  - "#undefined"
info: null
draft: false
technology: TypeScript
specialty: Frontend
tools: []
order: 16
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

Для выполнения подобных проверок достаточно воспользоваться следующей конструкцией:

```ts
if (value) {
}
```

Выражение в скобках будет приведено к `true` в том случае, если оно не является чем-то из следующего списка:

- `null`
- `undefined`
- `NaN`
- Пустая строка
- 0
- `false`

TypeScript поддерживает те же правила преобразования типов, что и JavaScript.

---

[[005 TypeScript|Назад]]
