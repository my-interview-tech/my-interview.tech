---
uid: 3Cgt3ooS4yC0MBKCDCFmG
title: Что такое useDispatch() и Redux-actions?
tags:
  - "#React"
  - "#Redux"
  - "#actions"
info:
  - "https://rajdee.gitbooks.io/redux-in-russian/content/docs/basics/Actions.html"
draft: false
technology: State Managers
specialty: Frontend
tools: []
order: 0
access: free
created_at: "2026-01-18T15:03:38.095Z"
updated_at: "2026-01-18T15:03:38.095Z"
---

**`useDispatch()`**

_`Dispatch` - это метод объекта `Store`, который используется для отправки `actions` в `Store`. Dispatch вызывает `reducer`, который обновляет `state` приложения в соответствии с переданным `actions`._

`dispatch` можно использовать с помощью хука `useDispatch()` или с помощью функции `connect`, которая добавляет `dispatch` в качестве пропса компонента.

Пример использования `useDispatch()`:

```jsx
import { useDispatch } from "react-redux";
import { addTodoActionCreator } from "./actions";

function TodoForm() {
  const dispatch = useDispatch();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const todoText = formData.get("todoText");
    dispatch(addTodoActionCreator(todoText));
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <input type="text" name="todoText" />
      <button type="submit">Add Todo</button>
    </form>
  );
}
```

`Dispatch` позволяет обновлять состояние приложения в Redux и является ключевым методом для взаимодействия компонентов React с Redux Store.

**`actions`**

_`Actions` - это константы, описывающие событие._

```JSX
const ACTION_1 = "ACTION_1";

export default ACTION_1;
```

_`Action Creator`- это функция, которая создает `Action`. Она принимает данные и возвращает объект `Action`, который затем передается в `Store` для обновления состояния приложения._

`Action Creators` может содержать различные свойства, обязательно должно быть свойство "`type"`, которое указывает на тип действия, которое нужно выполнить.

Пример `Action Creator`:

```JSX
function addTodoActionCreator(id, text) {
  return {
    type: 'ADD_TODO',
    payload: {
      id,
      text
    }
  }
}
```

В этом примере функция `addTodoActionCreator` принимает два параметра - id и text, и возвращает объект `Action` с типом "ADD_TODO" и данными о новой задаче.

_Вы можете использовать функцию [`bindActionCreators()`](https://rajdee.gitbooks.io/redux-in-russian/content/docs/api/bindActionCreators.html) для автоматического привязывания большого количества генераторов экшенов к функции `dispatch()`._ _Созданные таким способом функции делают сразу два действия - создание `action` и отправка action в `dispatch()`._

```jsx
import { bindActionCreators } from "redux";
import { increment, decrement, reset } from "./actions";

// Получаем ссылку на функцию `dispatch` из Redux Store

// Пример использования в функциональном компоненте с помощью хука useDispatch()
import { useDispatch } from "react-redux";

const MyComponent = () => {
  const dispatch = useDispatch();

  // Привязываем генераторы экшенов к функции dispatch
  const actions = bindActionCreators({ increment, decrement, reset }, dispatch);

  // Теперь в объекте `actions` у нас есть функции, которые автоматически отправляют экшены в `dispatch()`
  // actions.increment() - отправляет экшен { type: 'INCREMENT' }
  // actions.decrement() - отправляет экшен { type: 'DECREMENT' }
  // actions.reset() - отправляет экшен { type: 'RESET' }

  // ...

  return <div>Компонент</div>;
};
```

_`Action Creators` позволяют абстрагироваться от создания объекта Action и упрощают процесс управления состоянием. Они также могут использоваться для асинхронных операций, таких как получение данных из API, используя `middleware`, такой как `Redux Thunk` или `Redux Saga`_

\*Основной принцип заключается в том, что действия и редьюсеры должны быть простыми функциями.

---

[[004 ReactCore|Назад]]
