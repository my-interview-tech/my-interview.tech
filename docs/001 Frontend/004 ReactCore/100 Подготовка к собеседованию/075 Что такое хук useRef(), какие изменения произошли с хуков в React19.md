---
uid: HwkBwYkENLTokNjdssn5x
title: Что такое хук useRef() ?
tags:
  - React
  - Hooks
  - useRef
info:
  - "https://react.dev/reference/react/useRef"
  - "https://dev.to/nibble/what-is-useref-hook-and-how-do-you-use-it-5emo"
draft: false
technology: ReactCore
specialty: Frontend
tools: []
order: 75
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

`useRef()` - это хук в React, предназначенный для создания изменяемого значения, которое сохраняется между рендерами компонента. В отличие от `useState`, изменение значения `useRef` не вызывает повторного рендеринга компонента.

Основные характеристики `useRef`:

1. **Сохранение значения между рендерами**: Значение, хранящееся в `useRef`, сохраняется между рендерами компонента. Это полезно, когда вам нужно хранить какое-то значение, которое не должно вызывать повторный рендеринг.
2. **Доступ к DOM-элементам**: Одним из наиболее распространенных применений `useRef` является доступ к DOM-элементам. Вы можете связать `ref` с элементом в JSX и затем использовать его для прямого манипулирования этим элементом.
3. **Изменяемость**: Вы можете изменять значение `useRef` напрямую, не вызывая повторного рендеринга. Это делается через свойство `current`.

```jsx
import React, { useRef } from "react";

function MyComponent() {
  const inputRef = useRef(null);

  const focusInput = () => {
    inputRef.current.focus();
  };

  return (
    <div>
      <input ref={inputRef} type="text" />
      <button onClick={focusInput}>Focus Input</button>
    </div>
  );
}
```

---

[[004 ReactCore|Назад]]
