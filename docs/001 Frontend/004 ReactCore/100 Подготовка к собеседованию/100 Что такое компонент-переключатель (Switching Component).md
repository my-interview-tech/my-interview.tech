---
uid: hAQwtTScUPZNKTQP0NbWN
title: Что такое компонент-переключатель (Switching Component)?
tags:
  - "#React"
  - "#switchingComponent"
  - "#React-router"
  - BrowserRouter
  - Switch
  - Route
info: []
draft: false
technology: ReactCore
specialty: Frontend
tools: []
order: 100
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

_Компонент-переключатель (Switching Component)_ - это компонент, который используется для отображения только одного дочернего компонента из нескольких, в зависимости от определенных условий.

_Компонент-переключатель обычно используется вместе с библиотекой `React Router` для управления навигацией между страницами и компонентами._ Он оборачивает множество компонентов Route и гарантирует, что только один из них будет отображен на странице в зависимости от текущего маршрута.

Пример использования компонента-переключателя в React с помощью `React Router`:

```jsx
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import Contact from "./Contact";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/contact">
            <Contact />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
```

В этом примере компонент-переключатель Switch оборачивает множество компонентов Route, которые определяют, какой компонент должен быть отображен на странице в зависимости от текущего маршрута. Компонент Route с атрибутом exact используется для определения домашней страницы, а компоненты Route с путями /about и /contact используются для определения страниц About и Contact.

---

[[004 ReactCore|Назад]]
