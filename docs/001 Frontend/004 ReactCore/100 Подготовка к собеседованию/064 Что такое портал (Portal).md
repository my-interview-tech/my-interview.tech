---
uid: Bbqmm33XJ138qb9yQUsSv
title: Что такое портал (`Portal`)?
tags:
  - "#React"
  - "#portal"
  - "#z-index"
info:
  - "https://ru.legacy.reactjs.org/docs/react-dom.html#createportal"
  - "https://habr.com/ru/companies/smartprogress/articles/306096/"
  - "https://habr.com/ru/articles/553592/"
draft: false
technology: ReactCore
specialty: Frontend
tools: []
order: 64
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

![[Pasted image 20230704194938.png|600]]

_Портал (`Portal`)_ - это механизм в React, который _позволяет рендерить компоненты внутри других элементов, которые находятся вне иерархии DOM-дерева компонента-родителя. Это означает, что порталы позволяют размещать компоненты в произвольных местах страницы, включая области, которые обычно находятся за пределами корневого элемента React-приложения_.

Порталы особенно полезны в случаях, когда нам нужно _отобразить компоненты поверх других элементов, например, при создании модальных окон, всплывающих подсказок, или приложений, которые должны отображаться внутри веб-страниц другого сайта_.

В React, порталы создаются с помощью компонента `ReactDOM.createPortal(child, container)`, где `child` - это дочерний компонент, который необходимо отобразить, а `container` - это DOM-элемент, в который нужно поместить этот компонент.

Например, для создания портала, который будет отображать компонент `Modal` в элементе `modal-root`, который находится вне корневого элемента React-приложения, можно использовать следующий код:

```jsx
import React from "react";
import ReactDOM from "react-dom";

function Modal(props) {
  return ReactDOM.createPortal(
    props.children,
    document.getElementById("modal-root"),
  );
}

export default Modal;
```

В этом примере компонент `Modal` создает портал, который отображает его дочерние компоненты в элементе с идентификатором `modal-root`. Этот элемент может быть создан где угодно на странице, и компонент `Modal` будет отображаться внутри него, независимо от того, где находится корневой элемент React-приложения.

\*\*`Portal` и `z-index`

![](https://www.youtube.com/watch?v=w4CPbE_efWw)

`Portals` предоставляют способ решения проблемы с `z-index` для элементов, которые должны быть размещены вне иерархии компонентов.

Когда элементы рендерятся внутри компонента в React, они обычно наследуют свойства стилей и `z-index` от своих родительских компонентов. Это может вызвать проблемы, когда вам нужно разместить элемент поверх других элементов на странице.

_С помощью порталов вы можете рендерить компонент в DOM-узле, который находится вне иерархии компонентов. Это позволяет вам контролировать положение элемента независимо от иерархии компонентов и перекрывать другие элементы с помощью стилей._

Вот пример использования порталов в React:

```jsx
import React from "react";
import ReactDOM from "react-dom";

const Modal = ({ children }) => {
  return ReactDOM.createPortal(
    <div className="modal">{children}</div>,
    document.getElementById("modal-root"), // DOM-узел, в который будет рендериться портал
  );
};

const App = () => {
  return (
    <div>
      <h1>My App</h1>
      <Modal>
        <p>This is a modal</p>
      </Modal>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
```

В приведенном примере мы создаем компонент `Modal`, который рендерит дочерние элементы в портале с помощью `createPortal()`. Мы указываем `document.getElementById('modal-root')` вторым аргументом `createPortal()`, чтобы портал был рендерен внутри элемента с id "modal-root", который мы предварительно создали в DOM.

---

[[004 ReactCore|Назад]]
