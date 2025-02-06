---
title: Promise.all()
draft: false
tags:
  - "#JavaScript"
  - "#taskJS"
  - "#promise"
  - "#promiseAll"
---
```js
const foo = (callback) => {
  setTimeout(() => {
    callback("A");
  }, Math.floor(Math.random() * 100));
};

const bar = (callback) => {
  setTimeout(() => {
    callback("B");
  }, Math.floor(Math.random() * 100));
};

const baz = (callback) => {
  setTimeout(() => {
    callback("C");
  }, Math.floor(Math.random() * 100));
};

const result = () => {};

result(); // ['C', 'A', 'B']
```

___

[[011 Решение задач JS, TS и React|Назад]]