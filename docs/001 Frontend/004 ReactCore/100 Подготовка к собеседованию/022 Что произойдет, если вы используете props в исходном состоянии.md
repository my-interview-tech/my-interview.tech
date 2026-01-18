---
uid: r398XtJctpHRcmq_CV53H
title: "Что произойдет, если вы используете props в исходном состоянии?"
tags:
  - "#React"
  - "#props"
info: null
draft: false
technology: ReactCore
specialty: Frontend
tools: []
order: 22
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

_Если реквизиты компонента изменяются без обновления компонента, новое значение реквизита никогда не будет отображено, поскольку функция конструктора никогда не обновит текущее состояние компонента._ Инициализация состояния из props выполняется только при первом создании компонента.

Приведенный ниже компонент не будет отображать обновленное входное значение:

```js
import React from "react";

class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: this.props.inputValue,
    };
  }

  handleClick = () => {
    // Изменяем значение props.inputValue без обновления компонента
    this.props.inputValue = "Новое значение";
  };

  render() {
    return (
      <div>
        <div>Значение props.inputValue: {this.props.inputValue}</div>
        <div>Значение состояния inputValue: {this.state.inputValue}</div>
        <button onClick={this.handleClick}>Изменить props.inputValue</button>
      </div>
    );
  }
}

// Используем компонент
const App = () => {
  return <MyComponent inputValue="Исходное значение" />;
};

export default App;
```

Использование реквизита внутри метода рендеринга обновит значение:

```js
import React from "react";
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      record: [],
    };
  }

  handleClick = () => {
    // Изменяем значение props.inputValue
    this.props.onChangeInputValue("Новое значение");
  };

  render() {
    return (
      <div>
        <div>Значение props.inputValue: {this.props.inputValue}</div>
        <button onClick={this.handleClick}>Изменить props.inputValue</button>
      </div>
    );
  }
}

// Используем компонент
const App = () => {
  const handleInputChange = (newValue) => {
    // Обновляем значение props.inputValue
    // и производим перерисовку компонента
    setInputValue(newValue);
  };

  const [inputValue, setInputValue] = React.useState("Исходное значение");
  return (
    <div>
      <MyComponent
        inputValue={inputValue}
        onChangeInputValue={handleInputChange}
      />
    </div>
  );
};

export default App;
```

_Произойдёт ошибка, потому что нельзя изменять `Props`._

---

[[004 ReactCore|Назад]]
