---
uid: wdTgjITgoRiQdRXrLeYBf
title: Как обрабатывать асинхронные операции в Zustand?
tags:
  - React
  - Zustand
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

Для обработки асинхронных операций в Zustand можно централизовать логику в Store. Это упрощает компоненты, делает код более переиспользуемым и улучшает его читаемость. Вот пример:

```javascript
import { create } from "zustand";

const useStore = create((set) => ({
  data: null,
  loading: false,
  error: null,

  fetchData: async () => {
    set({ loading: true, error: null });
    try {
      const response = await fetch("https://api.example.com/data");
      const data = await response.json();
      set({ data, loading: false });
    } catch (error) {
      set({ error, loading: false });
    }
  },
}));

// Компонент React
const MyComponent = () => {
  const { data, loading, error, fetchData } = useStore();

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error.message}</div>;

  return (
    <div>
      {data.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
};
```

Здесь:

1. **Store** содержит состояние: `data`, `loading`, `error`.
2. **Асинхронная функция `fetchData`**:
   - Устанавливает `loading` в `true` и очищает `error` перед запросом.
   - Выполняет запрос к API.
   - Обновляет состояние данными или ошибкой.
3. **Компонент** использует Store:
   - Получает состояние и функцию `fetchData`.
   - Вызывает `fetchData` при монтировании.
   - Отображает данные, состояние загрузки или ошибку.

Таким образом, Zustand помогает управлять асинхронными операциями в одном месте, упрощая компоненты и улучшая структуру кода.

---

[[004 State Managers|Назад]]
