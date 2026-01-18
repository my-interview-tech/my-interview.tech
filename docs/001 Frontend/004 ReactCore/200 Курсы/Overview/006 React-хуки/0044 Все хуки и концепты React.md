---
uid: DQZtnvsk2DYAIP4xgFdtu
title: Все хуки и концепты React
tags:
  - "#React"
  - "#Hooks"
  - "#useState"
  - "#useEffect"
  - "#useContext"
  - "#useReducer"
  - "#useCallback"
  - "#useMemo"
  - "#useRef"
draft: false
technology: ReactCore
specialty: Frontend
tools: []
order: 44
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

## Введение

_Состояние_ – это место, в котором хранятся данные, предназначенные для компонента. Когда состояние меняется, компонент начинает перерисовываться, что позволяет нам управлять измененными данными в приложении.

## useState()

```jsx
const component = () => {
  // Давайте вызовем console.log, передадим в него useState
  // и посмотрим, что он вернет
  console.log(useState(100));
  // Он возвращает массив [100, функция]
  // Возвращается состояние, а также функция для обновления состояния
  // Мы можем деструктуризировать массив
  // для получения значения состояния и функции
  const [state, setState] = useState(100);

  return <div>Привет!!!</div>;
};
```

Совет: используйте состояние только внутри компонентов.

Но вы не можете обновлять значение состояния используя оператор “=”, т.к. это хоть и изменит значение, но не запустит перерисовку компонента. React хочет, чтобы вы передавали значение через функцию setState, для обновления состояния.

### Передача функции внутрь useState()

Вы можете передавать функцию в useState, в такой ситуации первоначальное значение будет равно тому, что возвращает данная функция, это полезно, когда вы используете как начальное значение задачу, которая требует значительных вычислений.

```jsx
const [state, setState] = useState(() => {
  console.log("initial state");
  return 100;
});
```

### Передача функции внутри setState()

Вы можете использовать функцию, когда вам нужно обновить состояние основываясь на данных, которые в данный момент находятся в состоянии.

```jsx
onClick={() => {
	// Аргумент value это текущее состояние
	setState((value) => {
		return value + 1;
	});
}}
```

---

## useEffect()

useEffect хук имеет 2 части, первая – это функция, и вторая – это массив зависимости, что является опциональным.

```jsx
useEffect(() => {}, []);
```

Мы будем получать console log каждый раз, когда состояние будет меняться. К примеру, если вы имеете 2 состояния внутри компонента, и один из них изменился, то мы сразу получим console.log, а это то, что мы обычно не хотим.

```jsx
useEffect(() => {
  console.log("change");
});
```

Примечание: первый вызов useEffect() будет сразу после того, как ваш компонент будет вмонтирован в DOM.

