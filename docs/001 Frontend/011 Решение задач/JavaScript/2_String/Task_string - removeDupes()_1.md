---
uid: 7zK9cJK_dwV6g8gbixQRL
title: Task_string - removeDupes()_1
tags:
  - "#JavaScript"
  - "#taskJS"
  - "#set"
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
function removeDupes(str) {
  // Ваш код здесь
}

console.log(removeDupes("abcd")); // -> 'abcd'
console.log(removeDupes("aabbccdd")); // -> 'abcd'
console.log(removeDupes("abcddbca")); // -> 'abcd'
console.log(removeDupes("abababcdcdcd")); // -> 'abcd'
```

\*\*Ответ

```js
function removeDupes(str) {
  const uniqueCol = new Set(str);
  return [...uniqueCol].join("");
}

console.log(removeDupes("abcd")); // -> 'abcd'
console.log(removeDupes("aabbccdd")); // -> 'abcd'
console.log(removeDupes("abcddbca")); // -> 'abcd'
console.log(removeDupes("abababcdcdcd")); // -> 'abcd'
```

---

[[011 Решение задач JS, TS и React|Назад]]
