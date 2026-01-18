---
uid: 37qbCMN4YozZehtN_U9-I
title: Что такое `fireEvent()` в RTL?
tags:
  - testing
  - Jest
  - fireEvent
info:
  - >-
    https://dev.to/jdlt/react-component-testing-with-jest-and-react-testing-library-234k
  - "https://testing-library.com/docs/dom-testing-library/api-events/"
draft: false
technology: "Jest, RTL"
specialty: Frontend
tools: []
order: 63
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

**`fireEvent`** — это функция, предоставляемая React Testing Library, которая позволяет запускать события для заданного элемента. Это полезно для тестирования, так как вы можете имитировать взаимодействие с пользователем (например, клики, ввод текста, нажатие клавиш) и проверять реакцию вашего компонента.

Основные функции `fireEvent`:

1. **Имитация событий**: Позволяет имитировать различные события, такие как `click`, `change`, `keydown`, `keyup`, `submit` и другие.
2. **Простая интеграция**: Легко интегрируется с другими функциями RTL, такими как `render` и `screen`.
3. **Подробные события**: Позволяет передавать дополнительные данные о событии, такие как `target.value` для событий ввода.

Пример использования `fireEvent`:

```javascript
import React, { useState } from "react";

function MyComponent() {
  const [value, setValue] = useState("");

  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        data-testid="input"
      />
      <button onClick={() => setValue("")}>Clear</button>
      <p data-testid="value">{value}</p>
    </div>
  );
}

export default MyComponent;
```

Пример теста:

```javascript
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import MyComponent from "./MyComponent";

test("updates input value and clears it", () => {
  render(<MyComponent />);

  const inputElement = screen.getByTestId("input");
  const valueElement = screen.getByTestId("value");
  const clearButton = screen.getByText("Clear");

  // Имитация ввода текста
  fireEvent.change(inputElement, { target: { value: "Hello, World!" } });
  expect(valueElement.textContent).toBe("Hello, World!");

  // Имитация клика по кнопке
  fireEvent.click(clearButton);
  expect(valueElement.textContent).toBe("");
});
```

Пояснение:

1. **Импорт `fireEvent`**: Импортируйте `fireEvent` из `@testing-library/react`.
2. **Поиск элементов**: Используйте `screen.getByTestId` или другие методы для поиска элементов, с которыми вы хотите взаимодействовать.
3. **Имитация событий**: Используйте `fireEvent` для имитации событий. Например, `fireEvent.change` для имитации ввода текста и `fireEvent.click` для имитации клика.
4. **Утверждения**: Используйте `expect` для проверки, что компонент реагирует на события правильно.

Имитация нажатия клавиши:

```javascript
test("handles key press", () => {
  render(<MyComponent />);

  const inputElement = screen.getByTestId("input");

  fireEvent.keyDown(inputElement, { key: "Enter", code: "Enter" });
  // Дополнительные утверждения для проверки реакции на нажатие клавиши
});
```

Имитация отправки формы:

```javascript
test("handles form submission", () => {
  render(<MyComponent />);

  const formElement = screen.getByTestId("form");

  fireEvent.submit(formElement);
  // Дополнительные утверждения для проверки реакции на отправку формы
});
```

---

[[007 Jest, RTL|Назад]]
