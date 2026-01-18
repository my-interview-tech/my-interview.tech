---
uid: ChJMlMVsuj1kLvgysmJP2
title: Что такое Batching ?
tags:
  - React
  - Hooks
  - useState
  - batching
info:
  - "https://www.youtube.com/watch?v=bE4mXoNlovM"
  - "https://medium.com/@shivamjjha/batching-in-react-af6c6ce83594"
draft: false
technology: ReactCore
specialty: Frontend
tools: []
order: 70
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

\_`setState` - асинхронная функция. Под капотом React объединяет все мутации состояний, благодаря чему код функционального компонента будет вызван 1 раз, это называется `batching`.

```jsx
function ExampleComponent() {
	const [count, setCount] = useState(0);
	const handleClick = () => {
	// Несколько вызовов `setCount` будут сгруппированы в один батч
	setCount(count + 1);
	setCount(count + 2);
	setCount(count + 3);
};
```

```jsx
import React, { useState, FC } from "react";

export const ExampleFuncComponent: FC = () => {
  const [count, setCount] = useState(0);

  const onClick0 = () => {
    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1);
  };

  const onClick1 = () => {
    setCount((v) => v + 1);
    setCount((v) => v + 1);
    setCount((v) => v + 1);
  };

  return (
    <div>
      <div>{count.toString()}</div>
      <button onClick={onClick0}>
	      test 0
      </button>
      <button onClick={onClick1}>
  	    test 1
      </button>
    </div>
  );
};
```

При нажатии на `test 1` счетчик увеличится на 3, а при нажатии на `test 0` только на 1. Почему это происходит:

```jsx
// Например count = 0
const onClick0 = () => {
  // count + 1 = 0 + 1;
  setCount(count + 1);
  // Здесь можем ожидать, что count уже 1, но т.к. вызов setState асинхронный
  // состояние еще не изменено, поэтому count по-прежнему 0
  // count + 1 = 0 + 1;
  setCount(count + 1);
  // count + 1 = 0 + 1;
  setCount(count + 1);
};
```

Поэтому если новое состояние опирается на предыдущее состояние, используйте функцию:

```jsx
const onClick1 = () => {
  setCount((v) => v + 1);
  setCount((v) => v + 1);
  setCount((v) => v + 1);
};
```

---

[[004 ReactCore|Назад]]
