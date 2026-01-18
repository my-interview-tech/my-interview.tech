---
uid: WsaIvvX8hLJwlcIip5thz
title: Что такое Redux-thunk?
tags:
  - "#React"
  - "#Redux"
  - "#redux-thunk"
  - "#Middleware"
info:
  - "https://habr.com/ru/articles/483314/"
draft: false
technology: State Managers
specialty: Frontend
tools: []
order: 0
access: free
created_at: "2026-01-18T15:03:38.095Z"
updated_at: "2026-01-18T15:03:38.095Z"
---

_Redux Thunk_ - это `middleware` для Redux, который позволяет создавать и обрабатывать асинхронные `actions`.

Действия в Redux обычно являются объектами, содержащими информацию о том, что произошло в приложении. _Когда действие диспетчеризуется в `store`, он передается в `reducer`, который обновляет состояние приложения в соответствии с переданными данными._ `Redux Thunk` позволяет действиям быть функциями, которые могут делать асинхронные операции, прежде чем диспетчеризовать новое действие.

Пример использования Redux Thunk:

```jsx
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const store = createStore(rootReducer, applyMiddleware(thunk));
```

Когда действие возвращает функцию, `Redux Thunk` вызывает эту функцию и передает ей методы `dispatch` и `getState` в качестве аргументов. Эти методы могут быть использованы для диспетчеризации новых действий или получения текущего состояния приложения.

```jsx
export const fetchPosts = () => {
  return (dispatch) => {
    dispatch(fetchPostsRequest());
    return fetch("/api/posts")
      .then((response) => response.json())
      .then((posts) => dispatch(fetchPostsSuccess(posts)))
      .catch((error) => dispatch(fetchPostsFailure(error)));
  };
};
```

В этом примере действие fetchPosts возвращает функцию, которая делает запрос к API и обновляет состояние приложения после получения данных. Функция использует методы `dispatch` и `getState`, переданные ей Redux Thunk, чтобы диспетчеризовать новые действия fetchPostsRequest, fetchPostsSuccess и fetchPostsFailure в зависимости от результата запроса.

---

[[004 ReactCore|Назад]]
