---
uid: I5AobXW4ZVF3WZsILTnyM
title: Task_anagram - allAnagrams()_1
tags:
  - "#JavaScript"
  - "#anagram"
  - "#taskJS"
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

```js
// Работать функция должна как показано в примере ниже:

function allAnagrams(array) {
  // Код здесь
}

console.log(allAnagrams(["abcd", "bdac", "cabd"])); // true
console.log(allAnagrams(["abcd", "bdXc", "cabd"])); // false
```

\*\*Ответ

```js
function allAnagrams(array) {
  let newArr = [];
  for (let i = 0; i < array.length; i++) {
    let newWords = array[i].split("").sort();
    newArr.push(newWords.join(""));
  }
  const uniqueArr = [...new Set(newArr)];
  return true ? uniqueArr.length === 1 : false;
}

console.log(allAnagrams(["abcd", "bdac", "cabd"])); // true
console.log(allAnagrams(["abcd", "bdXc", "cabd"])); // false
```

---

[[011 Решение задач JS, TS и React|Назад]]
