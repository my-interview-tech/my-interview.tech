---
title: createValidatedProxy()
draft: false
tags:
  - "#JavaScript"
  - "#taskJS"
  - "#object"
---
```js
// Реализовать функцию навешивающую валидацию на объект

/**
 * @param obj [Object]
 * @param rules [Object | function]
 * @param rules.validator [function]
 * @param rules.message [string}
 */

function createValidatedProxy(obj, rules) {
	// Ваш код здесь
}

const person = {};

const personWithValidation = createValidatedProxy(person, {
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

___

[[011 Решение задач JS, TS и React|Назад]]