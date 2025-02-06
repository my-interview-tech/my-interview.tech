---
title: Task_eventloop - 24
draft: false
tags:
  - JavaScript
  - "#taskJS"
  - "#EventLoop"
---
```JS
const p = new Promise((resolve, reject) =>
        reject(Error('All is broken :(')))
    .catch((error) => console.log(1, error.message))
    .catch((error) => console.log(2, error.message));
```

___

[[011 Решение задач JS, TS и React|Назад]]