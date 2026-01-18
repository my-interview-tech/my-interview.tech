---
uid: uBGdzuhXiv3jF-xCbkbS3
title: Сброс состояний в Zustand
tags:
  - React
  - Zustand
  - reset
  - State-manager
  - create
  - Set
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

##### **Часть 1: Основы сброса состояний**

**1. Необходимость сброса состояний:**

- **Проблема:** Помимо установки и хранения значений в Store, часто требуется сбрасывать состояния к изначальным значениям.
- **Пример:** Счетчик, который должен вернуться к нулю после сброса.

**2. Простой способ сброса:**

- **Метод сброса:** Создание метода, который возвращает значения переменных к исходным (например, в 0).

Пример:

```jsx
const useCounterStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
}));
```

**3. Кнопка сброса:**

- **Добавление кнопки:** Добавление кнопки "Reset" для вызова метода сброса.

Пример:

```jsx
const CounterComponent = () => {
  const { count, increment, decrement, reset } = useCounterStore();

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
};
```

##### **Часть 2: Сброс состояний в нескольких хранилищах**

**1. Проблематика сброса в нескольких Store:**

- **Проблема:** Сброс состояний в нескольких Store одновременно может быть сложным.
- **Решение:** Необходимость кастомизации функции создания Store (Create функции) для решения этой проблемы.

##### **Часть 3: Кастомизация функции создания Store**

**1. Создание файла для кастомной функции Create:**

- **Функция сбора методов сброса:** Функция собирает методы сброса из каждого Store и вызывает их всего одним действием.
- **Использование Set:** Для хранения методов сброса используется `Set`, предотвращая повторения.

**2. Реализация кастомной функции Create:**

- **Аналогия с оригинальной функцией:** Написание функции, аналогичной оригинальной, но с дополнительной логикой для сброса нескольких состояний одновременно.
- **Получение изначального состояния:** Возможность получения изначального состояния Store и создание общего метода сброса, добавляемого в `Set`.

**3. Применение кастомной функции:**

- **Переопределение импорта:** Переопределение импорта функции `Create` в Store на кастомную версию.
- **Демонстрация работы:** Демонстрация работы сброса состояний через новую кнопку "Reset".

Пример:

```jsx
// Файл customCreate.js
import { create } from "zustand";

const resetMethods = new Set();

const customCreate = (initializer) => {
  const store = create(initializer);

  const reset = () => {
    resetMethods.forEach((resetMethod) => resetMethod());
  };

  resetMethods.add(store.getState().reset);

  return {
    ...store,
    reset,
  };
};

export default customCreate;

// Применение в Store
import customCreate from "./customCreate";

const useCounterStore = customCreate((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
}));

// Компонент React
const CounterComponent = () => {
  const { count, increment, decrement, reset } = useCounterStore();

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
};
```

Основные моменты:

- **Сброс состояний:** Необходимость сброса состояний к изначальным значениям.
- **Кастомизация функции Create:** Создание кастомной функции для сброса состояний в нескольких Store.
- **Использование Set:** Хранение методов сброса в `Set` для предотвращения повторений.
- **Демонстрация работы:** Применение кастомной функции и демонстрация сброса состояний через кнопку "Reset".

Кастомизация функции создания Store в Zustand позволяет эффективно управлять сбросом состояний в нескольких хранилищах, упрощая поддержку и масштабирование приложения.

---

[[004 State Managers|Назад]]
