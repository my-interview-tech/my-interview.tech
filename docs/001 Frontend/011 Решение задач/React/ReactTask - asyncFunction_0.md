---
uid: OJaTQ9__3D1agW11X1xxH
title: ReactTask - asyncFunction_0
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
// ЧТО НЕ ТАК С КОДОМ !?

const asyncFunction = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Math.random() * 10);
    }, 1000);
  });
};

const AsyncUpdate = () => {
  const [count, setCount] = useState(0);
  const [asyncCount, setAsyncCount] = useState(0);

  useEffect(async () => {
    const res = await asyncFunction();
    setAsyncCount(res);
  }, [count]);

  return (
    <div>
      sync count: {count}
      async count: {asyncCount}
      <br />
      <button onClick={() => setCount((prevProps) => ++prevProps)}>
        increment
      </button>
    </div>
  );
};
```

---

[[011 Решение задач JS, TS и React|Назад]]
