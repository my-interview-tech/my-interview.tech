---
uid: N_WlPOnvqIfXYyyE2kFdx
title: Разница между `typeof` и `instanceof`?
tags:
  - "#JavaScript"
  - "#instanceof"
  - "#typeOf"
info: []
draft: false
technology: JSCore
specialty: Frontend
tools: []
order: 186
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

`typeof` и `instanceof` - это два разных оператора в JavaScript, которые используются для определения типа данных.

*Оператор `typeof`* возвращает строку, указывающую тип операнда. Он может быть использован для определения типа данных примитивных типов (например, строк, чисел, булевых значений) и определенных объектов (например, функций и массивов).

*Оператор `instanceof`* проверяет, является ли объект экземпляром определенного класса или функции-конструктора. Он может быть использован только для определения, является ли объект экземпляром класса или наследует от него.

Вот некоторые из основных различий между операторами `typeof` и `instanceof`:

1. `typeof` возвращает строку, а `instanceof` возвращает логическое значение `true` или `false`.
2. `typeof` может быть использован для определения типа данных примитивных типов и определенных объектов, а `instanceof` может быть использован только для определения, является ли объект экземпляром класса или наследует от него.
3. `typeof` не учитывает наследование, а `instanceof` учитывает цепочку прототипного наследования.

Вот пример использования операторов `typeof` и `instanceof`:

```javascript
class Person {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }
}

const person = new Person("John", "Doe");

console.log(typeof person); // 'object'
console.log(person instanceof Person); // true
console.log(person instanceof Object); // true
console.log(person instanceof Array); // false
```

В этом примере мы создаем класс `Person` и объект `person` на его основе. Затем мы используем оператор `typeof`, чтобы определить тип данных объекта `person`. Мы также используем оператор `instanceof`, чтобы проверить, является ли объект `person` экземпляром класса `Person`, класса `Object` и класса `Array`.

В целом, оператор `typeof` и оператор `instanceof` имеют различные применения и могут использоваться для разных целей.

---

[[003 JSCore|Назад]]
