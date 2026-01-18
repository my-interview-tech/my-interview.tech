---
uid: mBOdfIFheTGP1c6Zpgidx
title: >-
  Можете ли вы принудительно выполнить повторный рендеринг компонента без вызова
  setState?
tags:
  - "#React"
  - "#render"
  - "#props"
  - "#state"
  - "#forceUpdate"
info: []
draft: false
technology: ReactCore
specialty: Frontend
tools: []
order: 37
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

По умолчанию, когда состояние вашего компонента или реквизиты изменяются, ваш компонент будет повторно отрисован. Если ваш метод `render()` зависит от каких-либо других данных, вы можете сообщить React, что компонент нуждается в повторном рендеринге, вызвав `forceUpdate()`.

```js
component.forceUpdate(callback);
```

Рекомендуется избегать любого использования `forceUpdate()` и читать только из `this.props` и `this.state` в `render()`.

---

[[004 ReactCore|Назад]]
