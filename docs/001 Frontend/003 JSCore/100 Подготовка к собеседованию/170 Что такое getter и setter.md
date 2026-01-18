---
uid: PUkHk22q2r1riRFRJ_3ui
title: Что такое getter и setter?
tags:
  - "#JavaScript"
  - "#getter"
  - "#setter"
  - "#object"
info:
  - "https://learn.javascript.ru/property-accessors"
draft: false
technology: JSCore
specialty: Frontend
tools: []
order: 170
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

Getter и setter - это методы объекта, которые используются для получения и установки значений свойств объекта соответственно. Они позволяют создавать свойства объекта, которые ведут себя как обычные свойства, но при этом могут иметь дополнительную логику.

_Геттер (getter)_ - это метод объекта, который используется для получения значения свойства объекта. Он определяется с помощью ключевого слова `get` и имеет имя свойства, которое он получает. Вот пример:

```javascript
const person = {
  firstName: "John",
  lastName: "Doe",
  get fullName() {
    return this.firstName + " " + this.lastName;
  },
};

console.log(person.fullName); // 'John Doe'
```

В этом примере мы создаем объект `person` с двумя свойствами `firstName` и `lastName` и геттером `fullName`, который возвращает полное имя объекта `person`.

_Сеттер (setter)_ - это метод объекта, который используется для установки значения свойства объекта. Он определяется с помощью ключевого слова `set` и имеет имя свойства, которое он устанавливает. Вот пример:

```javascript
const person = {
  firstName: "",
  lastName: "",
  set fullName(name) {
    const parts = name.split(" ");
    this.firstName = parts[0];
    this.lastName = parts[1];
  },
};

person.fullName = "John Doe";

console.log(person.firstName); // 'John'
console.log(person.lastName); // 'Doe'
```

В этом примере мы создаем объект `person` с двумя пустыми свойствами `firstName` и `lastName` и сеттером `fullName`, который устанавливает значения свойств `firstName` и `lastName` на основе переданной строки с полным именем.

Геттеры и сеттеры позволяют создавать свойства объекта, которые могут обрабатывать значения свойств перед их установкой или получением. Они могут быть полезны при валидации данных, преобразовании значений или при создании свойств, которые должны быть доступны только для чтения или только для записи.

---

[[003 JSCore|Назад]]
