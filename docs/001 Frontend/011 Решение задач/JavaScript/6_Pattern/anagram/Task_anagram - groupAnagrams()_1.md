---
uid: Az3j7Bt3NdqDZNOazM8H5
title: Task_anagram - groupAnagrams()_1
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
Описание: 
Напишите функцию, которая принимает массив слов и 
возвращает массив, содержащий все анаграммы группированные в подмассивы.

groupAnagrams(["listen", "silent", "hello", "loleh", "cat", "act"]);
// [["listen", "silent"], ["hello", "loleh"], ["cat", "act"]]
*/
```

\*\*Ответ

```js
function groupAnagrams(arr) {
  let grAnagram = {};

  for (let anagram of arr) {
    const sorted = anagram.split("").sort().join("");
    if (grAnagram[sorted]) {
      grAnagram[sorted].push(anagram);
    } else {
      grAnagram[sorted] = [anagram];
    }
  }

  return Object.values(grAnagram);
}
```

---

[[011 Решение задач JS, TS и React|Назад]]
