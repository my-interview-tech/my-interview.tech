---
uid: sOD3TeqwaHHLwvGvDJWCq
title: Task_polyfil - promiseAll()_0
tags:
  - "#JavaScript"
  - "#taskJS"
  - "#polyfill"
  - "#promise"
  - "#promiseAll"
  - "#УралСИБ"
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
// написать функцию-полифилл promiseAll

function myPromiseAll(promises) {
  // Ваш код здесь
}

const p1 = Promise.resolve("first");

const p2 = new Promise((resolve, reject) =>
  setTimeout(resolve, 1000, "second"),
);

const p3 = Promise.resolve("third");

const p4 = Promise.reject("err");

myPromiseAll([p1, p2, p3, p4]);
```

\*\*Ответ

```js
function promiseAll(promises) {
  if (promises.length === 0) return Promise.resolve([]);
  const copy = [...promises];

  return new Promise((resolve, reject) => {
    let count = 0;
    for (let i = 0; i < promises.length; i++) {
      promises[i]
        .then((res) => {
          copy[i] = res;
          if (++count === promises.length) resolve(copy);
        })
        .catch((err) => reject(err));
    }
  });
}
```

---

[[011 Решение задач JS, TS и React|Назад]]
