---
uid: MQnKZ778WWu8-YwxuWmDk
title: Как бы вы управляли глобальным состоянием в приложении на Next.js?
tags:
  - NextJS
  - React
  - Redux
  - MobX
  - createContext
  - Zustand
info:
  - >-
    https://dev.to/muhammadazfaraslam/managing-global-state-with-usereducer-and-context-api-in-next-js-14-2m17
draft: false
technology: Next.js
specialty: Frontend
tools: []
order: 33
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

Для управления глобальным состоянием в приложении Next.js можно использовать различные библиотеки, такие как Redux, MobX или Zustand. Однако более простой подход заключается в использовании встроенного в React Context API и хуков.

Вот пошаговое руководство:

1. **Создание контекста:**  
   Сначала создайте контекст с начальными значениями с помощью `React.createContext()`. Это вернет объект с компонентами Provider и Consumer. Компонент Provider делает состояние доступным для всех дочерних компонентов в дереве.

```jsx
import React, { createContext, useState } from "react";

const GlobalStateContext = createContext();
```

2. **Создание провайдера:**  
   Определите компонент Provider, который будет управлять состоянием и предоставлять его дочерним компонентам.

```jsx
const GlobalStateProvider = ({ children }) => {
  const [globalState, setGlobalState] = useState({
    /* начальное состояние */
  });

  return (
    <GlobalStateContext.Provider value={{ globalState, setGlobalState }}>
      {children}
    </GlobalStateContext.Provider>
  );
};
```

3. **Создание кастомного хука:**  
   Определите кастомный хук, который будет использовать `useContext()` для доступа к этому состоянию. Этот хук также может включать любые методы для изменения состояния, используя `useState()` или `useReducer()` для более сложной логики состояния.

```jsx
const useGlobalState = () => {
  const { globalState, setGlobalState } = useContext(GlobalStateContext);
  return { globalState, setGlobalState };
};
```

4. **Использование провайдера:**  
   Оберните ваше приложение (или часть его) в компонент Provider на верхнем уровне, где вы хотите, чтобы состояние было доступно. Любой дочерний компонент внутри этого провайдера теперь может использовать кастомный хук для доступа и изменения глобального состояния.

```jsx
import { GlobalStateProvider } from "../path/to/GlobalStateProvider";

const MyApp = ({ Component, pageProps }) => {
  return (
    <GlobalStateProvider>
      <Component {...pageProps} />
    </GlobalStateProvider>
  );
};

export default MyApp;
```

Теперь любой компонент в вашем приложении может использовать `useGlobalState()` для доступа и изменения глобального состояния.

```jsx
import React from "react";
import { useGlobalState } from "../path/to/useGlobalState";

const MyComponent = () => {
  const { globalState, setGlobalState } = useGlobalState();

  const handleClick = () => {
    setGlobalState({
      /* новое состояние */
    });
  };

  return (
    <div>
      <p>{globalState.someValue}</p>
      <button onClick={handleClick}>Изменить состояние</button>
    </div>
  );
};

export default MyComponent;
```

Этот подход позволяет легко управлять глобальным состоянием в приложении Next.js без необходимости использования дополнительных библиотек.

---

[[006 Next.js|Назад]]
