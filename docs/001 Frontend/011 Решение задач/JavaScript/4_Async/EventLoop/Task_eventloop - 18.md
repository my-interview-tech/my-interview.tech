---
title: Task_eventloop - 18
draft: false
tags:
  - "#JavaScript"
  - "#taskJS"
  - "#EventLoop"
  - "#async"
  - "#альфабанк"
---
```js
function print() {
	console.log(1)
}

async function foo(){
	console.log(2)
	await print()
	console.log(3)
}

console.log(4)

foo()

console.log(5)

// 
```

___

[[011 Решение задач JS, TS и React|Назад]]