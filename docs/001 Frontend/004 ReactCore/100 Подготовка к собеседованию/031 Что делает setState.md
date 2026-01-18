---
uid: VVagwUyOtwumR0K2i4e98
title: Что делает setState?
tags:
  - "#React"
  - "#setState"
  - "#batched"
info:
  - "https://ru.legacy.reactjs.org/docs/faq-state.html"
draft: false
technology: ReactCore
specialty: Frontend
tools: []
order: 31
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

`setState()` - это метод, который используется в React для обновления состояния компонента и запуска перерисовки `re-render` компонента с обновленным состоянием.

```jsx
setState(updater, [callback]);
```

Когда вызывается `setState()`, React обновляет состояние компонента, объединяя его с новыми данными, переданными в качестве аргумента. Затем React перерисовывает компонент с обновленным состоянием, что приводит к обновлению отображения на экране.

Обновление состояния с помощью `setState()` является _асинхронным_ и может быть объединено (`batched`) для оптимизации производительности. _Это означает, что несколько вызовов `setState()` могут быть объединены в одно обновление состояния, чтобы уменьшить количество перерисовок компонента и повысить производительность_.

```jsx
incrementCount() {
  this.setState((state) => {
    // Важно: используем `state` вместо `this.state` при обновлении.
    return {count: state.count + 1}
  });
}

handleSomething() {
  // Возьмём снова для примера, что `this.state.count` начинается с 0.
  this.incrementCount();
  this.incrementCount();
  this.incrementCount();

  // Если посмотреть на значение `this.state.count` сейчас, это будет по-прежнему 0.
  // Но когда React отрендерит компонент снова, будет уже 3.
}
```

Например, представим, что у нас есть компонент `Counter`, который отображает счетчик и имеет кнопку для его увеличения. Мы можем использовать `setState()` для обновления состояния компонента при нажатии на кнопку:

```jsx
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({ count: this.state.count + 1 });
  }

  render() {
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={this.handleClick}>Increment</button>
      </div>
    );
  }
}
```

Здесь мы используем `setState()` в обработчике события `handleClick` для обновления состояния компонента `Counter`. При каждом клике на кнопку `Increment` вызывается `setState()`, что приводит к обновлению состояния компонента и его перерисовке с новым значением счетчика.

**> Какой второй аргумент можно передать опционально в setState и какова его цель?**

Второй аргумент, который можно передать в метод `setState()` - это _функция обратного вызова (callback), которая будет выполнена после того, как состояние компонента будет обновлено и компонент будет перерисован._

Цель этой функции обратного вызова - _выполнить какой-либо дополнительный код после обновления состояния компонента._ Например, это может быть выполнение каких-то действий, которые зависят от обновленного состояния компонента, или выполнение каких-то действий после перерисовки компонента.

Вот пример использования функции обратного вызова в `setState()`:

```jsx
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({ count: this.state.count + 1 }, () =>
      console.log("Count updated:", this.state.count),
    );
  }

  render() {
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={this.handleClick}>Increment</button>
      </div>
    );
  }
}
```

Здесь мы передаем вторым аргументом функцию обратного вызова, которая выводит обновленное значение счетчика в консоль после его обновления. При каждом клике на кнопку `Increment` вызывается `setState()`, обновляя состояние компонента и вызывая функцию обратного вызова после обновления.

`setState()` всегда приводит к повторному рендеру, если только `shouldComponentUpdate()` не возвращает `false`. Если используются мутабельные объекты, и условие рендеринга не может быть реализовано в `shouldComponentUpdate()`, вызывайте `setState()` только при разнице следующего и предыдущего состояния. Это предотвратит ненужные повторные рендеры.

---

[[004 ReactCore|Назад]]
