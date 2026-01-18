---
uid: RZMRGN44E9XflD1LZ3nel
title: Что такое useId() ? Как его можно использовать ?
tags:
  - React
  - useId
  - key
  - Hooks
info:
  - "https://ru.react.dev/reference/react/useId"
  - "https://habr.com/ru/articles/745232/"
  - "https://www.youtube.com/watch?v=GNVI9Pr_RKQ&t=55s"
draft: false
technology: ReactCore
specialty: Frontend
tools: []
order: 89
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

**`useId`** — это хук, представленный в React 18, который предназначен для генерации уникальных идентификаторов (ID). Эти идентификаторы могут быть использованы для различных целей, но особенно полезны для атрибутов доступности, таких как `id`, `aria-labelledby`, `aria-describedby` и других.

Основные характеристики `useId`:

1. **Уникальность:** Каждый вызов `useId` возвращает уникальный строковый идентификатор, который гарантированно будет уникальным в пределах компонента.
2. **Стабильность:** Идентификатор, сгенерированный `useId`, остается неизменным между рендерами, что важно для сохранения связей между элементами.
3. **Простота использования:** `useId` — это простой и удобный способ генерировать идентификаторы без необходимости использования сторонних библиотек или сложной логики.

Пример использования:

```jsx
import React, { useId } from "react";

function FormField({ label, type, ...props }) {
  const id = useId();

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input id={id} type={type} {...props} />
    </div>
  );
}

function App() {
  return (
    <div>
      <FormField label="Имя" type="text" />
      <FormField label="Email" type="email" />
    </div>
  );
}

export default App;
```

Подробное объяснение:

1. **Генерация уникального ID:**  
   Внутри компонента `FormField` используется хук `useId`, который генерирует уникальный идентификатор для каждого экземпляра компонента. Этот идентификатор присваивается переменной `id`.
2. **Использование ID в HTML-атрибутах:**  
   Идентификатор `id` используется в атрибуте `htmlFor` элемента `<label>` и в атрибуте `id` элемента `<input>`. Это обеспечивает правильную связь между меткой и полем ввода, что улучшает доступность и пользовательский опыт.
3. **Стабильность ID:**  
   Поскольку `useId` генерирует стабильный идентификатор, который не изменяется между рендерами, связь между меткой и полем ввода остается постоянной, даже если компонент перерисовывается.

Другие сценарии использования `useId`:

1. **Связывание элементов с помощью `aria-labelledby` и `aria-describedby`:**

```jsx
function Tooltip({ text, children }) {
  const id = useId();

  return (
    <div>
      <div id={id} role="tooltip">
        {text}
      </div>
      {React.cloneElement(children, { "aria-describedby": id })}
    </div>
  );
}
```

2. **Генерация уникальных ID для динамических элементов:**

```jsx
function DynamicList({ items }) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={useId()}>{item}</li>
      ))}
    </ul>
  );
}
```

---

[[004 ReactCore|Назад]]
