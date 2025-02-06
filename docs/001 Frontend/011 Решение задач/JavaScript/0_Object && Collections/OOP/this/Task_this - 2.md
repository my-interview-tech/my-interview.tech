---
title: Task_this - 2
draft: false
tags:
  - "#JavaScript"
  - "#this"
  - "#taskJS"
---
```js
'use strict'
const user = {
	name: 'Bob',
	funcFunc() {
		return function () {
			console.log(this);
		}
	},
	funcArrow() {
		return () => {
			console.log(this);
		}
	},
	arrowFunc: () => {
		return function () {
			console.log(this);
		}
	},
	arrowArrow: () => {
		return () => {
			console.log(this);
		}
	},
};

const user2 = {
	name: 'Jim',
	funcFunc: user.funcFunc(),
	funcArrow: user.funcArrow(),
	arrowFunc: user.arrowFunc(),
	arrowArrow: user.arrowArrow()
}

user2.funcFunc(); // 
user2.funcArrow(); // 
user2.arrowFunc(); // 
user2.arrowArrow(); // 
```

**Ответ**

```js
'use strict'
const user = {
	name: 'Bob',
	funcFunc() {
		return function () {
			console.log(this);
		}
	},
	funcArrow() {
		return () => {
			console.log(this);
		}
	},
	arrowFunc: () => {
		return function () {
			console.log(this);
		}
	},
	arrowArrow: () => {
		return () => {
			console.log(this);
		}
	},
};

user.funcFunc()(); // undefined
user.funcArrow()(); // user {}
user.arrowFunc()(); //  undefined
user.arrowArrow()(); // undefined

const user2 = {
	name: 'Jim',
	funcFunc: user.funcFunc(),
	funcArrow: user.funcArrow(),
	arrowFunc: user.arrowFunc(),
	arrowArrow: user.arrowArrow()
}

user2.funcFunc(); // user2{}
user2.funcArrow(); // user {}
user2.arrowFunc(); // user2 {}
user2.arrowArrow(); // window
```

___

[[011 Решение задач JS, TS и React|Назад]]