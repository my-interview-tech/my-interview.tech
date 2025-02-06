---
title: Task_conclusion - 4
draft: false
tags:
  - "#JavaScript"
  - "#taskJS"
  - "#conclusion"
  - "#астон"
---
```js
var l = 25;
var x = 11;

function bar(foo) {
	var x = 30;
	foo()
}

function foo() {
	console.log('x', x) //
}

foo.x = 20;
bar.x = 40;

bar(foo);

l.x = 100;

console.log('foo.x', foo.x) // 
console.log(bar.l) // 
console.log(l.x) // 
```

___

[[011 Решение задач JS, TS и React|Назад]]