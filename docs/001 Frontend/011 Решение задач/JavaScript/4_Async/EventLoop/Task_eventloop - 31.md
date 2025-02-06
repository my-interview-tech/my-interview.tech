---
title: Task_eventloop - 31
draft: false
tags:
  - "#JavaScript"
  - "#taskJS"
  - "#EventLoop"
---
```JS
fetch('https://www.google.com')
  .then(() => console.log(1));

Promise.resolve()
  .then(() => console.log(2));

Promise.reject()
  .catch(() => console.log(3));
```

___

[[011 Решение задач JS, TS и React|Назад]]