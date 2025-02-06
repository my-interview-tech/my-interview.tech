---
title: Task_eventloop - 8
draft: false
tags:
  - "#JavaScript"
  - "#taskJS"
  - "#EventLoop"
  - "#datagileINC"
---
```js
function foo(state) {
	return new Promise((resolve, reject) {
		if(state){
			resolve('success');
		} else {
			reject('error');
		}
	});
}

const promise = foo(true);

promise
	.then((data) => {
		console.log(data)
		return foo(false)
	})
	.catch((error) => {
		console.log(error)
		return 'Error caught'
	})
	.then((data) => {
		console.log(data)
		return foo(true)
	})
	.catch((error) => {
		console.log(error)
	});
```

___

[[011 Решение задач JS, TS и React|Назад]]