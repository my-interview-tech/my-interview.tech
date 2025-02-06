---
title: Task_eventloop - 2
draft: false
tags:
  - "#JavaScript"
  - "#taskJS"
  - "#EventLoop"
---
```JS
console.log(1)

Promise.resolve(2).then((res) => console.log(res))

setTimeout(() => console.log(3), 0);

Promise.resolve(4).then((res) => console.log(res))

console.log(5)
```

___

[[011 Решение задач JS, TS и React|Назад]]