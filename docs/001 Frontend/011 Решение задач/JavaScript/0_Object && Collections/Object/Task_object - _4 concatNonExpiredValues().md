---
title: concatNonExpiredValues()
draft: false
tags:
  - "#JavaScript"
  - "#taskJS"
  - "#object"
  - "#filter"
  - "#sort"
  - "#reduce"
  - "#itOne"
  - "#сбербанк"
---
```js
// сконкатенировать по value, expired не должны быть true, порядок отсортирован по order

const input = [
  {value: 'abcd', order: 4, expired: false},
  {value: 'qwer', order: 2, expired: true},
  {value: 'xyz1', order: 1, expired: false},
  {value: 'abx2', order: 3, expired: false},
]

function concatNonExpiredValues(data) {
	// Ваш код здесь
}

concatNonExpiredValues(input);
```


___

[[011 Решение задач JS, TS и React|Назад]]