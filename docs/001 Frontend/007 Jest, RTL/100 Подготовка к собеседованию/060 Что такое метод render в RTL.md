---
uid: A4m7STcysvCaoMO1lFAux
title: Что такое метод render в RTL?
tags:
  - testing
  - Jest
  - react-testing-library
info: []
draft: false
technology: "Jest, RTL"
specialty: Frontend
tools: []
order: 60
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

**`render`** — это основной метод в React Testing Library, который используется для рендеринга React-компонентов в тестовой среде. Он возвращает объект, содержащий методы для взаимодействия с отображенным компонентом, такие как поиск элементов, имитация событий и проверка состояния.

Основные функции `render`:

1. **Рендеринг компонентов**: Рендерит React-компонент в тестовой среде.
2. **Поиск элементов**: Предоставляет методы для поиска элементов в DOM, такие как `getByText`, `getByTestId`, `getByRole` и другие.
3. **Имитация событий**: Позволяет имитировать события, такие как клики, ввод текста, нажатие клавиш и другие.
4. **Проверка состояния**: Позволяет проверять состояние компонента после взаимодействия с ним.

Пример компонента:

```javascript
import React from "react";

function Greeting({ name }) {
  return <div>Hello, {name}!</div>;
}

export default Greeting;
```

Пример теста:

```javascript
import React from "react";
import { render, screen } from "@testing-library/react";
import Greeting from "./Greeting";

test("renders greeting with name", () => {
  // Рендерим компонент с пропом name
  render(<Greeting name="World" />);

  // Находим элемент по тексту
  const greetingElement = screen.getByText(/Hello, World!/i);

  // Проверяем, что элемент присутствует в документе
  expect(greetingElement).toBeInTheDocument();
});
```

Пояснение:

1. **Импорт `render` и `screen`**: Импортируйте `render` и `screen` из `@testing-library/react`.
2. **Рендеринг компонента**: Используйте `render` для рендеринга компонента `Greeting` с пропом `name`.
3. **Поиск элемента**: Используйте `screen.getByText` для поиска элемента по тексту.
4. **Проверка наличия элемента**: Используйте `expect` и методы Jest для проверки, что элемент присутствует в документе.

---

[[007 Jest, RTL|Назад]]
