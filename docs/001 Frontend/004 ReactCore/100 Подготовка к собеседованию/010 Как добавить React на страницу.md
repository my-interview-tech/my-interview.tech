---
uid: TYKfLROh-Q-6XT8FOsIcy
title: Как добавить React на страницу?
tags:
  - "#React"
  - "#create-react-app"
  - "#script"
  - "#eject"
  - "#npm"
  - "#package-json"
info:
  - "https://habr.com/ru/companies/plarium/articles/326520"
draft: false
technology: ReactCore
specialty: Frontend
tools: []
order: 10
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

Выбор метода зависит от потребностей. Если вы просто хотите добавить немного интерактивности на существующую страницу или хотите просто попробовать React тогда используйте первый метод подключения. Если вы собираетесь построить полноценное React приложение, то используйте `create-react-app`.

\*\*`create-react-app`

1. Для того, чтобы работать в React необходимо применить скрипт:

```jsx
npx create-react-app my-app
```

И подготовить директорию к работе, удалив шаблонные файлы проекта.

2. Привязываем терминал к проекту

```jsx
cd my-app
```

3. Удаляем лишние файлы и подготавливаем наш шаблон к работе

4. Импортируем библиотеку React

```jsx
import React, { Component } from "react";
```

5. Импортируем библиотеку react-dom

```jsx
import { createRoot } from "react-dom/client";

const root = createRoot(document.getElementById("root"));
```

`createRoot` - корневой DOM-узел, т.к. через него мы управляем React содержимым.

\*\*`<script/>`

**Шаг 1** Добавьте 3 тега в контейнер head на вашей странице:

```html
<script src="https://unpkg.com/react@16/umd/react.development.js"></script>
<script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
<script src="https://unpkg.com/babel-standalone@6.15.0/babel.min.js"></script>
```

Здесь подключаются библиотеки React и React-dom, а также компилятор babel.

> Babel не является обязательным для использования React, но полезным для написания кода UI, с помощью JSX.

**Шаг 2** Добавьте пустой контейнер на вашу страницу чтобы отметить место, где вы хотите что-либо отобразить с помощью React.

**Шаг 3** Теперь вы можете использовать React вместе с JSX в любом теге script, добавив к нему атрибут type=«text/babel».

Пример:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>My first React app</title>
    <script
      src="https://unpkg.com/react@16/umd/react.development.js"
      crossorigin
    ></script>
    <script
      src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"
      crossorigin
    ></script>
    <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
  </head>
  <body>
    <div id="root"></div>

    <script type="text/babel">
      ReactDOM.render(<h1>Hello world</h1>, document.querySelector("#root"));
    </script>
  </body>
</html>
```

\*\*Что делает `npm run eject`?

Если вы опытный пользователь и вас не устраивает стандартная конфигурация, можете сделать `eject`. В таком случае `create-react-app` используется как генератор шаблонного кода.

Команда `npm run eject` копирует все конфиги и транзитивные зависимости (Webpack, Babel, ESLint и т. д.) в ваш проект, чтобы вы могли их контролировать. Команды вроде `npm start` и `npm run build` не перестанут работать, но будут указывать на скопированные скрипты, чтобы их можно было модифицировать. После этого вы сами по себе.

**Почему я хочу не делать eject?**

Во-первых, потому что эту операцию нельзя отменить. Но дело не только в этом. Вот еще несколько причин.

- Я хочу получать обновления Create React App
- Не люблю, когда в package.json много зависимостей
- Лишние конфиги и лишний код. После `eject` создаются директории [scripts](https://github.com/facebookincubator/create-react-app/tree/master/packages/react-scripts/scripts) и [config](https://github.com/facebookincubator/create-react-app/tree/master/packages/react-scripts/config). А с ними — около десяти новых файлов по 50–200 строчек кода в каждом. Причем в большинстве случаев eject делают, чтобы поменять всего около пяти строк кода (добавить один новый Webpack Loader).

---

[[004 ReactCore|Назад]]
