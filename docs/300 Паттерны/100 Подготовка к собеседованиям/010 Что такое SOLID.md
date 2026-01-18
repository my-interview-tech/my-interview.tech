---
uid: 7KtKNKchDMej-jrQlt96r
title: >-
  Что такое SOLID? Какие из принципов SOLID нельзя реализовать в функциональном
  компоненте?
tags:
  - ООП
  - SOLID
info:
  - "https://habr.com/ru/companies/ruvds/articles/428079/"
  - >-
    https://www.youtube.com/watch?v=A6wEkG4B38E&list=PLNkWIWHIRwMGlOBjDYTeqnNcuZ2cH1_7-
draft: false
technology: Подготовка к собеседованиям
tools: []
order: 10
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

_`SOLID`_ - это аббревиатура, которая описывает _пять принципов объектно-ориентированного программирования, которые помогают создавать более гибкие и расширяемые программы._ Каждая буква в аббревиатуре SOLID представляет собой один из этих принципов:

### 1. _`S` - Принцип единственной ответственности_

Каждый _класс_ должен иметь только одну ответственность, т.е. он _должен выполнять только одну задачу_.

```jsx
import React from "react";

// Компонент, отображающий список пользователей
function UserList({ users }) {
  return (
    <div>
      <h1>User List</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
```

В этом примере `UserList` компонент отвечает только за отображение списка пользователей. Он принимает массив `users` в качестве пропсов и отображает их имена в виде списка

### 2. _`O` - Принцип открытости/закрытости_

_Классы должны быть открыты для расширения, но закрыты для модификации._ Это означает, что вы можете добавлять новую функциональность в программу, не изменяя существующий код.

- **наследование**

```jsx
import React from "react";

// Базовый компонент
class BaseComponent extends React.Component {
  // Общая логика и состояние
}

// Компонент-наследник, расширяющий BaseComponent
class ExtendedComponent extends BaseComponent {
  // Дополнительная логика и состояние
}
```

- **композиция**

```jsx
import React from "react";

// Компонент, использующий другие компоненты
class CompositeComponent extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Content />
        <Footer />
      </div>
    );
  }
}

// Компоненты, которые используются внутри CompositeComponent
class Header extends React.Component {
  // ...
}

class Content extends React.Component {
  // ...
}

class Footer extends React.Component {
  // ...
}
```

### 3. _`L` - Принцип подстановки Барбары Лисков_

_Объекты должны быть заменяемыми на экземпляры своих подтипов без изменения правильности программы._ То есть, если у вас есть класс-родитель и класс-наследник, то объекты класса-наследника должны использоваться везде, где используются объекты класса-родителя.

```jsx
import React from "react";

// Базовый компонент
class BaseComponent extends React.Component {
  render() {
    return <div>{this.getDisplayText()}</div>;
  }

  getDisplayText() {
    return "Base Component";
  }
}

// Подкласс, расширяющий BaseComponent
class SubComponent extends BaseComponent {
  getDisplayText() {
    return "Sub Component";
  }
}

// Использование компонентов
function App() {
  return (
    <div>
      <BaseComponent />
      <SubComponent />
    </div>
  );
}

export default App;
```

### 4. _`I` - Принцип разделения интерфейса_

_Клиенты не должны зависеть от методов, которые они не используют._ Вместо этого интерфейсы должны быть разделены на более мелкие, чтобы клиенты могли использовать только те методы, которые им нужны.

```jsx
import React from 'react';

// Интерфейс для компонента отображения данных
interface IDataDisplay {
  data: any;
}

// Компонент, отображающий список пользователей
class UserList extends React.Component<IDataDisplay> {
  render() {
    const { data } = this.props;
    return (
      <div>
        <h1>User List</h1>
        <ul>
          {data.map((user: any) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      </div>
    );
  }
}

// Компонент, отображающий одного пользователя
class UserDetails extends React.Component<IDataDisplay> {
  render() {
    const { data } = this.props;
    return (
      <div>
        <h1>User Details</h1>
        <p>Name: {data.name}</p>
        <p>Email: {data.email}</p>
      </div>
    );
  }
}

// Использование компонентов
function App() {
  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
  ];

  return (
    <div>
      <UserList data={users} />
      <UserDetails data={users[0]} />
    </div>
  );
}

export default App;
```

### 5. _`D` - Принцип инверсии зависимостей_

_Модули верхнего уровня не должны зависеть от модулей нижнего уровня._ Вместо этого они должны зависеть от абстракций, а не от конкретных реализаций.

```jsx
import React from 'react';

// Интерфейс для зависимости
interface IDataService {
  fetchData(): Promise<any>;
}

// Конкретная реализация зависимости
class ApiService implements IDataService {
  fetchData(): Promise<any> {
    // Здесь может быть реализация запроса к API
    return Promise.resolve(/* Результат запроса */);
  }
}

// Компонент, использующий зависимость
class DataComponent extends React.Component {
  private dataService: IDataService;

  constructor(props: any) {
    super(props);
    this.dataService = new ApiService(); // Создание конкретной реализации зависимости
  }

  async componentDidMount() {
    const data = await this.dataService.fetchData();
    // Делаем что-то с полученными данными
  }

  render() {
    // Рендер компонента
  }
}

// Использование компонента
function App() {
  return (
    <div>
      <DataComponent />
    </div>
  );
}

export default App;
```

### Какие из принципов SOLID нельзя реализовать в функциональном компоненте?

В функциональных компонентах в React, которые используют хуки, некоторые из принципов SOLID могут быть более сложными или невозможными для строгой реализации. Вот несколько примеров:

1. _Принцип единственной ответственности (`Single Responsibility Principle, SRP`):_ Функциональные компоненты в React обычно служат для отображения интерфейса и управления состоянием компонента. В них может быть несколько ответственностей, таких как обработка событий, получение данных и рендеринг. Однако, вы можете стараться разбивать функциональные компоненты на более мелкие, чтобы каждая функция была ответственна только за одну конкретную задачу.
2. _Принцип открытости/закрытости (`Open/Closed Principle, OCP`):_ В функциональных компонентах может быть сложнее соблюдать этот принцип, особенно если требуется изменять поведение компонента через пропсы. Функциональные компоненты обычно более открыты для изменений, так как вы можете добавлять новые пропсы или изменять логику напрямую внутри компонента. Однако, вы можете стараться создавать компоненты с ясно определенными интерфейсами и использовать композицию и наследование, чтобы легко расширять функциональность компонентов.
3. _Принцип подстановки Барбары Лисков (`Liskov Substitution Principle, LSP`):_ В функциональных компонентах в React, основанных на хуках, наследование не используется, а подклассы не создаются. Вместо этого, функциональные компоненты могут использовать композицию и переиспользование хуков для достижения поведения, аналогичного подклассам. Несмотря на это, принцип LSP остается актуальным в отношении заменяемости компонентов и сохранения ожидаемого поведения при замене одного компонента другим.

---

[[200 Браузерное окружение|Назад]]
