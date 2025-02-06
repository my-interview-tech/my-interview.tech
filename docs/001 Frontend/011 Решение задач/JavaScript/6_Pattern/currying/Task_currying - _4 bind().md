---
title: bind()
draft: false
tags:
  - "#JavaScript"
  - "#taskJS"
  - "#currying"
---
```js
/*
Описание: 
Напишите функцию bind, которая принимает 
функцию и контекст, и возвращает новую функцию, 
которая вызывает исходную функцию с заданным контекстом.
*/

const person = {
  name: 'John',
  sayHello: function() {
    console.log(`Hello, ${this.name}!`);
  }
};

const boundSayHello = bind(person.sayHello, person);
boundSayHello(); // Hello, John!
```

___

[[011 Решение задач JS, TS и React|Назад]]