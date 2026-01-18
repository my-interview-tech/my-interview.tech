---
uid: mVoJfWHuL2drhaVRPSEjt
title: Как вы обрабатываете роутинг на стороне клиента в приложении React?
tags:
  - "#React"
  - "#react-router-dom"
  - BrowserRouter
  - Route
info:
  - "https://reactdev.ru/libs/react-router/#_5"
draft: false
technology: ReactCore
specialty: Frontend
tools: []
order: 98
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

Существует несколько способов обработки маршрутизации на стороне клиента в приложении React. Одним из популярных способов является использование библиотеки `react-router-dom`, которая предоставляет компонент `<Router>` для обработки маршрутизации и набор компонентов `<Route>` для определения маршрутов в вашем приложении.

Вот пример того, как вы можете использовать `react-router-dom` для обработки маршрутизации на стороне клиента в приложении React:

1. Установите библиотеку react-router-dom.

```bash
npm install react-router-dom
```

2. Импортируйте компоненты `<Router>` и `<Route>` из `react-router-dom`.

```javascript
import { BrowserRouter as Router, Route } from "react-router-dom";
```

3. Оберните свое приложение компонентом `<Router>`.

```javascript
<Router>
  <App />
</Router>
```

4. Определите маршруты с помощью компонента `<Route>`.
   Компонент `<Route>` принимает проп `path`, указывающее путь для маршрута, и проп `component`, указывающий компонент для отображения при совпадении маршрута.

```javascript
<Route exact path="/" component={Home} />
<Route path="/about" component={About} />
<Route path="/users/:id" component={User} />

:id может быть любой строкой , которая идёт после /users /
Если не установить exact , то путь /users будет срабатывать всегда , когда срабатывает /users/:id
```

Компонент `<Route>` будет отображать указанный компонент, когда текущий URL-адрес соответствует пути маршрута. Вы можете использовать проп `exact`, чтобы указать, что маршрут должен сопоставляться только тогда, когда путь точно совпадает с текущим URL-адресом. Вы также можете использовать компонент `<Link>` из `react-router-dom` для создания ссылок, которые перемещаются между маршрутами в вашем приложении.

```javascript
import { Link } from 'react-router-dom';
...
<Link to="/about">About</Link>
```

---

[[004 ReactCore|Назад]]
