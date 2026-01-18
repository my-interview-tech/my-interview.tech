---
uid: _8C9LhFQcqnznZJzV0ARx
title: Task_async - heavyJob()_1
tags:
  - "#JavaScript"
  - "#taskJS"
  - "#callback"
  - "#async"
  - "#unknownINC"
draft: false
technology: Решение задач
specialty: Frontend
tools: []
order: 0
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
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

\*\*Ответ

```js
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

onStart();
task1(() => {
  task2(() => {
    onEnd();
  });
});
```

---

[[011 Решение задач JS, TS и React|Назад]]
