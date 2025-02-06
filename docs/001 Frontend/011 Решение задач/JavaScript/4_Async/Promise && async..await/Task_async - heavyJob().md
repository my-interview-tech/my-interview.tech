---
title: heavyJob()
draft: false
tags:
  - "#JavaScript"
  - "#taskJS"
  - "#callback"
  - "#async"
  - "#unknownINC"
---
```js
// Необходимо выполнить таски
// Перед началом выполнения нужно вызвать onStart
// После выполнения всех тасок нужно вызвать onEnd
// (Работаем с этим кодом, меняем как угодно)
// Эти функции обязательные (Изменять не можем)

function heavyJob(idx, ms, callback) {
    setTimeout(() => {
        console.log(`Task ${idx} is done`);
        if (callback) callback(idx);
    }, ms);
}

function onStart() {
    console.log("Start");
}

function onEnd() {
    console.log("All tasks completed");
}

const task1 = (callback = () => {}) => heavyJob(1, 1500, callback);
const task2 = (callback = () => {}) => heavyJob(2, 1000, callback);
```

___

[[011 Решение задач JS, TS и React|Назад]]