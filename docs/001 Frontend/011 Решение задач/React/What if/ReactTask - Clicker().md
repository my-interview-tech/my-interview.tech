---
title: Clicker()
draft: false
tags:
  - "#React"
  - "#reactTask"
  - "#unknownINC"
---
```jsx
// Что будет в {clicks}, если в течение двух секунд 5 раз нажать на кнопку ‘increment’ ?

function Clicker() {
  const [clicks, setClicks] = useState(0);

  const onClick = () => {
    setTimeout(() => {
      setClicks(clicks + 1); 
    }, 2000);
  };

  return (
    <>
      {clicks}
      <button onClick={onClick}>
         increment
      </button>
    </>
  );
};
```

___

[[011 Решение задач JS, TS и React|Назад]]