---
uid: kdR0MgQFi3k7LImvv_ITG
title: Task_object - findDeep()_0
tags:
  - "#JavaScript"
  - "#taskJS"
  - "#array"
  - "#СИБУР"
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
// Написать функцию которая вернет наименьшее значение самого вложенного массива.
/* 
Например из arr2 должно вернуться 100, так как самый вложенный массив содержит один элемент 100
const arr = [
    1,
    [
        [
            20, 
            1
        ],
        2
    ],
    [
        [
            -2
        ],
        [
            [
                100
            ]
        ]
    ]
]
*/

const arr2 = [1, [[20, 1], 2], [[-2], [[100]]]];

function findDeepestMinElement() {
  // Ваш код здесь
}

console.log(findDeepestMinElement(arr2)); // [deepestLevelNumber, deepestMinElement]
```

\*\*Ответ

```js
const arr = [1, [[20, 1], 2], [[-2], [[100]]]];

function findDeepestMinElement(arr) {
  let counter = 1;
  let newArr;

  for (let level of arr) {
    newArr = level;
    if (typeof level !== "number") {
      counter++;
      console.log("Тест:", newArr, "Вложенность:", counter);
      findDeepestMinElement(newArr);
    }
  }

  return [counter, newArr];
}

console.log(findDeepestMinElement(arr)); // [deepestLevelNumber, deepestMinElement]
```

---

[[011 Решение задач JS, TS и React|Назад]]
