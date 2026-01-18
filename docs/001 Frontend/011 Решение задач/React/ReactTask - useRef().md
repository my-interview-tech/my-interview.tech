---
uid: mW5gZmojLQlv9Od-51SaP
title: ReactTask - useRef()
tags: null
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
import React, { useState, useRef } from "react";

export default function App() {
  const [counter, setCounter] = useState(0);
  // const [displayedCounter, setDisplayedCounter] = useState(0);
  const displayedCounterRef = useRef(0);

  const handleIncrement = () => {
    setCounter((prevCounter) => prevCounter + 1);
  };

  const handleDisplayCounter = () => {
    displayedCounterRef.current = counter;
  };

  // const handleDisplayCounter = () => {
  // setDisplayedCounter(counter);
  // };

  return (
    <div className="App">
      <h1>Counter: {counter}</h1>
      <button onClick={handleIncrement}>Increment</button>
      <button onClick={handleDisplayCounter}>Display Counter</button>
      <h2>Displayed Counter: {displayedCounterRef.current}</h2>
    </div>
  );
}
```

---

[[011 Решение задач JS, TS и React|Назад]]
