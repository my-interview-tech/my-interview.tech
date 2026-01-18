---
uid: B195t2bLFaoWnIOTCYz0r
title: ReactTask - Counter 3_1
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

---

[[011 Решение задач JS, TS и React|Назад]]
