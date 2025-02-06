---
title: Task_this - 3
draft: false
tags:
  - "#JavaScript"
  - "#this"
  - "#taskJS"
---
```js
'use strict'
const user = {
	test: function() {
		const fun = function() {
			console.log(this);
		};
		fun();
	}
}
user.test() // 
```

**Ответ**

```js
'use strict'
const user = {
	test: function() {
		const fun = function() {
			console.log(this);
		};
		fun();
	}
}
user.test() // undefined
```

___

[[011 Решение задач JS, TS и React|Назад]]