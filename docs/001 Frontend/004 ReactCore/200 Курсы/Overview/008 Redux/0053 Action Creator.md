---
uid: UGofL7xFnr2402lvJoJlx
title: Action Creator
tags:
  - React
  - "#Redux"
  - "#action"
draft: false
technology: ReactCore
specialty: Frontend
tools: []
order: 53
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

`Actiom Creator` - функция, которая создаёт объекты `action` .

Упрощает код:

```jsx
const userLoggedIn = (name, role) => {
  return { type: "USER_LOGGED_IN", name, role };
};

store.dispatch(userLoggedIn("Arnold", "admin"));
```

---
