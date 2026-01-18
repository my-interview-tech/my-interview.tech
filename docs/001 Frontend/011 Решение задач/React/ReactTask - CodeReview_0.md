---
uid: CD-aEj6hKr8IYUvj0rtL4
title: ReactTask - CodeReview_0
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
// ПОЧЕМУ ЭТОТ КОД НЕ ПРОШЕЛ КОД РЕВЬЮ?

const heavyFunc = (props) => {
  return Math.floor(Math.random() * props.count);
};

const LazyInit = (props) => {
  const [count, setCount] = useState(heavyFunc(props));
  return (
    <>
      {count}
      <button onClick={() => setCount((prevProps) => --prevProps)}>
        Decrement
      </button>
    </>
  );
};
```

\*\*Ответ

```jsx

```

---

[[011 Решение задач JS, TS и React|Назад]]
