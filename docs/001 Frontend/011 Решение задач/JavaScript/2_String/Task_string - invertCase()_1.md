---
uid: E8wiwpu6sf_92aB3AZKxN
title: Task_string - invertCase()_1
tags:
  - "#JavaScript"
  - "#taskJS"
  - "#string"
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
Реализуйте функцию, которая меняет в строке регистр каждой буквы на противоположный.
Функция должна возвращать полученный результат
*/

const invertCase = (str) => {
  let res = "";

  for (let i = 0; i < str.length; i++) {
    if (str[i].match(/[A-Z]/gm)) {
      res += str[i].toLowerCase();
    } else {
      res += str[i].toUpperCase();
    }
  }
  return res;
};

console.log(invertCase("Hello, World!")); // hELLO, wORLD!
console.log(invertCase("I loVe JS")); // i LOvE js
```

---

[[011 Решение задач JS, TS и React|Назад]]
