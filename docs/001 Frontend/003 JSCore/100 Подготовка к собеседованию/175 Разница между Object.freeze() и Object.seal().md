---
uid: vcESWAeEMXvc48ZHTUsNJ
title: Разница между `Object.freeze()` и `Object.seal()`?
tags:
  - "#JavaScript"
  - "#object"
  - "#Object-freeze"
  - "#Object-seal"
info: []
draft: false
technology: JSCore
specialty: Frontend
tools: []
order: 175
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

![[Pasted image 20230703115543.png|600]]

Методы `Object.freeze()` и `Object.seal()` оба используются для ограничения изменяемости объектов в JavaScript, но есть некоторые различия между ними.

_Метод `Object.freeze()` делает объект полностью неизменяемым, т.е. запрещает добавление, удаление и изменение свойств объекта._ Все свойства объекта становятся неизменяемыми, а сам объект не может быть изменен. Например:

```javascript
const person = {
  firstName: "John",
  lastName: "Doe",
};

Object.freeze(person);

person.firstName = "Jane"; // Запрещено
delete person.lastName; // Запрещено
person.age = 30; // Запрещено

console.log(person); // { firstName: 'John', lastName: 'Doe' }
```

*Метод `Object.seal()`* также делает объект частично неизменяемым, но разрешает изменение значений свойств объекта. Метод `Object.seal()` запрещает добавление новых свойств и удаление существующих свойств объекта, но позволяет изменять значения существующих свойств. Например:

```javascript
const person = {
  firstName: "John",
  lastName: "Doe",
};

Object.seal(person);

person.firstName = "Jane"; // Разрешено
delete person.lastName; // Запрещено
person.age = 30; // Запрещено

console.log(person); // { firstName: 'Jane', lastName: 'Doe' }
```

Таким образом, основное отличие между `Object.freeze()` и `Object.seal()` заключается в том, что метод `Object.freeze()` делает объект полностью неизменяемым, а метод `Object.seal()` разрешает изменение значений существующих свойств объекта.

Оба метода могут быть полезными, когда мы хотим предотвратить изменение основной структуры объекта, но различия в их поведении могут быть важны в зависимости от конкретной задачи.

---

[[003 JSCore|Назад]]
