---
uid: hAP2dtKxDybdQDb_D9ArS
title: Что попадает в блок catch?
tags:
  - "#JavaScript"
  - "#try-catch"
  - "#catch"
info: []
draft: false
technology: JSCore
specialty: Frontend
tools: []
order: 188
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

Когда возникает ошибка, JavaScript генерирует объект, содержащий её детали.

Затем этот объект передаётся как аргумент в блок `catch`:

```javascript
try {   // ...
} catch(err) { // <-- объект ошибки, можно использовать другое название вместо err   // ... }`
```

Для всех встроенных ошибок этот объект имеет два основных свойства:
`name` Имя ошибки. Например, для неопределённой переменной это `"ReferenceError"`.
`message` Текстовое сообщение о деталях ошибки.

---

[[003 JSCore|Назад]]
