---
uid: 7aPQQYJCYn_R7FNmgGrpz
title: Как привязать методы или обработчики событий в callback() JSX?
tags:
  - "#React"
  - "#arrowFunction"
  - "#class"
  - "#bind"
info: []
draft: false
technology: ReactCore
specialty: Frontend
tools: []
order: 50
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

В React есть несколько способов привязать методы или обработчики событий в `callback()` JSX:

1. Использование стрелочной функции внутри `callback()`. Это позволяет сохранить контекст `this` и передать дополнительные аргументы в метод:

```jsx
class MyComponent extends React.Component {
  handleClick = (event, id) => {
    console.log(`Clicked item with id ${id}`);
  };

  render() {
    return (
      <button onClick={(event) => this.handleClick(event, 123)}>
        Click me
      </button>
    );
  }
}
```

В этом примере мы определяем метод `handleClick`, который принимает два аргумента: `event` и `id`. В методе `render()` мы передаем функцию-стрелку в качестве обработчика события `onClick`, которая вызывает метод `handleClick` с передачей объекта `event` и числового значения `123` 2. Использование `bind()` для привязки метода к контексту `this`:

```jsx
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event, id) {
    console.log(`Clicked item with id ${id}`);
  }

  render() {
    return (
      <button onClick={(event) => this.handleClick(event, 123)}>
        Click me
      </button>
    );
  }
}
```

В этом примере мы используем конструктор класса для привязки метода `handleClick` к контексту `this` с помощью `bind()`. В методе `render()` мы передаем функцию-стрелку в качестве обработчика события `onClick`, которая вызывает метод `handleClick` с передачей объекта `event` и числового значения `123`.

3. Использование метода класса синтаксиса поля класса:

```jsx
class MyComponent extends React.Component {
  handleClick(event, id) {
    console.log(`Clicked item with id ${id}`);
  }

  render() {
    return (
      <button onClick={this.handleClick.bind(this, event, 123)}>
        Click me
      </button>
    );
  }
}
```

В этом примере мы определяем метод `handleClick`, который принимает два аргумента: `event` и `id`. В методе `render()` мы используем синтаксис поля класса, чтобы привязать метод `handleClick` к контексту `this` и передать аргументы `event` и числовое значение `123` в метод при клике на кнопку.

Это три способа привязать методы или обработчики событий в `callback()` JSX в React. Выберите тот, который наиболее подходит для вашего случая использования.

---

[[004 ReactCore|Назад]]
