---
uid: rVZdBhZ4b1Fu7h5-DfDcf
title: Task_anagram - anagram()_1
tags:
  - "#JavaScript"
  - "#taskJS"
  - "#anagram"
  - "#Яндекс"
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
const anagram1 = ["cat", "eat", "tac", "tae", "tea", "atc", "act"];
const anagram2 = [
  "cat",
  "eat",
  "tac",
  "tae",
  "tea",
  "atc",
  "act",
  "dft",
  "ffg",
  "gfg",
];

const anagrams = (arr) => {
  // Ваш код здесь
};

console.log(anagrams(anagram1));
/* 
[
  ['cat', 'tac', 'atc', 'act'], 
  ['eat', 'tae', 'tea']
]
*/
console.log(anagrams(anagram2));
/*
[
  ['cat', 'tac', 'atc', 'act'], 
  ['eat', 'tae', 'tea'], 
  ['dft'], 
  ['ffg'], 
  ['gfg']
]
*/
```

\*\*Ответ

```js
const anagram1 = ["cat", "eat", "tac", "tae", "tea", "atc", "act"];
const anagram2 = [
  "cat",
  "eat",
  "tac",
  "tae",
  "tea",
  "atc",
  "act",
  "dft",
  "ffg",
  "gfg",
];

const anagrams = (arr) => {
  let obj = {};

  for (let str of arr) {
    const diff = str.split("").sort().join("");
    obj[diff] ? obj[diff].push(str) : (obj[diff] = [diff]);
  }

  return Object.values(obj);
};

console.log(anagrams(anagram1));
/* 
[
  ['cat', 'tac', 'atc', 'act'], 
  ['eat', 'tae', 'tea']
]
*/
console.log(anagrams(anagram2));
/*
[
  ['cat', 'tac', 'atc', 'act'], 
  ['eat', 'tae', 'tea'], 
  ['dft'], 
  ['ffg'], 
  ['gfg']
]
*/
```

---

[[011 Решение задач JS, TS и React|Назад]]
