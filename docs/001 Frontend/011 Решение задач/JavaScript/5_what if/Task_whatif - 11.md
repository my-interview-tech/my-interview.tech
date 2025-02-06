---
title: Task_whatif - 11
draft: false
tags:
  - "#JavaScript"
  - "#taskJS"
  - "#itOne"
---
```js
// Что выведет?
const shape = {
    radius: 10,
    diameter() {
        return this.radius * 2;
    },
    perimeter: () => 2 * Math.PI * this.radius
};

console.log(shape.diameter()); //
console.log(shape.perimeter()); //
```

___

[[011 Решение задач JS, TS и React|Назад]]