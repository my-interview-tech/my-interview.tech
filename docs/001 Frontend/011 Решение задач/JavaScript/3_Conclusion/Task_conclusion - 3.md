---
title: Task_conclusion - 3
draft: false
tags:
  - "#JavaScript"
  - "#taskJS"
  - "#conclusion"
  - "#альфабанк"
---
```js
var value = 2
function showValue() {
	console.log(`showValue ${value}`); //
}

function wrapper() {
	var value = 3;
	console.log(`wrapper ${value}`); //
	showValue();
}

wrapper();
```

___

[[011 Решение задач JS, TS и React|Назад]]