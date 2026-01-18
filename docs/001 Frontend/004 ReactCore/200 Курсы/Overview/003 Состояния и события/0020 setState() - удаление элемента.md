---
uid: F0vmrNlDfMHsfCZNJ1nKn
title: setState() - удаление элемента
tags:
  - "#React"
  - "#setState"
info:
  - "[[0017 Как работает setState|Как работает setState?]]"
draft: false
technology: ReactCore
specialty: Frontend
tools: []
order: 20
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

setState() — удалить элемент > setState() не должен изменять текущий state

> методы, которые изменяют (mutate) массив использовать нельзя
>
> > newArr = [ …oldArr.slice(0, idx), …oldArr.slice(idx 1) ];
> > // не изменяет oldArr

---
