---
title: Task_eventloop - 16
draft: false
tags:
  - "#JavaScript"
  - "#taskJS"
  - "#EventLoop"
  - "#астон"
---

```js
Promise.reject('a')
	.catch((p) => p + 'b')
	.catch((p) => p + 'c')
	.then((p) => p + 'd')
	.then((p) => p + 'f')
	.catch((p) => p + 'h')
	.finally((p) => p + 'e')
	.then((p) => console.log(p))

// abdf
```

____

[[011 Решение задач JS, TS и React|Назад]]