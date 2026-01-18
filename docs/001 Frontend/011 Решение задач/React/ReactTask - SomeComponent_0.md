---
uid: yU8aznIkD49q5vrInz2HQ
title: ReactTask - SomeComponent_0
tags:
  - "#React"
  - "#reactTask"
  - "#ВКонтакте"
draft: false
technology: Решение задач
specialty: Frontend
tools: []
order: 0
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
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

---

[[011 Решение задач JS, TS и React|Назад]]
