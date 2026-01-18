---
uid: nCTUo0DmIfEzj0TR_dzde
title: Когда определяется this?
tags:
  - "#JavaScript"
  - "#this"
  - "#call"
  - "#bind"
  - "#apply"
info: null
draft: false
technology: JSCore
specialty: Frontend
tools: []
order: 95
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

Значение `this` в JavaScript определяется во время выполнения кода, когда функция вызывается. Значение `this` зависит от контекста вызова функции, то есть от того, как именно была вызвана функция.

Значение `this` может быть определено в следующих контекстах:

1. В глобальной области видимости, `this` ссылается на объект `Window` в браузере или на объект `global` в Node.js.

```js
console.log(this === window); // true (in a browser)
```

2. В методах объекта, `this` ссылается на сам объект.

```js
const obj = {
  name: "John",
  greet: function () {
    console.log(`Hello, my name is ${this.name}`);
  },
};

obj.greet(); // "Hello, my name is John"
```

3. В функциях, вызванных с помощью методов объекта, `this` ссылается на сам объект.

```js
const obj = {
  name: "John",
  greet: function () {
    console.log(`Hello, my name is ${this.name}`);
  },
};

const myGreet = obj.greet;
myGreet(); // "Hello, my name is undefined"
```

4. В конструкторах объектов, `this` ссылается на новый экземпляр объекта, который создается при вызове конструктора.

```js
function Person(name) {
  this.name = name;
  this.greet = function () {
    console.log(`Hello, my name is ${this.name}`);
  };
}

const john = new Person("John");
john.greet(); // "Hello, my name is John"
```

5. В функциях, вызванных с помощью методов `call()`, `apply()` или `bind()`, `this` ссылается на объект, переданный как первый аргумент.

```js
const obj = {
  name: "John",
  greet: function () {
    console.log(`Hello, my name is ${this.name}`);
  },
};

const otherObj = {
  name: "Jane",
};

obj.greet.call(otherObj); // "Hello, my name is Jane"
```

---

[[003 JSCore|Назад]]
