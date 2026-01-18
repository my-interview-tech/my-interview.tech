---
uid: kUGfIkhYQ6cTy7Dh2WOq2
title: Middleware
tags:
  - "#React"
  - "#Redux"
  - "#Middleware"
info:
  - >-
    https://rajdee.gitbooks.io/redux-in-russian/content/docs/advanced/Middleware.html
draft: false
technology: State Managers
specialty: Frontend
tools: []
order: 0
access: free
created_at: "2026-01-18T15:03:38.095Z"
updated_at: "2026-01-18T15:03:38.095Z"
---

_Middleware (мидлвар)_ - это функция, которая обрабатывает `actions` перед тем, как они попадают в `reducer`. `Middleware` может изменять действие, вызывать асинхронные операции, логировать действия и многое другое.

_Middleware используется для повышения гибкости и расширяемости приложений._ Они упрощают реализацию сложной логики, которая не может быть реализована с помощью простых действий и редьюсеров.

Например, `middleware` может быть использован для выполнения следующих функций:

- _Логирование_: middleware может логировать действия и состояние приложения для отладки и анализа производительности.
- _Асинхронные запросы_: middleware может выполнять асинхронные запросы к серверу и обновлять состояние приложения, когда ответ будет получен.
- _Авторизация_: middleware может проверять, авторизован ли пользователь, и блокировать доступ к защищенным страницам, если пользователь не прошел аутентификацию.
- _Оптимизация_: middleware может использоваться для оптимизации и кеширования запросов, чтобы уменьшить нагрузку на сервер и ускорить производительность приложения.

`Middleware` _работает по принципу цепочки обязанностей (chain of responsibility)_. Каждый middleware получает действие и может изменять его, передавать его следующему middleware или передавать управление редьюсеру. Middleware может быть добавлено в Redux с помощью функции `applyMiddleware`, которая принимает список middleware и возвращает функцию, которая принимает createStore и возвращает усовершенствованный экземпляр `store`.

Пример использования middleware:

```jsx
const myMiddleware = (store) => (next) => (action) => {
  console.log("Dispatching action:", action);
  const result = next(action);
  console.log("New state:", store.getState());
  return result;
};

const store = createStore(reducer, applyMiddleware(myMiddleware));
```

В этом примере `middleware` логирует каждое действие и новое состояние приложения после обновления. Middleware получает доступ к store и может использовать его для получения текущего состояния или диспетчеризации новых действий.

---

[[004 ReactCore|Назад]]
