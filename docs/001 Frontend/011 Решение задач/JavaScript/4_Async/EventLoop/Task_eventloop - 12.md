---
title: Task_eventloop - 12
draft: false
tags:
  - "#JavaScript"
  - "#taskJS"
  - "#EventLoop"
---
```js
//! Что будет в консоли?

console.log(1)

setTimeout(() => {
	console.log(2);
})

requestAnimationFrame(() => {
	console.log(6);
})

new Promise((res) => {
	console.log(3);
	res();
}).
then(() => {
	console.log(5);
	queueMicrotask(() => {
		console.log(7)
	})
})

console.log(4)
```

___

[[011 Решение задач JS, TS и React|Назад]]