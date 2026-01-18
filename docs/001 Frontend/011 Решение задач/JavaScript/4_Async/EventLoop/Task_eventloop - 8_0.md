---
uid: 6TB6s3gch_WE4PWtqGWtG
title: Task_eventloop - 8_0
tags:
  - "#JavaScript"
  - "#taskJS"
  - "#EventLoop"
  - "#datagileINC"
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

---

[[011 Решение задач JS, TS и React|Назад]]