Подробнее: [Полное руководство по useEffect](https://habr.com/ru/companies/ruvds/articles/445276/)

### Массив зависимостей

Мы можем указывать состояние внутри массива зависимости у useEffect, чтобы он отслеживал только те изменения состояний, которые были указаны внутри массива.

```jsx
const [state1, setState1] = useState(0);
const [state2, setState2] = useState(0);
useEffect(() => {
  console.log("state1 changed");
}, [state1]);
```

Напоминание: не обновляйте состояние внутри useEffect без продуманной логики, иначе это может вызвать бесконечный круг перерисовок.

### Функция очистки

Внутри useEffect всегда можно вернуть функцию очистки, которая используется для удаления нежелательного поведения. Функция очистки вызывается не только перед размонтированием компонента, но и перед выполнением следующего эффекта, [прочтите для деталей](https://blog.logrocket.com/understanding-react-useeffect-cleanup-function/) (на английском).

```jsx
useEffect(() => {
  console.log(`state1 changed | ${state1}`);
  return () => {
    console.log("state1 unmounted | ", state1);
  };
}, [state1]);
```

![](https://habrastorage.org/r/w1560/getpro/habr/upload_files/fdf/c91/3db/fdfc913dbf42448b1b404dd3c787f39f.png)

Вы можете получать данные из api как в примере 👇🏻.

```jsx
useEffect(() => {
  const url = "https://jsonplaceholder.typicode.com/todos/1";
  const fetchData = () => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setState(data.title);
      });
  };
  fetchData();
}, []);
```

---

## useContext()

![](https://habrastorage.org/r/w1560/getpro/habr/upload_files/900/5c9/a39/9005c9a395e0b2543d0e4eaf20e258a3.png)

Контекст api позволяет передавать данные в дочерние компоненты без указывания их в props.

```jsx
import { createContext } from "react";
import { useState } from "react";

const StoreContext = createContext();

const component = () => {
  const data = useState({
    name: "Ritesh",
    email: "someMail@gmail.com",
  })[0];

  const Child = () => {
    return (
      <div>
        <StoreContext.Consumer>
          {(value) => <h1>Ваше имя: {value.name}</h1>}
        </StoreContext.Consumer>
      </div>
    );
  };

  return (
    <StoreContext.Provider value={data}>
      <Child />
    </StoreContext.Provider>
  );
};

export default component;
```

Вы можете обернуть родительский компонент в Context.Provider и использовать его внутри функции Context.Consumer. Что же делает useContext? Он заменяет Context.Consumer и позволяет нам получать данные используя useContext.

Посмотрите на пример 👇🏻.

```jsx
import { createContext, useContext } from "react";
import { useState } from "react";

const StoreContext = createContext();

const component = () => {
  const data = useState({
    name: "Ritesh",
    email: "someMail@gmail.com",
  })[0];

  const Child = () => {
    const value = useContext(StoreContext);
    return (
      <div>
        <h1>Ваше имя: {value.name}</h1>
      </div>
    );
  };

  return (
    <StoreContext.Provider value={data}>
      <Child />
    </StoreContext.Provider>
  );
};

export default component;
```

[Подробнее](https://dmitripavlutin.com/react-context-and-usecontext/).

---

## useReducer()

useReducer используется для управления состоянием в React, это, отчасти, схоже с функцией reduce в javascript.

```
// функция редюсера принимает в себя 2 параметра
// текущее состояние и экшен, и возвращает новое состояние
reducer(currentState, action)
// useReducer принимает в себя также 2 параметра
// функцию редюсера и изначальное состояние
useReducer(reducer, initialState);
```

### Давайте создаем простой счетчик используя useReducer

```jsx
import { useReducer } from "react";

const initialState = 0;
const reducer = (state, action) => {
  switch (action) {
    case "increment":
      return state + 1;
    case "decrement":
      return state - 1;
    default:
      return state;
  }
};

export default function main() {
  const [count, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <p>Значение: {count}</p>
      <button onClick={() => dispatch("increment")}>+</button>
      <button onClick={() => dispatch("decrement")}>-</button>
    </div>
  );
}
```

Мы также можем усложнить задачу, превратив наше состояние в объект.

```jsx
import { useReducer } from "react";

const initialState = {
  firstCounter: 0,
  secondCounter: 0,
};
const reducer = (state, action) => {
  switch (action.type) {
    case "increment":
      return { ...state, firstCounter: state.firstCounter + action.value };
    case "decrement":
      return { ...state, firstCounter: state.firstCounter - action.value };
    default:
      return { ...state };
  }
};

export default function main() {
  const [count, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <p>Значение: {count.firstCounter}</p>
      <button
        className="bg-gray-200 p-2"
        onClick={() => dispatch({ type: "increment", value: 2 })}
      >
        Увеличить на 2
      </button>
      <button
        className="bg-gray-200 p-2"
        onClick={() => dispatch({ type: "decrement", value: 4 })}
      >
        Увеличить на 4
      </button>
    </div>
  );
}
```

Или, мы можем использовать несколько useReducer.

```jsx
import { useReducer } from "react";

const initialState = 0;
const reducer = (state, action) => {
  switch (action) {
    case "increment":
      return state + 1;
    case "decrement":
      return state - 1;
    default:
      return state;
  }
};

export default function main() {
  const [count, dispatch] = useReducer(reducer, initialState);
  const [count2, dispatch2] = useReducer(reducer, initialState);

  return (
    <div>
      <p>Счетчик: {count}</p>
      <button
        className="bg-gray-100 p-2 m-2"
        onClick={() => dispatch("decrement")}
      >
        -
      </button>
      <button
        className="bg-gray-100 p-2 m-2"
        onClick={() => dispatch("increment")}
      >
        +
      </button>

      <p>Счетчик 2: {count2}</p>
      <button
        className="bg-gray-100 p-2 m-2"
        onClick={() => dispatch2("increment")}
      >
        +
      </button>
      <button
        className="bg-gray-100 p-2 m-2"
        onClick={() => dispatch2("decrement")}
      >
        -
      </button>
    </div>
  );
}
```

### Когда же использовать useState, а когда useReducer???

useReducer более предпочтителен нежели useState когда у вас сложная логика, которая включает в себя несколько значений, или когда обновляемое состояние зависит от предыдущего. useReducer также позволяет оптимизировать компонент, так как вы можете передавать dispatch из вне вместо коллбэка.

---

## useReducer() вместе с useContext()

Используя вместе useContext и useReducer мы можем управлять глобальным состояние на любом уровне в дереве компонентов, давайте взглянем на пример 👇🏻.

```jsx
// main.jsx
import React from 'react'
import { useReducer } from 'react'
import ChildrenA from '../components/ChildrenA';

export const StateContext = React.createContext();
const initialState = 0;
const reducer = (state, action) => {
    switch (action) {
        case 'increment':
            return state + 1;
        case 'decrement':
            return state - 1;
        default:
            return state;
    }
}

export default function main() {
    const [count, dispatch] = useReducer(reducer, initialState);
    return (
        <div>
            <StateContext.Provider
                value={{ countState: count, countDispatch: dispatch }}>
                <ChildrenA />
            </StateContext.Provider>
        </div >
    )
}

// ChildrenA.jsx

import React from 'react'
import ChildrenB from './ChildrenB'
import { StateContext } from '../pages/main'
import { useContext } from 'react'

export default function ChildrenA() {
    const { countState, countDispatch } = useContext(StateContext)
    return (
        <div>
            У child A значение счетчика равно {countState}
            <ChildrenB />
        </div>
    )
}

// ChildrenB.jsx

import React from 'react'
import { StateContext } from '../pages/main'
import { useContext } from 'react'

export default function ChildrenB() {
    const { countState, countDispatch } = useContext(StateContext)
    return (
        <div>
            <p>Счетчик равен {countState}</p>
            <button onClick={() => countDispatch('increment')}>+</button>
            <button onClick={() => countDispatch('decrement')}>-</button>
        </div>
    )
}
```

Оба состояние буду изменены одновременно.

![](https://habrastorage.org/r/w1560/getpro/habr/upload_files/51a/526/17e/51a52617eb86a64fe05165e60127c527.png)

---

## useCallback()

Давайте посмотри на код и попытаемся понять поведение функций в React.

```jsx
import React from "react";

export default function main() {
  function Sum() {
    return (a, b) => a + b;
  }
  const func1 = Sum();
  const func2 = Sum();
  console.log(func1 === func2);

  return <div>main</div>;
}
```

Когда мы запустим код мы увидим “false” в логах.

![](https://habrastorage.org/r/w1560/getpro/habr/upload_files/098/c40/677/098c406777f436db527f5fa6b48b72bc.png)

Теперь, взглянув на пример, давайте попробуем понять, как мы можем использовать useCallback.

```jsx
// main.jsx
import React, { useState } from 'react'
import ChildrenA from '../components/ChildrenA';
import ChildrenB from '../components/ChildrenB';
import ChildrenC from '../components/ChildrenC';

const main = () => {
    const [state1, setState1] = useState(0);
    const [state2, setState2] = useState(0);

    const handleClickA = () => {
        setState1(state1 + 1);
    }

    const handleClickB = () => {
        setState2(state2 + 1);
    }

    return (
        <div className='flex flex-col justify-center items-center'>
            <ChildrenA value={state1} handleClick={handleClickA} />
            <ChildrenB value={state2} handleClick={handleClickB} />
            <ChildrenC />
        </div>
    )
}

// React.memo позволяет перерисовывать компонет только тогда,
// когда изменяются props
export default React.memo(main);

// ChildrenA.jsx
import React from 'react'

function ChildrenA({ value, handleClick }) {
    console.log('ChildrenA');
    return (
        <div>ChildrenA  {value}
            <button className='bg-gray-200 p-2 m-2' onClick={handleClick} >Click</button>
        </div>

    )
}

export default React.memo(ChildrenA);

// ChildrenB.jsx
import React from 'react'

function ChildrenB({ value, handleClick }) {
    console.log('ChildrenB');
    return (
        <div>ChildrenB {value}
            <button className='bg-gray-200 p-2 m-2' onClick={handleClick} >Click</button>
        </div>
    )
}

export default React.memo(ChildrenB);

// ChildrenC.jsx

import React from 'react'

function ChildrenC() {
    console.log('ChildrenC');
    return (
        <div>ChildrenC</div>
    )
}

export default React.memo(ChildrenC);
```

Когда вы посмотрите на console.log в браузере, вы увидите, что сразу происходит отрисовка всех трёх компонентов, но по нажатию на любую кнопку только 2 компонента перерисуются.

Примечание: здесь мы используем React.memo(), вот почему ChildrenC не перерисовывается, т.к. props не изменяются. Но почему же при изменении ChildrenA ChildrenB также перерисовывается?

Причина в том, что при перерисовке родительского компонента функция handleClick не таже самая. Я объяснял это в пункте выше, описывая как React определяет изменения в props. Вот почему перерисовываются сразу ChildrenA и ChildrenB.

![](https://habrastorage.org/r/w1560/getpro/habr/upload_files/fcd/2c3/96c/fcd2c396c1414b8c1054cc9a71bac4d6.png)

Для решения этой проблемы мы будем использовать useCallback.

useCallback возвращает memoized callback (мемоизированную функцию, функцию, которая измениться только тогда, когда один из пунктов внутри массива зависимостей изменится).  
useCallback принимает в себя функцию и массив зависимостей, также как и useEffect.

Давайте изменим наш родительский компонет, и посмотрим на логи.

```jsx
// main.jsx

import React, { useState, useCallback } from "react";
import ChildrenA from "../components/ChildrenA";
import ChildrenB from "../components/ChildrenB";
import ChildrenC from "../components/ChildrenC";

const main = () => {
  const [state1, setState1] = useState(0);
  const [state2, setState2] = useState(0);

  const handleClickA = useCallback(() => {
    setState1(state1 + 1);
  }, [state1]);

  const handleClickB = useCallback(() => {
    setState2(state2 + 1);
  }, [state2]);

  return (
    <div className="flex flex-col justify-center items-center">
      <ChildrenA value={state1} handleClick={handleClickA} />
      <ChildrenB value={state2} handleClick={handleClickB} />
      <ChildrenC />
    </div>
  );
};

export default React.memo(main);
```

Теперь вы можете убедиться, что “все в шоколаде” 👇🏻.

![](https://habrastorage.org/r/w1560/getpro/habr/upload_files/e0f/db5/367/e0fdb536798804b8e0e3fb1436407107.png)

---

## useMemo()

useCallback возвращает мемоизированную функцию, наравне с этим useMemo возвращает мемоизированное значение. Для примера, нам нужно найти факториал, и пересчитывать значение только тогда, когда значение изменится, а не при каждой перерисовке компонента, чтож давайте попробуем использовать useMemo.

```jsx
import React, { useState, useMemo } from "react";

function factorialOf(n) {
  console.log("factorialOf(n) called!");
  return n <= 0 ? 1 : n * factorialOf(n - 1);
}

const main = () => {
  const [number, setNumber] = useState(2);
  const factorial = useMemo(() => factorialOf(number), [number]);
  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col justify-center items-center">
      {factorial}
      <button
        className="bg-gray-200 p-2 m-2"
        onClick={() => setNumber(number + 1)}
      >
        +
      </button>
      {count}{" "}
      <button
        className="bg-gray-200 p-2 m-2"
        onClick={() => setCount(count + 1)}
      >
        +
      </button>
    </div>
  );
};

export default main;
```

![](https://habrastorage.org/r/w1560/getpro/habr/upload_files/7c4/f69/770/7c4f697702c97a5209f8b142b6fafd31.png)

---

## useRef()

Давайте выведем useRef в консоль, и посмотрим, что он возвращает.

```jsx
console.log(useRef(100));
// выведится что-то типа 👉🏻 {current: 100}
```

useRef возвращает изменяемый ref объект, в котором значение “current” устанавливается переданным аргументом при инициализации (initialValue). Возвращенный объект будет сохранен на протяжении всей жизни компонента.

Когда вы сравнивает обычный объект с самим собой в useEffect, то после перерисовки они не совпадают, и это запускает срабатывание useEffect, с useRef такого не происходит, вы можете убедиться это на примере ниже 👇🏻.

```jsx
import { useEffect, useState, useRef } from "react";

const component = () => {
  const obj1 = { hi: 100 };
  const obj2 = useRef({ hi: 100 });
  console.log(obj1 === obj2.current);

  const [state, setState] = useState(() => {
    return 1;
  });

  useEffect(() => {
    console.log("obj1 changed | ", obj1);
  }, [obj1]);

  useEffect(() => {
    console.log("obj2 changed | ", obj2.current);
  }, [obj2]);

  return (
    <div
      onClick={() => {
        setState((value) => {
          return value + 1;
        });
      }}
      className="w-screen h-screen flex justify-center items-center text-4xl font-extralight"
    >
      {state}
    </div>
  );
};

export default component;
```

![](https://habrastorage.org/r/w1560/getpro/habr/upload_files/0f0/aea/bd9/0f0aeabd9dc5c7d884c7c363b85719a6.png)

---
