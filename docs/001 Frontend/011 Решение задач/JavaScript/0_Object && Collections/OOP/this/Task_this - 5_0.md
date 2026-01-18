---
uid: BG-xvm6qdeLhwO7py_Oj1
title: Task_this - 5_0
tags:
  - "#JavaScript"
  - "#this"
  - "#taskJS"
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
function foo(num) {
	console.log('foo', num);
	this.count++;
}

foo.count = 0;

var i;
for (i = 0; i < 10; i++) {
	if (i > 5) foo(i);
}

console.log(foo.count);. //
```

\*\*Ответ

```js

```

---

[[011 Решение задач JS, TS и React|Назад]]
