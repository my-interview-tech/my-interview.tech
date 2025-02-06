---
title: getTransformCities()
draft: false
tags:
  - "#JavaScript"
  - "#taskJS"
  - "#object"
---
```js
/**
 
Преобразовать исходную струкруту данных к структуре следующего вида:
const result = [
{ key: "А", totalCount: 700, cities: ["Астана"] },
{ key: "З", totalCount: 500, cities: ["Загреб"] },
{ key: "Л", totalCount: 500, cities: ["Лиссабон", "Лондон"] },
{ key: "М", totalCount: 700, cities: ["Магадан", "Москва"] },
{ key: "Н", totalCount: 800, cities: ["Новосибирск"] },
{ key: "Т", totalCount: 400, cities: ["Тверь"] }
];
где
key - первый символ названия города,
totalCount - сумма значений count для всех городов
cities - массив названий городов.
*
Значения в массиве results должны быть отсортированы по key
Значения в массивах cities должны быть отсортированы
*/
'
const data = {
    Москва: { count: 100 },
    Лондон: { count: 200 },
    Лиссабон: { count: 300 },
    Тверь: { count: 400 },
    Загреб: { count: 500 },
    Магадан: { count: 600 },
    Астана: { count: 700 },
    Новосибирск: { count: 800 }
};


const getTransformCities = (data) => {
	// Ваш код здесь
}

```

___

[[011 Решение задач JS, TS и React|Назад]]