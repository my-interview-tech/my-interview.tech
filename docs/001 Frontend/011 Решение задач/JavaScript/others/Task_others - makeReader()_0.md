---
uid: aUGEL5qyO4HuNYuR9mla2
title: Task_others - makeReader()_0
tags:
  - "#JavaScript"
  - "#taskJS"
  - "#сбербанк"
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
function makeReader() {
  let books = [];
  let i = 0;

  while (i < 10) {
    const bookReader = function () {
      console.log(i);
    };
    i++;
    books.push(bookReader);
  }
  return books;
}

let reader = makeReader();

reader[0]();
reader[5]();
```

\*\*Ответ

```js

```

---

[[011 Решение задач JS, TS и React|Назад]]
