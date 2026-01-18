---
uid: Enxg-ZFgYGN8uA7iZ8j78
title: Кастомный хук для работы с URL Storage
tags:
  - React
  - Zustand
  - State-manager
  - URL
  - react-router-dom
  - useURLStorage
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

Кастомный хук `useURLStorage` позволяет синхронизировать состояние приложения с параметрами URL, что упрощает управление состоянием и улучшает масштабируемость. Вот как это можно реализовать:

##### 1. Создание хука `useURLStorage.ts`

Хук будет извлекать параметры из URL, синхронизировать их с внутренним состоянием приложения и обновлять URL при изменении состояния.

```typescript
// hooks/useURLStorage.ts
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { StoreApi } from "zustand";

type URLStorageParams = {
  searchText?: string;
  page?: number;
  filters?: string;
};

const useURLStorage = (store: StoreApi<URLStorageParams>) => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Синхронизация состояния из URL
  useEffect(() => {
    const params: URLStorageParams = {
      searchText: searchParams.get("searchText") || undefined,
      page: searchParams.get("page")
        ? Number(searchParams.get("page"))
        : undefined,
      filters: searchParams.get("filters") || undefined,
    };

    // Обновляем состояние стора
    store.setState(params);
  }, [searchParams, store]);

  // Обновление URL при изменении состояния
  useEffect(() => {
    const state = store.getState();
    const newParams = new URLSearchParams();

    if (state.searchText) newParams.set("searchText", state.searchText);
    if (state.page) newParams.set("page", state.page.toString());
    if (state.filters) newParams.set("filters", state.filters);

    setSearchParams(newParams);
  }, [store, setSearchParams]);
};

export default useURLStorage;
```

##### 2. Использование хука в главном компоненте `App.tsx`

Хук подключается к стору и синхронизирует его состояние с URL.

```tsx
// App.tsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import useURLStorage from "./hooks/useURLStorage";
import useSearchStore from "./stores/SearchStore";
import SearchComponent from "./components/SearchComponent";
import PaginationComponent from "./components/PaginationComponent";

const App = () => {
  const searchStore = useSearchStore();
  useURLStorage(searchStore);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <SearchComponent />
              <PaginationComponent />
            </>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
```

##### 3. Пример стора `SearchStore.ts`

Создайте стор, который будет хранить состояние поиска, пагинации и фильтров.

```typescript
// stores/SearchStore.ts
import create from "zustand";

type SearchState = {
  searchText?: string;
  page?: number;
  filters?: string;
  setSearchText: (text: string) => void;
  setPage: (page: number) => void;
  setFilters: (filters: string) => void;
};

const useSearchStore = create<SearchState>((set) => ({
  searchText: undefined,
  page: undefined,
  filters: undefined,
  setSearchText: (text) => set({ searchText: text }),
  setPage: (page) => set({ page }),
  setFilters: (filters) => set({ filters }),
}));

export default useSearchStore;
```

##### 4. Пример использования в компонентах

Компоненты могут использовать стор для управления состоянием, которое автоматически синхронизируется с URL.

```tsx
// components/SearchComponent.tsx
import React from "react";
import useSearchStore from "../stores/SearchStore";

const SearchComponent = () => {
  const { searchText, setSearchText } = useSearchStore();

  return (
    <div>
      <input
        type="text"
        value={searchText || ""}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder="Поиск..."
      />
    </div>
  );
};

export default SearchComponent;
```

```tsx
// components/PaginationComponent.tsx
import React from "react";
import useSearchStore from "../stores/SearchStore";

const PaginationComponent = () => {
  const { page, setPage } = useSearchStore();

  return (
    <div>
      <button onClick={() => setPage((page || 1) - 1)}>Назад</button>
      <span>Страница: {page || 1}</span>
      <button onClick={() => setPage((page || 1) + 1)}>Вперед</button>
    </div>
  );
};

export default PaginationComponent;
```

##### Основные моменты:

- **Хук `useURLStorage`** синхронизирует состояние приложения с URL.
- **Стор `SearchStore`** хранит состояние поиска, пагинации и фильтров.
- **Компоненты** используют стор для управления состоянием, которое автоматически отражается в URL.

Этот подход улучшает масштабируемость, уменьшает связанность компонентов и упрощает работу с URL.

---

[[004 State Managers|Назад]]
