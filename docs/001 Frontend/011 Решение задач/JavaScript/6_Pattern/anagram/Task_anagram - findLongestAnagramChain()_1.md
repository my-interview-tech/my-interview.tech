---
uid: 0Tf-io2GI8VF3QBNlcH13
title: Task_anagram - findLongestAnagramChain()_1
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
возвращает самую длинную цепочку анаграмм в виде массива.

Пример:
findLongestAnagramChain(["listen", "silent", "hello", "loleh", "cat", "act"]);
// ["listen", "silent"]
*/
```

\*\*Ответ

```js
function findLongestAnagramChain(arr) {
  const grpAnagrams = {};

  for (let name of arr) {
    const sorted = name.split("").sort().join("");
    if (grpAnagrams[sorted]) {
      grpAnagrams[sorted].push(name);
    } else {
      grpAnagrams[sorted] = [name];
    }
  }

  let maxChain = [];
  for (let word of Object.values(grpAnagrams)) {
    const chain = word.join("").length;
    if (chain > maxChain) {
      maxChain = word;
    }
  }

  return maxChain;
}
```

---

[[011 Решение задач JS, TS и React|Назад]]
