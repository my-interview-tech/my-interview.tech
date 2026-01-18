---
uid: DtQGPVtkMtw7kKuTwjLeY
title: Как в JavaScript создать объект?
tags:
  - "#JavaScript"
  - "#object"
info: []
draft: false
technology: JSCore
specialty: Frontend
tools: []
order: 153
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

![[Pasted image 20230703102303.png|600]]

В JavaScript объекты могут быть созданы несколькими способами:

1. _Литерал объекта:_ это самый простой способ создания объекта. Литерал объекта выглядит как набор пар "ключ: значение", заключенных в фигурные скобки.

```javascript
const obj = {
  name: "John",
  age: 30,
  hobbies: ["reading", "swimming"],
};
```

2. _Конструктор объекта:_ объекты могут быть созданы с помощью конструктора объекта, такого как `Object()` или `new Object()`.

```javascript
const obj = new Object();
obj.name = "John";
obj.age = 30;
obj.hobbies = ["reading", "swimming"];
```

3. _Функция-конструктор:_ можно определить функцию-конструктор, которая будет использоваться для создания объектов с определенными свойствами и методами.

```javascript
function Person(name, age, hobbies) {
  this.name = name;
  this.age = age;
  this.hobbies = hobbies;
  this.sayHello = function () {
    console.log(
      `Hello, my name is ${this.name} and I'm ${this.age} years old.`,
    );
  };
}

const obj = new Person("John", 30, ["reading", "swimming"]);
obj.sayHello(); // "Hello, my name is John and I'm 30 years old."
```

Это лишь несколько способов создания объектов в JavaScript. Важно понимать, что объекты в JavaScript могут содержать свойства и методы, которые могут быть использованы для работы с данными и выполнения определенных действий.

---

[[003 JSCore|Назад]]
