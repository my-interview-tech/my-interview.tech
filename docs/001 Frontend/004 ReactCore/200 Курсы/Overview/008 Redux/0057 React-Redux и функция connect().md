---
uid: Lzw1IEwTKZwXRFxPNBam6
title: React-Redux и функция connect()
tags:
  - "#React"
  - "#Redux"
  - "#connect"
info:
  - "https://habr.com/ru/companies/ruvds/articles/423157/"
draft: false
technology: ReactCore
specialty: Frontend
tools: []
order: 57
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

react-redux упрощает интеграцию react + redux

Provider делает #store доступным всему дереву компонентов (через контекст)
connect() - компонент высшего порядка, который передаёт значения из store в компонент.

```jsx
const mapStateToProps = (state) => {
  return { name: state.name, age: state.age };
};

export default connect(mapStateToProps)(MyComponent);
```

---

## Введение

В статье, перевод которой мы публикуем сегодня, речь пойдёт о том, как создавать в React-приложениях компоненты-контейнеры, которые связаны с состоянием Redux. Этот материал основан на описании механизма управления состоянием в React с применением пакета [react-redux](https://github.com/reduxjs/react-redux). Предполагается, что у вас уже есть базовое понимание архитектуры и API библиотек, о которых мы будем говорить. Если это не так — обратитесь к документации по [React](https://reactjs.org/docs/) и [Redux](https://redux.js.org/).

[![image](https://habrastorage.org/r/w1560/getpro/habr/post_images/35f/0eb/fea/35f0ebfea2178696cb95ede9f78407c9.jpg)](https://habr.com/company/ruvds/blog/423157/)

## Об управлении состоянием в JavaScript-приложениях

React предоставляет разработчику два основных механизма для передачи данных компонентам. Это — свойства (props) и состояние (state). Свойства предназначены только для чтения и позволяют родительским компонентам передавать дочерним компонентам атрибуты. Состояние — это локальная сущность, инкапсулированная внутри компонента, которая может в любое время, в жизненном цикле компонента, измениться.

Так как состояние — это крайне полезный механизм, используемый для создания мощных динамических React-приложений, возникает необходимость в правильном управлении им. В настоящее время существует несколько библиотек, которые предоставляют хорошо структурированную архитектуру для управления состоянием приложений. Среди них — [Flux](https://facebook.github.io/flux), [Redux](https://redux.js.org/), [MobX](https://mobx.js.org/).

Redux — это библиотека, предназначенная для создания контейнеров, используемых для хранения состояния приложения. Она предлагает разработчику понятные инструменты для управления состоянием, которые ведут себя предсказуемо. Данная библиотека подходит как для приложений, написанных на чистом JavaScript, так и для проектов, при разработке которых использовались какие-нибудь фреймворки. Redux отличается маленькими размерами, но при этом позволяет писать надёжные приложения, работающие в различных средах.

Вот как создают хранилища Redux:

```jsx
import { createStore } from "redux";

const initialState = {
  auth: { loggedIn: false },
};

const store = createStore((state = initialState, action) => {
  switch (action.type) {
    case "LOG_IN":
      return { ...state, auth: { loggedIn: true } };
      break;

    case "LOG_OUT":
      return { ...state, auth: { loggedIn: false } };
      break;

    default:
      return state;
      break;
  }
});
```

## Пакет react-redux

Пакет react-redux предоставляет привязки React для контейнера состояния Redux, чрезвычайно упрощая подключение React-приложения к хранилищу Redux. Это позволяет разделять компоненты React-приложения, основываясь на их связи с хранилищем. А именно, речь идёт о следующих видах компонентов:

1.  _Презентационные компоненты._ Они отвечают лишь за внешний вид приложения и не осведомлены о состоянии Redux. Они получают данные через свойства и могут вызывать коллбэки, которые также передаются им через свойства.
2.  _Компоненты-контейнеры._ Они ответственны за работу внутренних механизмов приложения и взаимодействуют с состоянием Redux. Их часто создают с использованием react-redux, они могут осуществлять диспетчеризацию действий Redux. Кроме того, они подписываются на изменения состояния.

Подробности о подобном подходе к разделению ответственности компонентов можно почитать [здесь](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0). В этом материале мы будем, преимущественно, говорить о компонентах-контейнерах, подключённых к состоянию Redux с использованием react-redux.

Пакет react-redux обладает очень простым интерфейсом. В частности, самое интересное в этом интерфейсе сводится к следующему:

1.  `<Provider store>` — позволяет создавать обёртку для React-приложения и делать состояние Redux доступным для всех компонентов-контейнеров в его иерархии.
2.  `connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])` — позволяет создавать компоненты высшего порядка. Это нужно для создания компонентов-контейнеров на основе базовых компонентов React.

Установить react-redux с целью использования этого пакета в проекте можно так:

```bash
npm install react-redux --save
```

Исходя из предположения о том, что вы уже настроили хранилище Redux для своего React-приложения, вот пример подключения приложения к хранилищу Redux:

```jsx
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import createStore from "./createReduxStore";

const store = createStore();
const rootElement = document.getElementById("root");

ReactDOM.render(
  <Provider store={store}>
       
    <AppRootComponent /> 
  </Provider>,
  rootElement,
);
```

Теперь вы можете создавать компоненты-контейнеры, которые подключены к хранилищу Redux. Делается это в пределах иерархии `AppRootComponent` с использованием API `connect()`.

## Когда нужно использовать connect()?

### Создание компонентов-контейнеров

Как уже было сказано, API react-redux `connect()` используется для создания компонентов-контейнеров, которые подключены к хранилищу Redux. Хранилище, к которому осуществляется подключение, получают от самого верхнего предка компонента с использованием механизма контекста React. Функция `connect()` не понадобится вам в том случае, если вы создаёте лишь презентационные компоненты.

Если вам, в React-компоненте, нужно получать данные из хранилища, или требуется диспетчеризовать действия, или нужно делать и то и другое, вы можете преобразовать обычный компонент в компонент-контейнер, обернув его в компонент высшего порядка, возвращаемый функцией `connect()` из react-redux. Вот как это выглядит:

```jsx
import React from "react";
import { connect } from "react-redux";
import Profile from "./components/Profile";

function ProfileContainer(props) {
  return props.loggedIn ? (
    <Profile profile={props.profile} />
  ) : (
    <div>Please login to view profile.</div>
  );
}

const mapStateToProps = function (state) {
  return {
    profile: state.user.profile,
    loggedIn: state.auth.loggedIn,
  };
};

export default connect(mapStateToProps)(ProfileContainer);
```

### Избавление от необходимости ручного оформления подписки на хранилище Redux

Вы можете создать компонент-контейнер самостоятельно и вручную подписать компонент на хранилище Redux, используя команду `store.subscribe()`. Однако использование функции `connect()` означает применение некоторых улучшений и оптимизаций производительности, которые, вы, возможно, не сможете задействовать при использовании других механизмов.

В следующем примере мы пытаемся вручную создать компонент-контейнер и подключить его к хранилищу Redux, оформляя подписку на него. Здесь мы стремимся реализовать тот же функционал, который показан в предыдущем примере.

```jsx
import React, { Component } from "react";
import store from "./reduxStore";
import Profile from "./components/Profile";

class ProfileContainer extends Component {
  state = this.getCurrentStateFromStore();
  getCurrentStateFromStore() {
    return {
      profile: store.getState().user.profile,
      loggedIn: store.getState().auth.loggedIn,
    };
  }
  updateStateFromStore = () => {
    const currentState = this.getCurrentStateFromStore();
    if (this.state !== currentState) {
      this.setState(currentState);
    }
  };
  componentDidMount() {
    this.unsubscribeStore = store.subscribe(this.updateStateFromStore);
  }
  componentWillUnmount() {
    this.unsubscribeStore();
  }
  render() {
    const { loggedIn, profile } = this.state;
    return loggedIn ? (
      <Profile profile={profile} />
    ) : (
      <div>Please login to view profile.</div>
    );
  }
}

export default ProfileContainer;
```

Функция `connect()`, кроме того, даёт разработчику дополнительную гибкость, позволяя настраивать компоненты-контейнеры на получение динамических свойств, основываясь на свойствах, первоначально им переданных. Это оказывается очень кстати для получения выборок из состояния, основываясь на свойствах, или для привязки генераторов действий к конкретной переменной из свойств.

Если ваше React-приложение использует несколько хранилищ Redux, то `connect()` позволяет легко указывать конкретное хранилище, к которому должен быть подключён компонент-контейнер.

## Анатомия connect()

Функция `connect()`, предоставляемая пакетом react-redux, может принимать до четырёх аргументов, каждый из которых является необязательным. После вызова функции `connect()` возвращается компонент высшего порядка, который можно использовать для оборачивания любого компонента React.

Так как функция возвращает компонент высшего порядка, её нужно вызвать повторно, передав базовый компонент React, для того, чтобы конвертировать его в компонент-контейнер:

```jsx
const ContainerComponent = connect()(BaseComponent);
```

Вот сигнатура функции `connect()`:

```
connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])
```

### Аргумент mapStateToProps

Аргумент `mapStateToProps` является функцией, которая возвращает либо обычный объект, либо другую функцию. Передача этого аргумента `connect()` приводит к подписке компонента-контейнера на обновления хранилища Redux. Это означает, что функция `mapStateToProps` будет вызываться каждый раз, когда состояние хранилища изменяется. Если вам слежение за обновлениями состояния не интересно, передайте `connect()` в качестве значения этого аргумента `undefined` или `null`.

Функция `mapStateToProps` объявляется с двумя параметрами, второй из которых является необязательным. Первый параметр представляет собой текущее состояние хранилища Redux. Второй параметр, если его передают, представляет собой объект свойств, переданных компоненту:

```
const mapStateToProps = function(state) {
  return {
    profile: state.user.profile,
    loggedIn: state.auth.loggedIn
  }
}

export default connect(mapStateToProps)(ProfileComponent);
```

Если из `mapStateToProps` будет возвращён обычный объект, то возвращённый объект `stateProps` объединяется со свойствами компонента. Получить доступ к этим свойствам в компоненте можно так:

```
function ProfileComponent(props) {
  return (
    props.loggedIn
      ? <Profile profile={props.profile} />
      : <div>Please login to view profile.</div>
  )
}
```

Если же `mapStateToProps` возвращает функцию, то эта функция используется как `mapStateToProps` для каждого экземпляра компонента. Это может пригодиться для улучшения производительности рендеринга и для мемоизации.

### ▍Аргумент mapDispatchToProps

Аргумент `mapDispatchToProps` может быть либо объектом, либо функцией, которая возвращает либо обычный объект, либо другую функцию. Для того чтобы лучше проиллюстрировать работу `mapDispatchToProps`, нам понадобятся генераторы действий. Предположим, у нас имеются следующие генераторы:

```
export const writeComment = (comment) => ({
  comment,
  type: 'WRITE_COMMENT'
});

export const updateComment = (id, comment) => ({
  id,
  comment,
  type: 'UPDATE_COMMENT'
});

export const deleteComment = (id) => ({
  id,
  type: 'DELETE_COMMENT'
});
```

Теперь рассмотрим различные варианты использования `mapDispatchToProps`.

#### Стандартная реализация, используемая по умолчанию

Если вы не используете собственную реализацию `mapDispatchToProps`, представленную объектом или функцией, будет использована стандартная реализация, при применении которой осуществляется внедрение метода хранилища `dispatch()` в качестве свойства для компонента. Пользоваться этим свойством в компоненте можно так:

```
import React from 'react';
import { connect } from 'react-redux';
import { updateComment, deleteComment } from './actions';

function Comment(props) {
  const { id, content } = props.comment;
  
  // Вызов действий через props.dispatch()
  const editComment = () => props.dispatch(updateComment(id, content));
  const removeComment = () => props.dispatch(deleteComment(id));
  
  return (
    <div>
      <p>{ content }</p>
      <button type="button" onClick={editComment}>Edit Comment</button>
      <button type="button" onClick={removeComment}>Remove Comment</button>
    </div>
  )
}

export default connect()(Comment);
```

#### Передача объекта

Если в качестве аргумента `mapDispatchToProps` используется объект, то каждая функция в объекте будет воспринята в качестве генератора действий Redux и обёрнута в вызов метода хранилища `dispatch()`, что позволит вызывать его напрямую. Получившийся в результате объект с генераторами действий, `dispatchProps`, будет объединён со свойствами компонента.

В следующем примере показан пример конструирования аргумента `mapDispatchToProps`, представляющего собой объект с генераторами действий, а так же то, как генераторы могут быть использованы в виде свойств компонента React:

```
import React from 'react';
import { connect } from 'react-redux';
import { updateComment, deleteComment } from './actions';

function Comment(props) {
  const { id, content } = props.comment;
  
  // Действия, представленные свойствами компонента, вызываются напрямую
  const editComment = () => props.updatePostComment(id, content);
  const removeComment = () => props.deletePostComment(id);
  
  return (
    <div>
      <p>{ content }</p>
      <button type="button" onClick={editComment}>Edit Comment</button>
      <button type="button" onClick={removeComment}>Remove Comment</button>
    </div>
  )
}

// Объект с генераторами действий
const mapDispatchToProps = {
  updatePostComment: updateComment,
  deletePostComment: deleteComment
}

export default connect(null, mapDispatchToProps)(Comment);
```

#### Передача функции

При использовании в качестве аргумента `mapDispatchToProps` функции программист должен самостоятельно позаботиться о возврате объекта `dispatchProps`, который осуществляет привязку генераторов действий с использованием метода хранилища `dispatch()`. Эта функция принимает, в качестве первого параметра, метод хранилища `dispatch()`. Как и в случае с `mapStateToProps`, функция также может принимать необязательный второй параметр `ownProps`, который описывает маппинг с исходными свойствами, переданными компоненту.

Если эта функция возвращает другую функцию, то возвращённая функция используется в роли `mapDispatchToProps`, что может быть полезным для целей повышения производительности рендеринга и мемоизации.

Вспомогательная функция `bindActionCreators()` из Redux может быть использована внутри этой функции для осуществления привязки генераторов действий к методу хранилища `dispatch()`.

В следующем примере показано использование, в роли `mapDispatchToProps`, функции. Здесь же продемонстрирована работа со вспомогательной функцией `bindActionCreators()`, применяемой для привязки генераторов действий для работы с комментариями к `props.actions` компонента React:

```
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as commentActions from './actions';

function Comment(props) {
  const { id, content } = props.comment;
  const { updateComment, deleteComment } = props.actions;
  
  // Вызов действий из props.actions
  const editComment = () => updateComment(id, content);
  const removeComment = () => deleteComment(id);
  
  return (
    <div>
      <p>{ content }</p>
      <button type="button" onClick={editComment}>Edit Comment</button>
      <button type="button" onClick={removeComment}>Remove Comment</button>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(commentActions, dispatch)
  }
}

export default connect(null, mapDispatchToProps)(Comment);
```

### ▍Аргумент mergeProps

Если функции `connect()` передаётся аргумент `mergeProps`, то он представляет собой функцию, которая принимает следующие три параметра:

- `stateProps` — объект свойств, возвращённый из вызова `mapStateToProps()`.
- `dispatchProps` — объект свойств с генераторами действий из `mapDispatchToProps()`.
- `ownProps` — исходные свойства, полученные компонентом.

Эта функция возвращает простой объект со свойствами, который будет передан заключённому в обёртку компоненту. Это полезно для осуществления условного маппинга части состояния хранилища Redux или генераторов действий на основе свойств.

Если `connect()` не передают эту функцию, то используется её стандартная реализация:

```
const mergeProps = (stateProps, dispatchProps, ownProps) => {
  return Object.assign({}, ownProps, stateProps, dispatchProps)
}
```

### ▍Аргумент, представляющий собой объект с параметрами

Необязательный объект, передаваемый функции `connect()` в качестве четвёртого аргумента, содержит параметры, предназначенные для изменения поведения этой функции. Так, `connect()` представляет собой специальную реализации функции `connectAdvanced()`, она принимает большинство параметров, доступных `connectAdvanced()`, а также некоторые дополнительные параметры.

[Вот](https://github.com/reduxjs/react-redux/blob/master/docs/api.md) страница документации, ознакомившись с которой, вы можете узнать о том, какие параметры можно использовать с `connect()`, и о том, как они модифицируют поведение этой функции.

## Использование функции connect()

### Создание хранилища

Прежде чем преобразовывать обычный компонент React в компонент-контейнер с использованием `connect()`, нужно создать хранилище Redux, к которому будет подключён этот компонент.

Предположим, что у нас имеется компонент-контейнер `NewComment`, который используется для добавления новых комментариев к публикации, и, кроме того, выводит кнопку для отправки комментария. Код, описывающий этот компонент, может выглядеть так:

```jsx
import React from "react";
import { connect } from "react-redux";

class NewComment extends React.Component {
  input = null;
  writeComment = (evt) => {
    evt.preventDefault();
    const comment = this.input.value;
    comment && this.props.dispatch({ type: "WRITE_COMMENT", comment });
  };
  render() {
    const { id, content } = this.props.comment;
    return (
      <div>
               
        <input
          type="text"
          ref={(e) => (this.input = e)}
          placeholder="Write a comment"
        />
               
        <button type="button" onClick={this.writeComment}>
          Submit Comment
        </button>
             
      </div>
    );
  }
}

export default connect()(NewComment);
```

Для того чтобы этим компонентом можно было воспользоваться в приложении, надо будет описать хранилище Redux, к которому этот компонент необходимо подключить. В противном случае произойдёт ошибка. Сделать это можно двумя способами, которые мы сейчас рассмотрим.

#### Установка свойства store в компоненте-контейнере

Первый способ оснастить компонент хранилищем Redux заключается в передаче ссылки на такое хранилище в виде значения свойства `store` компонента:

```jsx
import React from "react";
import store from "./reduxStore";
import NewComment from "./components/NewComment";

function CommentsApp(props) {
  return <NewComment store={store} />;
}
```

#### Установка свойства store в компоненте `<Provider>`

Если вы хотите задать хранилище Redux для приложения лишь один раз, тогда вам будет интересен способ, который мы сейчас рассмотрим. Обычно он подходит для приложений, которые используют только одно хранилище Redux.

Пакет react-redux предоставляет разработчику компонент `<Provider>`, который можно использоваться для оборачивания корневого компонента приложения. Он принимает свойство `store`. Предполагается, что оно представляет собой ссылку на хранилище Redux, которое планируется использовать в приложении. Свойство `store` передаётся, в соответствии с иерархией приложения, компонентам-контейнерам, с использованием механизма контекста React:

```jsx
import React from "react";
import ReactDOM from "react-dom";
import store from "./reduxStore";
import { Provider } from "react-redux";
import NewComment from "./components/NewComment";

function CommentsApp(props) {
  return <NewComment />;
}

ReactDOM.render(
  <Provider store={store}>
       
    <CommentsApp /> 
  </Provider>,
  document.getElementById("root"),
);
```

### Организация доступа к ownProps

Как уже было сказано, функции `mapStateToProps` и `mapDispatchToProps`, переданные `connect()`, могут быть объявлены со вторым параметром `ownProps`, представляющим собой свойства компонента.  
Однако тут есть одна проблема. Если число обязательных параметров объявленной функции меньше, чем 2, тогда `ownProps` передаваться не будет. Но если функция объявлена с отсутствием обязательных параметров или, как минимум, с 2 параметрами, `ownProps` будет передаваться.

Рассмотрим несколько вариантов работы с `ownProps`.

#### Объявление функции без параметров

```jsx
const mapStateToProps = function () {
  console.log(arguments[0]); // state
  console.log(arguments[1]); // ownProps
};
```

В данной ситуации `ownProps` передаётся, так как функция объявлена без обязательных параметров. В результате будет работать и следующий код, написанный с использованием нового синтаксиса оставшихся параметров ES6:

```jsx
const mapStateToProps = function (...args) {
  console.log(args[0]); // state
  console.log(args[1]); // ownProps
};
```

#### Объявление функции с одним параметром

Рассмотрим следующий пример:

```jsx
const mapStateToProps = function (state) {
  console.log(state); // state
  console.log(arguments[1]); // undefined
};
```

Здесь имеется лишь один параметр, `state`. В результате `arguments[1]` принимает значение `undefined` из-за того, что `ownProps` не передаётся.

#### Объявление функции с параметром по умолчанию

```jsx
const mapStateToProps = function (state, ownProps = {}) {
  console.log(state); // state
  console.log(ownProps); // {}
};
```

Здесь имеется лишь один обязательный параметр, `state`, так как второй параметр, `ownProps`, является необязательным из-за того, что для него задано значение по умолчанию. В результате, так как тут имеется лишь один обязательный параметр, `ownProps` не передаётся, и осуществляется маппинг со значением по умолчанию, которое было ему назначено, то есть, с пустым объектом.

#### Объявление функции с двумя параметрами

```jsx
const mapStateToProps = function (state, ownProps) {
  console.log(state); // state
  console.log(ownProps); // ownProps
};
```

Тут всё устроено очень просто. А именно, в такой ситуации производится передача `ownProps` из-за того, что функция объявлена с двумя обязательными параметрами.

## Итоги

Освоив этот материал, вы узнали о том, когда и как использовать API `connect()`, предоставляемое пакетом react-redux и предназначенное для создания компонентов-контейнеров, подключённых к состоянию Redux. Здесь мы довольно подробно рассказали об устройстве функции `connect()` и о работе с ней, однако, если вы хотите больше узнать об этом механизме, в частности — ознакомиться с вариантами его использования — взгляните на [этот](https://github.com/reduxjs/react-redux/blob/master/docs/api.md) раздел документации по react-redux.
