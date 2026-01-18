---
uid: jgk3M5CmL2t5xLLSxIkwr
title: Какие типы данных может возвращать `render`?
tags:
  - "#React"
  - "#render"
  - "#JSX"
  - "#portals"
info:
  - >-
    https://reactdev.ru/archive/react16/render-props/#be-careful-when-using-render-props-with-reactpurecomponent
  - "https://ru.reactjs.org/docs/render-props.html"
draft: false
technology: ReactCore
specialty: Frontend
tools: []
order: 19
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

![[Pasted image 20230704173902.png|600]]

Метод `render()` возвращает JSX-элементы, которые представляют собой виртуальное представление компонента. JSX может быть представлен различными типами данных, такими как:

1. _Элементы_
2. \*Строки и числа
3. _Массивы_
4. _`null` и `false`_
5. \*Порталы (`Portals`)
6. _`React.Fragment`_

##### `Render Props`

_`Render Props` — это функция, которая сообщает компоненту что необходимо рендерить._

```jsx
<DataProvider render={(data) => <h1>Привет, {data.target}</h1>} />
```

Важно запомнить, что из названия паттерна «рендер-проп» вовсе не следует, что для его использования *вы должны обязательно называть проп `render`*. На самом деле, *любой* проп, который используется компонентом и является функцией рендеринга, технически является и «рендер-пропом».

---

[[004 ReactCore|Назад]]
