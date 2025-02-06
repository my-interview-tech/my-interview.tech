---
title: ReactTask - recordsmMock()_2
draft: false
tags:
  - "#React"
  - "#reactTask"
  - "#async"
  - "#itOne"
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
  { id: 16, value: "Value 6", order: 5, expired: false }
];

async function getItems() {
  return Promise.resolve(
    recordsMock.map(({ id, value, order }) => ({
      id,
      value,
      order
    }))
  );
}

async function getItemsExpirations() {
  return Promise.resolve(
    recordsMock.map(({ id, expired }) => ({
      id,
      expired
    }))
  );
}

export default function App() {

  return (
    <div className="App">
      …
    </div>
  );
}
```

___

[[011 Решение задач JS, TS и React|Назад]]