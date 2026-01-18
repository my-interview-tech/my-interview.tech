---
uid: IvPzbdCaNJwhHWhxq7sRe
title: Task_conclusion - 4_0
tags:
  - "#JavaScript"
  - "#taskJS"
  - "#conclusion"
  - "#астон"
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
var l = 25;
var x = 11;

function bar(foo) {
  var x = 30;
  foo();
}

function foo() {
  console.log("x", x); // x 11
}

foo.x = 20;
bar.x = 40;

bar(foo);

l.x = 100;

console.log("foo.x", foo.x); // х 20
console.log(bar.l); // undefined
console.log(l.x); // undefined
```

\*\*Ответ

```js

```

---

[[011 Решение задач JS, TS и React|Назад]]
