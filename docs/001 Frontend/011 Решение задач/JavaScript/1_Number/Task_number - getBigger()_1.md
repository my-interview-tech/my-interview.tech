---
uid: 02Il4sGxUi7MH4jrojNNv
title: Task_number - getBigger()_1
tags:
  - "#JavaScript"
  - "#taskJS"
  - "#number"
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
// на вход передано число, вернуть максимально возможное значение, составленное из цифр входящих в число

const getBigger = (number) => {
  // Ваш код здесь
};

console.log(getBigger(6291));
console.log(getBigger(417));
console.log(getBigger(3814));
```

\*\*Ответ

```js
const getBigger = (number) => {
  return Number(
    number
      .toString()
      .split("")
      .sort((a, b) => b - a)
      .join(""),
  );
};

console.log(getBigger(6291));
console.log(getBigger(417));
console.log(getBigger(3814));
```

---

[[011 Решение задач JS, TS и React|Назад]]
