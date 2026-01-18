---
uid: gPQ69G8FgB24EWcBu0oyi
title: ReactTask - Timer 3_1
tags:
  - "#React"
  - "#reactTask"
  - "#Hooks"
  - "#БКС"
draft: false
technology: Решение задач
specialty: Frontend
tools: []
order: 0
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

```
// найти где происходит утечка данных и как это исправить
```

```jsx
import React, { useEffect, useState } from "react";

const useDatetime = () => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    setInterval(() => setNow(new Date()), 1000);
  }, []);

  return now.toLocaleString();
};

const Timer = () => {
  const currentDatetime = useDatetime();

  return <div>{currentDatetime}</div>;
};

const App = () => {
  const [shownDatetime, setShownDatetime] = useState(true);

  return (
    <div>
      <button onClick={() => setShownDatetime(!shownDatetime)}>
        {shownDatetime ? "Hide" : "Show"}
      </button>
      <hr />
      {shownDatetime && <Timer />}
    </div>
  );
};

export default App;
```

---

[[011 Решение задач JS, TS и React|Назад]]
