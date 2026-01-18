---
uid: rNvgg0R0abm4qrbmq30fW
title: Task_this - 8_0
tags:
  - "#JavaScript"
  - "#taskJS"
  - "#this"
  - альфабанк
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
var a = {
	firstName: 'Bill',
	lastName: 'Ivanov',
	sayName: function() {
		console.log(this.firstName)
	}
	sayLastName: () => {
		console.log(this.lastName)
	}
};

a.sayName() //

var b = a.sayName() //

a.sayName.bind({firstName: 'Boris'})(); //

a.sayName() //
a.sayLastName() //

a.sayName.bind({firstName: 'Boris'}).bind({firstName: 'Tom'})() //

a.sayLastName.bind({lastName: 'Petrov'})() //
```

\*\*Ответ

```js
var a = {
	firstName: 'Bill',
	lastName: 'Ivanov',
	sayName: function() {
		console.log(this.firstName)
	}
	sayLastName: () => {
		console.log(this.lastName)
	}
};

a.sayName() //

var b = a.sayName() //

a.sayName.bind({firstName: 'Boris'})(); //

a.sayName() //
a.sayLastName() //

a.sayName.bind({firstName: 'Boris'}).bind({firstName: 'Tom'})() //

a.sayLastName.bind({lastName: 'Petrov'})() //
```

---

[[011 Решение задач JS, TS и React|Назад]]
