---
uid: tEnTRLNKmXbIThEZs8wtY
title: Что такое React-миксины?
tags:
  - "#React"
  - "#mixins"
  - "#HOC"
info:
  - "https://dev.to/fosteman/mixins-1b0a"
  - "https://qna.habr.com/q/557846"
draft: false
technology: ReactCore
specialty: Frontend
tools: []
order: 116
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

_"Миксины" (Mixins)_ - это способ полностью разделить компоненты, чтобы иметь общую функциональность. "Миксины" **не должны использоваться** и могут быть заменены на _"компоненты высшего порядка" (higher-order components) или "декораторы" (decorators)._

Один из наиболее распространенных "миксинов" - это `PureRenderMixin`. Вы можете использовать его в некоторых компонентах, чтобы предотвратить ненужные повторные рендеринги, когда свойства и состояние поверхностно равны предыдущим свойствам и состоянию.

```js
const PureRenderMixin = require("react-addons-pure-render-mixin");

const Button = React.createClass({
  mixins: [PureRenderMixin],
  // ...
});
```

---

[[004 ReactCore|Назад]]
