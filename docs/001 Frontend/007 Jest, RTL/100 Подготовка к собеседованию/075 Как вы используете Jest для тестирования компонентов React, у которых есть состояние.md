---
uid: PIw_SZ7bYvESbRVkMs-WQ
title: >-
  Как вы используете Jest для тестирования компонентов React, у которых есть
  состояние?
tags:
  - testing
  - Jest
  - react-testing-library
  - React
draft: false
technology: "Jest, RTL"
specialty: Frontend
tools: []
order: 75
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

Тестирование компонентов React с состоянием может быть немного сложнее, чем тестирование компонентов без состояния, но Jest и React Testing Library предоставляют мощные инструменты для этой задачи. Вот как вы можете тестировать компоненты с состоянием:

1. **Импорт необходимых библиотек**:

Для тестирования компонентов React с состоянием вам понадобятся следующие библиотеки:

- **Jest**: Фреймворк для тестирования.
- **React Testing Library**: Утилита для тестирования компонентов React.
- **@testing-library/react**: Основная библиотека для тестирования React-компонентов.
- **@testing-library/user-event**: Библиотека для имитации пользовательских событий.

  2. **Создание компонента с состоянием**:

Предположим, у вас есть компонент `Counter`, который имеет состояние и две кнопки для увеличения и уменьшения счетчика.

```javascript
import React, { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
};

export default Counter;
```

3. **Написание тестов для компонента с состоянием**:

Теперь напишем тесты для компонента `Counter`, чтобы убедиться, что состояние изменяется правильно при нажатии на кнопки.

```javascript
import { render, screen, fireEvent } from "@testing-library/react";
import Counter from "./Counter";

test("renders initial count", () => {
  render(<Counter />);
  const countElement = screen.getByText(/Count: 0/i);
  expect(countElement).toBeInTheDocument();
});

test("increments count when increment button is clicked", () => {
  render(<Counter />);
  const incrementButton = screen.getByText(/Increment/i);
  fireEvent.click(incrementButton);
  const countElement = screen.getByText(/Count: 1/i);
  expect(countElement).toBeInTheDocument();
});

test("decrements count when decrement button is clicked", () => {
  render(<Counter />);
  const decrementButton = screen.getByText(/Decrement/i);
  fireEvent.click(decrementButton);
  const countElement = screen.getByText(/Count: -1/i);
  expect(countElement).toBeInTheDocument();
});
```

4. **Тестирование асинхронных изменений состояния**:

Если ваш компонент имеет асинхронные изменения состояния, вы можете использовать `waitFor` для ожидания изменений.

```javascript
import React, { useState, useEffect } from "react";

const AsyncCounter = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setCount(count + 1), 1000);
    return () => clearTimeout(timer);
  }, [count]);

  return (
    <div>
      <p>Count: {count}</p>
    </div>
  );
};

export default AsyncCounter;
```

Пример тестового файла `AsyncCounter.test.js`:

```javascript
import { render, screen, waitFor } from "@testing-library/react";
import AsyncCounter from "./AsyncCounter";

test("renders initial count and increments after 1 second", async () => {
  render(<AsyncCounter />);
  const countElement = screen.getByText(/Count: 0/i);
  expect(countElement).toBeInTheDocument();

  await waitFor(
    () => {
      const updatedCountElement = screen.getByText(/Count: 1/i);
      expect(updatedCountElement).toBeInTheDocument();
    },
    { timeout: 2000 },
  );
});
```

---

[[007 Jest, RTL|Назад]]
