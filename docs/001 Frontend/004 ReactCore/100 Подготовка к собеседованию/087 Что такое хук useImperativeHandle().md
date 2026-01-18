---
uid: YGv17KDNQDTlHGN8wrSDG
title: Что такое хук useImperativeHandle() ?
tags:
  - React
  - Hooks
  - useImperativeHandle
info:
  - "https://react.dev/reference/react/useImperativeHandle"
  - "https://dev.to/anikcreative/react-hooks-explained-useimperativehandle-5g44"
draft: false
technology: ReactCore
specialty: Frontend
tools: []
order: 87
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

`useImperativeHandle()` - это хук в React, предназначенный для того, чтобы контролировать значение, которое возвращается при использовании элемента как ссылки (ref). Это позволяет вам настроить, какие методы или свойства будут доступны при использовании `ref` на вашем компоненте.
`

```javascript
useImperativeHandle(ref, createHandle, [deps]);
```

- **ref**: Ссылка (ref), которую вы хотите настроить. Обычно это значение, переданное через `ref` из родительского компонента.
- **createHandle**: Функция, которая возвращает объект, представляющий "ручки" (handles), которые будут доступны через `ref`.
- **deps** (опционально): Массив зависимостей, которые, если изменятся, вызовут повторное выполнение `createHandle`.

Предположим, у вас есть компонент `MyInput`, который содержит поле ввода, и вы хотите предоставить родительскому компоненту метод `focus`, чтобы он мог установить фокус на этом поле ввода.

```javascript
import React, { useRef, useImperativeHandle, forwardRef } from "react";

const MyInput = forwardRef((props, ref) => {
  const inputRef = useRef();

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    },
  }));

  return <input ref={inputRef} {...props} />;
});

export default MyInput;
```

В родительском компоненте вы можете использовать `ref` для вызова метода `focus`:

```javascript
import React, { useRef } from "react";
import MyInput from "./MyInput";

function ParentComponent() {
  const inputRef = useRef();

  const handleClick = () => {
    inputRef.current.focus();
  };

  return (
    <div>
      <MyInput ref={inputRef} />
      <button onClick={handleClick}>Focus Input</button>
    </div>
  );
}

export default ParentComponent;
```

**Зачем это нужно?**

- **Контроль доступа**: `useImperativeHandle` позволяет вам контролировать, какие методы или свойства будут доступны через `ref`. Это может быть полезно, если вы хотите ограничить доступ к определенным частям вашего компонента.
- **Инкапсуляция**: Этот хук помогает инкапсулировать внутреннюю логику компонента, предоставляя только те методы, которые действительно необходимы родительскому компоненту.

---

[[004 ReactCore|Назад]]
