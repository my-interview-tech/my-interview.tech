---
uid: dubGQKLTSv-bOx_BBZNkj
title: Task_anagram - findAnagramWords()_1
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
Напишите функцию, которая принимает предложение и 
возвращает массив всех анаграмм слов в предложении. 
Игнорируйте знаки препинания и регистр букв.

findAnagramWords("Listen silent, I am listen!"); 
*/
```

\*\*Ответ

```js
function findAnagramWords(str) {
  const findedAnag = {};
  const regExp = /[^\w|\s]/gm;
  const replaced = str.replace(regExp, "").split(" ");

  for (let anagram of replaced) {
    const sorted = anagram.toLowerCase().split("").sort().join("");
    if (findedAnag[sorted]) {
      findedAnag[sorted].push(anagram);
    } else {
      findedAnag[sorted] = [anagram];
    }
  }
  return Object.values(findedAnag).filter((el) => el.length > 1);
}
```

---

[[011 Решение задач JS, TS и React|Назад]]
