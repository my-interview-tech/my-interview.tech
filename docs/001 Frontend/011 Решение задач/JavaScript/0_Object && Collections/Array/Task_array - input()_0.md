---
uid: NUMZMgQbVZlip2id2jVQS
title: Task_array - input()_0
tags:
  - "#JavaScript"
  - "#taskJS"
  - "#3itech"
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
// Задача: написать функцию `decode` в том же стиле, что и функция `encode` (вытянутой в цепочку) и узнать значение переменной `input`

const encode = (input) =>
  [...input]
    .map((x, i) => [x.charCodeAt(0), i])
    .sort()
    .flatMap((x) => x)
    .join(".")
    .match(/./g)
    .flatMap((x, i) => new Array(x == "." ? 1 : 2 + x * 2).fill((1 + i) % 2))
    .join("")
    .replace(/(([01])\2*)/g, (x) => `${+x ? "." : "-"}${x.length}`);
```

```js

```

---

[[011 Решение задач JS, TS и React|Назад]]
