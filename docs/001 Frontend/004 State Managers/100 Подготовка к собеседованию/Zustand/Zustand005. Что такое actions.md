---
uid: 7Z1begGqyynIo3_PWhZZk
title: Что такое actions ?
tags:
  - React
  - Zustand
  - actions
  - State-manager
info: []
draft: false
technology: State Managers
specialty: Frontend
tools: []
order: 0
access: free
created_at: "2026-01-18T15:03:38.095Z"
updated_at: "2026-01-18T15:03:38.095Z"
---

"actions" — это функции, которые изменяют состояние.

Пример:

```jsx
import create from "zustand";

const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
}));

// Использование в компоненте
function Counter() {
  const count = useStore((state) => state.count);
  const increment = useStore((state) => state.increment);
  const decrement = useStore((state) => state.decrement);

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  );
}
```

Здесь `increment` и `decrement` — это "actions", которые изменяют состояние.

---

[[004 State Managers|Назад]]
