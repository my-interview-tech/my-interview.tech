---
title: makeReader()
draft: false
tags:
  - "#JavaScript"
  - "#taskJS"
  - "#сбербанк"
---
```js
function makeReader() {
	let books = [];
	let i = 0;

	while (i < 10) {
		const bookReader = function() {
			console.log(i)
		}
		i++
		books.push(bookReader)
	}
	return books
}

let reader = makeReader()

reader[0]() // 
reader[5]() //
```

___

[[011 Решение задач JS, TS и React|Назад]]