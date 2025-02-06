---
title: getTreeValues()
draft: false
tags:
  - "#JavaScript"
  - "#taskJS"
  - "#object"
  - "#for-of"
  - "#unknownINC"
---
```js
/* 
Дана структура данных в виде дерева
Необходимо написать функцию, возвращающую значения всех вершин дерева:
getTreeValues(tree); // => [1, 2, 3, 4, 5, 6, 7]
*/

const tree = {
    value: 1,
    children: [
        {
            value: 2,
            children: [{ value: 4 }, { value: 5 }],
        },
        {
            value: 3,
            children: [{ value: 6 }, { value: 7 }],
        },
    ],
};

const getTreeValues = (obj) => {
    // Ваш код здесь
};

console.log(getTreeValues(tree));
```

___

[[011 Решение задач JS, TS и React|Назад]]