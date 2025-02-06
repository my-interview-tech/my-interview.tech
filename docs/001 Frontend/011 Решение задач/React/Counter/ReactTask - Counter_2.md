---
title: Counter_2
draft: false
tags:
  - "#JavaScript"
  - "#taskJS"
  - "#альфабанк"
  - "#useEffect"
  - "#useState"
---

```jsx
import { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  const [count, setCount] = useState(0);

  const increment = () => {
	// Ваш код здесь
  };

  const decrement = () => {
	// Ваш код здесь
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

___

[[011 Решение задач JS, TS и React|Назад]]