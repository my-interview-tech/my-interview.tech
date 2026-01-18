---
uid: nP1z8R9plusiVo2STbP_s
title: Как вы будете тестировать хуки внутри компонента React?
tags:
  - testing
  - Jest
  - react-testing-library
  - Hooks
draft: false
technology: "Jest, RTL"
specialty: Frontend
tools: []
order: 76
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

Тестирование хуков внутри компонентов React может быть выполнено с использованием библиотеки **React Testing Library** и **Jest**. Однако, если вы хотите протестировать хуки изолированно, без рендеринга компонента, вы можете использовать библиотеку **React Hooks Testing Library**.

1. **Тестирование хуков внутри компонента с использованием React Testing Library**:

Если ваш хук используется внутри компонента, вы можете протестировать его, рендеря компонент и имитируя пользовательские действия.

```javascript
import React, { useState, useEffect } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `Count: ${count}`;
  }, [count]);

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

Пример тестового файла `Counter.test.js`:

```javascript
import { render, screen, fireEvent } from "@testing-library/react";
import Counter from "./Counter";

test("renders initial count and updates document title", () => {
  render(<Counter />);
  const countElement = screen.getByText(/Count: 0/i);
  expect(countElement).toBeInTheDocument();
  expect(document.title).toBe("Count: 0");

  const incrementButton = screen.getByText(/Increment/i);
  fireEvent.click(incrementButton);

  const updatedCountElement = screen.getByText(/Count: 1/i);
  expect(updatedCountElement).toBeInTheDocument();
  expect(document.title).toBe("Count: 1");
});
```

2. **Тестирование хуков изолированно с использованием React Hooks Testing Library**:

Если вы хотите протестировать хук изолированно, без рендеринга компонента, вы можете использовать библиотеку **React Hooks Testing Library**.

```bash
npm install @testing-library/react-hooks
```

Пример хука:

```javascript
import { useState, useEffect } from "react";

const useCounter = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `Count: ${count}`;
  }, [count]);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);

  return { count, increment, decrement };
};

export default useCounter;
```

Пример тестового файла `useCounter.test.js`:

```javascript
import { renderHook, act } from "@testing-library/react-hooks";
import useCounter from "./useCounter";

test("should increment count and update document title", () => {
  const { result } = renderHook(() => useCounter());

  expect(result.current.count).toBe(0);
  expect(document.title).toBe("Count: 0");

  act(() => {
    result.current.increment();
  });

  expect(result.current.count).toBe(1);
  expect(document.title).toBe("Count: 1");
});

test("should decrement count and update document title", () => {
  const { result } = renderHook(() => useCounter());

  expect(result.current.count).toBe(0);
  expect(document.title).toBe("Count: 0");

  act(() => {
    result.current.decrement();
  });

  expect(result.current.count).toBe(-1);
  expect(document.title).toBe("Count: -1");
});
```

---

[[007 Jest, RTL|Назад]]
