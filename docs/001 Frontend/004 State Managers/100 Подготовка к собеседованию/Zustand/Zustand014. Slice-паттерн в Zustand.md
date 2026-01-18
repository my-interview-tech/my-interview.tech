---
uid: G4Rum393WlztarM9X7F6b
title: Slice-паттерн в Zustand
tags:
  - React
  - Zustand
  - State-manager
  - slice
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

Slice-паттерн в Zustand позволяет разбить управление состоянием на отдельные логические части (слайсы), что упрощает поддержку и масштабирование приложения. Вот как это можно реализовать:

##### 1. Создание слайсов

Каждый слайс отвечает за свою часть состояния и логику.

```typescript
// slices/CartSlice.ts
import { StateCreator } from "zustand";

export type CartState = {
  items: string[];
  addItem: (item: string) => void;
  removeItem: (item: string) => void;
};

export const createCartSlice: StateCreator<CartState> = (set) => ({
  items: [],
  addItem: (item) => set((state) => ({ items: [...state.items, item] })),
  removeItem: (item) =>
    set((state) => ({ items: state.items.filter((i) => i !== item) })),
});

// slices/ListSlice.ts
import { StateCreator } from "zustand";

export type ListState = {
  list: string[];
  setList: (list: string[]) => void;
};

export const createListSlice: StateCreator<ListState> = (set) => ({
  list: [],
  setList: (list) => set({ list }),
});
```

##### 2. Создание общего Store

Объедините слайсы в одном Store.

```typescript
// store.ts
import create from "zustand";
import { createCartSlice, CartState } from "./slices/CartSlice";
import { createListSlice, ListState } from "./slices/ListSlice";

type StoreState = CartState & ListState;

const useStore = create<StoreState>((...a) => ({
  ...createCartSlice(...a),
  ...createListSlice(...a),
}));

export default useStore;
```

##### 3. Использование Store в компонентах

Компоненты могут использовать только те части состояния, которые им нужны.

```tsx
// components/CartComponent.tsx
import React from "react";
import useStore from "../store";

const CartComponent = () => {
  const { items, addItem, removeItem } = useStore();

  return (
    <div>
      <h2>Cart</h2>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {item}
            <button onClick={() => removeItem(item)}>Remove</button>
          </li>
        ))}
      </ul>
      <button onClick={() => addItem("New Item")}>Add Item</button>
    </div>
  );
};

export default CartComponent;
```

##### 4. Декомпозиция компонентов

Разделите компоненты на отдельные файлы для улучшения читаемости и поддержки.

```tsx
// components/ListComponent.tsx
import React from "react";
import useStore from "../store";

const ListComponent = () => {
  const { list, setList } = useStore();

  return (
    <div>
      <h2>List</h2>
      <ul>
        {list.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <button onClick={() => setList(["Item 1", "Item 2", "Item 3"])}>
        Set List
      </button>
    </div>
  );
};

export default ListComponent;
```

##### Основные моменты:

- **Слайсы** позволяют разделить состояние на логические части.
- **Общий Store** объединяет слайсы в одном месте.
- **Компоненты** используют только необходимые части состояния.
- **Декомпозиция** улучшает читаемость и поддерживаемость кода.

Таким образом, Slice-паттерн помогает эффективно управлять состоянием приложения, делая код более структурированным и удобным для работы.

---

[[004 State Managers|Назад]]
