---
title: flattenObj()
draft: false
tags:
  - "#JavaScript"
  - "#taskJS"
  - object
---
```js
const arr1 = [
  {
    id: 1,
    next: [{ id: 2 }, { id: 3 }, { id: 4 }],
  },
  { id: 5, next: [{ id: 6 }, { id: 7 }, { id: 8 }] },
];


function flattenObj(arr) {
	// Ваш код здесь
}

console.log(flattenObj(arr1));
  //[ { id: 1 },
  // { id: 2 },
  // { id: 3 },
  // { id: 4 },
  // { id: 5 },
  // { id: 6 },
  // { id: 7 },
  // { id: 8 } ]
```

___

[[011 Решение задач JS, TS и React|Назад]]