---
title: memoFn()
draft: false
tags:
  - "#JavaScript"
  - "#memo"
  - "#taskJS"
  - "#ВКонтакте"
---
```js
const memo = (fn) => {
// Ваш код здесь
}

const plus = (a, b, c) => {
  console.log('plus', a, b, c)
  return a + b + c
}

const divide = (a, b) => {
  console.log('divide', a, b)
  return a / b
} 

const memoPlus = memo(plus)
console.log(memoPlus(1, 2, 3)) // plus 1, 2, 3 -> 6
console.log(memoPlus(3, 1, 1)) // plus 3, 1, 1 -> 5
console.log(memoPlus(1, 2, 3)) // 6

const memoDivide = memo(divide)
console.log(memoDivide(4, 2)) // divide 4, 2 -> 2
console.log(memoDivide(6, 2)) // divide 6, 2 -> 3
console.log(memoDivide(4, 2)) // 2
```

**Ответ

```js
// говорят можно решить через WeakMap
```


___

[[011 Решение задач JS, TS и React|Назад]]