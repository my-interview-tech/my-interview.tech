---
uid: SotBu3cdJoZmGKyUUui84
title: Как работает setState?
tags:
  - "#React"
  - "#state"
  - "#setState"
info:
  - "[[0005 Рендеринг элементов|Рендеринг элементов]]"
draft: false
technology: ReactCore
specialty: Frontend
tools: []
order: 17
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

В setState () нужно передавать только изменения в State

---

## Введение

На этой странице представлены понятия «состояние» ( #state ) и «жизненный цикл» ( #lifecycle ) #React-компонент. Подробный [справочник API компонентов находится по этой ссылке](https://ru.reactjs.org/docs/react-component.html).

В качестве примера рассмотрим идущие часы из [предыдущего раздела](https://ru.reactjs.org/docs/rendering-elements.html#updating-the-rendered-element). В [[0005 Рендеринг элементов]] мы научились обновлять UI только одним способом — вызовом `root.render()`:

```jsx
const root = ReactDOM.createRoot(document.getElementById("root"));

function tick() {
  const element = (
    <div>
      <h1>Привет, мир!</h1>
      <h2>Сейчас {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  root.render(element);
}

setInterval(tick, 1000);
```

В этой главе мы узнаем, как инкапсулировать и обеспечить многократное использование компонента `Clock`. Компонент самостоятельно установит свой собственный таймер и будет обновляться раз в секунду.

Для начала, извлечём компонент, показывающий время:

```jsx
const root = ReactDOM.createRoot(document.getElementById("root"));

function Clock(props) {
  return (
    <div>
      <h1>Привет, мир!</h1>
      <h2>Сейчас {props.date.toLocaleTimeString()}.</h2>
    </div>
  );
}

function tick() {
  root.render(<Clock date={new Date()} />);
}

setInterval(tick, 1000);
```

Проблема в том, что компонент `Clock` не обновляет себя каждую секунду автоматически. Хотелось бы спрятать логику, управляющую таймером, внутри самого компонента `Clock`.

В идеале мы бы хотели реализовать `Clock` таким образом, чтобы компонент сам себя обновлял:

```jsx
root.render(<Clock />);
```

Для этого добавим так называемое «состояние» (state) в компонент `Clock`.

«Состояние» очень похоже на уже знакомые нам пропсы, отличие в том, что состояние контролируется и доступно только конкретному компоненту.

## Преобразование функционального компонента в классовый

Давайте преобразуем функциональный компонент `Clock` в классовый компонент за 5 шагов:

1.  Создаём [ES6-класс](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Classes) с таким же именем, указываем `React.Component` в качестве родительского класса
2.  Добавим в класс пустой метод `render()`
3.  Перенесём тело функции в метод `render()`
4.  Заменим `props` на `this.props` в теле `render()`
5.  Удалим оставшееся пустое объявление функции

```jsx
class Clock extends React.Component {
  render() {
    return (
      <div>
        <h1>Привет, мир!</h1>
        <h2>Сейчас {this.props.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

Теперь `Clock` определён как класс, а не функция.

Метод `render` будет вызываться каждый раз, когда происходит обновление. Так как мы рендерим `<Clock />` в один и тот же DOM-контейнер, мы используем единственный экземпляр класса `Clock` — поэтому мы можем задействовать внутреннее состояние и методы жизненного цикла.

## Добавим внутреннее состояние в класс

Переместим `date` из пропсов в состояние в три этапа:

1.  Заменим `this.props.date` на `this.state.date` в методе `render()`:

```jsx
class Clock extends React.Component {
  render() {
    return (
      <div>
        <h1>Привет, мир!</h1>
        <h2>Сейчас {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

2.  Добавим [конструктор класса](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Classes#Constructor), в котором укажем начальное состояние в переменной `this.state`:

```jsx
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }

  render() {
    return (
      <div>
        <h1>Привет, мир!</h1>
        <h2>Сейчас {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

Обратите внимание, что мы передаём `props` базовому (родительскому) конструктору:

```jsx
  constructor(props) {
    super(props);    this.state = {date: new Date()};
  }
```

Классовые компоненты всегда должны вызывать базовый конструктор с аргументом `props`.

3.  Удалим проп `date` из элемента `<Clock />`:

```jsx
root.render(<Clock />);
```

Позже мы вернём код таймера обратно и на этот раз поместим его в сам компонент.

Результат выглядит следующим образом:

```jsx
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }
  render() {
    return (
      <div>
        <h1>Привет, мир!</h1>
        <h2>Сейчас {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Clock />);
```

Теперь осталось только установить собственный таймер внутри `Clock` и обновлять компонент каждую секунду.

## Добавим методы жизненного цикла в класс

В приложениях со множеством компонентов очень важно освобождать используемые системные ресурсы, когда компоненты удаляются.

Первоначальный рендеринг компонента в DOM называется «монтирование» (mounting). Нам нужно [устанавливать таймер](https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/setInterval) всякий раз, когда это происходит.

Каждый раз когда DOM-узел, созданный компонентом, удаляется, происходит «размонтирование» (unmounting). Чтобы избежать утечки ресурсов, мы будем [сбрасывать таймер](https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/clearInterval) при каждом «размонтировании».

Объявим специальные методы, которые компонент будет вызывать при монтировании и размонтировании:

```jsx
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }

  componentDidMount() {}
  componentWillUnmount() {}
  render() {
    return (
      <div>
        <h1>Привет, мир!</h1>
        <h2>Сейчас {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

Эти методы называются «методами жизненного цикла» (lifecycle methods).

Метод `componentDidMount()` запускается после того, как компонент отрендерился в DOM — здесь мы и установим таймер:

```jsx
componentDidMount() {
    this.timerID = setInterval(() => this.tick(),
	1000 );
}
```

Обратите внимание, что мы сохраняем ID таймера в `this` (`this.timerID`).

Поля `this.props` и `this.state` в классах — особенные, и их устанавливает сам React. Вы можете вручную добавить новые поля, если компоненту нужно хранить дополнительную информацию (например, ID таймера).

Теперь нам осталось сбросить таймер в методе жизненного цикла `componentWillUnmount()`:

```jsx
  componentWillUnmount() {
    clearInterval(this.timerID);  }
```

Наконец, реализуем метод `tick()`. Он запускается таймером каждую секунду и вызывает `this.setState()`.

`this.setState()` планирует обновление внутреннего состояния компонента:

```jsx
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date(),
    });
  }

  render() {
    return (
      <div>
        <h1>Привет, мир!</h1>
        <h2>Сейчас {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Clock />);
```

Теперь часы обновляются каждую секунду.

Давайте рассмотрим наше решение и разберём порядок, в котором вызываются методы:

1.  Когда мы передаём `<Clock />` в `root.render()`, React вызывает конструктор компонента. `Clock` должен отображать текущее время, поэтому мы задаём начальное состояние `this.state` объектом с текущим временем. Позже мы обновим это состояние.
2.  React вызывает метод `render()` компонента `Clock`. Таким образом React узнаёт, что отобразить на экране. Далее React обновляет DOM так, чтобы он соответствовал выводу рендера `Clock`.
3.  Как только вывод рендера `Clock` вставлен в DOM, React вызывает метод жизненного цикла `componentDidMount()`. Внутри него компонент `Clock` указывает браузеру установить таймер, который будет вызывать `tick()` раз в секунду.
4.  Таймер вызывает `tick()` ежесекундно. Внутри `tick()` мы просим React обновить состояние компонента, вызывая `setState()` с текущим временем. React реагирует на изменение состояния и снова запускает `render()`. На этот раз `this.state.date` в методе `render()` содержит новое значение, поэтому React заменит DOM. Таким образом компонент `Clock` каждую секунду обновляет UI.
5.  Если компонент `Clock` когда-либо удалится из DOM, React вызовет метод жизненного цикла `componentWillUnmount()` и сбросит таймер.

## Как правильно использовать состояние

Важно знать три детали о правильном применении `setState()`.

### Не изменяйте состояние напрямую

В следующем примере повторного рендера не происходит:

```jsx
// Неправильно
this.state.comment = "Привет";
```

Вместо этого используйте `setState()`:

```jsx
// Правильно
this.setState({ comment: "Привет" });
```

Конструктор — это единственное место, где вы можете присвоить значение `this.state` напрямую.

### Обновления состояния могут быть асинхронными

React может сгруппировать несколько вызовов `setState()` в одно обновление для улучшения производительности.

Поскольку `this.props` и `this.state` могут обновляться асинхронно, вы не должны полагаться на их текущее значение для вычисления следующего состояния.

Например, следующий код может не обновить счётчик:

```jsx
// Неправильно
this.setState({
  counter: this.state.counter + this.props.increment,
});
```

Правильно будет использовать второй вариант вызова `setState()`, который принимает функцию, а не объект. Эта функция получит предыдущее состояние в качестве первого аргумента и значения пропсов непосредственно во время обновления в качестве второго аргумента:

```jsx
// Правильно
this.setState((state, props) => ({
  counter: state.counter + props.increment,
}));
```

В данном примере мы использовали [стрелочную функцию](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Functions/Arrow_functions), но можно использовать и обычные функции:

```jsx
// Правильно
this.setState(function (state, props) {
  return {
    counter: state.counter + props.increment,
  };
});
```

### Обновления состояния объединяются

Когда мы вызываем `setState()`, React объединит аргумент (новое состояние) c текущим состоянием.

Например, состояние может состоять из нескольких независимых полей:

```jsx
  constructor(props) {
    super(props);
    this.state = {
      posts: [],      comments: []    };
  }
```

Их можно обновлять по отдельности с помощью отдельных вызовов `setState()`:

```jsx
  componentDidMount() {
    fetchPosts().then(response => {
      this.setState({
        posts: response.posts      });
    });

    fetchComments().then(response => {
      this.setState({
        comments: response.comments      });
    });
  }
```

Состояния объединяются поверхностно, поэтому вызов `this.setState({comments})` оставляет `this.state.posts` нетронутым, но полностью заменяет `this.state.comments`.

## Однонаправленный поток данных

В иерархии компонентов ни родительский, ни дочерние компоненты не знают, задано ли состояние другого компонента. Также не важно, как был создан определённый компонент — с помощью функции или с помощью класса.5

Состояние часто называют «локальным», «внутренним» или инкапсулированным. Оно доступно только для самого компонента и скрыто от других.

Компонент может передать своё состояние вниз по дереву в виде пропсов дочерних компонентов:

```jsx
<FormattedDate date={this.state.date} />
```

Компонент `FormattedDate` получает `date` через пропсы, но он не знает, откуда они взялись изначально — из состояния `Clock`, пропсов `Clock` или просто JavaScript-выражения:

```jsx
function FormattedDate(props) {
  return <h2>Сейчас {props.date.toLocaleTimeString()}.</h2>;
}
```

Это, в общем, называется «нисходящим» («top-down») или «однонаправленным» («unidirectional») потоком данных. Состояние всегда принадлежит определённому компоненту, а любые производные этого состояния могут влиять только на компоненты, находящиеся «ниже» в дереве компонентов.

Если представить иерархию компонентов как водопад пропсов, то состояние каждого компонента похоже на дополнительный источник, который сливается с водопадом в произвольной точке, но также течёт вниз.

Чтобы показать, что все компоненты действительно изолированы, создадим компонент `App`, который рендерит три компонента `<Clock>`:

```jsx
function App() {
  return (
    <div>
      <Clock />
      <Clock />
      <Clock />
    </div>
  );
}
```

У каждого компонента `Clock` есть собственное состояние таймера, которое обновляется независимо от других компонентов.

В React-приложениях, имеет ли компонент состояние или нет — это внутренняя деталь реализации компонента, которая может меняться со временем. Можно использовать компоненты без состояния в компонентах с состоянием, и наоборот.

---
