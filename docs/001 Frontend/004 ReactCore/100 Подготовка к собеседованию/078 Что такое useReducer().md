---
uid: VzjFQkOxn1c5Cjtbun-lj
title: Что такое `useReducer()`?
tags:
  - "#React"
  - "#Hooks"
  - useReducer
info:
  - "https://react.dev/reference/react/useReducer"
  - "https://habr.com/ru/companies/otus/articles/752824/"
  - "https://dev.to/oluwatrillions/react-series-usereducer-1eh4"
draft: false
technology: ReactCore
specialty: Frontend
tools: []
order: 78
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

_Редуктор (`reducer`) - это функция, которая принимает текущее состояние и действие (`action`), и возвращает новое состояние._ В React, редуктор может использоваться для управления сложным состоянием компонента, которое может включать в себя несколько свойств.

Хук `useReducer()` имеет синтаксис следующего вида:

```jsx
const [state, dispatch] = useReducer(reducer, initialState);
```

Здесь:

- `state` - текущее состояние компонента
- `dispatch` - функция, которая позволяет отправлять действия (action) в редуктор для обновления состояния
- `reducer` - функция-редуктор, которая принимает текущее состояние и действие, и возвращает новое состояние
- `initialState` - начальное состояние компонента

Когда компонент рендерится в первый раз, `useReducer()` вызывает редуктор с начальным состоянием и возвращает текущее состояние и функцию `dispatch`. Когда функция `dispatch` вызывается с действием (action), `useReducer()` вызывает редуктор с текущим состоянием и действием, и возвращает новое состояние.

**dispatch** (функция, изменяющая состояние), использует _reducer_ под капотом. Выглядит это примерно так:

```jsx
const dispatch = (action) => {
  reducer(state, action);
};
```

Другими словами, вся логика описанная внутри `reducer`, будет выполнена при вызове `dispatch`, а единственный аргумент, который принимает `dispatch` и будет `action`.

\*\*Как не обновлять компонент при вызове dispatch. В react 18 не работает!

Бывают ситуации, когда при определенных условиях обновлять компонент не надо. Эту логику можно обработать в редукторе (reducer), но есть нюансы.

Чтобы не обновлять компонент в reducer нужно вернуть предыдущее состояние. Но это работает **только для** **react 17 версии! В react 18 версии компонент будет обновлен в любом случае** при вызове dispatch. На текущий момент актуальная версия react 18.0.2.

```jsx
const reducer = (state, action) => {
  switch (action.type) {
    ...
    default:
      // в react17 компонент не будет обновлен
      // в react18 компонент будет обновлен
      return state;
  }
};
```

Вот пример кода, который демонстрирует, как использовать `useReducer()` для управления состоянием компонента:

```jsx
import { useReducer } from "react";

function MyComponent() {
  const initialState = { count: 0 };

  function reducer(state, action) {
    switch (action.type) {
      case "increment":
        return { count: state.count + 1 };
      case "decrement":
        return { count: state.count - 1 };
      default:
        throw new Error();
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <h1>Количество: {state.count}</h1>
      <button onClick={() => dispatch({ type: "increment" })}>+</button>
      <button onClick={() => dispatch({ type: "decrement" })}>-</button>
    </div>
  );
}
```

В этом примере, `useReducer()` используется для управления состоянием компонента `MyComponent`, который включает в себя счетчик. Редуктор `reducer` определяет два действия: увеличение и уменьшение счетчика. Хук `useReducer()` используется для создания текущего состояния и функции `dispatch`, которая позволяет отправлять действия в редуктор для обновления состояния. Кнопки `+` и `-` используют функцию `dispatch` для отправки действий в редуктор и обновления состояния.

_Если в коде есть несколько useState и одно состояние зависит от другого - это верный признак, что лучше использовать useReducer._ Можно отойти от классического использования  useReducer и использовать для создания переключателей, счетчиков, состояния инпутов и вообще всего, на что хватит фантазии.

_`useReducer()` более предпочтителен нежели `useState()` когда у вас сложная логика, которая включает в себя несколько значений, или когда обновляемое состояние зависит от предыдущего. `useReducer()` также позволяет оптимизировать компонент, так как вы можете передавать `dispatch()` из вне вместо коллбэка._

---

[[004 ReactCore|Назад]]
