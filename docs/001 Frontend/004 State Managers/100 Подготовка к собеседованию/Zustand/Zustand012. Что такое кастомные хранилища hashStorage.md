---
uid: fYlnDzPHJTHl1AAH2CeAT
title: Что такое кастомные хранилища hashStorage ?
tags:
  - React
  - Zustand
  - State-manager
  - hashStorage
  - Persist
  - sessionStorage
  - localStorage
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

Кастомные хранилища, такие как `hashStorage`, позволяют сохранять и восстанавливать состояние приложения через параметры URL. Вот как это можно реализовать:

1. **Создание `hashStorage`**:  
   Создайте хранилище, которое будет работать с хэшем URL. Оно должно реализовывать методы `getItem`, `setItem` и `removeItem`.

```javascript
// helpers/hashStorage.js
import { StateStorage } from "zustand/middleware";

const hashStorage = {
  getItem: (name) => {
    const searchParams = new URLSearchParams(window.location.hash.slice(1));
    const value = searchParams.get(name);
    return value ?? null;
  },
  setItem: (name, value) => {
    const searchParams = new URLSearchParams(window.location.hash.slice(1));
    searchParams.set(name, value);
    window.location.hash = searchParams.toString();
  },
  removeItem: (name) => {
    const searchParams = new URLSearchParams(window.location.hash.slice(1));
    searchParams.delete(name);
    window.location.hash = searchParams.toString();
  },
};

export default hashStorage;
```

2. **Настройка Middleware Persist**:  
   Подключите `persist` middleware в Zustand Store и используйте `hashStorage` для сохранения состояния.

```javascript
// stores/SearchStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";
import hashStorage from "../helpers/hashStorage";

const useSearchStore = create(
  persist(
    (set) => ({
      searchText: "",
      setText: (text) => set({ searchText: text }),
    }),
    {
      name: "search-storage",
      getStorage: () => hashStorage,
    },
  ),
);

export default useSearchStore;
```

3. **Использование в компоненте**:  
   В компоненте можно инициализировать состояние из URL и обновлять его при изменении.

```javascript
import { useEffect } from "react";
import useSearchStore from "./stores/SearchStore";

const SearchComponent = () => {
  const { searchText, setText } = useSearchStore();

  useEffect(() => {
    const initialSearchText =
      new URLSearchParams(window.location.hash.slice(1)).get("searchText") ||
      "";
    setText(initialSearchText);
  }, [setText]);

  return (
    <div>
      <input
        type="text"
        value={searchText}
        onChange={(e) => setText(e.target.value)}
        placeholder="Поиск..."
      />
      <p>Текущий поиск: {searchText}</p>
    </div>
  );
};
```

4. **Другие типы хранилищ**:  
   Аналогично можно создать хранилище для `sessionStorage` или `localStorage`.

```javascript
// helpers/sessionStorage.js
const sessionStorage = {
  getItem: (name) => sessionStorage.getItem(name),
  setItem: (name, value) => sessionStorage.setItem(name, value),
  removeItem: (name) => sessionStorage.removeItem(name),
};

export default sessionStorage;
```

**Основные моменты**:

- **`hashStorage`** позволяет сохранять состояние в хэше URL.
- **`persist` middleware** используется для сохранения и восстановления состояния.
- **Инициализация состояния** из URL при монтировании компонента.
- **Обновление URL** при изменении состояния.

Таким образом, кастомные хранилища позволяют гибко управлять состоянием приложения и синхронизировать его с URL.

---

[[004 State Managers|Назад]]
