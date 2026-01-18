---
uid: Jo7hBRZSduVxpu4iUoXjv
title: Что такое __proto__ ?
tags:
  - "#JavaScript"
  - "#object"
  - "#prototype"
  - "#proto"
info:
  - "https://learn.javascript.ru/prototype-methods"
  - "https://www.youtube.com/watch?v=b55hiUlhAzI"
draft: false
technology: JSCore
specialty: Frontend
tools: []
order: 0
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

##### Введение

`__proto__` и `prototype` - это свойства объекта.

```js
let a = { value: 18 };

let b = {
  age: a,
};

let c = a;

console.log(a === b.age); // true
console.log(a === c); // true

b.age.value = 21;

console.log(a.value === 21); // true
console.log(c.value === 21); // true
```

Известно, что `console.log({} != {})` так как они имеют разные ссылки.

##### Проверь себя

#taskJS #**proto** #prototype

```js
console.log( ({}).prototype === ({}).__proto__ ) // (1)

function ITKamasutra() {
	console.log( ITKamasutra.prototype === ITKamasutra.__proto__) // (2)
}

function ITIncubator() {}
function ITKamasutra() {}
console.log( ITKamasutra.__proto__ === ITKamasutra.__proto__ ) // (3)
console.log (ITIcubator.prototype === ITKamasutra.prototype ) // (4)

let Component = (props) => {
	return `<div>I dont't know Prototype</div>`
}

console.log( Component.prototype === Object.prototype ) // (5)

let age = 18
console.log( age.prototype === Number.prototype ) // (6)
console.log( age.__proto__ === Number.prototype ) // (7)

class Hacker {}
console.log( Hacker.__proto__ === Function.prototype ) // (8)

function ITIncubator(){}
console.log(ITIncubator.__proto__ === ???) // (9)

const count = 12
console.log( count.__proto__ === ??? ) // (10)
```

##### `__proto__`

`__proto__` есть у всех объектов.

Например:

```js
let man = {}; // man.__proto__
let users = []; // users.__proto__
let age = 18; // age.__proto__
let youtube = "ttt"; // youtube.__proto__
function subscribe() {} // subscribe.__proto__
let liked = function () {}; // liked.__proto__
let clicked = () => {}; // clicked.__proto__
class YouTubeChanell {} // YouTubeChanell.__proto__
let isItTrue = true; // isItTrue.__proto__
```

При этом разные `__proto__` разных по `типу` объектов - совершенно независимые разные объекты. У одинаковых по `типу` объектов - они равны, то есть - это один и тот же объект.

```js
let man = {};
let man2 = {};
console.log(man.__proto__ === man2.__proto__); // true

let users = [];
let cars = [];
console.log(users.__proto__ === cars.__proto__); // true

console.log(users.__proto__ === man2.__proto__); // false

// и так далее
```

Известно, что все типы данных в JS - это объекты и под капотом они имеют следующий вид:

```js
let promise = new Promise(() => {}); // new Promise(...)
let man = {}; // new Object(...)
let users = []; // new Array(...)
let age = 18; // new Number(...)
let youtube = "ttt"; // new String(...)

function subscribe() {} // new Function(...)
let liked = function () {}; // new Function(...)
let clicked = () => {}; // new Function(...)
class YouTubeChanell {} // new Function(...)

let chanell = new YouTubeChanell(); // new YouTubeChanell

let isItTrue = true; // new Boolean(...)
```

Таким образом,

1. У любого объекта есть свойство `__proto__`
2. Чтобы понимать, что это за `__proto__`, нужно ТОЧНО знать с помощью какой функции-конструктора `class` создан данный объект (`new XXX()`)

```JS
// Object, Promise, Function, Boolean, Number, String, Array
```

`__proto__` нужен, чтобы с его помощью можно было связаться с `prototype` объекта (функции-конструктора), с помощью которой этот объект был создан (сконструирован).

##### `Prototype`

Каждый `prototype` - это независимый объект, сам по себе, с определённым набором свойств и методов. `prototype` есть у `class` либо у `function`

```js
// prototype есть у функций обьявленный с помощью function или у class
function arr() {} // prototype есть
class InterSection {} // prototype есть

const Component = (props) => {
  return `<h1>I need HELP</h1>`;
}; // prototype нет
```

```js
let promise = new Promise(() => {}); // promise.__proto__ === Promise.prototype
let man = {}; // man.__proto__ === Object.prototype
let users = []; // users.__proto__ === Array.prototype
let age = 18; // age.__proto__ === Number.prototype
let youtube = "ttt"; // youtube.__proto__ === String.prototype
function subscribe() {} // subscribe.__proto__ === Function.prototype
let liked = function () {}; // liked.__proto__ === Function.prototype
let clicked = () => {}; // clicked.__proto__ === Function.prototype
class YouTubeChanell {} // YouTubeChanell.__proto__ === Function.prototype
let chanel1 = new YouTubeChanell(); // chanel1.__proto__ === YouTubeChanell.prototype
let isItTrue = true; // isItTrue.__proto__ === Boolean.prototype
```

Зачем классу нужен объект `prototype` и зачем классам, созданным с помощью этого класса, свойство `__proto__` , которое ссылается на этот объект `prototype` ?

-> Если мы пытаемся прочитать свойство объекта, либо вызывать его метод, а данного свойства/ метода нет, то объект полезет искать его через ссылку `__proto__` в `prototype` класса, с помощью которого он был создан.

Как правило, речь идёт именно о методах:

```js
let derName = { name: "Vadim" };
derName.toString();

// derName.__proto__ => Object.prototype = { toString(){}}
// Если свойства/метода toString() нет в derName, то мы ищем его в prototype в объекте класса с помощью которого он был создан
```

на `Проверь себя`

```js
console.log( ({}).prototype === ({}).__proto__ ) // (1) false

function ITKamasutra() {
	console.log( ITKamasutra.prototype === ITKamasutra.__proto__) // (2) false
}

function ITIncubator() {}
function ITKamasutra() {}
console.log( ITIcubator.__proto__ === ITKamasutra.__proto__ ) // (3) true
console.log (ITIcubator.prototype === ITKamasutra.prototype ) // (4) false

let Component = (props) => {
	return `<div>I dont't know Prototype</div>`
}

console.log( Component.prototype === Object.prototype ) // (5) false

let age = 18
console.log( age.prototype === Number.prototype ) // (6) false
console.log( age.__proto__ === Number.prototype ) // (7) true

class Hacker {}
console.log( Hacker.__proto__ === Function.prototype ) // (8) true

function ITIncubator(){}
console.log(ITIncubator.__proto__ === ???) // (9) Function.prototype

const count = 12
console.log( count.__proto__ === ??? ) // (10) Number.prototype
```

##### Домашняя работа

```js
class Samurai {
	constructor(name) {
		this.name = name
	}
	hello() {alert(this.name)}
}

let shogun = new Samurai('Vadim')

console.log(shogun.__proto__.__proto__ === ???))
console.log(shogun.__proto__.constructor.__proto__ === ???))
console.log(shogun.__proto__.__proto__.__proto__ === ???))
```

---

[[003 JSCore|Назад]]
