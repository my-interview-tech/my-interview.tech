---
uid: TYBGjfgad0oT1YQdG3Zwz
title: Что такое предохранители (Error Boundaries)?
tags:
  - "#React"
  - "#ErrorBoundaries"
  - "#componentDidCatch"
  - "#getDerivedStateFromError"
info:
  - >-
    https://kentcdodds.com/blog/use-react-error-boundary-to-handle-errors-in-react
  - >-
    https://reactdev.ru/archive/react16/error-boundaries/#introducing-error-boundaries
  - "https://www.youtube.com/watch?v=gyqAW0--0Tc"
draft: false
technology: ReactCore
specialty: Frontend
tools: []
order: 63
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

_Предохранители (`Error Boundaries`)_ - это механизм обработки ошибок в React-приложении, который позволяет ловить и обрабатывать ошибки, возникающие в дочерних компонентах, чтобы предотвратить падение всего приложения.

_Когда компонент внутри другого компонента возникает ошибка, React перестает обновлять интерфейс и выводит сообщение об ошибке вместо компонента. Предохранители позволяют перехватывать ошибки, возникающие в дочерних компонентах, и заменять их на другой контент, который не вызовет ошибку и не приведет к падению приложения._

Для создания предохранителей в React необходимо определить компонент, который будет отлавливать ошибки. Для этого нужно использовать методы жизненного цикла `componentDidCatch()` или `static getDerivedStateFromError()`. В этих методах можно определить, как обрабатывать ошибки, например, заменить компонент на другой контент или отобразить панель с сообщением об ошибке.

Пример использования предохранителей (Error Boundaries) в React:

```jsx
import React, { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.log("Error: ", error);
    console.log("Info: ", info);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Что-то пошло не так.</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
```

В данном примере мы создаем компонент `ErrorBoundary`, который отлавливает ошибки в дочерних компонентах. Метод `getDerivedStateFromError()` вызывается, когда в дочернем компоненте произошла ошибка. Метод `componentDidCatch()` вызывается после обработки ошибки и позволяет произвести дополнительные действия, например, логирование ошибки. Если в компоненте `ErrorBoundary` возникла ошибка, то он заменяет ошибочный компонент на другой контент, например, сообщение об ошибке. Если ошибки не произошло, то компонент `ErrorBoundary` отображает дочерние компоненты при помощи `this.props.children`.

Предохранители **не** поймают ошибки в:

- обработчиках событий ([подробнее](https://reactdev.ru/archive/react16/error-boundaries/#how-about-event-handlers));
- асинхронном коде (например колбэках из `setTimeout` или `requestAnimationFrame`);
- серверном рендеринге (Server-side rendering);
- самом предохранителе (а не в его дочерних компонентах).

\*\*Библиотека `react-error-boundary`

Позволяет обрабатывать ошибки в функциональном React-приложении.

1. Установите библиотеку `react-error-boundary` с помощью npm или yarn

2. Создайте компонент-ошибку, который будет отображаться при возникновении ошибки:

```jsx
const ErrorFallback = ({ error }) => {
  return (
    <div>
      <h2>Что-то пошло не так</h2>
      <p>{error.message}</p>
    </div>
  );
};
```

3. Оберните ваш функциональный компонент в `ErrorBoundary` и передайте компонент-ошибку в качестве пропса `fallbackComponent`:

```jsx
import { ErrorBoundary } from "react-error-boundary";

const MyComponent = () => {
  // Функция, которая может вызвать ошибку
  const handleClick = () => {
    throw new Error("Ошибка!");
  };

  return (
    <ErrorBoundary fallbackComponent={ErrorFallback}>
      <div>
        <button onClick={handleClick}>Генерировать ошибку</button>
      </div>
    </ErrorBoundary>
  );
};
```

---

[[004 ReactCore|Назад]]
