---
title: Task_this - 8
draft: false
tags:
  - "#JavaScript"
  - "#taskJS"
  - "#this"
  - альфабанк
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

**Ответ**

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

___

[[011 Решение задач JS, TS и React|Назад]]