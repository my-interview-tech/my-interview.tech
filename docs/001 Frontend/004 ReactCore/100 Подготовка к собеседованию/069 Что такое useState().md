---
uid: Cx-XWAsHtWUbIQAeR7Pro
title: Что такое useState( ?
tags:
  - React
  - Hooks
  - useState
info:
  - "https://dev.to/shivamjjha/batching-in-react-4pp3"
draft: false
technology: ReactCore
specialty: Frontend
tools: []
order: 69
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

*Хук `useState()`* используется для добавления состояния в функциональный компонент:

```JSX
import React, { useState } from 'react';

function MyComponent() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}

export default MyComponent;
```

В данном примере мы используем хук `useState()` для добавления состояния `count` в функциональный компонент `MyComponent`.
_Хук `useState()` возвращает массив, в котором первый элемент - текущее значение состояния, а второй элемент - функция для обновления состояния._ В данном случае мы используем деструктуризацию массива, чтобы извлечь текущее значение состояния и функцию для обновления состояния.

_`useState()` всегда обновляет объект полностью, а не отдельные поля, как `setState()`_ При этом, useState() может принимать в себе, в качестве начального значения, состояния state, так и в результате, функцию-обработчик.

\*\*Передача в качестве начального состояния функции-инициализатора

Этот пример передает функцию инициализатора, поэтому функция `createInitialTodos` выполняется только во время инициализации. Она не выполняется при повторном рендеринге компонента, например, когда вы вводите текст в поле ввода.

```jsx
import { useState } from "react";

function createInitialTodos() {
  const initialTodos = [];
  for (let i = 0; i < 50; i++) {
    initialTodos.push({
      id: i,
      text: "Item " + (i + 1),
    });
  }
  return initialTodos;
}

export default function TodoList() {
  const [todos, setTodos] = useState(createInitialTodos);
  const [text, setText] = useState("");

  return (
    <>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button
        onClick={() => {
          setText("");
          setTodos([
            {
              id: todos.length,
              text: text,
            },
            ...todos,
          ]);
        }}
      >
        Add
      </button>
      <ul>
        {todos.map((item) => (
          <li key={item.id}>{item.text}</li>
        ))}
      </ul>
    </>
  );
}
```

---

[[004 ReactCore|Назад]]
