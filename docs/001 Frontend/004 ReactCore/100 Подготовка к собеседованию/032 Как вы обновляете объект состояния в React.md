---
uid: Gii_UOxWOD0OVAJtmTmZn
title: Как вы обновляете объект состояния в React?
tags:
  - "#React"
  - "#setState"
info: null
draft: false
technology: ReactCore
specialty: Frontend
tools: []
order: 32
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

В React мы можем обновлять объект состояния компонента с помощью метода `setState()`. _Когда мы обновляем объект состояния, мы должны создавать новый объект и передавать его в качестве аргумента методу `setState()`, а не изменять текущий объект состояния напрямую._

Например, если у нас есть объект состояния, содержащий некоторые свойства, мы можем обновить его следующим образом:

```jsx
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        name: "John",
        age: 30,
      },
    };
  }

  handleClick() {
    // Неправильно: изменяем объект состояния напрямую
    // this.state.user.age++;

    // Правильно: создаем новый объект состояния и передаем его в метод setState()
    const newUser = {
      ...this.state.user,
      age: this.state.user.age + 1,
    };
    this.setState({ user: newUser });
  }

  render() {
    return (
      <div>
        <p>Name: {this.state.user.name}</p>
        <p>Age: {this.state.user.age}</p>
        <button onClick={() => this.handleClick()}>Add year</button>
      </div>
    );
  }
}
```

В этом примере мы определяем объект состояния `user` в конструкторе компонента. Мы создаем метод `handleClick()`, который вызывается при клике на кнопку и обновляет возраст пользователя. Мы создаем новый объект состояния `newUser`, который копирует свойства из текущего объекта состояния `user` и обновляет свойство `age`. Затем мы передаем новый объект состояния в метод `setState()`.

_Мы также можем использовать функцию обратного вызова в методе `setState()`, чтобы обновить объект состояния на основе предыдущего состояния, а не текущего состояния. Это полезно, когда мы должны обновить состояние на основе предыдущего значения, а не текущего._

```jsx
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  handleClick() {
    this.setState((prevState) => ({ count: prevState.count + 1 }));
  }

  render() {
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={() => this.handleClick()}>Add</button>
      </div>
    );
  }
}
```

В этом примере мы определяем свойство `count` в объекте состояния. Мы создаем метод `handleClick()`, который вызывается при клике на кнопку и обновляет счетчик. Мы передаем функцию обратного вызова в метод `setState()`, которая принимает предыдущее состояние и возвращает новый объект состояния с обновленным счетчиком

---

[[004 ReactCore|Назад]]
