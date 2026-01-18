---
uid: 7fLBAmE37oaeVs4YnKOxA
title: ReactTask - useDirtyState_1
tags:
  - "#React"
  - "#reactTask"
  - "#Hooks"
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

```jsx useDirtyState
import "./styles.css";

// задача: написать кастомный хук useDirtyState
// вначале у которого возвращается isDirty = false
// а если хоть раз применен setState то isDirty = true
// + повесить setState на обработчик клика у increment

const useDirtyState = (initialValue = 0) => {
  return [];
};

export default function App() {
  const [state, setState, isDirty] = useDirtyState(0);

  return (
    <div className="App">
      <div>State: {state}</div>
      <div>Is state dirty: {isDirty ? "dirty" : "not dirty"}</div>
      <button>Increment</button>
    </div>
  );
}
```

\*\*Ответ

```jsx
import { useState, useRef } from "react";

const useDirtyState = (initialValue = 0) => {
  const [state, setState] = useState(initialValue);
  const isDirtyRef = useRef(false); // Используем useRef для хранения значения isDirty

  const setDirtyState = (value) => {
    setState(value);
    isDirtyRef.current = true; // Устанавливаем isDirty в true при применении setState
  };

  return [state, setDirtyState, isDirtyRef.current]; // Возвращаем состояние, функцию для установки значения и текущее значение isDirty
};

export default function App() {
  const [state, setState, isDirty] = useDirtyState(0);

  const handleIncrement = () => {
    setState((prevState) => prevState + 1);
  };

  return (
    <div className="App">
      <div>State: {state}</div>
      <div>Is state dirty: {isDirty ? "dirty" : "not dirty"}</div>
      <button onClick={handleIncrement}>Increment</button>
    </div>
  );
}
```

---

[[011 Решение задач JS, TS и React|Назад]]
