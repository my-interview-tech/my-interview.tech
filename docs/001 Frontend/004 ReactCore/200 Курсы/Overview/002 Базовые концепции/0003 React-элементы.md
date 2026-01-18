---
uid: gQkaaWq-2V0A9Wqd4tbxu
title: React-элементы
tags:
  - "#React"
  - "#React-элемент"
draft: false
technology: ReactCore
specialty: Frontend
tools: []
order: 3
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

Подключение библиотек React:

```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
```

#VirtualDOM - то, почему React работает так быстро.

#ReactDOMRender () превращает React элементы в обычные браузерные #DOM элементы и рендерит их на странице.

```jsx
import React from "react";
```

Если удалить эту строку кода, то наше #React приложение не отобразится.

**Failed to compile
'React' must be in scope when using JSX**

Перед тем, как наш код дойдет до браузера #babel должен преобразовать его в эквивалентный JS код.

---
