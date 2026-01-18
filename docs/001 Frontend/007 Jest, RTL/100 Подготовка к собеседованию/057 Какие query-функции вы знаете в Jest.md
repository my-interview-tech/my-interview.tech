---
uid: NJy7wD2-SXXV3xrVlh40H
title: Какие query-функции вы знаете в Jest?
tags:
  - testing
  - Jest
  - react-testing-library
  - getByText
  - getByRole
  - getByLabelText
  - getByPlaceholderText
  - getByAltText
  - getByTestId
draft: false
technology: "Jest, RTL"
specialty: Frontend
tools: []
order: 57
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

В Jest есть несколько query-функций, которые помогают находить элементы в DOM при использовании библиотеки тестирования React, такой как `react-testing-library`.

Анатомия query-функция:

|             | 0 совпадений | 1 совпадение      | > 1 совпадения |
| ----------- | ------------ | ----------------- | -------------- |
| **getBy**   | Ошибка       | ссылка на элемент | Ошибка         |
| **queryBy** | null         | ссылка на элемент | Ошибка         |
| **findBy**  | Ошибка       | ссылка на элемент | Ошибка         |

|                | 0 совпадений | 1 совпадение | > 1 совпадения |
| -------------- | ------------ | ------------ | -------------- |
| **getAllBy**   | Ошибка       | Element[]    | Element[]      |
| **queryAllBy** | []           | Element[]    | Element[]      |
| **findAllBy**  | Ошибка       | Element[]    | Element[]      |

| **getBy, getAllBy**               | **queryBy, queryAllBy**              | **findBy, findAllBy**              |
| --------------------------------- | ------------------------------------ | ---------------------------------- |
| Доказать, что элементы существуют | Доказать, что элементы не существуют | Убедиться, что элементы появляются |

---

[[007 Jest, RTL|Назад]]
