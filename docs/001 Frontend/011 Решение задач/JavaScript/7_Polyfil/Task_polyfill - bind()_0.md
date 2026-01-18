---
uid: DFt7_g60wSG-ahKb07tP0
title: Task_polyfill - bind()_0
tags:
  - "#JavaScript"
  - "#taskJS"
  - "#polyfill"
  - "#bind"
draft: false
technology: Решение задач
specialty: Frontend
tools: []
order: 0
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

```JS
// Напишите полифилл на bind
```

\*\*Ответ

```js
Function.prototype.myBind = function (context, ...args) {
  return (...rest) => {
    return this.call(context, ...args.concat(rest));
  };
};

function log(...props) {
  console.log(this.name, this.age, ...props);
}

const obj = { name: "Vladilen", age: 28 };

log.myBind(obj, 1, 2)();
```

---

[[011 Решение задач JS, TS и React|Назад]]
