---
title: promisesInSeries()
draft: false
tags:
  - "#JavaScript"
  - "#taskJS"
  - "#promise"
  - "#unknownINC"
---
```js
/* PromisesInSeries 
Напишите функцию, которая принимает массив асинхронных функций и последовательно(следующая начинается, когда закончилась предыдущая) вызывает их, передавая в аргументы результат вызова предыдущей функции. 
Пример: */ 

const firstPromise = () => new Promise((resolve) => setTimeout(() => resolve(300), 300)); 

const secondPromise = (a) => new Promise((resolve) => setTimeout(() => resolve(a + 200), 200)); 

const thirdPromise = (b) => new Promise((resolve) => setTimeout(() => resolve(b **2), 100)); 

const promisesInSeries = async (promises) => {  
	let res 
	for (let i = 0; i < promises.length; i++){ 
		res = await promises[i](res) 
	} 
	
	return res 
	
    // Ваш код здесь
} 

promisesInSeries([firstPromise, secondPromise, thirdPromise]).then(console.log); 
// (300 + 200)** 2 = 250 000
```

___

[[011 Решение задач JS, TS и React|Назад]]