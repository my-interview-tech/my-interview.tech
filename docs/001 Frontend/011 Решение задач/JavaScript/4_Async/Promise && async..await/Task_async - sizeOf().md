---
title: sizeOf()
draft: false
tags:
  - "#JavaScript"
  - "#taskJS"
  - "#promise"
  - "#сбербанк"
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

___

[[011 Решение задач JS, TS и React|Назад]]