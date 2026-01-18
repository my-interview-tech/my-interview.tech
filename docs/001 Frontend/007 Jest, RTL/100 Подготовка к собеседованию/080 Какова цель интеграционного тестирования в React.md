---
uid: bHhZgWwSaCMYyn653cTo3
title: >-
  Какова цель интеграционного тестирования? Как вы будете писать интеграционные
  тесты для приложения на React?
tags:
  - testing
  - Jest
  - react-testing-library
  - integration-test
draft: false
technology: "Jest, RTL"
specialty: Frontend
tools: []
order: 80
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

Интеграционное тестирование (Integration Testing) направлено на проверку взаимодействия между различными компонентами системы. В контексте приложения на React, это означает тестирование взаимодействия между компонентами, модулями, API и другими внешними сервисами. Основные цели интеграционного тестирования:

1. **Проверка взаимодействия**: Убедиться, что компоненты и модули работают вместе как единое целое.
2. **Выявление проблем**: Обнаружить проблемы, которые не были обнаружены на уровне модульного тестирования, такие как проблемы с коммуникацией между компонентами.
3. **Обеспечение целостности**: Убедиться, что приложение работает правильно в целом, а не только отдельные его части.

Написание интеграционных тестов для приложения на React

Для написания интеграционных тестов в React можно использовать библиотеки, такие как **React Testing Library** и **Cypress**. Вот как это можно сделать:

1. **Использование React Testing Library**:

React Testing Library позволяет тестировать компоненты в контексте их реального использования, что делает тесты более надежными и близкими к реальному поведению пользователя.

Предположим, у вас есть приложение с формой, которая отправляет данные на сервер и отображает результат.

Компонент `Form.js`:

```javascript
import React, { useState } from "react";

const Form = ({ onSubmit }) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(input);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
```

Компонент `App.js`:

```javascript
import React, { useState } from "react";
import Form from "./Form";

const App = () => {
  const [result, setResult] = useState("");

  const handleSubmit = async (input) => {
    const response = await fetch("https://api.example.com/submit", {
      method: "POST",
      body: JSON.stringify({ input }),
    });
    const data = await response.json();
    setResult(data.message);
  };

  return (
    <div>
      <Form onSubmit={handleSubmit} />
      <div data-testid="result">{result}</div>
    </div>
  );
};

export default App;
```

Интеграционный тест `App.test.js`:

```javascript
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "./App";

// Имитация fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ message: "Success!" }),
  }),
);

test("submits form and displays result", async () => {
  render(<App />);

  const input = screen.getByRole("textbox");
  const submitButton = screen.getByRole("button", { name: /submit/i });

  fireEvent.change(input, { target: { value: "Test Input" } });
  fireEvent.click(submitButton);

  await waitFor(() => {
    expect(screen.getByTestId("result")).toHaveTextContent("Success!");
  });
});
```

---

[[007 Jest, RTL|Назад]]
