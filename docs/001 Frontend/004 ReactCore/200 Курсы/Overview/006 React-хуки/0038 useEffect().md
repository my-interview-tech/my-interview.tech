---
uid: cpEzGAAGT0zquf3IbXbYi
title: useEffect()
tags:
  - "#React"
  - "#Hooks"
  - "#useEffect"
draft: false
technology: ReactCore
specialty: Frontend
tools: []
order: 38
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

Запускает функцию каждый раз , когда определенный набор данных изменяется .

```jsx
useEffect(() => {
  console.log(a + b + c);
  return () => console.log("cleanup");
}, [a, b, c]);
```

Если вернуть функцию , она будет вызываться для очистки предыдущего эффекта (похоже на componentWillUnmount())

---
