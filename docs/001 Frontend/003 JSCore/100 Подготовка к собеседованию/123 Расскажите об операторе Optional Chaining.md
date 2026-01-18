---
uid: WiHXTb11N7n6Str4J59jv
title: Расскажите об операторе Optional Chaining?
tags:
  - "#JavaScript"
  - "#optionalChaining"
info: null
draft: false
technology: JSCore
specialty: Frontend
tools: []
order: 123
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

![[Pasted image 20230702203437.png|600]]

_Оператор Optional Chaining (?.)_ - это новый оператор в JavaScript, который позволяет безопасно обращаться к свойствам и методам объектов, которые могут быть неопределенны или равны null или undefined.

Оператор Optional Chaining позволяет избежать ошибок типа "Cannot read property 'propertyName' of undefined", которые могут возникнуть при попытке обратиться к свойству объекта, которое не существует.

Синтаксис оператора Optional Chaining:

```javascript
object?.property;
object?.method();
```

- `object` - объект, к которому нужно обратиться.
- `property` - свойство объекта, к которому нужно обратиться.
- `method()` - метод объекта, к которому нужно обратиться.

Пример использования оператора Optional Chaining:

```javascript
const person = {
  name: "John",
  address: {
    city: "New York",
    country: "USA",
  },
};

const country = person.address?.country;

console.log(country); // Вывод: "USA"

const street = person.address?.street;

console.log(street); // Вывод: undefined
```

В этом примере, мы используем оператор Optional Chaining для безопасного доступа к свойству `country` объекта `address` внутри объекта `person`. Результатом обращения к свойству `country` является значение "USA". Затем мы используем оператор Optional Chaining для безопасного доступа к свойству `street`, которое не существует в объекте `address`. Результатом обращения к свойству `street` является значение undefined.

Оператор Optional Chaining также можно использовать для безопасного вызова методов объектов:

```javascript
const person = {
  name: "John",
  getAddress() {
    return this.address;
  },
};

const city = person.getAddress()?.city;

console.log(city); // Вывод: undefined
```

В этом примере, мы используем оператор Optional Chaining для безопасного вызова метода `getAddress()` объекта `person`. Если метод `getAddress()` возвращает undefined, то результатом вызова метода будет также undefined. Затем мы используем оператор Optional Chaining для безопасного доступа к свойству `city`, которое не существует в объекте `address`. Результатом обращения к свойству `city` является значение undefined.

Оператор Optional Chaining - это удобный и безопасный способ обращения к свойствам и методам объектов в JavaScript, который позволяет избежать ошибок при обращении к неопределенным значениям. Он доступен в современных версиях JavaScript.

---

[[003 JSCore|Назад]]
