---
uid: IlxAdeIORrgtvHuPHUbSk
title: Основы React-routing
tags:
  - "#React"
  - "#React-router"
info:
  - "https://v5.reactrouter.com/web/guides/quick-start"
draft: false
technology: ReactCore
specialty: Frontend
tools: []
order: 63
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

![React Router 6 - базовый роутинг React-приложения](https://www.youtube.com/watch?v=0auS9DNTmzE&list=PLiZoB8JBsdznY1XwBcBhHL9L7S_shPGVE)

```bash
npm i --save react-router-dom
```

Пример #React-routing для приложения :

```jsx
import { browserRouter as Router, Route } from "react-router-dom";

<Router>
  <Route path="/blog" component={blog} />
  <Route path="/about" component={about} />
  <Route path="/shop" component={shop} />
</Router>;
```

_React Router_ - это не часть React .
Есть и другие библиотеки для роутинга ( к примеру , UI-Router)

---
