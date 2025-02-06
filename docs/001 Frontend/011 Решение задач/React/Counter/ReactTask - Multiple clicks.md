---
title: Multiple clicks
draft: false
tags:
  - "#React"
  - "#reactTask"
  - "#детскийМир"
---

```JSX
import * as React from "react";
import "./styles.css";

export default function App() {
  const [count, setCount] = React.useState(0);

  const addCount = () => {
    setTimeout(() => {
      setCount(count + 1);
    }, 1000);
  };

  return (
    <div className="App">
      <button onClick={addCount}>Count: {count}</button>
    </div>
  );
}
```

___

[[011 Решение задач JS, TS и React|Назад]]