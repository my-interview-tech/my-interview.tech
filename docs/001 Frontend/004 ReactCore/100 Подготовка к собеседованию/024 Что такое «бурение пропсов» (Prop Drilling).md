---
uid: T_5LyBqvda4CeG8Rxdt3Q
title: Что такое «бурение пропсов» (Prop Drilling)?
tags:
  - "#React"
  - "#props"
  - "#propsDrilling"
  - "#Context"
info: null
draft: false
technology: ReactCore
specialty: Frontend
tools: []
order: 24
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

_"Бурение пропсов" (Prop Drilling)_ - это ситуация, когда компоненты передают свойства `props` через несколько уровней вложенности, чтобы достичь глубоко вложенных компонентов. Это может привести к необходимости передавать одни и те же свойства через несколько компонентов в длинной цепочке вложенности, что усложняет понимание кода и ухудшает его читаемость.

Пример:

```jsx
function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Header count={count} />
      <Content count={count} setCount={setCount} />
    </div>
  );
}

// Props drilling
function Header(props) {
  return <h1>Count: {props.count}</h1>;
}

// Props drilling
function Content(props) {
  return (
    <div>
      <Counter count={props.count} setCount={props.setCount} />
    </div>
  );
}

// Props drilling (Level three)
function Counter(props) {
  const handleClick = () => {
    props.setCount(props.count + 1);
  };

  return (
    <div>
      <p>Current count: {props.count}</p>
      <button onClick={handleClick}>Increment</button>
    </div>
  );
}
```

В этом примере компонент `App` передает свойство `count` и функцию `setCount` через компонент `Content` до компонента `Counter`. Это приводит к "бурению пропсов", так как свойства передаются через несколько уровней вложенности.

Для решения этой проблемы можно использовать более продвинутые методы передачи данных между компонентами, такие как `Context API` или `Redux`. Эти методы позволяют передавать данные и функции между компонентами без необходимости передавать их через несколько уровней вложенности.

---

[[004 ReactCore|Назад]]
