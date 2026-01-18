---
uid: 8wtkPeYqDDZ53hY-NuXxH
title: Как реализовать подписку (subscribe) на store в Zustand ?
tags:
  - React
  - Zustand
  - State-manager
  - store
  - subscribe
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

Для реализации подписки на изменения в Zustand Store и сохранения состояния в URL-параметрах можно использовать следующий подход:

1. **Создание Store**:  
   Создайте Store, который будет хранить состояние поиска и метод для его обновления.

```javascript
import { create } from "zustand";

const useSearchStore = create((set) => ({
  searchText: "",
  setText: (text) => set({ searchText: text }),
}));
```

2. **Подписка на изменения**:  
   Используйте метод `subscribe` для отслеживания изменений в Store и обновления URL-параметров.

```javascript
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const SearchComponent = () => {
  const { searchText, setText } = useSearchStore();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    // Подписка на изменения searchText
    const unsubscribe = useSearchStore.subscribe(
      (state) => state.searchText,
      (newSearchText) => {
        setSearchParams({ q: newSearchText });
      },
    );

    // Инициализация поиска из URL
    const initialSearchText = searchParams.get("q") || "";
    setText(initialSearchText);

    return () => unsubscribe();
  }, [setSearchParams, setText]);

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

3. **Автоматическое обновление данных**:  
   В другом компоненте можно подписаться на изменения `searchText` для автоматического обновления данных, например, списка напитков.

```javascript
import { useState, useEffect } from "react";

const DrinksListComponent = () => {
  const { searchText } = useSearchStore();
  const [drinks, setDrinks] = useState([]);

  useEffect(() => {
    // Пример запроса к API с использованием searchText
    fetch(`https://api.example.com/drinks?q=${searchText}`)
      .then((response) => response.json())
      .then((data) => setDrinks(data));
  }, [searchText]);

  return (
    <div>
      <h2>Список напитков</h2>
      <ul>
        {drinks.map((drink) => (
          <li key={drink.id}>{drink.name}</li>
        ))}
      </ul>
    </div>
  );
};
```

**Основные моменты**:

- **Store** хранит состояние поиска и метод для его обновления.
- **Подписка** на изменения в Store позволяет обновлять URL-параметры при изменении состояния.
- **Инициализация** состояния из URL при монтировании компонента.
- **Автоматическое обновление** данных в других компонентах при изменении состояния поиска.

Таким образом, подписки в Zustand позволяют эффективно реагировать на изменения состояний и синхронизировать их с URL-параметрами.

---

[[004 State Managers|Назад]]
