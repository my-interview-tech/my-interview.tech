---
uid: jiEKSZ1UgbKdHhQFlxY1d
title: Как работает Fetch API?
tags:
  - "#React"
  - "#fetch"
draft: false
technology: ReactCore
specialty: Frontend
tools: []
order: 33
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

Вызывается fetch ('URL') , URL - вернет данные .
`fetch` возвращает

```jsx
promise
  .then((res) => {
    console.log("Got response", res.json);
  })
  .then((body) => {
    console.log("body");
  });
```

То, что получили response означает что мы получили тело ответа .

Чтобы получить данные с сервера , нужно выполнить два вызова ( каждый вернет promise )

> res = await fetch (url)
> body = await res.json()

Кроме json есть другие функции для других типов ответа : arrayBuffer , blob , text , formData ()

---
