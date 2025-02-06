---
title: Task_eventloop - 32
draft: false
tags:
  - "#JavaScript"
  - "#taskJS"
  - "#EventLoop"
---
```JS
Promise.resolve()
  .then(function a() {
    console.log('a');
    Promise.resolve().then(function c() {console.log('c');});
  })
  .then(function b() {
    console.log('b');
    Promise.resolve().then(function d() {console.log('d');});
  });
  
Promise.resolve()
  .then(function e() {
    console.log('e');
    Promise.resolve().then(function v() {console.log('v');});
  })
  .then(function n() {
    console.log('n');
    Promise.resolve().then(function m() {console.log('m');});
  });
```

___

[[011 Решение задач JS, TS и React|Назад]]