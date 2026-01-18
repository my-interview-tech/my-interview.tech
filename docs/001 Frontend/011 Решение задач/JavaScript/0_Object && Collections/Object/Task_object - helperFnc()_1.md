---
uid: m4PhBjBoKyyBIK_YsmTKC
title: Task_object - helperFnc()_1
tags:
  - "#JavaScript"
  - "#taskJS"
  - "#array"
  - "#object"
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
// Написать функцию, которая принимает массив объектов и название поля объекта и возвращает массив объектов, отсортированных по переданному полю

const data = [
  { id: 1, age: 20, name: "Иван", country: "Russia", registred: true },
  { id: 2, age: 30, name: "Дима", country: "Usa", registred: true },
  { id: 3, age: 25, name: "Леха", country: "Russia", registred: false },
  { id: 4, age: 20, name: "Леха", country: "Usa", registred: false },
  { id: 5, age: 30, name: "Иван", country: "Russia", registred: true },
  { id: 6, age: 50, name: "Леха", country: "Russia", registred: true },
  { id: 7, age: 20, name: "Дима", country: "Usa", registred: false },
];

const helperFnc = function (array, param) {
  // Ваш код здесь
};
console.log(helperFnc(data, "country"));
```

\*\*Ответ

```js
const data = [
  { id: 1, age: 20, name: "Иван", country: "Russia", registred: true },
  { id: 2, age: 30, name: "Дима", country: "Usa", registred: true },
  { id: 3, age: 25, name: "Леха", country: "Russia", registred: false },
  { id: 4, age: 20, name: "Леха", country: "Usa", registred: false },
  { id: 5, age: 30, name: "Иван", country: "Russia", registred: true },
  { id: 6, age: 50, name: "Леха", country: "Russia", registred: true },
  { id: 7, age: 20, name: "Дима", country: "Usa", registred: false },
];

const helperFnc = (arr, param) => {
  return arr.sort((a, b) => {
    if (a[param] < b[param]) {
      return -1;
    }
    if (a[param] > b[param]) {
      return 1;
    }
    return 0;
  });
};

console.log(helperFnc(data, "country"));
```

---

[[011 Решение задач JS, TS и React|Назад]]
