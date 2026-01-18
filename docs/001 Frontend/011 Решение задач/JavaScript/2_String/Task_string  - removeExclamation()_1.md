---
uid: ashPqt_wOlg-3UV-w26Jm
title: Task_string  - removeExclamation()_1
tags:
  - JavaScript
  - "#taskJS"
  - "#райфайзенбанк"
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
const removeExclamation = (str, count) => {
  // Ваш код здесь
};

console.log(removeExclamation("!!He!!llo, !world!", 5));
```

\*\*Ответ

```js
const removeExclamation = (str, count) => {
  if (typeof str !== "string") {
    return undefined;
  }

  let newStr = str;
  let removedCounter = 0;

  for (let i = 0; i < str.length; i++) {
    if (removedCounter === count) {
      return newStr;
    } else if (str[i] === "!") {
      newStr = newStr.replace(str[i], "");
      removedCounter += 1;
    }
  }

  return newStr;
};

console.log(removeExclamation("!!He!!llo, !world!", 5)); // Hello, world!
```

---

[[011 Решение задач JS, TS и React|Назад]]
