---
uid: dbeb0spFd6CQKP4tb26OF
title: Метод configureStore()
tags:
  - "#React"
  - redux-toolkit
  - configureStore
info:
  - "https://habr.com/ru/companies/inobitec/articles/481288/#configureStore"
draft: false
technology: State Managers
specialty: Frontend
tools: []
order: 0
access: free
created_at: "2026-01-18T15:03:38.095Z"
updated_at: "2026-01-18T15:03:38.095Z"
---

Чтобы упростить процесс конфигурации хранилища используют `configureStore()`

```jsx
import { configureStore } from "@reduxjs/toolkit";

import rootReducer from "./reducers";

const store = configureStore({ reducer: rootReducer });
// The store now has redux-thunk added and the Redux DevTools Extension is turned on
```

В качестве входных параметров функция `configureStore` принимает объект со следующими свойствами:

- `reducer` — набор пользовательских редьюсеров,
- `middleware` — опциональный параметр, задающий массив мидлваров, предназначенных для подключения к хранилищу,
- `devTools` — параметр логического типа, позволяющий включить установленное в браузер расширение Redux DevTools (значение по умолчанию — true),
- `preloadedState` — опциональный параметр, задающий начальное состояние хранилища,
- `enhancers` — опциональный параметр, задающий набор усилителей.

Данный инструмент позволяет автоматически комбинировать редьюсеры, добавить мидлвары (по умолчанию включает redux-thunk), а также использовать расширение `Redux DevTools`.

```jsx
// file: todos/todosReducer.ts noEmit
import type { Reducer } from '@reduxjs/toolkit'
declare const reducer: Reducer<{}>
export default reducer

// file: visibility/visibilityReducer.ts noEmit
import type { Reducer } from '@reduxjs/toolkit'
declare const reducer: Reducer<{}>
export default reducer

// file: store.ts
import { configureStore } from '@reduxjs/toolkit'

// We'll use redux-logger just as an example of adding another middleware
import logger from 'redux-logger'

// And use redux-batched-subscribe as an example of adding enhancers
import { batchedSubscribe } from 'redux-batched-subscribe'

import todosReducer from './todos/todosReducer'
import visibilityReducer from './visibility/visibilityReducer'

const reducer = {
  todos: todosReducer,
  visibility: visibilityReducer,
}

const preloadedState = {
  todos: [
    {
      text: 'Eat food',
      completed: true,
    },
    {
      text: 'Exercise',
      completed: false,
    },
  ],
  visibilityFilter: 'SHOW_COMPLETED',
}

const debounceNotify = _.debounce((notify) => notify())

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== 'production',
  preloadedState,
  enhancers: [batchedSubscribe(debounceNotify)],
})

// Store был создан с такими параметрами:
// - срезы редукторов были автоматически переданы в combineReducers()
// - библиотеки redux-thunk и redux-logger были добавлены как middleware
// - расширение Redux DevTools было отключено для продакшена
// - middleware, пакетное подписывание и улучшители дебаговых инструментов были объединены вместе
```

Для получения наиболее популярного списка мидлваров можно воспользоваться специальной функцией `getDefaultMiddleware`, также входящей в состав Redux Toolkit. Данная функция возвращает массив с включенными по умолчанию в библиотеку Redux Toolkit мидлварами. Перечень этих мидлваров отличается в зависимости от того, в каком режиме выполняется ваш код.

В production режиме массив состоит только из одного элемента — thunk.

В режиме development на момент написания статьи список пополняется следующими мидлварами:

- `serializableStateInvariant` — инструмент, специально разработанный для использования в Redux Toolkit и предназначенный для проверки дерева состояний на предмет наличия несериализуемых значений, таких как функции, Promise, Symbol и другие значения, не являющиеся простыми JS-данными;
- `immutableStateInvariant` — мидлвар из пакета [redux-immutable-state-invariant](https://www.npmjs.com/package/redux-immutable-state-invariant), предназначенный для обнаружения мутаций данных, содержащихся в хранилище.

---

[[004 State Managers|Назад]]
