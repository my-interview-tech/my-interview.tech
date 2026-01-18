---
uid: aqrjNiUmnYDFyYyUQ7sLj
title: Чистая функция в Redux?
tags:
  - "#React"
  - "#Redux"
  - "#pure-function"
  - "#reducer"
info: []
draft: false
technology: State Managers
specialty: Frontend
tools: []
order: 0
access: free
created_at: "2026-01-18T15:03:38.095Z"
updated_at: "2026-01-18T15:03:38.095Z"
---

_Чистая функция_ - это функция, которая не имеет побочных эффектов и всегда возвращает одинаковый результат для одинаковых входных данных.

Чистые функции используются для описания reducer'ов - функций, которые принимают текущее состояние приложения и action, и возвращают новое состояние.

_`Reducer` должен быть чистой функцией, потому что он должен предсказуемо и безопасно обновлять состояние приложения. Если reducer имеет побочные эффекты, например, изменяет глобальные переменные или вызывает асинхронные операции, то это может привести к неожиданному поведению и сложностям в отладке._

Пример чистой функции, которая возвращает новое состояние в зависимости от переданного действия:

```jsx
function counterReducer(state = 0, action) {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    default:
      return state;
  }
}
```

---

[[004 ReactCore|Назад]]
