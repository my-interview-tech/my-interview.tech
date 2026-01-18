---
uid: 3drif0tlo4KBkww_3QkXA
title: Task_object - withValidation()_0
tags:
  - "#JavaScript"
  - "#taskJS"
  - "#object"
draft: false
technology: Решение задач
specialty: Frontend
tools: []
order: 0
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

```js
// Реализовать функцию навешивающую валидацию на объект

/**
 * @param obj [Object]
 * @param rules [Object | function]
 * @param rules.validator [function]
 * @param rules.message [string}
 */

function withValidation(obj, rules) {}

const person = {};

const personWithValidation = withValidation(person, {
  name: {
    validator: (value) => typeof value === "string",
    message: "Имя должно быть строкой",
  },
  age: (value) => value >= 18,
});

console.log(123);

personWithValidation.age = 10; // Ничего не делает
console.log(personWithValidation);

personWithValidation.age = 20; // Успешно устанавливает возвраст
console.log(personWithValidation);

personWithValidation.name = 123; // Выводит в консоль ошибку из message
console.log(personWithValidation);

personWithValidation.name = "Foo bar"; // Успешно устанвливает имя
console.log(personWithValidation);
```

\*\*Ответ

```js

```

---

[[011 Решение задач JS, TS и React|Назад]]
