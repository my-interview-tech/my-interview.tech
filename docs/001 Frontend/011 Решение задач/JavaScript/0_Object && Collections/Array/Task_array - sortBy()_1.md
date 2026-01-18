---
uid: _qFZvVFFt74lG6ZrInZAm
title: Task_array - sortBy()_1
tags:
  - "#JavaScript"
  - "#array"
  - "#reduce"
  - "#taskJS"
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
// написать функцию которая принимает массив значений и выводит массив уникальных элементов, отсортированных по частоте

const foo = (arr) => {
  // Ваш код
};

console.log(foo([1, 1, 1, 2, 2, 2, 2, 4, 4, 5, 0])); // [2,1,4,5,0]
```

\*\*Ответ

```js
const foo = (arr) => {
  let res = [];

  const newObj = arr.reduce((acc, el) => {
    acc[el] ? acc[el]++ : (acc[el] = 1);
    return acc;
  }, {});

  const sorted = Object.entries(newObj).sort((a, b) => b[1] - a[1]);

  for (let i = 0; i < sorted.length; i++) {
    res.push(Number(sorted[i][0]));
  }

  return res;
};

console.log(foo([1, 1, 1, 2, 2, 2, 2, 4, 4, 5, 0])); // [2,1,4,5,0]
```

---

```js
const newObj = arr.reduce((acc, el) => {
  acc[el] ? acc[el]++ : (acc[el] = 1);
  return acc;
}, {});

// Преобразование значения в виде
// {0: 1, 1: 3, 2: 4, 4: 2, 5: 1}
```

```js
const input = [1, 1, 1, 2, 2, 2, 2, 4, 4, 5, 0];

function sortBy(arr) {
  let uniqueArr = [];

  let obj = arr.reduce((acc, el) => {
    acc[el] = (acc[el] || 0) + 1;
    return acc;
  }, {});

  const sorted = Object.entries(obj).sort((a, b) => b[1] - a[1]);

  for (let i = 0; i < sorted.length; i++) {
    uniqueArr.push(Number(sorted[i][0]));
  }
  return uniqueArr;
}

console.log(sortBy(input));
```

```js
const foo = (arr) => {
  if (typeof arr !== "object") {
    throw new Error("Принимаемый параметр не является обьектом!");
  }

  const newArr = arr.reduce((acc, el) => {
    acc[el] = (acc[el] || 0) + 1;
    return acc;
  }, {});

  return Object.entries(newArr)
    .sort((a, b) => b[1] - a[1])
    .map(([sortedNumber, _]) => sortedNumber);
};

console.log(foo([1, 1, 1, 2, 2, 2, 2, 4, 4, 5, 0])); // [2,1,4,5,0]
```

---

[[011 Решение задач JS, TS и React|Назад]]
