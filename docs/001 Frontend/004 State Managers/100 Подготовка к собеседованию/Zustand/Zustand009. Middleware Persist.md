---
uid: hCKro9LmsSLNjhftsZQyR
title: Middleware Persist
tags:
  - React
  - Zustand
  - Persist
  - State-manager
  - Partialize
  - localStorage
  - sessionStorage
  - indexDB
info:
  - "https://zustand.docs.pmnd.rs/integrations/persisting-store-data"
draft: false
technology: State Managers
specialty: Frontend
tools: []
order: 0
access: free
created_at: "2026-01-18T15:03:38.095Z"
updated_at: "2026-01-18T15:03:38.095Z"
---

Middleware Persist позволяет сохранить состояние в Zustand, чтобы избежать потери данных при перезагрузке страницы. Это особенно полезно для сохранения токенов аутентификации, пользовательского ввода, пагинации, фильтров и т.д.

Основные шаги:

**1. Введение в проблему:**

- **Проблема:** При перезагрузке страницы данные, хранящиеся в Zustand, теряются.
- **Примеры:** Потеря пользовательской сессии, введенных данных, настроек фильтров.

**2. Решение с Middleware Persist:**

- **Middleware Persist:** Zustand предоставляет инструмент Middleware Persist для автоматического сохранения состояния при перезагрузке страницы.

**3. Применение на практике:**

- **Пример приложения с счетчиком:**
  - **Комментарии:** Закомментирован код, не относящийся к счетчику.
  - **Разметка:** Добавлен счетчик в разметку.

**4. Настройка Middleware:**

- **Типизация:** В `CounterStore` типизирована работа с Middleware.
- **Добавление Middleware Persist:**
  - **Обертывание:** Вызов `CounterSlice` обернут в Middleware Persist.
  - **Параметры:** Указано название стора.

**5. Результат:**

- **Сохранение состояния:** После изменений в браузере и перезагрузки страницы состояние счетчика сохраняется, благодаря автоматическому сохранению в `LocalStorage`.

**6. Настройка сохраняемых данных:**

- **Partialize:** Добавлен второй счетчик для демонстрации возможности сохранения только определенных данных.
- **Указание данных:** Используя параметр `Partialize` в `Persist`, можно указать, какие данные сохранять.

**7. Использование разных хранилищ:**

- **Различные хранилища:** Можно использовать различные хранилища, не ограничиваясь `LocalStorage`.
- **Кастомное хранилище:** Показано создание кастомного хранилища.

Пример:

```jsx
import create from "zustand";
import { persist } from "zustand/middleware";

const useCounterStore = create(
  persist(
    (set) => ({
      count: 0,
      increment: () => set((state) => ({ count: state.count + 1 })),
      decrement: () => set((state) => ({ count: state.count - 1 })),
    }),
    {
      name: "counter-storage", // Уникальное имя для хранилища
    },
  ),
);

// Компонент React
const CounterComponent = () => {
  const { count, increment, decrement } = useCounterStore();

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  );
};
```

Основные моменты:

- **Middleware Persist** автоматически сохраняет состояние в `LocalStorage` или другом хранилище.
- **Partialize** позволяет выборочно сохранять данные.
- **Кастомные хранилища** могут быть использованы для более сложных сценариев.

Middleware Persist предоставляет удобный способ сохранения состояния при перезагрузке страницы, что особенно полезно для данных, которые должны быть доступны между сессиями.

---

[[004 State Managers|Назад]]
