---
uid: Mp0dQg0HkK875kH1OCS14
title: Что такое редьюсер (Reducer)?
tags:
  - "#React"
  - "#Redux"
  - "#reducer"
info:
  - >-
    https://rajdee.gitbooks.io/redux-in-russian/content/docs/basics/Reducers.html
draft: false
technology: State Managers
specialty: Frontend
tools: []
order: 0
access: free
created_at: "2026-01-18T15:03:38.095Z"
updated_at: "2026-01-18T15:03:38.095Z"
---

![[Pasted image 20230704193008.png|600]]

_Редюсер (`reducer`) — это чистая функция, которая принимает предыдущее состояние и экшен (`state` и `action`) и возвращает следующее состояние (новую версию предыдущего)._

```jsx
(previousState, action) => newState;
```

_Если previousState - underfined , то нужно вернуть первоначальный (initial) state ._

_Редьюсеры должны быть чистыми функциями, то есть они не должны изменять состояние напрямую, а только возвращать новый объект состояния. Это обеспечивает предсказуемость и консистентность в приложении и упрощает отладку и тестирование._

Функция называется редюсером (reducer) потому, что ее можно передать в [`Array.prototype.reduce(reducer, ?initialValue)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce).

В `reducer` никогда нельзя:

- Непосредственно изменять то, что пришло в аргументах функции;
- Выполнять какие-либо сайд-эффекты: обращаться к API или осуществлять переход по роутам;
- Вызывать не чистые функции, например `Date.now()` или `Math.random()`.

Вот пример простого редьюсера, который обрабатывает действие INCREMENT и увеличивает счетчик на 1:

```jsx
function counterReducer(state = { count: 0 }, action) {
  switch (action.type) {
    case "INCREMENT":
      return { ...state, count: state.count + 1 };
    default:
      return state;
  }
}
```

_`Reducer` является ключевым элементом в управлении состоянием приложения и позволяет обрабатывать действия, которые изменяют состояние приложения. Он может быть объединен с другими reducer'ами с помощью функции `combineReducers` для управления состоянием всего приложения в единый редьюсер (root reducer)._

_Когда вы разбиваете базовый reducer на несколько, то название каждого из них должно соответствовать полю которое он обновляет в `store`._

---

[[004 ReactCore|Назад]]
