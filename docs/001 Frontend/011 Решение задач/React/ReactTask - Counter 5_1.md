---
uid: KrQd4Xgde8kBYg3phkDMw
title: ReactTask - Counter 5_1
tags:
  - "#React"
  - "#reactTask"
  - "#unknownINC"
draft: false
technology: Решение задач
specialty: Frontend
tools: []
order: 0
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

```jsx
// при нажатие 2 раза значение 1 , как починить
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
      <button onClick={onClick}>Increment</button>
    </>
  );
}
```

---

[[011 Решение задач JS, TS и React|Назад]]
