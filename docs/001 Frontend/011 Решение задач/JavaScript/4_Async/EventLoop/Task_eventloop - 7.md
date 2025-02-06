---
title: Task_eventloop - 7
draft: false
tags:
  - "#JavaScript"
  - "#taskJS"
  - "#EventLoop"
  - "#СИБУР"
---
```js
//! что будет в консоли, что выполнится

function task2() {
    const innerFunc1 = async () => console.log(1);
    const innerFunc2 = async () => {
        console.log(2);
        await innerFunc1();
        console.log(3);
    };
    innerFunc2();
    console.log(4);
}

task2();
```

___

[[011 Решение задач JS, TS и React|Назад]]