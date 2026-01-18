---
uid: lKjVQ-BmHHhHWa2AgMZXw
title: ReactTask - PropsLogger_0
tags:
  - "#React"
  - "#reactTask"
  - "#Hooks"
  - "#itOne"
draft: false
technology: Решение задач
specialty: Frontend
tools: []
order: 0
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

```jsx
import React, { useEffect, useRef } from "react";

function PropsLogger(props) {
  const prevProps = useRef(props);

  useEffect(() => {
    const changedProps = Object.entries(props).reduce(
      (result, [key, value]) => {
        if (prevProps.current[key] !== value) {
          result[key] = value;
        }
        return result;
      },
      {},
    );
    console.log("Props changed:", changedProps);
    prevProps.current = props;
  }, [props]);

  return null;
}

export default PropsLogger;

/* 
В этом компоненте мы используем хук useRef, чтобы сохранить предыдущие значения пропсов. 
Внутри эффекта мы сравниваем текущие пропсы с предыдущими, используя метод 
Object.entries для перебора объекта и метод reduce для создания нового объекта 
с измененными пропсами. Затем мы выводим этот новый объект в консоль и обновляем значение 
предыдущих пропсов с помощью prevProps.current = props. 
Этот компонент также не рендерит никакого контента на странице, поэтому мы возвращаем null.
*/
```

---

[[011 Решение задач JS, TS и React|Назад]]
