---
uid: hHTan3Lcto9BANqedDNfz
title: Что такое хук useFormStatus() ?
tags:
  - React
  - Hooks
  - useFormStatus
  - React19
info:
  - "https://react.dev/reference/react-dom/hooks/useFormStatus"
  - >-
    https://dev.to/logrocket/understanding-reacts-useformstate-and-useformstatus-hooks-2oh1
draft: false
technology: ReactCore
specialty: Frontend
tools: []
order: 93
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

В дизайн-системах часто требуется писать компоненты дизайна, которым нужен доступ к информации о `<form>`, в котором они находятся, без прокидывания пропсов вниз по дереву компонентов. Это можно сделать через Context, но чтобы упростить общий случай, мы добавили новый хук `useFormStatus`:

```javascript
import { useFormStatus } from "react-dom";

function DesignButton() {
  const { pending } = useFormStatus();
  return <button type="submit" disabled={pending} />;
}
```

`useFormStatus` считывает статус родительской `<form>`, как если бы форма была провайдером Context.

---

[[004 ReactCore|Назад]]
