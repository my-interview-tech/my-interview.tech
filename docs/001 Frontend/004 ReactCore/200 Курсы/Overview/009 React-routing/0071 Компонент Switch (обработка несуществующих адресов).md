---
uid: xnnVFn9JwGq-tKyaVOp-m
title: Компонент Switch (обработка несуществующих адресов)
tags:
  - "#React"
  - "#React-router"
draft: false
technology: ReactCore
specialty: Frontend
tools: []
order: 71
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

Компоненты `Switch` оборачивает другие компоненты (`Route` и `Redirect`)

```jsx
<Switch>
	<Route path="/books" ... />
	<Route path="/blog" ... />
</Switch>
```

Switch отрисует только первый элемент, который соответствует адресу
Route без свойства path срабатывает всегда .

---
