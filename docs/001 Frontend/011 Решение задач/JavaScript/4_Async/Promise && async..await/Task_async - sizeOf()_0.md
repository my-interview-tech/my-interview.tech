---
uid: wZND5MzrXb0d95gzDrdlC
title: Task_async - sizeOf()_0
tags:
  - "#JavaScript"
  - "#taskJS"
  - "#promise"
  - "#сбербанк"
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
// Реализовать поддержку Promise для sizeOf
// Сделать функцию asyncSizeOf возвращающую результат через Promise

const sizeOf = require('sizeOf');
sizeOf('file.jpg', (err, {width, height}) => {
	// Ваш код здесь
})
// Пример, как получить {width, heigth} через sizeOf

// Нужно сделать реализацию sizeOf через промисы
const asyncSizeOf = (filename) => {
	// Ваш код здесь
}

const {width, height} = await asyncSizeOf('file.jpg')

// Есть массив файлов
const fileNames = ['1.jpg' , '2.jpg' , '3.jpg' ]

type Size = {
	width: number;
	height: number;
}

// Нужно преобразовать fileNames в такой массив используя asyncSizeOf
const sizes: Size[] = await fileNamesToSize(fileNames)
```

### Ответ

```js

```

---

[[011 Решение задач JS, TS и React|Назад]]
