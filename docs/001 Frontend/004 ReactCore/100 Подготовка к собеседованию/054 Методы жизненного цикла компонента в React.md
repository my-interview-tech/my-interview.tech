---
uid: 8NKXGZcT1VoZ01vPCbgpn
title: Методы жизненного цикла компонента в React
tags:
  - "#React"
  - "#Lifecycle"
  - "#componentDidMount"
  - "#shouldComponentUpdate"
  - "#componentDidUpdate"
  - "#componentWillUnmount"
  - "#componentDidCatch"
info:
  - "https://courses.arthur-nesterenko.dev/react/lifecycle/"
  - >-
    https://ru.reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html
draft: false
technology: ReactCore
specialty: Frontend
tools: []
order: 54
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

![[Pasted image 20230704175049.png|600]]

\*\*`UNSAFE_componentWillMount()`

`componentWillMount()` вызывается непосредственно перед монтированием. Он вызывается перед `render()`, поэтому синхронный вызов `setState()` в этом методе не вызовет дополнительную отрисовку. _Как правило, мы рекомендуем использовать `constructor()` вместо этого для инициализации состояния._

\*\*`componentDidMount()`

Когда элемент `componentDidMount()` вызван - это значит , что DOM-элемент гарантировано находится на странице и он проинициализирован.

```jsx
componentDidMount();
```

`componentDidMount()` используется для иницициализации (запросы к API, асинхронное получение данных и тд) Не используйте конструктор, для кода, который создаёт побочные эффекты.

Вы **можете сразу вызвать setState()** в `componentDidMount()`. Это вызовет дополнительный рендер перед тем, как браузер обновит экран. Гарантируется, что пользователь не увидит промежуточное состояние, даже если `render()` будет вызываться дважды. _Используйте этот подход с осторожностью, он может вызвать проблемы с производительностью._ В большинстве случаев начальное состояние лучше объявить в `constructor()`. Однако, это может быть необходимо для случаев, когда нужно измерить размер или положение DOM-узла, на основе которого происходит рендер. Например, для модальных окон или всплывающих подсказок.

\*\*`componentDidUpdate()`

```jsx
componentDidUpdate(prevProps, prevState, snapshot);
```

Он вызывается после того, как компонент обновился. А компонент обновляется после того, как получает новые `props` или `state` . Этот метод вызывается после `render` - в нём можно, к примеру, запрашивать новые данные для обновленных свойств.

```jsx
componentDidUpdate(prevProps) {
  // Популярный пример (не забудьте сравнить пропсы):
  if (this.props.userID !== prevProps.userID) {
    this.fetchData(this.props.userID);
  }
```

В `componentDidUpdate()` **можно вызывать `setState()`**, однако его **необходимо обернуть в условие**, как в примере выше, чтобы не возник бесконечный цикл. Вызов `setState()` влечет за собой дополнительный рендер, который незаметен для пользователя, но может повлиять на производительность компонента. Вместо «отражения» пропсов в состоянии рекомендуется использовать пропсы напрямую.

В тех редких случаях когда реализован метод жизненного цикла `getSnapshotBeforeUpdate()`, его результат передаётся `componentDidUpdate()` в качестве третьего параметра `snapshot`.

> Примечание: `componentDidUpdate()` не вызывается (после рендера) , если [`shouldComponentUpdate()`](https://ru.reactjs.org/docs/react-component.html#shouldcomponentupdate) возвращает `false`.

\*\*`getSnapshotBeforeUpdate()` - не реализован на хуках

```jsx
getSnapshotBeforeUpdate(prevProps, prevState);
```

`getSnapshotBeforeUpdate()` вызывается непосредственно перед тем, как последний отрисованный вывод будет зафиксирован, например, в DOM. Он позволяет вашему компоненту захватывать некоторую информацию из DOM (например, положение прокрутки), прежде чем она возможно будет изменена. Любое значение, возвращаемое этим жизненным циклом, будет передано как параметр `componentDidUpdate()`.

Этот не распространённый вариант использования, но он может быть в пользовательских интерфейсах, таких как цепочка сообщений в чатах, который должен обрабатывать позицию прокрутки особым образом.

Должно быть возвращено значение снимка (или `null`).

\*\*`componentWillUnmount()`

С помощью этого метода вызывается удаление компонента. Метод используется для очистки ресурсов (таймеры, интервалы, запросы к серверу и др)

В момент вызова метода DOM все еще находится на странице.

**Не используйте setState()** в `componentWillUnmount()`, так как компонент никогда не рендерится повторно. После того, как экземпляр компонента будет размонтирован, он никогда не будет примонтирован снова.

\*\*`componentDidCatch()` - не реализован на хуках

```jsx
componentDidCatch(error, info);
```

1.  `error` — перехваченная ошибка
2.  `info` — объект с ключом `componentStack`, содержащий [информацию о компоненте, в котором произошла ошибка](https://ru.reactjs.org/docs/error-boundaries.html#component-stack-traces).

Задача этого метода отлов ошибок из функций, которые отвечают за корректный рендер компонентов. Принцип работы метода схож с try/catch , т.е ошибку отлавливает каждый блок.

Не обрабатываются ошибки в event listener ' ах и в асинхронном коде (запросы к серверу и т.п.)

```jsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Обновите состояние так, чтобы следующий рендер показал запасной интерфейс.
    return { hasError: true };
  }

  componentDidCatch(error, info) {    // Пример "componentStack":    //   in ComponentThatThrows (created by App)    //   in ErrorBoundary (created by App)    //   in div (created by App)    //   in App    logComponentStackToMyService(info.componentStack);  }
  render() {
    if (this.state.hasError) {
      // Здесь можно рендерить запасной интерфейс
      return <h1>Что-то пошло не так.</h1>;
    }

    return this.props.children;
  }
}
```

Обработка ошибок в методе `componentDidCatch()` отличается между React-сборками для продакшена и разработки.

В процессе разработки ошибки будут подниматься (всплывать) наверх до объекта `window`, поэтому любой вызов `window.onerror` или `window.addEventListener('error', callback)` перехватит ошибки, которые были обработаны `componentDidCatch()`.

На продакшене, напротив, ошибки не всплывают, поэтому родительский обработчик ошибок перехватит только те ошибки, которые не были обработаны `componentDidCatch()`.

> Примечание:
>
> В случае ошибки вы можете рендерить запасной интерфейс с помощью `componentDidCatch()`, вызвав `setState`. Однако, этот способ скоро будет считаться устаревшим. Используйте `static getDerivedStateFromError()` для рендера резервного интерфейса.

---

[[004 ReactCore|Назад]]
