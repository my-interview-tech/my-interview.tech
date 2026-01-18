---
uid: 9CUVj5ouc3qVEFt1vaSU4
title: Task_conclusion - createIncrement()_0
tags:
  - "#JavaScript"
  - "#taskJS"
  - "#замыкание"
  - "#БКС"
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
//! что будет в консоли и как исправить вывод значения с правильным value

const createIncrement = (from) => {
  let value = from;

  const increment = () => {
    value += 1;
    console.log(value);
  };

  const message = `current - ${value}`;

  const log = () => {
    console.log(message);
  };

  return [increment, log];
};

const [increment, log] = createIncrement(0);

increment();
increment();

log();
```

\*\*Ответ

```js

```

---

[[011 Решение задач JS, TS и React|Назад]]
