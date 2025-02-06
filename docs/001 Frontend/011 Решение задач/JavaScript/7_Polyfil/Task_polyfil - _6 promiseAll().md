---
title: promiseAll()
draft: false
tags:
  - "#JavaScript"
  - "#taskJS"
  - "#polyfill"
  - "#promise"
  - "#promiseAll"
  - "#УралСИБ"
---
```js
// написать функцию-полифилл promiseAll

function myPromiseAll(promises) {
	// Ваш код здесь
}

const p1 = Promise.resolve("first");

const p2 = new Promise((resolve, reject) =>
  setTimeout(resolve, 1000, "second")
);

const p3 = Promise.resolve("third");

const p4 = Promise.reject("err");

myPromiseAll([p1, p2, p3, p4]);
```

___

[[011 Решение задач JS, TS и React|Назад]]