---
title: getSumOfPreparedNumbers()
draft: false
tags:
  - "#JavaScript"
  - "#taskJS"
  - "#array"
  - "#itOne"
---
```js
// дан массив, необходимо вернуть строку с ошибкой если одно из значений не является числом, 
// если все значения верны, то возвращаем разность суммы чисел кратных 7 и максимально значения массива

const arr = [1, NaN, 21, 40, 50, 35, 2, NaN, 16, 17, NaN, 98, 77, 49];
const arr1 = [true];
const arr2 = ['smth'];
const arr3 = [1, 11, 21, 40, 50, 35, 2, 6, 16, 17, 63, 98, 77, 49];

const getSumOfPreparedNumbers = (arr) => {
	// Ваш код здесь
}

console.log(getSumOfPreparedNumbers(arr)); // output 'входящие данные не удовлетворяют требованиям'
console.log(getSumOfPreparedNumbers(arr1)); // output 'входящие данные не удовлетворяют требованиям'
console.log(getSumOfPreparedNumbers(arr2)); // output 'входящие данные не удовлетворяют требованиям'
console.log(getSumOfPreparedNumbers(arr3)); // output 245
```


___

[[011 Решение задач JS, TS и React|Назад]]