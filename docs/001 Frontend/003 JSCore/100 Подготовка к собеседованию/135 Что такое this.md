---
uid: vQLPxTuup6jF2X4lI2H0H
title: Что такое this?
tags:
  - "#JavaScript"
  - "#object"
  - "#this"
  - "#call"
  - "#apply"
  - "#bind"
info:
  - "[[Контекст (this) в JS]]"
  - "[[Алгоритм использования ключевого слова `this`.canvas]]"
draft: false
technology: JSCore
specialty: Frontend
tools: []
order: 135
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

`this` - это ключевое слово, которое ссылается на объект, в контексте которого был вызван код. Значение `this` зависит от того, как был вызван код, и может изменяться в разных контекстах.

Значение `this` может быть определено в следующих контекстах:

1. В _глобальной области видимости_, `this` ссылается на объект `Window` в браузере или на объект `global` в Node.js.
2. В _методах объекта_, `this` ссылается на сам объект.

```javascript
const obj = {
  name: "John",
  greet: function () {
    console.log(`Hello, my name is ${this.name}`);
  },
};

obj.greet(); // "Hello, my name is John"
```

3. В _функциях, вызванных с помощью методов объекта_, `this` ссылается на сам объект.

```javascript
const obj = {
  name: "John",
  greet: function () {
    console.log(`Hello, my name is ${this.name}`);
  },
};

const myGreet = obj.greet;
myGreet(); // "Hello, my name is undefined"
```

4. В _конструкторах объектов_, `this` ссылается на новый экземпляр объекта, который создается при вызове конструктора.

```javascript
function Person(name) {
  this.name = name;
  this.greet = function () {
    console.log(`Hello, my name is ${this.name}`);
  };
}

const john = new Person("John");
john.greet(); // "Hello, my name is John"
```

5. В *функциях, вызванных с помощью методов `call()`, `apply()` или `bind()`,* `this` ссылается на объект, переданный как первый аргумент.

```javascript
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

Значение `this` может быть сложным и зависит от контекста, поэтому важно понимать, как оно работает в разных ситуациях.

---

[[003 JSCore|Назад]]
