---
uid: Kbm6VSkklRWNMlD-5pjWg
title: Что такое инверсия наследования (Inheritance Inversion)?
tags:
  - "#React"
  - "#container"
  - "#presentation"
info: null
draft: false
technology: ReactCore
specialty: Frontend
tools: []
order: 86
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

_Инверсия наследования (Inheritance Inversion)_ - это паттерн проектирования, который используется в React для разделения логики компонента от его рендеринга. Вместо того, чтобы наследовать поведение компонента от базового класса, мы создаем компонент, который принимает функцию, которая определяет, как компонент должен быть отображен.

Этот паттерн позволяет создавать более гибкие и переиспользуемые компоненты, которые могут быть адаптированы к различным сценариям использования.

Компоненты, использующие инверсию наследования, обычно состоят из двух частей: контейнерной части (Container) и представления (Presentation).

1. _Контейнерный компонент (Container Component)_ - это компонент, который отвечает за логику и управление состоянием. Он определяет данные, которые должны быть отображены в компоненте и обрабатывает пользовательские события.
2. _Презентационный компонент (Presentation Component)_ - это компонент, который принимает данные в качестве свойств и отображает их на экране. Он не имеет собственного состояния и не обрабатывает пользовательские события.

Например, представим, что у нас есть компонент `UserList`, который отображает список пользователей. Мы можем разделить его на два компонента: `UserListContainer` и `UserListPresentation`.

```jsx
class UserListContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { users: [] };
  }

  componentDidMount() {
    fetch("/api/users")
      .then((response) => response.json())
      .then((users) => this.setState({ users }));
  }

  handleDeleteUser(userId) {
    // Delete user with given ID
  }

  render() {
    return (
      <UserListPresentation
        users={this.state.users}
        onDeleteUser={this.handleDeleteUser}
      />
    );
  }
}

function UserListPresentation(props) {
  return (
    <ul>
      {props.users.map((user) => (
        <li key={user.id}>
          {user.name}{" "}
          <button onClick={() => props.onDeleteUser(user.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}
```

Здесь `UserListContainer` компонент отвечает за получение данных о пользователях и управление их удалением. Он передает список пользователей и функцию удаления в `UserListPresentation` компонент, который отображает список пользователей и рендерит кнопку удаления для каждого пользователя.

---

[[004 ReactCore|Назад]]
