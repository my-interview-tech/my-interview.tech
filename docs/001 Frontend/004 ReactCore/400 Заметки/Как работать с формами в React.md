---
uid: iQksbqfTHQMzx8uPGKKrU
title: Как работать с формами в React?
tags:
  - "#React"
  - "#state"
  - "#setState"
  - "#bind"
  - formik
  - react-hook-form
info:
  - "[[0025 Работа с формами|Работа с формами в React]]"
  - "https://habr.com/ru/articles/746806/"
  - "https://habr.com/ru/companies/timeweb/articles/722108/"
draft: false
technology: ReactCore
specialty: Frontend
tools: []
order: 0
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

Работа с формами включает в себя _управление состоянием формы и обработку введенных данных._ Вот простой пример, демонстрирующий как работать с формами в React:

```jsx
class MyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "" };
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log("Username:", this.state.username);
    console.log("Password:", this.state.password);
    // отправка данных формы на сервер
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={this.state.username}
            onChange={this.handleChange.bind(this)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.handleChange.bind(this)}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    );
  }
}
```

Здесь мы создаем компонент `MyForm`, который содержит два текстовых поля для ввода имени пользователя и пароля, а также кнопку отправки формы. Когда пользователь вводит данные в текстовые поля, `handleChange()` сохраняет введенное значение в состояние компонента. Когда пользователь отправляет форму, `handleSubmit()` выводит значения из состояния компонента в консоль и отправляет данные на сервер.

Обратите внимание, что мы используем `bind()` для привязки `this` к обработчикам событий. Это необходимо, чтобы обращаться к `this.state` и другим методам компонента внутри обработчиков событий.

Также обратите внимание на использование `event.preventDefault()` в обработчике `handleSubmit()`. Это предотвращает отправку формы на сервер и обновление страницы при отправке данных формы.

В итоге, работа с формами в React сводится к управлению состоянием формы и обработке введенных данных. Как и в обычном HTML, в React вы можете использовать различные типы полей ввода и обрабатывать данные с помощью обработчиков событий.

---

[[004 ReactCore|Назад]]
