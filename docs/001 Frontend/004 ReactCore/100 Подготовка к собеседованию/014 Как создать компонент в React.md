---
uid: _ebdtTNIU92TYssIiorSf
title: Как создать компонент в React?
tags:
  - "#React"
  - "#component"
info: null
draft: false
technology: ReactCore
specialty: Frontend
tools: []
order: 14
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

В React _компоненты могут быть созданы с помощью функций или классов._ Вот примеры обоих подходов:

1. Функциональный компонент:

```jsx
import React from "react";

function MyComponent(props) {
  return (
    <div>
      <h1>{props.title}</h1>
      <p>{props.text}</p>
    </div>
  );
}

export default MyComponent;
```

В этом примере мы определяем компонент `MyComponent` с помощью функции, которая принимает объект `props` в качестве аргумента и возвращает JSX-разметку. Мы экспортируем этот компонент с помощью `export default`, чтобы он мог быть использован в других частях приложения.

2. Классовый компонент:

```jsx
import React, { Component } from "react";

class MyComponent extends Component {
  render() {
    return (
      <div>
        <h1>{this.props.title}</h1>
        <p>{this.props.text}</p>
      </div>
    );
  }
}

export default MyComponent;
```

В этом примере мы определяем компонент `MyComponent` с помощью класса, который расширяет базовый класс `Component` из библиотеки React. Мы определяем метод `render()`, который возвращает JSX-разметку для нашего компонента. Мы также используем `this.props` для доступа к свойствам компонента, которые передаются через объект `props`. Мы экспортируем этот компонент с помощью `export default`, чтобы он мог быть использован в других частях приложения.

---

[[004 ReactCore|Назад]]
