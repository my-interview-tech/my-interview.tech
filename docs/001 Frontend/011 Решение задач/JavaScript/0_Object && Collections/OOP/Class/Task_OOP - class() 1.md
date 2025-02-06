---
title: Task_OOP - class() 1
draft: false
tags:
  - "#JavaScript"
  - "#taskJS"
  - "#class"
---
```js
class First {
	constructor(type = "first") {
		this.type = type;
		this.init();
	}
	
	init() {
		console.log(this.type);
	}
}

class Second extends First {
	type = "second";
}
const first = new Second("foo"); //
const second = new Second(); //
second.init(); //
```

___

[[011 Решение задач JS, TS и React|Назад]]