---
uid: l87bbA-_hXNWShkXt0CG5
title: Что такое `useContext()`?
tags:
  - React
  - useContext
  - React19
info:
  - "https://react.dev/reference/react/useContext"
  - "https://dev.to/ilizette/understanding-usecontext-in-react-26gf"
draft: false
technology: ReactCore
specialty: Frontend
tools: []
order: 82
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

_`Context API`_ - это механизм, который позволяет передавать данные через дерево компонентов, без необходимости передавать их через промежуточные компоненты.

_В React 16.3 была представлена новая версия `Context API`, которая упростила передачу данных через дерево компонентов и добавила новые возможности для управления контекстом._

В новой версии Context API введены два новых компонента - `Provider` и `Consumer`. Компонент `Provider` позволяет определить контекст и передать его значения дочерним компонентам. Компонент `Consumer` позволяет получить значения контекста из родительского компонента.

Также были добавлены новые методы для обновления контекста - `createContext()` и `useContext()`. Метод `createContext()` позволяет создать контекст с начальными значениями, а метод `useContext()` позволяет получить значения контекста в функциональных компонентах.

Пример использования Context API:

```jsx
import React, { createContext, useState, useContext } from "react";

// Создание контекста
const ThemeContext = createContext("light");

function App() {
  const [theme, setTheme] = useState("light");

  // Обработчик изменения темы
  const handleThemeChange = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  // Передача значения контекста через Provider
  return (
    <ThemeContext.Provider value={theme}>
      <Toolbar onThemeChange={handleThemeChange} />
    </ThemeContext.Provider>
  );
}

function Toolbar(props) {
  return (
    <div>
      <ThemedButton onClick={props.onThemeChange} />
    </div>
  );
}

function ThemedButton(props) {
  // Получение значения контекста через useContext
  const theme = useContext(ThemeContext);
  return (
    <button
      {...props}
      style={{
        backgroundColor: theme === "light" ? "#fff" : "#000",
        color: theme === "light" ? "#000" : "#fff",
      }}
    />
  );
}

export default App;
```

В данном примере мы создаем контекст `ThemeContext` и определяем начальное значение `light`. Мы передаем значение контекста через компонент `Provider` и обрабатываем изменение темы в родительском компоненте `App`. В дочерних компонентах `Toolbar` и `ThemedButton` мы получаем значение контекста через `useContext()` и используем его для определения стилей элементов. При нажатии на кнопку в компоненте `ThemedButton` вызывается функция `handleThemeChange()`, которая обновляет значение состояния и передает его через контекст.

### **React.Context**

Контекст позволяет передавать данные через дерево компонентов без необходимости передавать пропсы на промежуточных уровнях.

Для того, чтобы создать контекст, используем :

```jsx
const { Provider , Consumer } = React.createService()

<Provider value={someValue}>
	.. // провайдер оборачивает часть приложения

// Компонент `Provider` принимает проп `value`, который будет передан во все компоненты, использующие этот контекст и являющиеся потомками этого компонента `Provider`

// *Предостережения*
</Provider>
```

```jsx
<Consumer>
  {" "}
  {
    (someValue) => <MyComponent data={someValue} />

    // Эта функция принимает текущее значение контекста и возвращает React-компонент. Передаваемый аргумент `value` будет равно значению компонента `Provider`.
    // Если такого компонента `Provider` не существует, аргумент `value` будет равен значению `defaultValue`, которое было передано в `createContext()`.
  }{" "}
</Consumer>
```

