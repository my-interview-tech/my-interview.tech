---
uid: W5Tkq-lt2HKkKs_Xl4CZR
title: ReactTask - Counter 1_1
tags:
  - "#React"
  - "#reactTask"
  - "#СравниРУ"
  - "#useState"
  - "#useEffect"
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
import { StrictMode, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";

const counter = () => {
  let count = 0;

  return () => {
    count += 1;

    return count;
  };
};

/** Задача:
 * Выводить значение счетчика
 * 1 раз в секунду */
const incrementor = counter();
const count = incrementor();
export const TestComponent = () => {
  const [state, setState] = useState(count);

  useEffect(() => {
    setTimeout(() => {
      setState(incrementor());
    }, 1000);
  }, [state]);

  return <div>{state}</div>;
};

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
    <TestComponent />
  </StrictMode>,
);
```

[](https://codesandbox.io/s/reacttask-counter-1-1-cwvxmr)

---

[[011 Решение задач JS, TS и React|Назад]]
