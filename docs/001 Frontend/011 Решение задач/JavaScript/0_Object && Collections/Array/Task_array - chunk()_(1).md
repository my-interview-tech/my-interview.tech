---
uid: XILt-Wd1rBDeZRJSOD2Zn
title: Task_array - chunk()_(1)
tags:
  - "#JavaScript"
  - "#taskJS"
  - "#array"
  - "#slice"
  - "#splice"
  - "#unknownINC"
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
// Написать функцию чанк, которая принимает массив и какое-то
// кол-во элементов должно быть в чанке.
// Далее функция возвращает массив с массивами, как в комментах

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9];

function chunk(arr, num) {
  // Ваш код здесь
}

console.log(chunk(data, 3)); // [[1,2,3],[4,5,6],[7,8,9]]
console.log(chunk(data, 4)); // [[1,2,3,4],[5,6,7,8],[9]]
console.log(chunk(data, 2)); // [[1,2],[3,4],[5,6],[7,8],[9]]
```

\*\*Ответ

```js
const data = [1, 2, 3, 4, 5, 6, 7, 8, 9];

function chunk(arr, num) {
  let arrChunk = [];

  for (let i = 0; i < arr.length; i += num) {
    arrChunk.push(arr.slice(i, i + num));
  }
  return arrChunk;
}

console.log(chunk(data, 3)); // [[1,2,3],[4,5,6],[7,8,9]]
console.log(chunk(data, 4)); // [[1,2,3,4],[5,6,7,8],[9]]
console.log(chunk(data, 2)); // [[1,2],[3,4],[5,6],[7,8],[9]]
```

---

[[011 Решение задач JS, TS и React|Назад]]