Подробнее про паттерн «_функция как дочерний компонент_» можно узнать на странице [Рендер-пропсы](https://ru.reactjs.org/docs/render-props.html).

Контекст позволяет передавать данные через дерево компонентов без необходимости передавать пропсы на промежуточных уровнях.

Для того, чтобы создать контекст, используем:

```jsx
const MyContext = React.createContext(defaultValue);
```

Создаёт объект `Context`. Когда React рендерит компонент, который подписан на этот объект, React получит текущее значение контекста из ближайшего подходящего `Provider` выше в дереве компонентов.

%%Аргумент `defaultValue` используется **только** в том случае, если для компонента нет подходящего `Provider` выше в дереве. Значение по умолчанию может быть полезно для тестирования компонентов в изоляции без необходимости оборачивать их. Обратите внимание: если передать `undefined` как значение `Provider`, компоненты, использующие этот контекст, не будут использовать `defaultValue`.%%

### **Context.Provider**

```jsx
<MyContext.Provider value={/* некоторое значение */}>
```

Каждый объект `Context` используется вместе с `Provider` компонентом, который позволяет дочерним компонентам, использующим этот контекст, подписаться на его изменения.

%%Компонент `Provider` принимает проп `value`, который будет передан во все компоненты, использующие этот контекст и являющиеся потомками этого компонента `Provider`. Один `Provider` может быть связан с несколькими компонентами, потребляющими контекст. Так же компоненты `Provider` могут быть вложены друг в друга, переопределяя значение контекста глубже в дереве.%%

Все потребители, которые являются потомками Provider, будут повторно рендериться, как только проп `value` у Provider изменится. Потребитель (включая [`.contextType`](https://ru.reactjs.org/docs/context.html#classcontexttype) и [`useContext`](https://ru.reactjs.org/docs/hooks-reference.html#usecontext)) перерендерится при изменении контекста, даже если его родитель, не использующий данный контекст, блокирует повторные рендеры с помощью `shouldComponentUpdate`.

Изменения определяются с помощью сравнения нового и старого значения, используя алгоритм, аналогичный [`Object.is`](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Object/is#Description).

> Примечание
> Способ, по которому определяются изменения, может вызвать проблемы при передаче объекта в `value`: смотрите [Предостережения](https://ru.reactjs.org/docs/context.html#caveats).

### **Class.contextType**

```jsx
class MyClass extends React.Component {
  componentDidMount() {
    let value = this.context;
    /* выполнить побочный эффект на этапе монтирования, используя значение MyContext */
  }
  componentDidUpdate() {
    let value = this.context;
    /* ... */
  }
  componentWillUnmount() {
    let value = this.context;
    /* ... */
  }
  render() {
    let value = this.context;
    /* отрендерить что-то, используя значение MyContext */
  }
}
MyClass.contextType = MyContext;
```

В свойство класса `contextType` может быть назначен объект контекста, созданный с помощью [`React.createContext()`](https://ru.reactjs.org/docs/context.html#reactcreatecontext). С помощью этого свойства вы можете использовать ближайшее и актуальное значение указанного контекста при помощи `this.context`. В этом случае вы получаете доступ к контексту, как во всех методах жизненного цикла, так и в рендер-методе.

> Примечание
> Вы можете подписаться только на один контекст, используя этот API. В случае, если вам необходимо использовать больше одного, смотрите [Использование нескольких контекстов](https://ru.reactjs.org/docs/context.html#consuming-multiple-contexts).
>
> Если вы используете экспериментальный [синтаксис публичных полей класса](https://babeljs.io/docs/plugins/transform-class-properties/), вы можете использовать **static** поле класса, чтобы инициализировать ваш `contextType`.

```jsx
class MyClass extends React.Component {
  static contextType = MyContext;
  render() {
    let value = this.context;
    /* отрендерить что-то, используя значение MyContext */
  }
}
```

### **Context.Consumer**

```jsx
<MyContext.Consumer>
  {value => /* отрендерить что-то, используя значение контекста */}
</MyContext.Consumer>
```

`Consumer` — это React-компонент, который подписывается на изменения контекста. В свою очередь, использование этого компонента позволяет вам подписаться на контекст в [функциональном компоненте](https://ru.reactjs.org/docs/components-and-props.html#function-and-class-components).

`Consumer` принимает [функцию в качестве дочернего компонента](https://ru.reactjs.org/docs/render-props.html#using-props-other-than-render). Эта функция принимает текущее значение контекста и возвращает React-компонент. Передаваемый аргумент `value` будет равен ближайшему (вверх по дереву) значению этого контекста, а именно пропу `value` компонента `Provider`. Если такого компонента `Provider` не существует, аргумент `value` будет равен значению `defaultValue`, которое было передано в `createContext()`.

> Примечание
> Подробнее про паттерн «_функция как дочерний компонент_» можно узнать на странице [Рендер-пропсы](https://ru.reactjs.org/docs/render-props.html).

### **Context.displayName**

Объекту `Context` можно задать строковое свойство `displayName`. React DevTools использует это свойство при отображении контекста.

К примеру, следующий компонент будет отображаться под именем MyDisplayName в DevTools:

```jsx
const MyContext = React.createContext(/* некоторое значение */);
MyContext.displayName = 'MyDisplayName';
<MyContext.Provider> // "MyDisplayName.Provider" в DevTools
<MyContext.Consumer> // "MyDisplayName.Consumer" в DevTools
```

#### **Динамический контекст**

Более сложный пример динамических значений для UI-темы:

```jsx theme-context.js
export const themes = {
  light: {
    foreground: '#000000',
    background: '#eeeeee',
  },
  dark: {
    foreground: '#ffffff',
    background: '#222222',
  },
};

export const ThemeContext = React.createContext(  themes.dark // значение по умолчанию);
```

```jsx themed-button.js
import { ThemeContext } from "./theme-context";

class ThemedButton extends React.Component {
  render() {
    let props = this.props;
    let theme = this.context;
    return <button {...props} style={{ backgroundColor: theme.background }} />;
  }
}
ThemedButton.contextType = ThemeContext;
export default ThemedButton;
```

```jsx app.js
import {ThemeContext, themes} from './theme-context';
import ThemedButton from './themed-button';

// Промежуточный компонент, который использует ThemedButton
function Toolbar(props) {
  return (
    <ThemedButton onClick={props.changeTheme}>
      Change Theme
    </ThemedButton>
  );
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: themes.light,
    };

    this.toggleTheme = () => {
      this.setState(state => ({
        theme:
          state.theme === themes.dark
            ? themes.light
            : themes.dark,
      }));
    };
  }

  render() {
    // ThemedButton внутри ThemeProvider использует    // значение светлой UI-темы из состояния, в то время как    // ThemedButton, который находится вне ThemeProvider,    // использует тёмную UI-тему из значения по умолчанию    return (
      <Page>
        <ThemeContext.Provider value={this.state.theme}>          <Toolbar changeTheme={this.toggleTheme} />        </ThemeContext.Provider>        <Section>
          <ThemedButton />        </Section>
      </Page>
    );
  }
}

const root = ReactDOM.createRoot(
  document.getElementById('root')
);
root.render(<App />);
```

#### **Изменение контекста из вложенного компонента**

Довольно часто необходимо изменить контекст из компонента, который находится где-то глубоко в дереве компонентов. В этом случае вы можете добавить в контекст функцию, которая позволит потребителям изменить значение этого контекста:

```jsx theme-context.js
// Убедитесь, что форма значения по умолчанию,
// передаваемого в createContext, совпадает с формой объекта,
// которую ожидают потребители контекста.
export const ThemeContext = React.createContext({
  theme: themes.dark,
  toggleTheme: () => {},
});
```

```jsx theme-toggler-button.js
import {ThemeContext} from './theme-context';

function ThemeTogglerButton() {
  // ThemeTogglerButton получает из контекста  // не только значение UI-темы, но и функцию toggleTheme.  return (
    <ThemeContext.Consumer>
      {({theme, toggleTheme}) => (        <button
          onClick={toggleTheme}
          style={{backgroundColor: theme.background}}>
          Toggle Theme
        </button>
      )}
    </ThemeContext.Consumer>
  );
}

export default ThemeTogglerButton;
```

```jsx app.js
import {ThemeContext, themes} from './theme-context';
import ThemeTogglerButton from './theme-toggler-button';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.toggleTheme = () => {
      this.setState(state => ({
        theme:
          state.theme === themes.dark
            ? themes.light
            : themes.dark,
      }));
    };

    // Состояние хранит функцию для обновления контекста,    // которая будет также передана в Provider-компонент.    this.state = {
      theme: themes.light,
      toggleTheme: this.toggleTheme,    };
  }

  render() {
    // Всё состояние передаётся в качестве значения контекста    return (
      <ThemeContext.Provider value={this.state}>        <Content />
      </ThemeContext.Provider>
    );
  }
}

function Content() {
  return (
    <div>
      <ThemeTogglerButton />
    </div>
  );
}

const root = ReactDOM.createRoot(
  document.getElementById('root')
);
root.render(<App />);
```

#### **Использование нескольких контекстов**

Чтобы последующие рендеры (связанные с контекстом) были быстрыми, React делает каждого потребителя контекста отдельным компонентом в дереве.

```jsx
// Контекст UI-темы, со светлым значением по умолчанию
const ThemeContext = React.createContext("light");

// Контекст активного пользователя
const UserContext = React.createContext({
  name: "Guest",
});

class App extends React.Component {
  render() {
    const { signedInUser, theme } = this.props;

    // Компонент App, который предоставляет начальные значения контекстов
    return (
      <ThemeContext.Provider value={theme}>
        {" "}
        <UserContext.Provider value={signedInUser}>
          {" "}
          <Layout />
        </UserContext.Provider>{" "}
      </ThemeContext.Provider>
    );
  }
}

function Layout() {
  return (
    <div>
      <Sidebar />
      <Content />
    </div>
  );
}

// Компонент, который может использовать несколько контекстов
function Content() {
  return (
    <ThemeContext.Consumer>
      {" "}
      {(theme) => (
        <UserContext.Consumer>
          {" "}
          {(user) => <ProfilePage user={user} theme={theme} />}{" "}
        </UserContext.Consumer>
      )}{" "}
    </ThemeContext.Consumer>
  );
}
```

Если два или более значений контекста часто используются вместе, возможно, вам стоит рассмотреть создание отдельного компонента, который будет передавать оба значения дочерним компонентам с помощью паттерна «рендер-пропс».

#### **Предостережения**

Контекст использует сравнение по ссылкам, чтобы определить, когда запускать последующий рендер. Из-за этого существуют некоторые подводные камни, например, случайные повторные рендеры потребителей, при перерендере родителя Provider-компонента. В следующем примере будет происходить повторный рендер потребителя каждый повторный рендер Provider-компонента, потому что новый объект, передаваемый в `value`, будет создаваться каждый раз:

```jsx
class App extends React.Component {
  render() {
    return (
      <MyContext.Provider value={{ something: "something" }}>
        {" "}
        <Toolbar />
      </MyContext.Provider>
    );
  }
}
```

Один из вариантов решения этой проблемы — хранение этого объекта в состоянии родительского компонента:

```jsx
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: { something: "something" },
    };
  }

  render() {
    return (
      <MyContext.Provider value={this.state.value}>
        {" "}
        <Toolbar />
      </MyContext.Provider>
    );
  }
}
```

### **Отличия между useContext() и Redux**

| useContext()                                                                                                       | Redux                                                                     |
| ------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------- |
| useContext() - это хук                                                                                             | Redux - это библиотека управления состоянием.                             |
| Он используется для обмена данными.                                                                                | _Он используется для управления данными и состоянием._                    |
| Изменения вносятся с учетом значения контекста.                                                                    | Изменения вносятся с помощью чистых функций, т.е. редукторов.             |
| Мы можем изменить состояние в нем.                                                                                 | _Состояние доступно только для чтения._ Мы не можем изменить их напрямую. |
| Он повторно рендерит все компоненты всякий раз, когда происходит какое-либо обновление в prop значения поставщика. | Производит только повторный рендеринг обновленных компонентов.            |
| Его лучше использовать с небольшими приложениями.                                                                  | Идеально подходит для более крупных применений.                           |
| Хук легче для понимания и требует меньше кода.                                                                     | Redux довольно сложен для понимания.                                      |

### as React19

В React 19 вы можете использовать `<Context>` в качестве провайдера вместо `<Context.Provider>`:

```javascript
const ThemeContext = createContext("");

function App({ children }) {
  return <ThemeContext value="dark">{children}</ThemeContext>;
}
```

Новые провайдеры контекста могут использовать `<Context>`, и мы опубликуем codemod для преобразования существующих провайдеров. В будущих версиях мы планируем объявить `<Context.Provider>` устаревшим.

---

[[004 ReactCore|Назад]]
