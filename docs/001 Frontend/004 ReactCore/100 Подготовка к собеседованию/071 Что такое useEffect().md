---
uid: tMZDsoPoe0kg009RO2e1x
title: Что такое `useEffect()`?
tags:
  - React
  - Hooks
  - useEffect
info: []
draft: false
technology: ReactCore
specialty: Frontend
tools: []
order: 71
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

*Эффекты* позволяют выполнить некоторый код после рендеринга.

*Хук `useEffect()`* используется для добавления эффектов в функциональный компонент, работают за счёт `fiber.node`:

```JSX
import React, { useState, useEffect } from 'react';

function MyComponent() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}

export default MyComponent;
```

В данном примере мы используем хук `useEffect()` для добавления эффекта обновления заголовка документа при изменении состояния `count`. _Хук `useEffect()` принимает функцию, которая будет выполнена после каждого рендеринга компонента._ В данном случае мы обновляем заголовок документа с помощью свойства `document.title`.

\*\*Что такое массив зависимостей [] ?

**Массив** **зависимостей** - это список переменных состояния или функций, от которых **зависит** хук **useEffect**. При изменении этих значений срабатывает функция обратного вызова **useEffect**. Используя **массив** **зависимостей**, мы можем предотвратить чрезмерный повторный рендеринг компонентов, что делает код более эффективным.

```jsx
const [state1, setState1] = useState(0);
const [state2, setState2] = useState(0);
useEffect(() => {
  console.log("state1 changed");
}, [state1]);
```

_Напоминание: не обновляйте состояние внутри `useEffect()` без продуманной логики, иначе это может вызвать бесконечный круг перерисовок._

_Скобки, `[]`, представляющие пустой массив, означают, что эффект не использует значения, участвующие в потоке данных React, и по этой причине безопасным можно считать его однократное применение._ Кроме того, использование пустого массива зависимостей является обычным источником ошибок в том случае, если некое значение, на самом деле, используется в эффекте.

Вам понадобится освоить несколько стратегий (преимущественно, представленных в виде `useReducer` и `useCallback`), которые могут помочь устранить необходимость в зависимости вместо того, чтобы необоснованно эту зависимость отбрасывать.

\*\*Функция очистки

_Внутри useEffect всегда можно вернуть функцию очистки, которая используется для удаления нежелательного поведения._ Функция очистки вызывается не только перед размонтированием компонента, но и перед выполнением следующего эффекта.

```jsx
useEffect(() => {
  // Выполняем какие-то действия при монтировании компонента
  console.log(`state1 changed | ${state1}`);
  // Возвращаем функцию очистки
  return () => {
    console.log("state1 unmounted | ", state1);
    // Выполняем очистку ресурсов или отмену подписок
  };
}, [state1]);
```

\*\*Как ведет себя замыкание в хуках

При обновлении компонента все переменные в нем создаются по-новой. При этом, в памяти хранится предыдущий effect (которую передавали в useEffect). _Предыдущий effect завязан на предыдущее окружение, она через замыкания имеет доступ ко всем переменным, внутри компонента и значение этих переменных соответствует предыдущему состоянию компонента._ Таким образом в памяти хранится два экземпляра всех переменных и функция, которую мы создаем в useMemo, useCallback, useEffect и прочих, на самом деле не теряет замыкания, это мы "теряем" текущую функцию.

\*\*`useEffect()` на практике

1. Если вернуть функцию , она будет вызываться для очистки предыдущего эффекта (похоже на componentWillUnmount())

```jsx
useEffect(() => {
  console.log(a + b + c);
  return () => console.log("cleanup");
}, [a, b, c]);
```

2. effect + cleanup ( mount + unmount )
   `2.1`

```jsx
useEffect(() => console.log("mount"), []);
useEffect(() => console.log("update"));
useEffect(() => () => console.log("unmount"), []);
```

    2.2

```jsx
useEffect(() => {
  const timeout = setTimeout(setVisible, 10, false);
  return () => clearTimeout(timeout);
}, []);
```

3. Если данные зависят от параметра (например, ID ресурса) - обязательно укажите его в массиве > Promise нельзя отменить, но можно проигнорировать результат:

```jsx
useEffect(() => {
  let cancelled = false;
  fetch(`/users/${id}`)
    .then((res) => res.json())
    .then((data) => !cancelled && setName(data.name));
  return () => (cancelled = true);
}, [id]);
```

\*\*Как пропустить `useEffect()` при первом рендеринге

Мы можем использовать `useRef()` для сохранения любого изменяемого значения, которое мы хотим, чтобы отслеживать, выполняется ли `useEffect()` впервые.

Если мы хотим, чтобы эффект выполнялся на той же фазе, что и `componentDidUpdate()` выполняется, мы можем использовать [`useLayoutEffect()`](https://reactjs.org/docs/hooks-reference.html#uselayouteffect) вместо этого.

```jsx
const { useState, useRef, useLayoutEffect } = React;

function ComponentDidUpdateFunction() {
  const [count, setCount] = useState(0);

  const firstUpdate = useRef(true);
  useLayoutEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }

    console.log("componentDidUpdateFunction");
  });

  return (
    <div>
      <p>componentDidUpdateFunction: {count} times</p>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        Click Me
      </button>
    </div>
  );
}

ReactDOM.render(<ComponentDidUpdateFunction />, document.getElementById("app"));
```

---

[[004 ReactCore|Назад]]
