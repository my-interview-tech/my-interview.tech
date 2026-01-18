---
uid: OnkGVDicrJiQyTez1x-fm
title: Task_object - sumDimensions()_1
tags:
  - "#JavaScript"
  - "#taskJS"
  - "#object"
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
// Посчитать сумму по полю dimensions.width

const arr = [{
	{
		id: 1,
		dimensions: {
			width: 10,
			height: 20,
		},
	},
	{
		id: 2,
	},
	{
		dimensions: {
			width: 10,
			height: 15,
		},
	},
}]
```

\*\*Ответ

```js
function dimensionsWidth(arr) {
  const res = [];

  for (let name of arr) {
    if (typeof name?.dimensions?.width == "number") {
      res.push(name.dimensions.width);
    }
  }

  return res.reduce((acc, el) => {
    acc = acc + el;
    return acc;
  }, 0);
}

console.log(dimensionsWidth(arr));
```

---

[[011 Решение задач JS, TS и React|Назад]]
