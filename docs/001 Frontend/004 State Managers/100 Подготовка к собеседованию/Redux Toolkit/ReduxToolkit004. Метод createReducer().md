---
uid: ZCdx-glDyxbkJ3pN5AUMd
title: Метод createReducer()
tags:
  - React
  - redux-toolkit
  - createReducer
info:
  - "https://habr.com/ru/companies/inobitec/articles/481288/"
draft: false
technology: State Managers
specialty: Frontend
tools: []
order: 0
access: free
created_at: "2026-01-18T15:03:38.095Z"
updated_at: "2026-01-18T15:03:38.095Z"
---

Функция `createReducer()` похожа на функцию создания поисковой таблицы из документации по `Redux`. В ней используется библиотека `immer`, что позволяет писать "мутирующий" код, обновляющий состояние иммутабельно. Это защищает от непреднамеренного мутирования состояния в редукторе.

Любой редуктор, в котором используется инструкция `switch`, может быть преобразован с помощью `createReducer()`. Каждый `case` становится ключом объекта, передаваемого в `createReducer()`. Иммутабельные обновления, такие как распаковка объектов или копирование массивов, могут быть преобразованы в "мутации". Но это не обязательно: можно оставить все как есть.

Ниже приводится пример использования `createReducer()`. Начнем с типичного редуктора для списка задач, в котором используется инструкция `switch` и иммутабельные обновления:

```jsx
function todosReducer(state = [], action) {
  switch (action.type) {
    case "ADD_TODO": {
      return state.concat(action.payload);
    }
    case "TOGGLE_TODO": {
      const { index } = action.payload;
      return state.map((todo, i) => {
        if (i !== index) return todo;

        return {
          ...todo,
          completed: !todo.completed,
        };
      });
    }
    case "REMOVE_TODO": {
      return state.filter((todo, i) => i !== action.payload.index);
    }
    default:
      return state;
  }
}
```

_Обратите внимание_, что мы вызываем `state.concat()` для получения копии массива с новой задачей, `state.map()` также для получения копии массива, и используем оператор `spread` для создания копии задачи, подлежащей обновлению.

С помощью `createReducer()` мы можем сократить приведенный пример следующим образом:

```jsx
const todosReducer = createReducer([], (builder) => {
  builder
    .addCase("ADD_TODO", (state, action) => {
      // "мутируем" массив, вызывая push()
      state.push(action.payload);
    })
    .addCase("TOGGLE_TODO", (state, action) => {
      const todo = state[action.payload.index];
      // "мутируем" объект, перезаписывая его поле `completed`
      todo.completed = !todo.completed;
    })
    .addCase("REMOVE_TODO", (state, action) => {
      // мы по-прежнему можем использовать иммутабельную логику обновления состояния
      return state.filter((todo, i) => i !== action.payload.index);
    });
});
```

Возможность "мутировать" состояние особенно полезна при необходимости обновления глубоко вложенных свойств. Например, такой код:

```jsx
case 'UPDATE_VALUE':
  return {
    ...state,
    first: {
      ...state.first,
      second: {
        ...state.first.second,
        [action.someId]: {
          ...state.first.second[action.someId],
          fourth: action.someValue
        }
      }
    }
  }

```

Можно упростить так:

```jsx
updateValue(state, action) {
  const { someId, someValue } = action.payload
  state.first.second[someId].fourth = someValue
}

```

Функция `createReducer()` может быть очень полезной, но следует помнить о том, что:

- "Мутирующий" код правильно работает только внутри `createReducer()`
- `Immer` не позволяет смешивать "мутирование" черновика (`draft`) состояния и возвращение нового состояния

\*\*Объединение `reducers` и последовательный их вызов

```jsx
import { createReducer } from "@reduxjs/toolkit";

// Редьюсер 1
const reducer1 = createReducer(initialState1, (builder) => {
  builder
    .addCase(actionType1, (state, action) => {
      // Обработка действия actionType1
    })
    .addCase(actionType2, (state, action) => {
      // Обработка действия actionType2
    });
});

// Редьюсер 2
const reducer2 = createReducer(initialState2, (builder) => {
  builder
    .addCase(actionType3, (state, action) => {
      // Обработка действия actionType3
    })
    .addCase(actionType4, (state, action) => {
      // Обработка действия actionType4
    });
});

// Объединение редьюсеров
const combinedReducer = createReducer({}, (builder) => {
  builder
    .addCase(actionType5, reducer1) // Вызов редьюсера 1 для действия actionType5
    .addCase(actionType6, reducer2); // Вызов редьюсера 2 для действия actionType6
});
```

---

[[004 State Managers|Назад]]
