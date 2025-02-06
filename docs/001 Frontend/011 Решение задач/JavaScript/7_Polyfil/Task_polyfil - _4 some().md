---
title: some()
draft: false
tags:
  - "#JavaScript"
  - "#taskJS"
  - "#polyfill"
  - "#some"
  - "#альфабанк"
---
```js
// Условие: написать полифил для метода some
// [2, 5, 8, 1, 4].some((element) => element > 10); ---> false
// [12, 5, 8, 1, 4].some((element) => element > 10); ---> true

Array.prototype.mySome = function(cb) {
	// Ваш код здесь
}
```

___

[[011 Решение задач JS, TS и React|Назад]]