---
uid: M47fBLKXDxi4Jnk7HbuhF
title: Работа с Tanstack Query
tags:
  - React
  - Zustand
  - TanstackQuery
  - reactQuery
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

Интеграция Tanstack Query (React Query) и Zustand предназначена для эффективного управления запросами к API и состоянием приложения в React-приложении.

Преимущества совместного использования:

- **Tanstack Query:** Управление запросами к API, кеширование, повторные запросы, пагинация.
- **Zustand:** Управление локальным состоянием приложения, упрощение работы с состоянием.

**1. Настройка QueryClientProvider:**

```typescript
// index.tsx
import React from 'react';
import ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { create } from 'zustand';
import App from './App';

const queryClient = new QueryClient();

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>,
  document.getElementById('root')
);
```

**2. Создание Zustand Store:**

```typescript
// store.ts
import create from "zustand";

type CoffeeState = {
  coffeeList: any[];
  setCoffeeList: (list: any[]) => void;
};

const useCoffeeStore = create<CoffeeState>((set) => ({
  coffeeList: [],
  setCoffeeList: (list) => set({ coffeeList: list }),
}));

export default useCoffeeStore;
```

**3. Использование Tanstack Query и Zustand в компонентах:**

```typescript
// components/CoffeeList.tsx
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useCoffeeStore from '../store';

const fetchCoffeeList = async () => {
  const response = await fetch('https://api.example.com/coffee');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const CoffeeList = () => {
  const { data, error, isLoading } = useQuery(['coffeeList'], fetchCoffeeList);
  const { setCoffeeList } = useCoffeeStore();

  React.useEffect(() => {
    if (data) {
      setCoffeeList(data);
    }
  }, [data, setCoffeeList]);

  if (isLoading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error.message}</div>;

  return (
    <ul>
      {data.map((coffee) => (
        <li key={coffee.id}>{coffee.name}</li>
      ))}
    </ul>
  );
};

export default CoffeeList;
```

**4. Работа с мутациями и обновлением состояния:**

```typescript
// components/AddCoffeeForm.tsx
import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useCoffeeStore from '../store';

const addCoffee = async (newCoffee) => {
  const response = await fetch('https://api.example.com/coffee', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newCoffee),
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const AddCoffeeForm = () => {
  const queryClient = useQueryClient();
  const [name, setName] = useState('');
  const { coffeeList, setCoffeeList } = useCoffeeStore();

  const mutation = useMutation(addCoffee, {
    onSuccess: (newCoffee) => {
      queryClient.invalidateQueries(['coffeeList']);
      setCoffeeList([...coffeeList, newCoffee]);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ name });
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

- **Установка зависимостей:** Установка `@tanstack/react-query` и `zustand`.
- **Настройка QueryClientProvider:** Обертка приложения в `QueryClientProvider`.
- **Создание Zustand Store:** Создание хранилища для управления состоянием.
- **Использование Tanstack Query и Zustand:** Интеграция запросов и состояния в компонентах.
- **Работа с мутациями:** Обновление состояния и инвалидация кеша при мутациях.

Совместное использование Tanstack Query и Zustand позволяет эффективно управлять запросами к API и состоянием приложения, улучшая производительность и упрощая код.

---

[[004 State Managers|Назад]]
