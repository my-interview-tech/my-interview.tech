---
uid: "-TxwYvnx7ULI3hr6jtjdA"
title: Разница между состоянием(`state`) и пропсами(`props`)?
tags:
  - "#React"
  - "#state"
  - "#props"
info:
  - "https://ru.legacy.reactjs.org/docs/faq-state.html"
  - "https://habr.com/ru/companies/timeweb/articles/597109/"
draft: false
technology: ReactCore
specialty: Frontend
tools: []
order: 30
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

![[Pasted image 20230704174309.png]]

В React компонентах есть два важных концепта: состояние (`state`) и свойства (`props`).

\*\*`props`

_Свойства (`props`)_ - это данные, которые передаются в компонент из вне, через атрибуты компонента. _Они являются неизменяемыми `immutable`_ и могут быть доступны только для чтения внутри компонента. Свойства обычно используются для передачи данных от родительских компонентов к дочерним, и для настройки поведения компонента.

Например, в следующем коде свойство `name` передается в компонент `MyComponent`:

```jsx
function MyComponent(props) {
  return <div>Hello, {props.name}!</div>;
}

ReactDOM.render(<MyComponent name="Alice" />, document.getElementById("root"));
```

\*\*`state`

_Состояние `state`_ - это _данные_, которые управляются компонентом и которые _могут изменяться в процессе работы приложения_. _Состояние является приватным для компонента и не может быть изменено извне._ Обычно состояние используется для отслеживания изменений в компоненте и для обновления пользовательского интерфейса.

Например, в следующем коде компонент `MyComponent` имеет состояние `count`, которое увеличивается при нажатии на кнопку:

```jsx
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  handleClick() {
    this.setState({ count: this.state.count + 1 });
  }

  render() {
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={() => this.handleClick()}>Increment</button>
      </div>
    );
  }
}

ReactDOM.render(<MyComponent />, document.getElementById("root"));
```

В целом, свойства (`props`) используются для передачи данных от родительских компонентов к дочерним, а состояние (`state`) используется для управления изменениями внутри компонента.

\*\*Разница между `state` и `props`

|               | `state`                                               | `props`                                                               |
| ------------- | ----------------------------------------------------- | --------------------------------------------------------------------- |
| **данные**    | могут изменяться и являются приватными для компонента | не могут изменяться                                                   |
| **создаются** | в компоненте, где необходимо изменить состояние       | в родительском компоненте и передаются в дочерний, где и используются |

---

[[004 ReactCore|Назад]]
