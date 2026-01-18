---
uid: GkmIZuvM5g0KTl3frsBEK
title: Возможно ли использовать значение состояния вне компонента ?
tags:
  - React
  - Zustand
  - State-manager
  - getState
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

Можно использовать значение состояния вне компонента, обращаясь к хранилищу напрямую.

Пример:

```jsx
import { create } from "zustand";

const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}));

// Использование вне компонента
const store = useStore.getState();
console.log(store.count); // Выводит текущее значение count

store.increment(); // Увеличивает count на 1
```

Здесь `useStore.getState()` позволяет получить текущее состояние хранилища вне компонента.

---

[[004 State Managers|Назад]]
