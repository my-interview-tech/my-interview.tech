---
uid: RM-aAoRJckVkm9n5srFRQ
title: Task_anagram - isAnagram()_1
tags:
  - "#JavaScript"
  - "#taskJS"
  - "#anagram"
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
/*
Описание: Напишите функцию, которая принимает две строки 
и определяет, являются ли они анаграммами 
(имеют одинаковые буквы в разном порядке).
Пример:
// console.log(isAnagram("listen", "silent")); // true
// console.log(isAnagram("hello", "world")); // false
*/
```

\*\*Ответ

```js
function isAnagram(str1, str2) {
  return true
    ? str1.split("").sort().join("") === str2.split("").sort().join("")
    : false;
}
```

---

[[011 Решение задач JS, TS и React|Назад]]
