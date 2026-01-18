---
uid: Vm5vjNHTMGdjBeGueOejH
title: Как работает instanceof?
tags:
  - "#JavaScript"
  - "#instanceof"
  - "#class"
info: []
draft: false
technology: JSCore
specialty: Frontend
tools: []
order: 185
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

_Оператор `instanceof`_ используется для проверки, принадлежит ли объект определенному классу или типу данных. Он возвращает логическое значение `true`, если объект является экземпляром указанного класса или наследует от него, и `false` в противном случае.

Синтаксис оператора `instanceof` выглядит следующим образом:

```javascript
object instanceof class
```

Здесь `object` - это объект, который мы хотим проверить, а `class` - это класс или функция-конструктор, с которым мы хотим сравнить объект.

Оператор `instanceof` работает путем проверки цепочки прототипного наследования объекта. Если цепочка прототипного наследования объекта включает указанный класс или функцию-конструктор, то оператор `instanceof` возвращает `true`. В противном случае он возвращает `false`.

Вот пример использования оператора `instanceof`:

```javascript
class Person {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }
}

const person = new Person("John", "Doe");

console.log(person instanceof Person); // true
console.log(person instanceof Object); // true
console.log(person instanceof Array); // false
```

В этом примере мы создаем класс `Person` и объект `person` на его основе. Затем мы используем оператор `instanceof`, чтобы проверить, является ли объект `person` экземпляром класса `Person`. Мы также проверяем, является ли объект `person` экземпляром класса `Object` (все объекты в JavaScript наследуют от класса `Object`), а также класса `Array`.

Оператор `instanceof` может быть полезен для определения типа объекта в условных выражениях или при проверке наследования при работе с наследованием и полиморфизмом в объектно-ориентированном программировании в JavaScript.

---

[[003 JSCore|Назад]]
