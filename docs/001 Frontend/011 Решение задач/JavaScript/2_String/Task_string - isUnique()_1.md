---
uid: kicwRyx7LsmKqV5MdDhRK
title: Task_string - isUnique()_1
tags:
  - "#JavaScript"
  - "#taskJS"
  - "#string"
draft: false
technology: Решение задач
specialty: Frontend
tools: []
order: 0
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

```js
function isUnique(string) {
  // todo
}

console.log(isUnique("abcdef")); // -> true
console.log(isUnique("1234567")); // -> true
console.log(isUnique("abcABC")); // -> true
console.log(isUnique("abcadef")); // -> false
```

\*\*Ответ

```js
function isUnique(str) {
  return [...new Set(str)].join("") === str;
}
```

---

[[011 Решение задач JS, TS и React|Назад]]
