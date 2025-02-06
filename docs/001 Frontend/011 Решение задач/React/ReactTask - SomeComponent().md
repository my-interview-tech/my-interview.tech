---
title: ReactTask - SomeComponent()
draft: false
tags:
  - "#React"
  - "#reactTask"
  - "#ВКонтакте"
---
```jsx
/*
Написать функцию, которая принимает массив jsx компонентов 1 параметром, 
вторым параметром отдельный jsx компонент и преобразует их в такую верстку:

F([A, B], C) → <A><B><C/></B></A> 
*/

const SomeComponent = (arrComp, onlyComp) => { 
	const newArr = arrComp.reverse(); 
	return ( 
		{newArr.reduce((acc, component, index) => { 
			if (index === 0) { 
				acc = onlyComp; 
			} 
			acc = <component children={acc} /> 
		return acc; 
	}, null)} 
)}
```

___

[[011 Решение задач JS, TS и React|Назад]]