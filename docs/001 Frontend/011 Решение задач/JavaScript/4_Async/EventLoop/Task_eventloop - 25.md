---
title: Task_eventloop - 25
draft: false
tags:
  - "#JavaScript"
  - "#taskJS"
  - "#EventLoop"
---
```JS
console.log(1);

const promise1 = new Promise((resolve, reject) => {
  console.log(2)
  resolve(3)
})

promise1.then(res => console.log(res))

console.log(4);
```

___

[[011 Решение задач JS, TS и React|Назад]]