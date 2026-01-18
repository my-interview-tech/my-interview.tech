---
uid: UyssD8OKpdtMj2GDQVQAU
title: >-
  Разница между `createElement()` и `cloneElement()`? Что такое
  `React.isValidElement(object)`?
tags:
  - "#React"
  - "#createElement"
  - "#cloneElement"
  - "#isValidElement"
info: []
draft: false
technology: ReactCore
specialty: Frontend
tools: []
order: 9
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

`createElement()` и `cloneElement()` - это два метода, используемые в React для создания элементов (elements) и клонирования элементов соответственно. Они имеют некоторые различия в своей работе.

##### **`createElement()`**

`createElement()` - это метод, который _создает новый элемент React с указанным типом, свойствами и дочерними элементами._ Все элементы, созданные с помощью `createElement()`, являются неизменяемыми `immutable`, что означает, что после создания элемента его свойства и дочерние элементы не могут быть изменены.

```jsx
const element = createElement(type, props, ...children);
```

- `type`: Аргумент `type` должен быть допустимым типом компонента React. Например, это может быть строка имени тега (например, `'div'` или `'span'`) или компонент React (функция, класс или специальный компонент типа [`Fragment`](https://reactdev.ru/reference/Fragment/)).

- `props`: Аргумент `props` должен быть либо объектом, либо `null`. Если вы передадите `null`, он будет рассматриваться так же, как пустой объект. React создаст элемент с пропсами, соответствующими переданным вами `props`. Обратите внимание, что `ref` и `key` из вашего объекта `props` являются специальными и *не* будут доступны как `element.props.ref` и `element.props.key` в возвращаемом `element`. Они будут доступны как `element.ref` и `element.key`.

- **опционально** `...children`: Ноль или более дочерних узлов. Это могут быть любые узлы React, включая элементы React, строки, числа, [порталы](https://reactdev.ru/reference/createPortal/), пустые узлы (`null`, `undefined`, `true` и `false`) и массивы узлов React.

Например, чтобы создать элемент `div` с классом `my-class` и текстом `Hello, world!`, мы можем использовать метод `createElement()` следующим образом:

```jsx
const element = React.createElement(
  "div",
  { className: "my-class" },
  "Hello, world!",
);
```

##### **`cloneElement()`**

`cloneElement()` - это метод, который _клонирует существующий элемент React и возвращает новый элемент с обновленными свойствами и/или дочерними элементами._ Клонированный элемент может быть изменен, так как он не является неизменяемым, как элементы, созданные с помощью `createElement()`.

```jsx
const clonedElement = cloneElement(element, props, ...children);
```

Например, чтобы клонировать элемент `element` и добавить ему новый класс `new-class`, мы можем использовать метод `cloneElement()` следующим образом:

```jsx
const newElement = React.cloneElement(element, { className: "new-class" });
```

Здесь мы передаем `element` и новый объект свойств `{ className: 'new-class' }` в `cloneElement()`, который возвращает новый элемент с обновленным классом.

\*\*Для чего используется `cloneElement()` ?

Чтобы переопределить пропсы некоторого реактивного элемента, передайте его в `cloneElement` с пропсами, которые вы хотите переопределить:

```jsx
import { cloneElement } from "react";

// ...
const clonedElement = cloneElement(<Row title="Cabbage" />, {
  isHighlighted: true,
});
```

Здесь результирующим клонированным элементом будет `<Row title="Cabbage" isHighlighted={true} />`.

##### **Разница между `createElement()` и `cloneElement()`**

_Основная разница между `createElement()` и `cloneElement()` заключается в том, что `createElement()` создает новый элемент, а `cloneElement()` клонирует существующий элемент. Кроме того, элементы, созданные с помощью `createElement()`, являются неизменяемыми, а элементы, клонированные с помощью `cloneElement()`, могут быть изменены._

| Метод             | Описание                                                                                                                                                                                                                                                                                                                    |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **createElement** | Это код, в который компилируется JSX. Используется React для создания элементов и передачи им новых свойств.<br><br>Этот метод используется для описания того, как выглядит пользовательский интерфейс.<br><br>**Аргументы**: type, props, children.<br>Создает и возвращает новый элемент с типом, указанным в аргументах. |
| **cloneElement**  | Используется для клонирования элементов.<br>Этот метод используется для манипуляции элементами.<br><br>**Аргументы**: element, props, children.<br>Клонирует и возвращает новый элемент с свойствами, переданными в аргументах.                                                                                             |

##### **`React.isValidElement(object)`**

`React.isValidElement(object)` — проверяет, что объект является элементом React. Возвращает true в случае если объект является элементом React или false в случае если он не является элементом React.

```jsx
const A = <p>Some text</p>;
const B = {};

if (React.isValidElement(A))
  console.info("A is React Element");

if (React.isValidElement(B))
  console.info("B is React Element");
else
  console.error("B is not a React Element");

// Output
A is React Element
B is not a React Element
```

---

[[004 ReactCore|Назад]]
