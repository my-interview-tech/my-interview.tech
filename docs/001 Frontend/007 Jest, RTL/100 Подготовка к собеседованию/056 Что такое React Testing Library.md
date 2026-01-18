---
uid: RVNSf5_dPqHdWCRWR3BS9
title: Что такое React Testing Library?
tags:
  - testing
  - Jest
  - react-testing-library
info:
  - "https://testing-library.com/docs/react-testing-library/intro/"
draft: false
technology: "Jest, RTL"
specialty: Frontend
tools: []
order: 56
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

**React Testing Library** — это легковесная библиотека для тестирования React-компонентов. Она фокусируется на тестировании компонентов с точки зрения пользователя, а не с точки зрения реализации. Это означает, что тесты пишутся так, как если бы пользователь взаимодействовал с компонентом, что делает их более надежными и устойчивыми к изменениям в коде.

Основные функции React Testing Library:

1. **Фокус на пользовательском опыте**: Тесты пишутся так, как если бы пользователь взаимодействовал с компонентом, что делает их более надежными и устойчивыми к изменениям в коде.
2. **Простой API**: Предоставляет простой и интуитивно понятный API для поиска элементов и взаимодействия с ними.
3. **Поддержка React**: Нативная поддержка React-компонентов.
4. **Интеграция с Jest**: Легко интегрируется с Jest, что делает его идеальным выбором для тестирования React-приложений.

Установите React Testing Library и Jest:

```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom
```

Пример компонента:

```javascript
import React from "react";

function MyComponent({ name }) {
  return <div>Hello, {name}!</div>;
}

export default MyComponent;
```

Пример теста:

```javascript
import React from "react";
import { render, screen } from "@testing-library/react";
import MyComponent from "./MyComponent";

test("renders correctly with name prop", () => {
  render(<MyComponent name="World" />);
  const element = screen.getByText(/Hello, World!/i);

  expect(element).toBeInTheDocument();
});
```

Пояснение:

1. **Импорт React Testing Library**: Импортируйте `render` и `screen` из `@testing-library/react`.
2. **Отображение компонента**: Используйте метод `render` для отображения компонента `MyComponent`.
3. **Поиск элемента**: Используйте метод `getByText` из `screen` для поиска элемента по тексту.
4. **Утверждение**: Используйте `expect` и методы Jest для проверки, что элемент присутствует в документе.

Дополнительные методы для поиска элементов:

- **`getByLabelText`**: Поиск элемента по тексту метки.
- **`getByPlaceholderText`**: Поиск элемента по тексту плейсхолдера.
- **`getByAltText`**: Поиск элемента по тексту альтернативного описания (для изображений).
- **`getByTestId`**: Поиск элемента по атрибуту `data-testid`.

Пример с использованием `getByLabelText`:

```javascript
import React from "react";
import { render, screen } from "@testing-library/react";

function LoginForm() {
  return (
    <form>
      <label htmlFor="username">Username</label>
      <input id="username" type="text" />
    </form>
  );
}

test("renders login form", () => {
  render(<LoginForm />);
  const inputElement = screen.getByLabelText(/username/i);
  expect(inputElement).toBeInTheDocument();
});
```

---

[[007 Jest, RTL|Назад]]
