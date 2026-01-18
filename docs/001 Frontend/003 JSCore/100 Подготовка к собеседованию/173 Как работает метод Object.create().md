---
uid: JlL4gQkG9RrZpeO2uCSQu
title: Как работает метод `Object.create()`?
tags:
  - "#JavaScript"
  - "#object"
  - "#create"
  - "#proto"
info: []
draft: false
technology: JSCore
specialty: Frontend
tools: []
order: 173
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

![[Pasted image 20230703115300.png|600]]

Метод `Object.create()` создает новый объект, используя существующий объект в качестве прототипа для создаваемого объекта.

Синтаксис метода `Object.create()` выглядит следующим образом:

```javascript
Object.create(proto, [propertiesObject]);
```

где `proto` - объект, который будет использован в качестве прототипа для создаваемого объекта, а `propertiesObject` - необязательный объект, который определяет дополнительные свойства, которые должны быть добавлены в создаваемый объект.

Вот пример использования метода `Object.create()`:

```javascript
const person = {
  firstName: "John",
  lastName: "Doe",
  getFullName: function () {
    return this.firstName + " " + this.lastName;
  },
};

const person2 = Object.create(person, {
  firstName: {
    value: "Jane",
  },
  lastName: {
    value: "Doe",
  },
});

console.log(person2.getFullName()); // 'Jane Doe'
```

В этом примере мы создаем объект `person`, который имеет свойства `firstName` и `lastName` и метод `getFullName()`, который возвращает полное имя. Затем мы используем метод `Object.create()` для создания нового объекта `person2`, который использует объект `person` в качестве прототипа. Мы также добавляем свойства `firstName` и `lastName` в объект `person2`. Затем мы вызываем метод `getFullName()` для объекта `person2` и получаем полное имя объекта `person2`.

Важно отметить, что свойства, добавленные в `propertiesObject`, имеют более высокий приоритет, чем свойства, унаследованные от прототипа. Если свойство с тем же именем уже существует в прототипе, то оно будет переопределено значением из `propertiesObject`.

Также важно отметить, что в отличие от конструкторов и классов, метод `Object.create()` не создает новую функцию и не выполняет какой-либо код, кроме создания и возвращения нового объекта.

---

[[003 JSCore|Назад]]
