---
uid: eZgrgF903jV_bl75Uk3MX
title: ReactTask - Counter 2_1
tags:
  - "#JavaScript"
  - "#taskJS"
  - "#альфабанк"
  - "#useEffect"
  - "#useState"
draft: false
technology: Решение задач
specialty: Frontend
tools: []
order: 0
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

[Реализуй Counter()](https://codesandbox.io/s/reacttask-counter-2-1-sxr78t?file=/src/App.js)

```jsx
import { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 10);
  };

  const decrement = () => {
    setCount(count - 10);
  };

  useEffect(() => {
    decrement, increment;
  }, [increment, decrement, count]);

  return (
    <div className="App">
      <h1>Counter</h1>
      <h2>{count}</h2>
      <button onClick={decrement}>DEC</button>
      <button onClick={increment}>INC</button>
    </div>
  );
}
```

---

[[011 Решение задач JS, TS и React|Назад]]
