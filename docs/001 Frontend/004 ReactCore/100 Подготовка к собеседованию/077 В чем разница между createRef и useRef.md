---
uid: c2HCY-ACCWolnkzw6nq8c
title: В чем разница между createRef и useRef?
tags:
  - "#React"
  - "#createRef"
  - "#useRef"
  - "#Hooks"
  - "#refCallback"
info:
  - "https://habr.com/ru/companies/otus/articles/677208/"
  - "https://thewebdev.info/2021/11/14/how-to-forward-multiple-refs-with-react/"
  - "https://www.youtube.com/watch?v=2GwcfFSLxbg"
draft: false
technology: ReactCore
specialty: Frontend
tools: []
order: 77
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

`createRef` и `useRef` - это два разных инструмента в React для работы с рефами (refs), которые позволяют получать доступ к DOM элементам и другим компонентам.

##### **`createRef()`**

*`createRef`* - это метод React, который позволяет создавать рефы (refs) для доступа к DOM элементам и другим компонентам в методах жизненного цикла компонента. Она возвращает `{ current: null }` .

```jsx
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  render() {
    return <div ref={this.myRef}>Hello, World!</div>;
  }
}
```

В этом примере, `createRef()` используется для создания рефа `myRef`. Реф передается в DOM элемент через атрибут `ref`.

_Также в атрибут `ref` можно передавать не только объект вида 
`{ current: T }`, но и функцию, которая единственным аргументом принимает ссылку на элемент, этот прием называется `ref callback`:_

```jsx
class ClassComponent extends Component {
  element = null;

  componentDidMount() {
    // после рендеринга в this.element попадет ссылка на элемент
    console.log(this.element.offsetWidth);
  }

  render() {
    return <div ref={(elem) => (this.element = elem)}>Элемент с текстом</div>;
  }
}
```

_Главная задача `ref callback` - это создание массива ссылок на DOM элементы и react компоненты._

##### **`useRef()`**

*`useRef`* - это хук, который позволяет создавать рефы (refs) для доступа к DOM элементам и другим компонентам в функциональных компонентах.

```jsx
const ref = useRef(initialValue);
```

При попытке получить ссылку на функциональный компонент мы получим другой результат нежели при использовании `createRef()`. А в консоли увидим следующее предупреждение и получим `undefined` вместо данных компонента.

![[Pasted image 20230904222547.png]]

Функциональные компоненты нужно обернуть в `forwardRef`, так внутри функционального компонента мы получим второй аргумент `ref` и сможем его передать в нужный html элемент. Либо этот `ref` нужно передать в `useImperativeHandle` - это специальный хук, который добавит в `ref` дополнительные свойства. Это позволит поднимать из функционального компонента данные и методы.

Синтаксис `useRef()` представлен ниже:

```jsx
function MyComponent() {
  const myRef = useRef(null);
  return <div ref={myRef}>Hello, World!</div>;
}
```

В этом примере, `useRef()` используется для создания рефа `myRef`. Реф передается в DOM элемент через атрибут `ref`.

_`useRef()` в функциональных компонентах используются не только для доступа к DOM элементам, но еще и как стабильное хранилище данных._

**Как переслать несколько ссылок?**

Чтобы переслать несколько ссылок с помощью React, мы можем передать ссылки в объекте.

Например, мы пишем:

```jsx
import React, { useRef } from "react";

const Child = React.forwardRef((props, ref) => {
  const { ref1, ref2 } = ref.current;
  console.log(ref1, ref2);

  return (
    <>
      <p ref={ref1}>foo</p>
      <p ref={ref2}>bar</p>
    </>
  );
});

export default function App() {
  const ref1 = useRef();
  const ref2 = useRef();
  const ref = useRef({ ref1, ref2 });

  return <Child ref={ref} />;
}
```

У нас есть `Child` компонент, который принимает ссылки с тех пор, как мы создали его, вызвав `forwardRef` с помощью функции компонента.

В функции мы деструктурируем ссылки, которые мы передаем, используя:

```jsx
const { ref1, ref2 } = ref.current;
```

Затем мы присваиваем `ref1` и `ref2` элементам p.  
В приложении мы создаем ссылки с помощью useRef-хука.  
Мы создаем `ref`, вызывая `useRef` с объектом, созданным из существующих ссылок.

И, наконец, мы устанавливаем `ref` prop `Child` элемента на `ref`.

Следовательно, из `console.log()` мы можем видеть, что текущее свойство `ref1` и `ref2` присвоено элементам абзаца в дочернем элементе.

---

[[004 ReactCore|Назад]]
