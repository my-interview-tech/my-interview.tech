---
title: Child rerender
draft: false
tags:
  - "#React"
  - "#reactTask"
  - "#детскийМир"
---
```JSX
import * as React from "react";
import "./styles.css";

const Parent = () => {
  const [count, setCount] = React.useState(0);

  console.log("Parent");
  
  return (
    <div>
      <h1>Parent</h1>
      <button onClick={() => setCount((count) => count + 1)}>
        Count: {count}
      </button>
      <Child />
    </div>
  );
};

const Child = () => {
  console.log("Child");
  return <h2>Child</h2>;
};

export default function App() {
  return (
    <div className="App">
      <Parent />
    </div>
  );
}
```
___

[[011 Решение задач JS, TS и React|Назад]]