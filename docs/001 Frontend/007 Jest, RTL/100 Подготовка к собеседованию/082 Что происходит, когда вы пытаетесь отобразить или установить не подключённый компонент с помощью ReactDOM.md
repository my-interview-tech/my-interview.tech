---
uid: o5Z8tX1nSrCN34lYJclgh
title: >-
  Что происходит, когда вы пытаетесь отобразить или установить не подключённый
  компонент с помощью ReactDOM?
tags:
  - testing
  - Jest
  - ReactDOM
  - react-testing-library
draft: false
technology: "Jest, RTL"
specialty: Frontend
tools: []
order: 82
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

Когда вы пытаетесь отобразить или установить компонент, который не подключен к DOM, с помощью `ReactDOM`, вы можете столкнуться с несколькими проблемами. Давайте рассмотрим, что происходит в таких случаях.

1. **Отображение компонента с помощью `ReactDOM.render`**:

Метод `ReactDOM.render` используется для рендеринга React-компонента в DOM. Если вы пытаетесь отобразить компонент в элемент, который не существует в DOM, вы получите ошибку.

```javascript
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

// Элемент с id="root" не существует в DOM
ReactDOM.render(<App />, document.getElementById("root"));
```

Что происходит:

- Если элемент с `id="root"` не существует в DOM, `document.getElementById('root')` вернет `null`.
- `ReactDOM.render` попытается отобразить компонент в `null`, что приведет к ошибке:

```
Uncaught TypeError: Cannot read properties of null (reading 'appendChild')
```

2. **Установка компонента с помощью `ReactDOM.hydrate`**:

Метод `ReactDOM.hydrate` используется для гидратации серверного рендеринга. Если вы пытаетесь использовать `ReactDOM.hydrate` с элементом, который не существует в DOM, вы также получите ошибку.

```javascript

Copy code

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// Элемент с id="root" не существует в DOM
ReactDOM.hydrate(<App />, document.getElementById('root'));
```

Что происходит:

- Если элемент с `id="root"` не существует в DOM, `document.getElementById('root')` вернет `null`.
- `ReactDOM.hydrate` попытается гидрировать компонент в `null`, что приведет к ошибке:

```Copy code
Uncaught TypeError: Cannot read properties of null (reading 'firstChild')
```

3. **Отображение компонента в существующий элемент**:

Если вы хотите отобразить компонент в существующий элемент, убедитесь, что элемент уже присутствует в DOM.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>React App</title>
  </head>
  <body>
    <div id="root"></div>
    <script src="app.js"></script>
  </body>
</html>
```

```javascript
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

// Элемент с id="root" существует в DOM
ReactDOM.render(<App />, document.getElementById("root"));
```

Что происходит:

- Элемент с `id="root"` существует в DOM, поэтому `document.getElementById('root')` вернет этот элемент.
- `ReactDOM.render` успешно отобразит компонент в этот элемент.

  4. **Использование `createRoot` в React 18**:

В React 18 появился новый API для рендеринга компонентов, который использует `createRoot`. Этот API также требует, чтобы элемент, в который вы хотите отобразить компонент, существовал в DOM.

```javascript
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

// Элемент с id="root" существует в DOM
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(<App />);
```

Что происходит:

- Если элемент с `id="root"` не существует в DOM, `document.getElementById('root')` вернет `null`.
- `createRoot` попытается создать корневой элемент для `null`, что приведет к ошибке:

```Copy code
Uncaught TypeError: Cannot read properties of null (reading 'nodeType')
```

---

[[007 Jest, RTL|Назад]]
