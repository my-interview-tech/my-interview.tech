---
title: Counter_4
draft: false
tags:
  - "#React"
  - "#reactTask"
  - "#unknownINC"
---
```jsx
//Какие значение мы увидими в UI и сколько будет рендеров

function Counter() {
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(false);

  const changeCount = () => {
    setCount(count + 1);
    setVisible(true);
  };
 
  return (
    <div>
      <h1>Counter</h1>
      <div>{count}</div>
      <div>{visible}</div>
      <button onClick={changeCount}>Change</button>
    </div>
  );
}
```

___

[[011 Решение задач JS, TS и React|Назад]]