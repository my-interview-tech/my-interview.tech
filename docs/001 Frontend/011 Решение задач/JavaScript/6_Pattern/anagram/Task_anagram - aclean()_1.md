---
uid: sFHjmb9Gqt7ob3yRl37rf
title: Task_anagram - aclean()_1
tags:
  - "#JavaScript"
  - "#taskJS"
  - "#anagram"
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
/*
Анаграммы – это слова, у которых те же буквы в том же количестве, но они располагаются в другом порядке.

Например:
`nap - pan ear - are - era cheaters - hectares - teachers`

Напишите функцию `aclean(arr)`, которая возвращает массив слов, очищенный от анаграмм.
*/

let arr = ["nap", "teachers", "cheaters", "PAN", "ear", "era", "hectares"];

function aclean(arr) {
  // Ваш код здесь
}

console.log(aclean(arr)); // "nap,teachers,ear" или "PAN,cheaters,era"
// Из каждой группы анаграмм должно остаться только одно слово, не важно какое.
```

\*\*Ответ

```js
function aclean(arr) {
  let objAn = {};

  for (let words of arr) {
    let sorted = words.toLowerCase().split("").sort().join("");
    if (objAn[sorted]) {
      objAn[sorted].push(words);
    } else {
      objAn[sorted] = [words];
    }
  }
  let finished = [];
  let results = Object.values(objAn);

  for (let i = 0; i < results.length; i++) {
    finished.push(results[i][0]);
  }

  return finished.join(",");
}
```

---

[[011 Решение задач JS, TS и React|Назад]]
