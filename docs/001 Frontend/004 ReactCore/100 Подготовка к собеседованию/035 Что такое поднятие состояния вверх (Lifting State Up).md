---
uid: hzIXFaYcPUE-hWh4-Za7b
title: Что такое поднятие состояния вверх (Lifting State Up)?
tags:
  - "#React"
  - "#state"
info:
  - "https://ru.legacy.reactjs.org/docs/lifting-state-up.html"
draft: false
technology: ReactCore
specialty: Frontend
tools: []
order: 35
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

![[Pasted image 20230704174346.png|600]]

_Поднятие состояния вверх (Lifting State Up)_ - это паттерн в React, который позволяет передавать состояние `state` от дочерних компонентов к родительским, чтобы сделать их состояние синхронизированным.

_Часто несколько компонентов должны отражать одни и те же изменяющиеся данные. Их состояние может быть поднято вверх по иерархии компонентов к их общему родительскому компоненту. Это позволяет синхронизировать состояние между дочерними компонентами и обеспечивает более простую и единообразную обработку данных._

Например, представим, что у нас есть компонент `Parent` и два дочерних компонента `ChildA` и `ChildB`. Оба дочерних компонента имеют свои локальные состояния, но они также зависят от общего состояния, которое должно быть синхронизировано между ними.

```jsx
class Parent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
    this.handleIncrement = this.handleIncrement.bind(this);
  }

  handleIncrement() {
    this.setState({ count: this.state.count + 1 });
  }

  render() {
    return (
      <div>
        <ChildA count={this.state.count} onIncrement={this.handleIncrement} />
        <ChildB count={this.state.count} onIncrement={this.handleIncrement} />
      </div>
    );
  }
}

class ChildA extends React.Component {
  constructor(props) {
    super(props);
    this.state = { localCount: 0 };
    this.handleIncrement = this.handleIncrement.bind(this);
  }

  handleIncrement() {
    this.setState({ localCount: this.state.localCount + 1 });
    this.props.onIncrement();
  }

  render() {
    return (
      <button onClick={this.handleIncrement}>
        ChildA: {this.props.count + this.state.localCount}
      </button>
    );
  }
}

class ChildB extends React.Component {
  constructor(props) {
    super(props);
    this.state = { localCount: 0 };
    this.handleIncrement = this.handleIncrement.bind(this);
  }

  handleIncrement() {
    this.setState({ localCount: this.state.localCount + 1 });
    this.props.onIncrement();
  }

  render() {
    return (
      <button onClick={this.handleIncrement}>
        ChildB: {this.props.count + this.state.localCount}
      </button>
    );
  }
}
```

Здесь мы используем `Parent` компонент для управления общим состоянием `count`, а затем передаем это состояние в дочерние компоненты `ChildA` и `ChildB` через свойство `count`. Также мы передаем функцию `handleIncrement` в дочерние компоненты через свойство `onIncrement`, чтобы они могли уведомлять родительский компонент о том, что состояние должно быть обновлено.

_Поднятие состояния вверх позволяет избежать дублирования логики и обеспечивает более простую и единообразную обработку данных между компонентами._

---

[[004 ReactCore|Назад]]
