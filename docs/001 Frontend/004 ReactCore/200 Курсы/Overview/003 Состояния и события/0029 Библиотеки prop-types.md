---
uid: Ytmc7scz6IE18PjhG8Z98
title: Библиотеки prop-types
tags:
  - "#React"
  - "#prop-types"
  - "#propTypes"
info:
  - "https://github.com/airbnb/prop-types"
  - "https://ru.reactjs.org/docs/typechecking-with-proptypes.html"
draft: false
technology: ReactCore
specialty: Frontend
tools: []
order: 29
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

Библиотека #prop-types - набор стандартных функций-валидаторов

```jsx
MyComponent.propTypes = {
	`some_number`: PropTypes.number
	`Some_mandatory_number`: PropTypes.number.isRequired
}
```

Есть и другие библиотеки, с дополнительными валидаторами.

---

## Введение

По мере роста вашего приложения вы можете отловить много ошибок с помощью проверки типов. Для этого можно использовать расширения JavaScript вроде [Flow](https://flow.org/) и [TypeScript](https://www.typescriptlang.org/). Но, даже если вы ими не пользуетесь, React предоставляет встроенные возможности для проверки типов. Для запуска этой проверки на пропсах компонента вам нужно использовать специальное свойство `propTypes`:

```jsx
import PropTypes from "prop-types";

class Greeting extends React.Component {
  render() {
    return <h1>Привет, {this.props.name}</h1>;
  }
}

Greeting.propTypes = {
  name: PropTypes.string,
};
```

В данном примере проверка типа показана на классовом компоненте, но она же может быть применена и к функциональным компонентам, или к компонентам, созданным с помощью [`React.memo`](https://ru.reactjs.org/docs/react-api.html#reactmemo) или [`React.forwardRef`](https://ru.reactjs.org/docs/react-api.html#reactforwardref).

`PropTypes` предоставляет ряд валидаторов, которые могут использоваться для проверки, что получаемые данные корректны. В примере мы использовали `PropTypes.string`. Когда какой-то проп имеет некорректное значение, в консоли будет выведено предупреждение. По соображениям производительности `propTypes` проверяются только в режиме разработки.

## #PropTypes

Пример использования возможных валидаторов:

```jsx
import PropTypes from "prop-types";

MyComponent.propTypes = {
  // Можно объявить проп на соответствие определённому JS-типу.
  // По умолчанию это не обязательно.
  optionalArray: PropTypes.array,
  optionalBool: PropTypes.bool,
  optionalFunc: PropTypes.func,
  optionalNumber: PropTypes.number,
  optionalObject: PropTypes.object,
  optionalString: PropTypes.string,
  optionalSymbol: PropTypes.symbol,

  // Все, что может быть отрендерено:
  // числа, строки, элементы или массивы
  // (или фрагменты) содержащие эти типы
  optionalNode: PropTypes.node,

  // React-элемент
  optionalElement: PropTypes.element,

  // Тип React-элемент (например, MyComponent).
  optionalElementType: PropTypes.elementType,

  // Можно указать, что проп должен быть экземпляром класса
  // Для этого используется JS-оператор instanceof.
  optionalMessage: PropTypes.instanceOf(Message),

  // Вы можете задать ограничение конкретными значениями
  // при помощи перечисления
  optionalEnum: PropTypes.oneOf(["News", "Photos"]),

  // Объект, одного из нескольких типов
  optionalUnion: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.instanceOf(Message),
  ]),

  // Массив объектов конкретного типа
  optionalArrayOf: PropTypes.arrayOf(PropTypes.number),

  // Объект со свойствами конкретного типа
  optionalObjectOf: PropTypes.objectOf(PropTypes.number),

  // Объект с определённой структурой
  optionalObjectWithShape: PropTypes.shape({
    color: PropTypes.string,
    fontSize: PropTypes.number,
  }),

  // При наличии необъявленных свойств в объекте будут вызваны предупреждения
  optionalObjectWithStrictShape: PropTypes.exact({
    name: PropTypes.string,
    quantity: PropTypes.number,
  }),

  // Можно добавить`isRequired` к любому приведённому выше типу,
  // чтобы показывать предупреждение,
  // если проп не передан
  requiredFunc: PropTypes.func.isRequired,

  // Обязательное значение любого типа
  requiredAny: PropTypes.any.isRequired,

  // Можно добавить собственный валидатор.
  // Он должен возвращать объект `Error` при ошибке валидации.
  // Не используйте `console.warn` или `throw`
  // - это не будет работать внутри `oneOfType`
  customProp: function (props, propName, componentName) {
    if (!/matchme/.test(props[propName])) {
      return new Error(
        "Проп `" +
          propName +
          "` компонента" +
          " `" +
          componentName +
          "` имеет неправильное значение",
      );
    }
  },

  // Можно задать свой валидатор для `arrayOf` и `objectOf`.
  // Он должен возвращать объект Error при ошибке валидации.
  // Валидатор будет вызван для каждого элемента в массиве
  // или для каждого свойства объекта.
  // Первые два параметра валидатора
  // - это массив или объект и ключ текущего элемента
  customArrayProp: PropTypes.arrayOf(
    function (propValue, key, componentName, location, propFullName) {
      if (!/matchme/.test(propValue[key])) {
        return new Error(
          "Проп `" +
            propFullName +
            "` компонента" +
            " `" +
            componentName +
            "` имеет неправильное значение",
        );
      }
    },
  ),
};
```

## Требование одного дочернего элемента

С помощью `PropTypes.element` вы можете указать, что только один дочерний элемент может быть передан компоненту в качестве потомка.

```jsx
import PropTypes from "prop-types";

