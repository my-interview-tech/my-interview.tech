---
title: optionalChaining()
draft: false
tags:
  - "#JavaScript"
  - "#taskJS"
  - "#object"
  - "#for-of"
  - "#Яндекс"
---
```js
// Функция `optionalChaining` проверяет наличие заданного пути 
// и свойства в объекте и возвращает значение этого свойства, 
// если оно существует. Если свойство или путь не существует, 
// возвращается значение `undefined`.

const obj = {
  a: {
    b: {
      c: {
        d: "Привет!",
      },
    },
  },
};

function optionalChaining(obj, path) {
  // Ваш код здесь
};


console.log(optionalChaining(obj, "a.b.c")); // Ответ = { d: 'Привет' }
console.log(optionalChaining(obj, "a.b.c.d")); // Ответ = Привет
console.log(optionalChaining(obj, "a.b.c.d.e")); // Ответ = undefined
console.log(optionalChaining(obj, "b.d.a")); // Ответ = undefined
console.log(optionalChaining(obj, "")); /* Ответ = {
//   a: {
//     b: {
//       c: {
//         d: 'Привет!',
//       },
//     },
//   },
// } 
// */
```

___

[[011 Решение задач JS, TS и React|Назад]]