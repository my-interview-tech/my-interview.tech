---
uid: AQ4jIDRSSvr7nP4KWo-M-
title: ReactTask - useDebounce()_0
tags:
  - "#React"
  - "#reactTask"
  - "#usedebounce"
  - "#Debounce"
  - "#itOne"
draft: false
technology: Решение задач
specialty: Frontend
tools: []
order: 0
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

// Написать кастомный хук `useDebounce()`

```jsx
import React, { useState, useEffect } from "react";

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default function App() {
  const [inputValue, setInputValue] = useState("");
  const debouncedInputValue = useDebounce(inputValue, 500);

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="App">
      <input type="text" value={inputValue} onChange={handleChange} />
      <p>Debounced Value: {debouncedInputValue}</p>
    </div>
  );
}
```

---

[[011 Решение задач JS, TS и React|Назад]]