class MyComponent extends React.Component {
  render() {
    // Это должен быть ровно один элемент, иначе вы увидите предупреждение.
    const children = this.props.children;
    return <div>{children}</div>;
  }
}

MyComponent.propTypes = {
  children: PropTypes.element.isRequired,
};
```

## Значения пропсов по умолчанию

Вы можете задать значения по умолчанию для ваших `props` с помощью специального свойства `defaultProps`:

```jsx
class Greeting extends React.Component {
  render() {
    return <h1>Привет, {this.props.name}</h1>;
  }
}

// Задание значений по умолчанию для пропсов:
Greeting.defaultProps = {
  name: "Незнакомец",
};

// Отрендерит "Привет, Незнакомец":
const root = ReactDOM.createRoot(document.getElementById("example"));
root.render(<Greeting />);
```

C ES2022 вы можете объявить `defaultProps` как статическое свойство внутри классового React компонента. Подробнее можно узнать в статье про [публичные статические поля класса](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Classes/Public_class_fields#%D0%BF%D1%83%D0%B1%D0%BB%D0%B8%D1%87%D0%BD%D1%8B%D0%B5_%D1%81%D1%82%D0%B0%D1%82%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%B8%D0%B5_%D0%BF%D0%BE%D0%BB%D1%8F). Для поддержки этого современного синтаксиса в старых браузерах потребуется компиляция.

```jsx
class Greeting extends React.Component {
  static defaultProps = {
    name: "Незнакомец",
  };

  render() {
    return <div>Привет, {this.props.name}</div>;
  }
}
```

Определение `defaultProps` гарантирует, что `this.props.name` будет иметь значение, даже если оно не было указано родительским компонентом. Сначала применяются значения по умолчанию, заданные в `defaultProps`. После запускается проверка типов с помощью `propTypes`. Так что проверка типов распространяется и на значения по умолчанию.

## Функциональные компоненты

К функциональным компонентам можно также применять PropTypes.

Допустим, есть такой компонент:

```jsx
export default function HelloWorldComponent({ name }) {
  return <div>Hello, {name}</div>;
}
```

Для добавления PropTypes нужно объявить компонент в отдельной функции, которую затем экспортировать:

```jsx
function HelloWorldComponent({ name }) {
  return <div>Hello, {name}</div>;
}

export default HelloWorldComponent;
```

А затем добавить PropTypes напрямую к компоненту `HelloWorldComponent`:

```jsx
import PropTypes from "prop-types";

function HelloWorldComponent({ name }) {
  return <div>Hello, {name}</div>;
}

HelloWorldComponent.propTypes = {
  name: PropTypes.string,
};

export default HelloWorldComponent;
```

---
