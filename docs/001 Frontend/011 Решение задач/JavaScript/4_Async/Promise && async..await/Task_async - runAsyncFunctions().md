---
title: runAsyncFunctions()
draft: false
tags:
  - "#JavaScript"
  - "#taskJS"
  - "#promise"
  - "#сбербанк"
  - "#itOne"
---
```js 
// Можем работать только с array, длина его неизвестна:
const array = [ajax, ajax, ajax, ..., ajax]

// Что должны получить?
Promise.resolve()
	.then(array[0]) // 15:00:00
	.then(array[1]) // 15:00:01
	.then(array[2]) // 15:00:02
	.then(array[3]) // 15:00:03
	.then(array[4]) // 15:00:04

const runAsyncFunctions = () =? {

}
```


___

[[011 Решение задач JS, TS и React|Назад]]