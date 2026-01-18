---
uid: Z-5WJu1KOhCa2bqegUSB8
title: Task_string - isBalanced()_1
tags:
  - "#JavaScript"
  - "#taskJS"
  - "#RegExp"
  - "#string"
  - "#БэллИнтегратор"
  - "#сбербанк"
  - "#Яндекс"
  - "#itOne"
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
function isBalanced(str) {
  // Ваш код здесь
}

console.log(isBalanced("(x + y) - (4)")); // -> true
console.log(isBalanced("(((10 ) ()) ((?)(:)))")); // -> true
console.log(isBalanced("[({()})]")); // -> true
console.log(isBalanced("(50)((")); // -> false
console.log(isBalanced("[{]}")); // -> false
```

\*\*Ответ

```js
function isBalanced(str) {
  const regProps = /[\(\)|\[\]|\{\}]/gm;
  const regArrows = /\(\)|\[\]|\{\}/gm;

  let prev = "";
  let replaced = str.match(regProps).join("");

  while (replaced !== prev) {
    prev = replaced;
    replaced = replaced.replace(regArrows, "");
  }

  return prev === "";
}

console.log(isBalanced("(x + y) - (4)")); // -> true
console.log(isBalanced("(((10 ) ()) ((?)(:)))")); // -> true
console.log(isBalanced("[({()})]")); // -> true
console.log(isBalanced("(50)((")); // -> false
console.log(isBalanced("[{]}")); // -> false
```

---

[[011 Решение задач JS, TS и React|Назад]]
