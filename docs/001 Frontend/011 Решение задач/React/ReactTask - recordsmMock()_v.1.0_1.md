---
uid: 1soM9ursSe2zXc3A6AH6R
title: ReactTask - recordsmMock()_v.1.0_1
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

1. Реализовать компонент выводящий динамический список не просроченных, (отсортированных по значению поля order (в порядке возрастания)) записей. 
2. Реализовать компонент с кнопкой Удалить - удаляющей текущую запись. 
3. Реализовать компонент выводящий уникальную строку символов (букв) всех значений value для текущего состояния списка записей.Только уникальные символы 
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

\*\*Ответ

```jsx
import { useEffect, useState } from "react";
import "./styles.css";

// Mocked list
export const recordsMock = [
  { id: 11, value: "Value 1", order: 4, expired: false },
  { id: 12, value: "dfgf 2", order: 2, expired: true },
  { id: 13, value: "Value 3", order: 1, expired: false },
  { id: 14, value: "dgsg 4", order: 3, expired: false },
  { id: 15, value: "Value 5", order: 6, expired: true },
  { id: 16, value: "Value 6", order: 5, expired: false },
];

export function MockList({ onClick, records }) {
  const filtered = records
    .sort((a, b) => a.order - b.order)
    .filter((el) => !el.expired);

  const handleDelete = (id) => {
    onClick(id);
  };

  return filtered.map((el) => {
    return (
      <li key={el.id}>
        {el.value}
        <button className="btn-style" onClick={() => handleDelete(el.id)}>
          Удалить
        </button>
      </li>
    );
  });
}

export function UniqueWord({ records }) {
  const filtered = records
    .sort((a, b) => a.order - b.order)
    .filter((el) => !el.expired);

  const uniqueWord = [
    ...new Set(
      filtered
        .reduce((acc, el) => {
          return acc + el.value;
        }, [])
        .toLowerCase()
        .split(""),
    ),
  ].join("");

  return <div>{uniqueWord}</div>;
}

export default function App() {
  const [deleteIds, setDeletedIds] = useState([]);

  const handleDelete = (id) => {
    setDeletedIds((prevDeletedIds) => [...prevDeletedIds, id]);
  };

  const filterRecord = recordsMock.filter((el) => !deleteIds.includes(el.id));

  return (
    <div className="App">
      <h2>Заголовок</h2>
      <MockList onClick={handleDelete} records={filterRecord} />
      <UniqueWord records={filterRecord} />
    </div>
  );
}
```

---

[[011 Решение задач JS, TS и React|Назад]]
