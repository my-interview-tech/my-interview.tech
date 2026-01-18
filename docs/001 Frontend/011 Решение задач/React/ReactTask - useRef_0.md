---
uid: S1NocWPfcv4g5XO8ZHxke
title: ReactTask - useRef_0
tags:
  - "#React"
  - "#useRef"
  - "#useState"
  - "#reactTask"
  - "#астралСофт"
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
const Child = ({ value }) => {
  return <p> {value} </p>;
};

const Main = () => {
  const value = useRef(null);
  const handeChangeValue = () => {
    value.current = Math.random();
  };
  return (
    <section>
      <Child value={value.current} />
      <button type="button" onClick={handeChangeValue}>
        Btn
      </button>
    </section>
  );
};

// Увидим ли мы актуальное value ?
```

\*\*Ответ

Мы увидим неактуальное значение `value` потому что `useRef(null)` представляет собой пустое хранилище данных, которое передаётся в качестве `props` в компонент `Child`. В данном случае значение всегда будет `null`, исправленный код представлен ниже:

```jsx
import React, { useState } from "react";
import Child from "./Child";
import "./styles.css";

const App = () => {
  const [value, setValue] = useState(0);

  const handeChangeValue = () => {
    setValue(() => Math.floor(Math.random() * 1000));
  };

  return (
    <section>
      <Child value={value} />
      <button type="button" onClick={handeChangeValue}>
        Btn
      </button>
    </section>
  );
};

export default App;
```

```jsx
import React from "react";

const Child = ({ value }) => {
  return <p> {value} </p>;
};
export default Child;
```

---

[[011 Решение задач JS, TS и React|Назад]]
