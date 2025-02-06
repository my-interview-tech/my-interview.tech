---
title: Task_eventloop - 21
draft: false
tags:
  - "#JavaScript"
  - "#taskJS"
  - "#EventLoop"
---
```js
//! будет ли обработан ответ?

fetch('http://www.speedtest.net')
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.error(error);
    });
while (true) console.log(1);
```

___

[[011 Решение задач JS, TS и React|Назад]]