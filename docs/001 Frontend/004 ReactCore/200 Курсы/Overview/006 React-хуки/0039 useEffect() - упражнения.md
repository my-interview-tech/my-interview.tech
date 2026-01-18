---
uid: dqdk70I3sa4dEKz-BMHQ6
title: useEffect() - упражнения
tags:
  - "#React"
  - "#Hooks"
  - "#useEffect"
draft: false
technology: ReactCore
specialty: Frontend
tools: []
order: 39
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

```jsx
useEffect(() => console.log("mount"), []);
useEffect(() => console.log("update"));
useEffect(() => () => console.log("unmount"), []);

// effect + cleanup ( mount + unmount )
useEffect(() => {
  const timeout = setTimeout(setVisible, 10, false);
  return () => clearTimeout(timeout);
}, []);
```

---
