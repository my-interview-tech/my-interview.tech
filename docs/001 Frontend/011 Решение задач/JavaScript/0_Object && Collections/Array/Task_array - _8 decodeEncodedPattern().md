---
title: decodeEncodedPattern()
draft: false
tags:
  - "#JavaScript"
  - "#taskJS"
  - "#3itech"
---
```js 
// Задача: написать функцию `decode` в том же стиле, что и функция `encode` (вытянутой в цепочку) и узнать значение переменной `input`

const encode = input => [...input]
    .map((x, i) => [x.charCodeAt(0), i])
    .sort()
    .flatMap(x => x)
    .join('.')
    .match(/./g)
    .flatMap((x, i) => new Array(x == '.' ? 1 : 2 + x * 2).fill((1 + i) % 2))
    .join('')
    .replace(/(([01])\2*)/g, x => `${(+x ? '.' : '-')}${x.length}`)


const decodeEncodedPattern = input => {
	// Ваш код здесь
}
```

___

[[011 Решение задач JS, TS и React|Назад]]