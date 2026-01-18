---
uid: kAbnCQO59yV5XbIcqGxFB
title: ReactTask - fetchData 1_1
tags:
  - "#React"
  - "#reactTask"
  - "#fetch"
  - "#async"
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

```jsx
/*
Есть компонент и функция fetchData() необходимо получить данные и отрисовать их в списке
*/

function fetchData() {
  fetch("api/tada.json");
}
// ['hello', 'again', 'hello', 'Just called to say hello']

function Component() {
  return <div />;
}
```

```JSX
function fetchData() {
	fetch('api/tada.json')
		.then(response => response.json())
		.then(data => {
			// Вызовите функцию для отображения данных в списке
			renderList(data);
		})
		.catch(error => {
			// Обработка ошибки при получении данных
			console.error('Ошибка получения данных:', error);
		});
}

function renderList(data) {
	// Используйте полученные данные для отображения списка
	const listItems = data.map((item, index) => <li key={index}>{item}</li>);

	// Верните JSX-элемент, содержащий список
	return <ul>{listItems}</ul>;
}

function Component() {
	// Вызовите функцию fetchData() для получения данных
	fetchData();

	return <div>Загрузка данных...</div>;
}
```

---

[[011 Решение задач JS, TS и React|Назад]]
