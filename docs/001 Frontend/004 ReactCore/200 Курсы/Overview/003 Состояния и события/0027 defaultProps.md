---
uid: sXuMRI05mobs0gYgJDulY
title: defaultProps
tags:
  - "#React"
  - "#defaultProps"
draft: false
technology: ReactCore
specialty: Frontend
tools: []
order: 27
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

`defaultProps` позволяет писать меньше кода для установления значения по-умолчанию для свойств. Например:

```jsx
const Comp = ({ name }) => <p> {name} </p>;

Comp.defaultProps = {
  name: "Bob",
};
```

---
