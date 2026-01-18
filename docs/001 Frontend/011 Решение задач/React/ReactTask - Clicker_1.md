---
uid: cxEcAaHNRCi5jjoXdZ7Pe
title: ReactTask - Clicker_1
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
      <button onClick={onClick}>increment</button>
    </>
  );
}
```

\*\*Ответ

```jsx

```

---

[[011 Решение задач JS, TS и React|Назад]]
