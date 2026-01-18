---
uid: OEDVh_4gP4uyg7r9HpbCW
title: Task_async - Promise.all()_1
tags:
  - "#JavaScript"
  - "#taskJS"
  - "#promise"
  - "#promiseAll"
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
const foo = (callback) => {
  setTimeout(
    () => {
      callback("A");
    },
    Math.floor(Math.random() * 100),
  );
};

const bar = (callback) => {
  setTimeout(
    () => {
      callback("B");
    },
    Math.floor(Math.random() * 100),
  );
};

const baz = (callback) => {
  setTimeout(
    () => {
      callback("C");
    },
    Math.floor(Math.random() * 100),
  );
};

const result = () => {};

result(); // ['C', 'A', 'B']
```

\*\*Ответ

```js
const foo = (callback) => {
  setTimeout(
    () => {
      callback("A");
    },
    Math.floor(Math.random() * 100),
  );
};

const bar = (callback) => {
  setTimeout(
    () => {
      callback("B");
    },
    Math.floor(Math.random() * 100),
  );
};

const baz = (callback) => {
  setTimeout(
    () => {
      callback("C");
    },
    Math.floor(Math.random() * 100),
  );
};

const result = () =>
  Promise.all([new Promise(baz), new Promise(foo), new Promise(bar)]).then(
    console.log,
  );

result(); // ['C', 'A', 'B']
```

---

[[011 Решение задач JS, TS и React|Назад]]
