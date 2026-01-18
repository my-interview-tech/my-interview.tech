---
uid: gupT6qUo0GFtoC3kl-QY-
title: Task_string - minifyString()_1
tags:
  - "#JavaScript"
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
const minifyString = (string) => {
  // your code here...
};

console.log(minifyString("aaaawwwweerrr")); // '3a4w2e3r'
```

\*\*Ответ

```js
const minifyString = (str) => {
  let res = "";

  const newObj = str.split("").reduce((acc, el) => {
    acc[el] = (acc[el] || 0) + 1;
    return acc;
  }, {});

  const newArr = Object.entries(newObj);

  for (let i = 0; i < newArr.length; i++) {
    res += newArr[i][1] + newArr[i][0];
  }

  return res;
};

console.log(minifyString("aaaawwwweerrr")); // '4a4w2e3r'
```

---

[[011 Решение задач JS, TS и React|Назад]]
