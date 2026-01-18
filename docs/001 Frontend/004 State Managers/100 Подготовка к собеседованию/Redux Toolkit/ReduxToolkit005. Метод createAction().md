---
uid: 94GbrC25RTu9OuIWYRDJB
title: Метод createAction()
tags:
  - React
  - redux-toolkit
  - createAction
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

Написание создателей операции вручную может быть утомительным. `Redux Toolkit` предоставляет функцию `createAction()`, которая генерирует создателя операции с указанным типом операции и преобразует переданные аргументы в поле `payload`:

```jsx
const addTodo = createAction("ADD_TODO");
addTodo({ text: "Buy milk" });
// { type : "ADD_TODO", payload : {text : "Buy milk"}} )
```

`createAction()` также принимает аргумент-колбек `prepare`, позволяющий кастомизировать результирующее поле `payload` и добавлять поле `meta`, при необходимости.

Для определения того, как должно быть обновлено состояние, редукторы полагаются на тип операции. Обычно, это делается посредством раздельного определения типов и создателей операции. `createAction()` позволяет упростить данный процесс.

Во-первых, `createAction()` перезаписывает метод `toString()` генерируемых создателей. Это означает, что создатель может использовать в качестве ссылки на "тип операции", например, в ключах, передаваемых в `builder.addCase()` или объектной нотации `createReducer()`.

Во-вторых, тип операции также определяется как поле `type` создателя.

```jsx
const actionCreator = createAction("SOME_ACTION_TYPE");

console.log(actionCreator.toString());
// SOME_ACTION_TYPE

console.log(actionCreator.type);
// SOME_ACTION_TYPE

const reducer = createReducer({}, (builder) => {
  // Здесь будет автоматически вызван `actionCreator.toString()`
  // Кроме того, при использовании TypeScript, будет правильно предложен (предположен) тип операции
  builder.addCase(actionCreator, (state, action) => {});

  // Или вы можете указать поле `type`
  // В этому случае, при использовании TypeScript, тип операции предложен не будет
  builder.addCase(actionCreator.type, (state, action) => {});
});
```

Это означает, что нам не нужно создавать отдельную переменную для типа операции или дублировать название и значение типа, например: `const SOME_ACTION_TYPE = 'SOME_ACTION_TYPE'`.

К сожалению, неявного приведения к строке не происходит в инструкции `switch`. Приходится делать это вручную:

```jsx
const actionCreator = createAction("SOME_ACTION_TYPE");

const reducer = (state = {}, action) => {
  switch (action.type) {
    // ошибка
    case actionCreator: {
      break;
    }
    // правильно
    case actionCreator.toString(): {
      break;
    }
    // так тоже работает
    case actionCreator.type: {
      break;
    }
  }
};
```

При использовании `Redux Toolkit` с `TypeScript`, принимайте во внимание, что компилятор `TypeScript` может не осуществлять неявного преобразования в строку, когда создатель используется как ключ объекта. В этом случае также может потребоваться прямое указание типа создателя (`actionCreator as string`) или использование поля `type` в качестве ключа объекта.

---

[[004 State Managers|Назад]]
