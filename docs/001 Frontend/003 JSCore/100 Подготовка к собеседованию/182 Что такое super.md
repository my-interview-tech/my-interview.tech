---
uid: fYArG9hYoYQ1DN6fjcPRd
title: Что такое super?
tags:
  - "#JavaScript"
  - "#class"
  - "#constructor"
  - "#super"
info: []
draft: false
technology: JSCore
specialty: Frontend
tools: []
order: 182
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

*`super`* - это ключевое слово в JavaScript, которое используется в контексте классов и объектов, чтобы обратиться к родительскому классу или объекту и вызвать его методы или свойства.

В контексте классов, *`super` используется для вызова конструктора родительского класса и доступа к его методам и свойствам.* Например, если класс `Child` наследует от класса `Parent`, то в конструкторе класса `Child` можно использовать `super()` для вызова конструктора родительского класса и установки его свойств:

```javascript
class Parent {
  constructor(name) {
    this.name = name;
  }
}

class Child extends Parent {
  constructor(name, age) {
    super(name); // вызываем конструктор родительского класса
    this.age = age;
  }
}
```

В этом примере `super(name)` вызывает конструктор родительского класса `Parent` и передает ему аргумент `name`.

Также `super` может использоваться в методах класса `Child` для вызова методов родительского класса:

```javascript
class Parent {
  sayHello() {
    console.log("Hello from Parent");
  }
}

class Child extends Parent {
  sayHello() {
    super.sayHello(); // вызываем метод родительского класса
    console.log("Hello from Child");
  }
}
```

В этом примере `super.sayHello()` вызывает метод `sayHello()` родительского класса `Parent`.

В контексте объектов, `super` используется в объектах, созданных с помощью функций-конструкторов, чтобы обратиться к родительскому объекту и вызвать его методы или свойства. Например:

```javascript
function Parent(name) {
  this.name = name;
}

Parent.prototype.sayHello = function () {
  console.log("Hello from Parent");
};

function Child(name, age) {
  Parent.call(this, name); // вызываем конструктор родительского объекта
  this.age = age;
}

Child.prototype = Object.create(Parent.prototype);
Child.prototype.constructor = Child;

Child.prototype.sayHello = function () {
  Parent.prototype.sayHello.call(this); // вызываем метод родительского объекта
  console.log("Hello from Child");
};
```

В этом примере `Parent.call(this, name)` вызывает конструктор родительского объекта `Parent` и устанавливает его свойства, а `Parent.prototype.sayHello.call(this)` вызывает метод `sayHello()` родительского объекта `Parent`.

---

[[003 JSCore|Назад]]
