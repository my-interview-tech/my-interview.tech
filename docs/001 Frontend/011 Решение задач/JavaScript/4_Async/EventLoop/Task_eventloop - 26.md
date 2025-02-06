---
title: Task_eventloop - 26
draft: false
tags:
  - "#JavaScript"
  - "#taskJS"
  - "#EventLoop"
---
```JS
setTimeout(() => console.log(1), 0);

const p = new Promise((resolve, reject) => {
    console.log(2);
    resolve()
})

const p2 = new Promise((resolve, reject) => reject(0))

p.then(() => console.log(4))

console.log(5)

console.log(6, p2)
```

___

[[011 Решение задач JS, TS и React|Назад]]