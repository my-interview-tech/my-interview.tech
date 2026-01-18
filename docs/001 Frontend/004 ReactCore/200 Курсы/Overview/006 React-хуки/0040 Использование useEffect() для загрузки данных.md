---
uid: mrJMrHHMjflkHEjRKzaiQ
title: Использование useEffect() для загрузки данных
tags:
  - "#React"
  - "#Hooks"
  - "#useEffect"
draft: false
technology: ReactCore
specialty: Frontend
tools: []
order: 40
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

Если данные зависят от параметра (например, ID ресурса) - обязательно укажите его в массиве > Promise нельзя отменить, но можно проигнорировать результат:

```jsx
useEffect(() => {
  let cancelled = false;
  fetch(`/users/${id}`)
    .then((res) => res.json())
    .then((data) => !cancelled && setName(data.name));
  return () => (cancelled = true);
}, [id]);
```

---
