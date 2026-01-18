---
uid: D1oD5WgUp6VNW6fggNUiP
title: Task_anagram - findAnagrams()_1
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
Напишите функцию, которая принимает массив слов 
и возвращает массив, содержащий все пары слов, 
являющиеся анаграммами.

// console.log(findAnagrams(["listen", "silent", "hello", "loleh", "cat", "act", "pips"]));
// ["listen", "silent", "hello", "loleh", "cat", "act"]
*/
```

\*\*Ответ

```js
function findAnagrams(wordArr) {
  let anagramObj = {};

  for (let word of wordArr) {
    const sorted = word.split("").sort().join("");

    if (anagramObj[sorted]) {
      anagramObj[sorted].push(word);
    } else {
      anagramObj[sorted] = [word];
    }
  }

  const filtered = Object.values(anagramObj).filter((arr) => arr.length > 1);

  return filtered.flat(Infinity);
}
```

---

[[011 Решение задач JS, TS и React|Назад]]
