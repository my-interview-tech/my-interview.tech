---
uid: o1q9vVj0WUaFI-uRnyaXY
title: Как выглядит поток данных в Redux-приложении?
tags:
  - "#React"
  - "#Redux"
  - "#action"
  - "#dispatcher"
  - "#reducer"
  - "#store"
  - "#subscriber"
  - "#component"
info: null
draft: false
technology: State Managers
specialty: Frontend
tools: []
order: 0
access: free
created_at: "2026-01-18T15:03:38.095Z"
updated_at: "2026-01-18T15:03:38.095Z"
---

![[Pasted image 20230704193253.png|600]]

Жизненный цикл данных в Redux включает в себя:

- Вызов [`store.dispatch(action)`](https://rajdee.gitbooks.io/redux-in-russian/content/docs/api/Store.html#dispatch)
- _Redux-стор вызывает функцию-редюсер, который вы ему передали._

* Главный редюсер может комбинировать результат работы нескольких редюсеров в единственное дерево состояния приложения.
* Redux-стор сохраняет полное дерево состояния, которое возвращает главный редюсер.

---

[[004 ReactCore|Назад]]
