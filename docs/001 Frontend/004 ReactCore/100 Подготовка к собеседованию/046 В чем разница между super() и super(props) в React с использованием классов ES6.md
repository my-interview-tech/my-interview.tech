---
uid: 57ipJ7zTwLhgafwtp19ix
title: >-
  В чем разница между super() и super(props) в React с использованием классов
  ES6?
tags:
  - "#React"
  - "#constructor"
  - "#super"
  - "#props"
info: []
draft: false
technology: ReactCore
specialty: Frontend
tools: []
order: 46
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

Если вы хотите получить доступ к `this.props` в `constructor()`, тогда вы должны передать props методу `super()`.

**Использование  `super(props)`:**

```js
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props); // { name: 'John', ... }
  }
}
```

**Использование `super()`:**

```js
class MyComponent extends React.Component {
  constructor(props) {
    super();
    console.log(this.props); // undefined
  }
}
```

Вне `constructor()` оба будут отображать одинаковое значение для `this.props`.

---

[[004 ReactCore|Назад]]
