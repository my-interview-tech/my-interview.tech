---
uid: EvjnJ0hYP4n_p5ox7q3BV
title: Разница между `React` и `ReactDOM`
tags:
  - "#React"
  - "#ReactDOM"
  - DOM
  - "#render"
  - "#JSX"
  - "#XSS"
info:
  - >-
    https://ittutoria.net/reactdom-render-is-no-longer-supported-in-react-18-use-createroot-instead/
draft: false
technology: ReactCore
specialty: Frontend
tools: []
order: 4
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

`React` и `ReactDOM` - это две разные библиотеки, которые используются в React-приложениях. Но обычно импортируются обе библиотеки, чтобы использовать их функциональности вместе.

**React** - _это библиотека JavaScript для создания пользовательских интерфейсов._

```js
const React = {
  Children: {
    map: function () {
      /* ... */
    },
    forEach: function () {
      /* ... */
    },
    count: function () {
      /* ... */
    },
    toArray: function () {
      /* ... */
    },
    only: function () {
      /* ... */
    },
  },
  Component: function Component(props, context, updater) {
    /* ... */
  },
  Fragment: Symbol("react.fragment"),
  Profiler: Symbol("react.profiler"),
  PureComponent: function PureComponent(props, context, updater) {
    /* ... */
  },
  StrictMode: Symbol("react.strict_mode"),
  Suspense: Symbol("react.suspense"),
  cloneElement: function cloneElementWithValidation(element, props, children) {
    /* ... */
  },
  createContext: function createContext(defaultValue, calculateChangedBits) {
    /* ... */
  },
  createElement: function createElementWithValidation(type, props, children) {
    /* ... */
  },
  createFactory: function createFactoryWithValidation(type) {
    /* ... */
  },
  createRef: function createRef() {
    /* ... */
  },
  forwardRef: function forwardRef(render) {
    /* ... */
  },
  isValidElement: function isValidElement(object) {
    /* ... */
  },
  lazy: function lazy(ctor) {
    /* ... */
  },
  memo: function memo(type, compare) {
    /* ... */
  },
  useCallback: function useCallback(callback, deps) {
    /* ... */
  },
  useContext: function useContext(context, unstable_observedBits) {
    /* ... */
  },
  useDebugValue: function useDebugValue(value, formatterFn) {
    /* ... */
  },
  useEffect: function useEffect(create, deps) {
    /* ... */
  },
  useImperativeHandle: function useImperativeHandle(ref, create, deps) {
    /* ... */
  },
  useLayoutEffect: function useLayoutEffect(create, deps) {
    /* ... */
  },
  useMemo: function useMemo(create, deps) {
    /* ... */
  },
  useReducer: function useReducer(reducer, initialArg, init) {
    /* ... */
  },
  useRef: function useRef(initialValue) {
    /* ... */
  },
  useState: function useState(initialState) {
    /* ... */
  },
  version: "17.0.2",
  __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: {
    ReactCurrentDispatcher: {
      /* ... */
    },
  },
};
```

**ReactDOM** - это библиотека, которая предоставляет интеграцию `React` с DOM. *Она используется для рендеринга `React` компонентов в реальный DOM.* `ReactDOM` содержит методы для манипулирования реальным DOM, такие как `ReactDOM.render()`, который используется для рендеринга React-компонентов в DOM.

```js
const ReactDOM = {
  createPortal: function createPortal(children, container) {
    /* ... */
  },
  findDOMNode: function findDOMNode(componentOrElement) {
    /* ... */
  },
  flushSync: function flushSync(fn, a) {
    /* ... */
  },
  hydrate: function hydrate(element, container, callback) {
    /* ... */
  },
  render: function render(element, container, callback) {
    /* ... */
  },
  unmountComponentAtNode: function unmountComponentAtNode(container) {
    /* ... */
  },
  unstable_batchedUpdates: function batchedUpdates(fn, a) {
    /* ... */
  },
  unstable_createPortal: function unstable_createPortal(children, container) {
    /* ... */
  },
  unstable_renderSubtreeIntoContainer: function renderSubtreeIntoContainer(
    parentComponent,
    element,
    container,
    callback,
  ) {
    /* ... */
  },
  version: "17.0.2",
  __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: {
    Events: [], // Пример внутренних данных
  },
};
```

_По умолчанию React DOM [экранирует](https://stackoverflow.com/questions/7381974/which-characters-need-to-be-escaped-on-html) все значения, включённые в JSX перед тем как отрендерить их._ Это гарантирует, что вы никогда не внедрите чего-либо, что не было явно написано в вашем приложении. Всё преобразуется в строчки, перед тем как быть отрендеренным. Это помогает предотвращать атаки [межсайтовым скриптингом (XSS)](https://ru.wikipedia.org/wiki/%D0%9C%D0%B5%D0%B6%D1%81%D0%B0%D0%B9%D1%82%D0%BE%D0%B2%D1%8B%D0%B9_%D1%81%D0%BA%D1%80%D0%B8%D0%BF%D1%82%D0%B8%D0%BD%D0%B3) .

**Устранение ошибки:** “ReactDOM.render больше не поддерживается в React 18. Вместо этого используйте createRoot”

---

[[004 ReactCore|Назад]]
