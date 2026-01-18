---
uid: F9B2BzIxxNbh_rB8Zh3NS
title: Что такое OffScreen API в React18 ?
tags:
  - React
  - OffScreenAPI
info:
  - "https://www.youtube.com/watch?v=lOUsz0ggDsk"
draft: false
technology: ReactCore
specialty: Frontend
tools: []
order: 111
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

Offscreen API в React - это концепция, которая позволяет управлять рендерингом компонентов, которые не видны на экране (т.е. находятся "за кадром"). Это может быть полезно для оптимизации производительности, особенно в приложениях с большим количеством компонентов или с анимациями.

Основные идеи Offscreen API:

1. **Отложенный рендеринг**: Компоненты, которые не видны на экране, могут быть отложены до момента, когда они станут видимыми. Это позволяет снизить нагрузку на CPU и GPU, особенно в случаях, когда приложение имеет много компонентов, которые редко используются.
2. **Управление состоянием**: Offscreen API позволяет сохранять состояние компонентов, даже если они не рендерятся. Это означает, что когда компонент становится видимым, его состояние может быть восстановлено без необходимости повторного вычисления.
3. **Анимации и переходы**: Компоненты, которые находятся за кадром, могут быть подготовлены к анимации или переходу, чтобы они могли быстро отобразиться на экране без задержек.

```jsx
import React, { useEffect, useState } from "react";

const OffscreenComponent = ({ isVisible }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (isVisible) {
      // Загрузка данных только когда компонент становится видимым
      fetchData().then(setData);
    }
  }, [isVisible]);

  if (!isVisible) {
    return null;
  }

  return (
    <div>
      <h1>Offscreen Component</h1>
      <p>{data}</p>
    </div>
  );
};

const App = () => {
  const [showComponent, setShowComponent] = useState(false);

  return (
    <div>
      <button onClick={() => setShowComponent(!showComponent)}>
        Toggle Component
      </button>
      <OffscreenComponent isVisible={showComponent} />
    </div>
  );
};

export default App;
```

Преимущества Offscreen API:

- **Повышение производительности**: Отложенный рендеринг и управление состоянием позволяют снизить нагрузку на браузер, особенно в сложных приложениях.
- **Плавные переходы**: Компоненты могут быть подготовлены к отображению, что делает переходы более плавными и быстрыми.
- **Экономия ресурсов**: Компоненты, которые не видны, не потребляют ресурсы, пока не станут необходимы.

---

[[004 ReactCore|Назад]]
