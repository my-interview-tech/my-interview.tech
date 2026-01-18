---
uid: AqZHp9-9D1yCMN3EOD3vW
title: Task_string - checkBrackets()_1
tags:
  - "#JavaScript"
  - "#taskJS"
  - "#RegExp"
  - "#string"
  - "#recursion"
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
let s1 = "()";
let s2 = "()[]{}";
let s3 = "(]";
let s4 = "{[]}";
let s5 = "([)]";
let s6 = "{[[]{}]}()()";

function checkBrackets(str) {
  // Ваш код здесь
}

console.log(checkBrackets(s1)); // true
console.log(checkBrackets(s2)); // true
console.log(checkBrackets(s3)); // false
console.log(checkBrackets(s4)); // true
console.log(checkBrackets(s5)); // false
console.log(checkBrackets(s6)); // true
```

\*\*Ответ

```js
function checkBrackets(str) {
  const regX = /{}|\(\)|\[\]/gm;
  const replaced = str.replace(regX, "");

  if (str === replaced) {
    return str == "";
  }

  return checkBrackets(replaced);
}
```

---

[[011 Решение задач JS, TS и React|Назад]]
