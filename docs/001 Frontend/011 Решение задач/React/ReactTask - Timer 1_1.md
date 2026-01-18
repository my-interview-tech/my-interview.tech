---
uid: lj_zAs5DDObhbm_fzraqe
title: ReactTask - Timer 1_1
tags:
  - "#React"
  - "#reactTask"
  - "#SignalINC"
draft: false
technology: Решение задач
specialty: Frontend
tools: []
order: 0
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

[Условие:](https://codesandbox.io/s/new-test-tasks-part-1-forked-yll7c3?file=/src/2_test-timer-component.tsx) **Реализуйте таймер**

```jsx
import { useEffect, useState } from "react";

const Timer = () => {
  const [seconds, setSeconds] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const getTime = () => {
    if (loaded) {
      setSeconds((seconds) => seconds + 1);
    }
  };

  const resetTime = () => {
    setLoaded(false);
    setSeconds(0);
  };

  const toggleTime = () => {
    setLoaded((prevLoaded) => !prevLoaded);
  };

  useEffect(() => {
    const interval = setInterval(() => getTime(), 1000);
    return () => clearInterval(interval);
  }, [loaded]);

  return (
    <div>
      <h2>seconds: {seconds}</h2>
      <button onClick={toggleTime}>Toggle</button>
      <button onClick={resetTime}>Reset</button>
    </div>
  );
};

export default Timer;
```

---

[[011 Решение задач JS, TS и React|Назад]]
