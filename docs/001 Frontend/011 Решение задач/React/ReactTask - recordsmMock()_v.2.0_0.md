---
uid: 2VFyyHL6IBvxAW2tl_m6V
title: ReactTask - recordsmMock()_v.2.0_0
tags:
  - "#React"
  - "#reactTask"
  - "#async"
  - "#itOne"
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
Асинхронное получение данных и вывод в виде 
динамического списка 

 1. Реализовать компонент выводящий динамический список не просроченных, отсортированных по значению поля order (в порядке возрастания) записей. 
 2. Реализовать компонент выводящий уникальную строку символов всех значений value для текущего состояния списка записей. 
 3. Реализовать компонент Input с возможностью редактирования переданного значения и кнопкой Удалить - удаляющей текущую запись. 
 4. Данные о записях получаются из двух асинхронных методов getItems и getItemsExpirations
*/

// Mocked list
const recordsMock = [
  { id: 11, value: "Value 1", order: 4, expired: false },
  { id: 12, value: "dfgf 2", order: 2, expired: true },
  { id: 13, value: "Value 3", order: 1, expired: false },
  { id: 14, value: "dgsg 4", order: 3, expired: false },
  { id: 15, value: "Value 5", order: 6, expired: true },
  { id: 16, value: "Value 6", order: 5, expired: false },
];

async function getItems() {
  return Promise.resolve(
    recordsMock.map(({ id, value, order }) => ({
      id,
      value,
      order,
    })),
  );
}

async function getItemsExpirations() {
  return Promise.resolve(
    recordsMock.map(({ id, expired }) => ({
      id,
      expired,
    })),
  );
}

export default function App() {
  return <div className="App">…</div>;
}
```

---

[[011 Решение задач JS, TS и React|Назад]]
