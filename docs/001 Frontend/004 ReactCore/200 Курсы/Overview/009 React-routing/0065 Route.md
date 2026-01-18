---
uid: mcZ12T7lA4RJ6FIbv0z_k
title: Route
tags:
  - "#React"
  - "#React-router"
  - "#route"
draft: false
technology: ReactCore
specialty: Frontend
tools: []
order: 65
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

В Route можно передать render функцию

```jsx
<Route path="/hi" render={() => <p>Hi</p>} />
```

`Route` работает как фильтр - сравнивая `path` с текущим адресом он решает отрисовать содержимое или нет.

Параметр `exact` говорит, что нужно использовать точное совпадение (а не "path является частью адреса" )

```jsx
<Route
	path="/"
	render={() => <h2> Welcome to ...</h2>}}
	exact
/>
```

---
