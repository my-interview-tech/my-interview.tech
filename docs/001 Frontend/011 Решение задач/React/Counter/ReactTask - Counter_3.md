---
title: Counter_3
draft: false
tags:
  - "#React"
  - "#reactTask"
  - "#unknownINC"
---
```js
// Что произойдет при клике на кнопку?

export default function Counter() {
  let count = 0;

  const changeCount = () => {
    count += 1;
  };
  
  return (
    <div>
      <h1> Counter</h1>
      <div>{count}</div>
      <button onClick={changeCount}>Change count</button>
    </div>
  );
}
```

___

[[011 Решение задач JS, TS и React|Назад]]