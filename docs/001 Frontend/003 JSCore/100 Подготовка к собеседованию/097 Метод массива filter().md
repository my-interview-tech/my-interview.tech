---
uid: 62EJmv-AINQmkJ2YM5ifs
title: Метод массива filter()
tags:
  - "#JavaScript"
  - "#array"
  - "#high-order-function"
  - "#filter"
info: []
draft: false
technology: JSCore
specialty: Frontend
tools: []
order: 97
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

Метод для работы с фильтрацией массива в JavaScript называется `Array.prototype.filter()`. Он создает новый массив, содержащий все элементы исходного массива, для которых функция-предикат возвращает `true`. Оригинальный массив не изменяется.

Синтаксис метода `filter()` выглядит следующим образом:

```javascript
const newArray = array.filter(function (element, index, array) {
  // функция-предикат
});
```

Здесь `array` - исходный массив, `newArray` - новый массив, `element` - текущий элемент массива, `index` - индекс текущего элемента, `array` - исходный массив. Функция-предикат должна возвращать `true` или `false`, в зависимости от того, нужно ли включить текущий элемент в новый массив или нет.

Пример использования метода `filter()`:

```javascript
const numbers = [1, 2, 3, 4, 5];

const evenNumbers = numbers.filter(function (number) {
  return number % 2 === 0;
});

console.log(evenNumbers); // [2, 4]
```

В этом примере мы создаем новый массив `evenNumbers`, который содержит только четные числа из исходного массива `numbers`.

Функция-предикат должна возвращать логическое значение `true` или `false`. Если функция-предикат возвращает `true` для текущего элемента массива, то этот элемент будет включен в новый массив, иначе он будет исключен из него.

---

[[003 JSCore|Назад]]
