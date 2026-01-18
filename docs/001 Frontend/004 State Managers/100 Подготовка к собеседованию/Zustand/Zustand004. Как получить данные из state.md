---
uid: fOAmSH3Y-L7WrG9vm2c-U
title: Как получить данные из state ?
tags:
  - React
  - Zustand
  - state
  - create
  - State-manager
info: null
draft: false
technology: State Managers
specialty: Frontend
tools: []
order: 0
access: free
created_at: "2026-01-18T15:03:38.095Z"
updated_at: "2026-01-18T15:03:38.095Z"
---

Используйте хук `useStore` для получения данных из состояния. Пример:

```jsx
import { create } from "zustand";

const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}));

// Использование в компоненте
function Counter() {
  const count = useStore((state) => state.count);

  return <h1>{count}</h1>;
}
```

Здесь `count` извлекается из состояния с помощью `useStore`.

---

[[004 State Managers|Назад]]
