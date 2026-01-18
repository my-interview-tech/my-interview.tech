---
uid: y7KNmlJmSMCAro_7FdhXz
title: Task_string - camelCase()_1
tags:
  - "#JavaScript"
  - "#taskJS"
  - "#string"
  - "#RegExp"
  - "#newsMediaINC"
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
/**
 * Функция должна преобразовывать строку в формат camelCase
 * @param str {string}
 */

const str = "mY-comPonent name";

function camelCase(str) {
  // Ваш код здесь
}

console.log(camelCase("mY-comPonent name") === "MyComponentName");
console.log(camelCase(str));
```

\*\*Ответ

```js
const str = "mY-comPonent name";

function camelCase(str) {
  const reg = /[^a-zA-Z]/gm;
  const strArr = str.replace(reg, " ").toLowerCase().split(" ");
  let arr = [];

  for (let i = 0; i < strArr.length; i++) {
    arr.push(strArr[i].charAt(0).toUpperCase() + strArr[i].slice(1));
  }
  return arr.join("");
}

console.log(camelCase("mY-comPonent name") === "MyComponentName");
console.log(camelCase(str));
```

---

[[011 Решение задач JS, TS и React|Назад]]
