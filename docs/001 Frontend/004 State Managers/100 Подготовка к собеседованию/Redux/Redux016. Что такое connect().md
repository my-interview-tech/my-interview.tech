---
uid: ChyzFNDYTwkDA61WFm0If
title: Что такое connect()?
tags:
  - "#React"
  - "#Redux"
  - "#connect"
  - "#mapDispatchToProps"
  - "#mapStateToProps"
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

_mapDispatchToProps_ и _mapStateToProps_ - это функции, которые передаются в `connect()` в качестве аргументов и определяют, какие данные и действия передавать компоненту.

**`mapStateToProps()`**

_mapStateToProps()_ - это функция, которая принимает текущее состояние `state` из хранилища и возвращает объект свойств `props`, которые будут переданы компоненту. Она позволяет компоненту получать доступ к состоянию приложения и использовать его для обновления интерфейса. _`mapStateToProps()` вызывается каждый раз при обновлении состояния в хранилище, что обновляет свойства компонента и вызывает перерисовку._

Например, вот пример функции mapStateToProps, которая передает свойство count в компонент:

```jsx
function mapStateToProps(state) {
  return {
    count: state.count,
  };
}
```

**`mapDispatchToProps()`**

_mapDispatchToProps()_ - это функция, которая принимает диспетчер `dispatcher` из хранилища Redux и возвращает объект свойств, которые представляют действия, доступные в компоненте. Она позволяет компоненту отправлять действия в хранилище и обновлять состояние приложения. _`mapDispatchToProps()` вызывается только один раз при инициализации компонента._

Например, вот пример функции mapDispatchToProps, которая передает свойство incrementCount, которое вызывает действие INCREMENT:

```jsx
function mapDispatchToProps(dispatch) {
  return {
    incrementCount: () => dispatch({ type: "INCREMENT" }),
  };
}
```

После определения функций `mapStateToProps()` и `mapDispatchToProps()` они могут быть переданы в функцию `connect()` для связи компонента с Redux-хранилищем:

```jsx
import { connect } from 'react-redux';

...

export default connect(mapStateToProps, mapDispatchToProps)(MyComponent);
```

Теперь компонент MyComponent может получать доступ к данным и действиям из хранилища Redux через свойства (props), которые определены в функциях mapStateToProps и mapDispatchToProps.

**`connect()`**

`connect()` связывает `mapStateToProps()` и `mapDispatchToProps()` с компонентом и передает необходимые поля и методы в него. Возвращает она новый компонент-обёртку для вашего компонента.

_connect()_ - это функция из библиотеки `react-redux`. Она создает новый компонент, который оборачивает исходный компонент и обеспечивает ему доступ к состоянию и действиям из хранилища.

Если же у компонента нет необходимости в передаче ему `mapStateToProps` или `mapDispatchToProps` передавайте `undefined` или `null` в него.

---

[[004 ReactCore|Назад]]
