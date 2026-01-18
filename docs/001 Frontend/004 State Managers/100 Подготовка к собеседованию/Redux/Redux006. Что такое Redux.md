---
uid: aEZEWC7Ml9M6yxXLjtQch
title: Что такое Redux?
tags:
  - "#React"
  - "#Redux"
  - "#store"
  - "#action"
  - "#reducer"
info:
  - "https://habr.com/ru/articles/498860/"
  - "https://habr.com/ru/articles/269831/"
  - "https://habr.com/ru/companies/vk/articles/303456/"
  - >-
    https://rajdee.gitbooks.io/redux-in-russian/content/docs/basics/DataFlow.html
draft: false
technology: State Managers
specialty: Frontend
tools: []
order: 0
access: free
created_at: "2026-01-18T15:03:38.095Z"
updated_at: "2026-01-18T15:03:38.095Z"
---

![[Pasted image 20230704192112.png|]]

_Redux_ - это библиотека для управления состоянием.

_react-redux_ - библиотека, которая упрощает интеграцию между React и Redux .

Для создания проекта на Redux :

```bash
~ create-react-app MyName
~ npm start

npm i redux react-redux
```

_В React рендеринг, действия ( actions) , логика ( reducer), state могут находиться в одном компоненте._ Для управления состояниями Redux предоставляет одно глобальное место, которое доступно из любой его части называемое "хранилищем" `store`. Хранилище содержит состояние приложения и методы для его изменения.

Состояние в хранилище не может быть изменено напрямую, только через `actions` . Для отправки через `actions` состояний в `store`, используется метод [`store.dispatch()`](https://rajdee.gitbooks.io/redux-in-russian/content/docs/api/Store.html#dispatch) , который описывает, что произошло в приложении, вызывается `reducer` , который изменяет состояние приложения в соответствии с этим действием.

![[Pasted image 20230424203458.png]]

Без пакета **react-redux** в React приложениях выглядит не очень красиво.

Для использование `store` в компоненте вам необходимо передавать его в пропсы:

```jsx
ReactDOM.render(<Main store={store} />, document.getElementById("root"));
```

И после использовать в компоненте: `this.props.state`. Для этого `react-redux` предоставляет метод `Provider`:

```jsx
ReactDOM.render(
  <Provider store={store}>
    <Main />
  </Provider>,
  document.getElementById("root"),
);
```

Таким образом метод `connect` сможет использовать `store`. В противном случае вы получите ошибку: `Error: Could not find «store» in the context of «Connect(Main)». Either wrap the root component in a , or pass a custom React context provider to and the corresponding React context consumer to Connect(Main) in connect options.  `

Также можно передать `store` напрямую в компонент, не оборачивая его в `Provider` и это будет работать. Но лучше всё-таки используйте Provider.

Redux имеет три основных принципа:

- _Единое состояние:_ Все состояние приложения хранится в единственном объекте-хранилище.
- _Неизменяемость:_ Состояние в хранилище не может быть изменено напрямую, только через создание нового состояния на основе старого.
- _Чистые функции:_ Редьюсеры, которые изменяют состояние в хранилище, должны быть чистыми функциями, то есть не иметь побочных эффектов и возвращать новое состояние на основе старого и действия.

---

[[004 ReactCore|Назад]]
