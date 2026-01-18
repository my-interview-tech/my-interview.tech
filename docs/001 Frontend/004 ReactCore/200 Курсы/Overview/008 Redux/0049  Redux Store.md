---
uid: qfz_3yLJ5oPGq5_ETs6x1
title: Redux Store
tags:
  - "#React"
  - "#Redux"
  - "#store"
draft: false
technology: ReactCore
specialty: Frontend
tools: []
order: 49
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

Store координирует работу с данными в Redux приложении .

`const store = createStore(reducer);`

// получать нотификации об изменениях
`store.subscribe(() => /* do something */ )`

// обработать новый action :
`store.dispatch(action)`

---

![[Pasted image 20230424221739.png|600]]

## Стор ( #Store )

В предыдущих разделах мы определили [экшены](https://rajdee.gitbooks.io/redux-in-russian/content/docs/basics/Actions.html), которые представляют факт того, что "что-то случилось" и [редюсеры](https://rajdee.gitbooks.io/redux-in-russian/content/docs/basics/Reducers.html), которые обновляют состояние (state) в соответствии с этими экшенами.

**Стор (Store)** — это объект, который соединяет эти части вместе. Стор берет на себя следующие задачи:

- содержит состояние приложения (application state);
- предоставляет доступ к состоянию с помощью [`getState()`](https://rajdee.gitbooks.io/redux-in-russian/content/docs/api/Store.html#getState);
- предоставляет возможность обновления состояния с помощью [`dispatch(action)`](https://rajdee.gitbooks.io/redux-in-russian/content/docs/api/Store.html#dispatch);
- Обрабатывает отмену регистрации слушателей с помощью функции, возвращаемой [`subscribe(listener)`](https://rajdee.gitbooks.io/redux-in-russian/content/docs/api/Store.html#subscribelistener).

Важно отметить, что у вас будет только один стор в Redux-приложении. Если Вы захотите разделить логику обработки данных, то нужно будет использовать [композицию редюсеров (reducer composition)](https://rajdee.gitbooks.io/redux-in-russian/content/docs/basics/Reducers.html#splitting-reducers) вместо использования множества сторов (stores).

Очень легко создать стор (Store), если у Вас есть редюсер. В [предыдущем разделе](https://rajdee.gitbooks.io/redux-in-russian/content/docs/basics/Reducers.html) мы использовали [`combineReducers()`](https://rajdee.gitbooks.io/redux-in-russian/content/docs/api/combineReducers.html) для комбинирования несколько редюсеров в один глобальный редюсер. Теперь мы их импортируем и передадим в [`createStore()`](https://rajdee.gitbooks.io/redux-in-russian/content/docs/api/createStore.html).

```jsx
import { createStore } from "redux";
import todoApp from "./reducers";
let store = createStore(todoApp);
```

Вы можете объявить начальное состояние, передав его вторым аргументом в [`createStore()`](https://rajdee.gitbooks.io/redux-in-russian/content/docs/api/createStore.html). Это полезно для пробрасывания состояния на клиент из состояния приложения Redux, работающего на сервере.

```jsx
const store = createStore(todoApp, window.STATE_FROM_SERVER);
```

### Отправка экшенов (Dispatching Actions)

На текущий момент у нас есть созданный стор, давайте проверим, как работает наше приложение! Даже без любого UI мы уже можем проверить логику обновления состояния.

```jsx
import {
  addTodo,
  toggleTodo,
  setVisibilityFilter,
  VisibilityFilters,
} from "./actions";

// Выведем в консоль начальное состояние
console.log(store.getState());

// Каждый раз при обновлении состояния - выводим его
// Отметим, что subscribe() возвращает функцию для отмены регистрации слушателя
const unsubscribe = store.subscribe(() => console.log(store.getState()));

// Отправим несколько экшенов
store.dispatch(addTodo("Learn about actions"));
store.dispatch(addTodo("Learn about reducers"));
store.dispatch(addTodo("Learn about store"));
store.dispatch(toggleTodo(0));
store.dispatch(toggleTodo(1));
store.dispatch(setVisibilityFilter(VisibilityFilters.SHOW_COMPLETED));

// Прекратим слушать обновление состояния
unsubscribe();
```

Вы можете видеть, как выполнение кода, приведенного выше, меняет состояние, содержащееся в сторе:

![](http://i.imgur.com/zMMtoMz.png)

Мы смогли определить поведение нашего приложения даже до того, как начали создавать какой-то UI. Мы не будем делать этого в этом руководстве, но с этого момента Вы можете писать тесты для редюсеров и генераторов экшенов (action creators). Вам не нужно будет ничего "мокать", потому что редюсеры — это просто [чистые](https://rajdee.gitbooks.io/redux-in-russian/content/docs/introduction/ThreePrinciples.html#changes-are-made-with-pure-functions) функции. Вызывайте их и делайте проверки (make assertions) того, что они возвращают.

### Исходный код (Source Code)

```jsx
index.js;

import { createStore } from "redux";
import todoApp from "./reducers";

let store = createStore(todoApp);
```

### Следующие шаги

Перед тем как создавать UI для нашего todo-приложения, мы сделаем небольшую прогулку, чтобы посмотреть, [что такое поток данных (data flows) в Redux-приложении](https://rajdee.gitbooks.io/redux-in-russian/content/docs/basics/DataFlow.html).

---
