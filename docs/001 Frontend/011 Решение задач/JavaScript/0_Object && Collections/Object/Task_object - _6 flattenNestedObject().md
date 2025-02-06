---
title: flattenNestedObject()
draft: false
tags:
  - "#JavaScript"
  - "#taskJS"
  - "#object"
  - "#for-in"
  - "#recursion"
---
```js
// Напишите функцию, которая возвращает новый объект,
// в котором все примитивные элементы вложенных объектов были рекурсивно "подняты"

const obj = {
  a: {
    b: {
      c: 1,
      d: 2,
      e: 3,
    },
    f: {
      g: 4,
      h: 5,
    },
    i: 6,
    j: 7,
  },
};

const flattenNestedObject = (obj) => {
	// Ваш код здесь
};

console.log(flattenNestedObject(obj)); // { c: 1, d: 2, e: 3, g: 4, h: 5, i: 6, j: 7 }
```

<details>
  <summary>Решение под спойлером</summary>

```js
const flatObject = (obj) => {
  let res = {};

  for (let name in obj) {
    if (typeof obj[name] !== 'object') {
      res[name] = obj[name];
    } else {
      let flatNested = flatObject(obj[name]);
      for (let flatName in flatNested) {
        res[flatName] = flatNested[flatName];
      }
    }
  }

  return res;
};
```

</details>

___

[[011 Решение задач JS, TS и React|Назад]]