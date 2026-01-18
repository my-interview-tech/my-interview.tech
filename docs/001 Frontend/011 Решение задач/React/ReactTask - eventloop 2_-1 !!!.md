---
uid: bYx0SNVQAOpf1v7n7UnqE
title: ReactTask - eventloop 2_-1 !!!
tags:
  - "#React"
  - "#reactTask"
  - "#EventLoop"
  - "#datagileINC"
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
import { useState, useEffect } from "react";

export default function App() {
  const [counter, setCounter] = useState(0);

  console.log("render", counter);

  useEffect(() => {
    console.log("effect", counter);
    return () => {
      console.log("cleanup", counter);
    };
  }, [counter]);

  useEffect(() => {
    setCounter((prev) => prev + 1);
  }, []);

  return null;
}
```

---

[[011 Решение задач JS, TS и React|Назад]]
