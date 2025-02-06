---
title: Counter_5
draft: false
tags:
  - "#React"
  - "#reactTask"
  - "#unknownINC"
---
```jsx
// при нажатие 2 раза значение 1 , как починить 
function Clicker() {
  const [clicks, setClicks] = useState(0);

  const onClick = () => {
    setTimeout(() => {
      setClicks(clicks + 1);
    }, 2000)
  };
return (
  <>
    {clicks}
    <button onClick={onClick}>
      Increment
    </button>
  </>
)
}
```

___

[[011 Решение задач JS, TS и React|Назад]]