---
uid: jrn6dGqqQTz9c-wsX9f-7
title: Что такое aria-роли и как с ними работать?
tags:
  - testing
  - Jest
  - react-testing-library
  - aria
draft: false
technology: "Jest, RTL"
specialty: Frontend
tools: []
order: 59
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

`ARIA` (Accessible Rich Internet Applications) роли — это атрибуты, используемые для улучшения доступности веб-контента для пользователей с ограниченными возможностями. Они помогают программам чтения с экрана и другим вспомогательным технологиям лучше понимать структуру и функциональность веб-приложений.

При использовании `react-testing-library` в Jest, вы можете тестировать элементы по их ARIA-ролям. Например, если у вас есть кнопка с ролью `button`, вы можете найти её с помощью функции `getByRole`:

```javascript
import { render, screen } from "@testing-library/react";
import MyComponent from "./MyComponent";

it("renders a button with ARIA role", () => {
  render(<MyComponent />);
  const buttonElement = screen.getByRole("button");

  expect(buttonElement).toBeInTheDocument();
});
```

- **Поиск кнопки**:

```javascript
const button = screen.getByRole("button", { name: /submit/i });
```

- **Поиск диалогового окна**:

```javascript
const dialog = screen.getByRole("dialog");
```

- **Поиск ссылки**:

```javascript
const link = screen.getByRole("link", { name: /home/i });
```

Использование ARIA-ролей в тестах помогает убедиться, что ваши компоненты доступны и правильно интерпретируются вспомогательными технологиями.

---

[[007 Jest, RTL|Назад]]
