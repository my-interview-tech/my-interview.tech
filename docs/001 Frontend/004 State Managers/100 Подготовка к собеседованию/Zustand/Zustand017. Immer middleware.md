---
uid: HohW0pOPIlkcw9WMHa0sO
title: Immer middleware
tags:
  - React
  - Zustand
  - State-manager
  - Immer
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

Использование Immer middleware в Zustand преследует цель упрощения работы с неизменяемыми состояниями.

Преимущества использования Immer:

- **Упрощение работы с неизменяемыми состояниями:** Immer позволяет работать с состоянием как с изменяемым, автоматически создавая новые версии состояния.
- **Уменьшение ошибок:** Меньше вероятность ошибок, связанных с неправильным обновлением состояния.
- **Улучшение читаемости кода:** Код становится более читаемым и понятным.

**1. Создание Immer middleware:**

```typescript
// middleware/immerMiddleware.ts
import produce from "immer";

const immerMiddleware = (config) => (set, get, api) =>
  config((fn) => set(produce(fn)), get, api);

export default immerMiddleware;
```

**2. Использование Immer middleware в Zustand Store:**

```typescript
// store.ts
import create from "zustand";
import immerMiddleware from "./middleware/immerMiddleware";

type CoffeeState = {
  coffeeList: any[];
  addCoffee: (coffee: any) => void;
  removeCoffee: (id: number) => void;
};

const useCoffeeStore = create<CoffeeState>(
  immerMiddleware((set) => ({
    coffeeList: [],
    addCoffee: (coffee) =>
      set((state) => {
        state.coffeeList.push(coffee);
      }),
    removeCoffee: (id) =>
      set((state) => {
        state.coffeeList = state.coffeeList.filter(
          (coffee) => coffee.id !== id,
        );
      }),
  })),
);

export default useCoffeeStore;
```

**3. Использование Store в компонентах:**

```typescript
// components/CoffeeList.tsx
import React from 'react';
import useCoffeeStore from '../store';

const CoffeeList = () => {
  const { coffeeList, removeCoffee } = useCoffeeStore();

  return (
    <ul>
      {coffeeList.map((coffee) => (
        <li key={coffee.id}>
          {coffee.name}
          <button onClick={() => removeCoffee(coffee.id)}>Удалить</button>
        </li>
      ))}
    </ul>
  );
};

export default CoffeeList;
```

**4. Добавление кофе:**

```typescript
// components/AddCoffeeForm.tsx
import React, { useState } from 'react';
import useCoffeeStore from '../store';

const AddCoffeeForm = () => {
  const [name, setName] = useState('');
  const { addCoffee } = useCoffeeStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    addCoffee({ id: Date.now(), name });
    setName('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Название кофе"
      />
      <button type="submit">Добавить</button>
    </form>
  );
};

export default AddCoffeeForm;
```

Основные моменты:

- **Установка зависимостей:** Установка `immer` и `zustand`.
- **Создание Immer middleware:** Создание middleware для использования Immer в Zustand.
- **Использование Immer middleware в Store:** Применение middleware при создании Store.
- **Работа с неизменяемыми состояниями:** Использование Immer для упрощения работы с состоянием.
- **Использование Store в компонентах:** Добавление и удаление кофе с использованием Store.

---

[[004 State Managers|Назад]]
