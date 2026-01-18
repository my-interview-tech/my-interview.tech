---
uid: zmHn_jNOT651CdWHW_xIh
title: >-
  Можете ли вы объяснить, как использовать Jest для тестирования actions и
  reducers в Redux?
tags:
  - testing
  - Jest
  - react-testing-library
draft: false
technology: "Jest, RTL"
specialty: Frontend
tools: []
order: 79
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

Тестирование действий (actions) и редьюсеров (reducers) в Redux с использованием Jest — это важный аспект разработки, который помогает убедиться, что ваше Redux-приложение работает правильно. Вот как это можно сделать:

1. **Тестирование actions**:

Действия (actions) — это обычные JavaScript-объекты, которые описывают, что произошло в приложении. Создатели действий (action creators) — это функции, которые возвращают эти объекты.

Пример создателя действия:

```javascript
// actions.js
export const incrementCount = () => ({
  type: "INCREMENT_COUNT",
});
```

Пример тестового файла для создателя действия:

```javascript
// actions.test.js
import { incrementCount } from "./actions";

describe("actions", () => {
  it("should create an action to increment the count", () => {
    const expectedAction = {
      type: "INCREMENT_COUNT",
    };
    expect(incrementCount()).toEqual(expectedAction);
  });
});
```

2. **Тестирование reducers**:

Редьюсеры (reducers) — это чистые функции, которые принимают текущее состояние и действие и возвращают новое состояние.

```javascript
// reducers.js
const initialState = {
  count: 0,
};

export const countReducer = (state = initialState, action) => {
  switch (action.type) {
    case "INCREMENT_COUNT":
      return {
        ...state,
        count: state.count + 1,
      };
    default:
      return state;
  }
};
```

```javascript
// reducers.test.js
import { countReducer } from "./reducers";

describe("countReducer", () => {
  it("should return the initial state", () => {
    expect(countReducer(undefined, {})).toEqual({ count: 0 });
  });

  it("should handle INCREMENT_COUNT", () => {
    expect(countReducer({ count: 0 }, { type: "INCREMENT_COUNT" })).toEqual({
      count: 1,
    });
  });
});
```

3. **Тестирование сложных действий и редьюсеров**:

Если у вас есть более сложные действия и редьюсеры, вы можете использовать аналогичный подход для их тестирования.

```javascript
// actions.js
export const addTodo = (text) => ({
  type: "ADD_TODO",
  text,
});
```

Пример тестового файла для сложного создателя действия:

```javascript
// actions.test.js
import { addTodo } from "./actions";

describe("actions", () => {
  it("should create an action to add a todo", () => {
    const text = "Finish docs";
    const expectedAction = {
      type: "ADD_TODO",
      text,
    };
    expect(addTodo(text)).toEqual(expectedAction);
  });
});
```

Пример сложного редьюсера:

```javascript
// reducers.js
const initialState = {
  todos: [],
};

export const todosReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TODO":
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            text: action.text,
            completed: false,
            id: state.todos.length,
          },
        ],
      };
    default:
      return state;
  }
};
```

Пример тестового файла для сложного редьюсера:

```javascript
// reducers.test.js
import { todosReducer } from "./reducers";

describe("todosReducer", () => {
  it("should return the initial state", () => {
    expect(todosReducer(undefined, {})).toEqual({ todos: [] });
  });

  it("should handle ADD_TODO", () => {
    expect(
      todosReducer(
        { todos: [] },
        {
          type: "ADD_TODO",
          text: "Run the tests",
        },
      ),
    ).toEqual({
      todos: [
        {
          text: "Run the tests",
          completed: false,
          id: 0,
        },
      ],
    });
  });
});
```

---

[[007 Jest, RTL|Назад]]
