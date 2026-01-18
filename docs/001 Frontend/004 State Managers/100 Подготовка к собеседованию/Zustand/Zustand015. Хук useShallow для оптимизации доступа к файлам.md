---
uid: 4oGxMh1urPfeVSsmDCQcl
title: Хук useShallow для оптимизации доступа к файлам
tags:
  - React
  - Zustand
  - State-manager
  - useShallow
  - DevTools
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

Хук `useShallow` из Zustand помогает уменьшить количество ненужных ререндеров в приложении, оптимизируя доступ к данным. Вот как это можно реализовать:

1. **Установка и настройка:** Убедитесь, что у вас установлен Zustand и React DevTools для визуализации ререндеров.

2. **Использование:** Хук `useShallow` позволяет выбирать только те части состояния, которые нужны компоненту, избегая лишних ререндеров.

```tsx
// components/SearchInput.tsx
import React from "react";
import { useShallow } from "zustand/react/shallow";
import useCoffeeStore from "../store";

const SearchInput = () => {
  const { searchText, setText } = useCoffeeStore(
    useShallow((state) => ({
      searchText: state.searchText,
      setText: state.setText,
    })),
  );

  return (
    <input
      type="text"
      value={searchText}
      onChange={(e) => setText(e.target.value)}
      placeholder="Поиск..."
    />
  );
};

export default SearchInput;
```

- **Изменение параметров поиска**: Ререндерится только компонент списка, а не вся страница.

Основные моменты:

- **`useShallow`** позволяет выбирать только необходимые части состояния, избегая лишних ререндеров.
- **Локальный вызов стора**: Каждый компонент использует только те данные, которые ему нужны.
- **Улучшение производительности**: Уменьшение количества ререндеров повышает производительность приложения.

Таким образом, `useShallow` помогает оптимизировать доступ к данным и уменьшить количество ненужных ререндеров.

---

[[004 State Managers|Назад]]
