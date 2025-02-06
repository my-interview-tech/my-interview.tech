---
title: Task_eventloop - 27
draft: false
tags:
  - "#JavaScript"
  - "#taskJS"
  - "#EventLoop"
---
```JS
console.log(1)

const foo = () => (new Promise((resolve, reject) => {
  console.log(2);
  resolve(3)
}))

console.log(4)

foo().then(res => console.log(res))

console.log(5)
```

___

[[011 Решение задач JS, TS и React|Назад]]