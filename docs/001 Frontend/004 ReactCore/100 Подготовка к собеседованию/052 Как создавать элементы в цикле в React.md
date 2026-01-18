---
uid: Qdyimf7mV3Si5UbLgCqGI
title: Как создавать элементы в цикле в React?
tags:
  - "#React"
  - "#element"
info: []
draft: false
technology: ReactCore
specialty: Frontend
tools: []
order: 52
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

Чтобы создавать элементы в цикле в React, мы можем использовать метод `map()` для создания нового массива элементов, основываясь на данных, которые мы хотим отобразить. Это позволяет генерировать элементы на основе массива данных и уменьшает необходимость вручную создавать каждый элемент.

Например, мы можем создать список с элементами `<li>` на основе массива строк:

```jsx
class MyList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: ["Item 1", "Item 2", "Item 3"],
    };
  }

  render() {
    const listItems = this.state.items.map((item, index) => (
      <li key={index}>{item}</li>
    ));

    return <ul>{listItems}</ul>;
  }
}
```

В этом примере мы определяем массив строк `items` в состоянии компонента. В методе `render()` мы используем метод `map()` для создания нового массива элементов `<li>` на основе данных из массива `items`. Каждый элемент списка имеет уникальный ключ, который мы указываем с помощью атрибута `key`. Мы отображаем созданные элементы внутри элемента `<ul>`.

Также мы можем использовать другие методы JavaScript для обхода данных, например, цикл `for` или метод `forEach()`, но метод `map()` наиболее часто используется в React для создания элементов в цикле.

```jsx
class MyList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: ["Item 1", "Item 2", "Item 3"],
    };
  }

  render() {
    const listItems = [];

    for (let i = 0; i < this.state.items.length; i++) {
      listItems.push(<li key={i}>{this.state.items[i]}</li>);
    }

    return <ul>{listItems}</ul>;
  }
}
```

В этом примере мы определяем массив строк `items` в состоянии компонента. В методе `render()` мы используем цикл `for` для создания нового массива элементов `<li>` на основе данных из массива `items`. Каждый элемент списка имеет уникальный ключ, который мы указываем с помощью атрибута `key`. Мы отображаем созданные элементы внутри элемента `<ul>`.

---

[[004 ReactCore|Назад]]
