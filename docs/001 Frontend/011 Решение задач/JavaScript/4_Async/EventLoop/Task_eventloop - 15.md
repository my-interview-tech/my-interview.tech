---
title: Task_eventloop - 15
draft: false
tags:
  - "#JavaScript"
  - "#taskJS"
  - "#EventLoop"
---
```js
//! Что будет в консоли?

try {
	new Promise((res, rej) => {
		a++
		console.log(a);
		res(a);
	})
	.then(i => {
		console.log(i);
		a++;
		console.log(a);
		return a + i;
	})
	.catch((error) => {
		console.log(error)
		a++;
		return a;
	})
	.then((value) => console.log(value))
	.catch((error) => console.log(error));
	let a = 1;
	} catch (e) {
		console.log(e);
}
```

___

[[011 Решение задач JS, TS и React|Назад]]