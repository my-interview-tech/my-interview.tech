---
uid: IHZ3V0AvoHqjSH_shn9Js
title: Методы массивов в JavaScript
tags:
  - "#JavaScript"
  - "#array"
  - "#push"
  - "#pop"
  - "#shift"
  - "#unshift"
  - "#slice"
  - "#splice"
  - "#concat"
  - "#forEach"
  - "#map"
  - "#filter"
  - "#reduce"
info: []
draft: false
technology: JSCore
specialty: Frontend
tools: []
order: 78
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

![[Pasted image 20230702144755.png|600]]

В JavaScript массивы - это объекты, которые предоставляют ряд методов для работы с элементами массива. Некоторые из самых часто используемых методов массивов в JavaScript:

1. _push()_ - добавляет один или несколько элементов в конец массива и возвращает новую длину массива.

```javascript
const arr = [1, 2, 3];
arr.push(4, 5);
console.log(arr); // [1, 2, 3, 4, 5]
```

2. _pop()_ - удаляет последний элемент из массива и возвращает его значение.

```javascript
const arr = [1, 2, 3];
const lastElement = arr.pop();
console.log(arr); // [1, 2]
console.log(lastElement); // 3
```

3. _shift()_ - удаляет первый элемент из массива и возвращает его значение.

```javascript
const arr = [1, 2, 3];
const firstElement = arr.shift();
console.log(arr); // [2, 3]
console.log(firstElement); // 1
```

4. _unshift()_ - добавляет один или несколько элементов в начало массива и возвращает новую длину массива.

```javascript
const arr = [1, 2, 3];
arr.unshift(4, 5);
console.log(arr); // [4, 5, 1, 2, 3]
```

5. _slice()_ - создает новый массив, содержащий копию части исходного массива, заданной начальным и конечным индексами.

```javascript
const arr = [1, 2, 3, 4, 5];
const slicedArr = arr.slice(1, 4);
console.log(slicedArr); // [2, 3, 4]
```

6. _splice()_ - изменяет исходный массив, удаляя, заменяя или добавляя элементы в указанных индексах.

```javascript
const arr = [1, 2, 3, 4, 5];
arr.splice(2, 2, 6, 7);
console.log(arr); // [1, 2, 6, 7, 5]
```

7. _concat()_ - создает новый массив, объединяя два или более массивов.

```javascript
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const newArr = arr1.concat(arr2);
console.log(newArr); // [1, 2, 3, 4, 5, 6]
```

8. _forEach()_ - вызывает функцию для каждого элемента массива.

```javascript
const arr = [1, 2, 3];
arr.forEach(function (element) {
  console.log(element);
});
// Выводит в консоль:
// 1
// 2
// 3
```

9. _map()_ - создает новый массив, содержащий результат вызова функции для каждого элемента массива.

```javascript
const arr = [1, 2, 3];
const mappedArr = arr.map(function (element) {
  return element * 2;
});
console.log(mappedArr); // [2, 4, 6]
```

10. _filter()_ - создает новый массив, содержащий только те элементы, для которых функция возвращает true.

```javascript
const arr = [1, 2, 3, 4, 5];
const filteredArr = arr.filter(function (element) {
  return element % 2 === 0;
});
console.log(filteredArr); // [2, 4]
```

11. _reduce()_ - применяет функцию к каждому элементу массива, накапливая результат, начиная с заданного начального значения.

```javascript
const arr = [1, 2, 3, 4, 5];
const sum = arr.reduce(function (acc, curr) {
  return acc + curr;
}, 0);
console.log(sum); // 15
```

---

[[003 JSCore|Назад]]
