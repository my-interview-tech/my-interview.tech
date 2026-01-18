---
uid: OgeJR2hl_CKXdC_qCYK7D
title: ReactTask - Counter 4_1
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

---

[[011 Решение задач JS, TS и React|Назад]]
