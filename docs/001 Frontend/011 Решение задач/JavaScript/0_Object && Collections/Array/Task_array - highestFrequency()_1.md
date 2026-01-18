---
uid: bBOYUkJ-pTuT5eDgkHPZA
title: Task_array - highestFrequency()_1
tags:
  - "#JavaScript"
  - "#taskJS"
  - "#array"
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
Напишите функцию, которая принимает массив строк и возвращает самую частовстречающуюся строку в этом массиве. Если таких строк несколько, то нужно вернуть первую, идя слева на право.
*/

function highestFrequency(array) {
  // todo
}

console.log(highestFrequency(["a", "b", "c", "c", "d", "e"])); // -> c
console.log(highestFrequency(["abc", "def", "abc", "def", "abc"])); // -> abc
console.log(highestFrequency(["abc", "def"])); // -> abc
console.log(
  highestFrequency([
    "abc",
    "abc",
    "def",
    "def",
    "def",
    "ghi",
    "ghi",
    "ghi",
    "ghi",
  ]),
); // -> ghi
```

\*\*Ответ

```js
function highestFrequency(arr) {
  const result = arr.reduce((acc, el) => {
    acc[el] = (acc[el] || 0) + 1;
    return acc;
  }, {});

  let maxFrequency = 0;
  let mostFrequentString = "";

  for (const key in result) {
    if (result[key] > maxFrequency) {
      maxFrequency = result[key];
      mostFrequentString = key;
    }
  }
  return mostFrequentString;
}
```

---

[[011 Решение задач JS, TS и React|Назад]]
