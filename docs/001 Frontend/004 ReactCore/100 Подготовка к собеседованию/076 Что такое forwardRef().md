---
uid: cOC9F9KzxXPJz2Z6sM2kT
title: Что такое forwardRef() ?
tags:
  - React
  - Hooks
  - forwardRef
  - useRef
  - React19
info:
  - "https://react.dev/blog/2024/04/25/react-19"
  - "https://react.dev/reference/react/forwardRef"
  - "https://dev.to/alakkadshaw/react-forwardref-1dkn"
draft: false
technology: ReactCore
specialty: Frontend
tools: []
order: 76
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

`forwardRef()` - это функция в React, которая позволяет передавать ссылки (refs) через компоненты. Обычно ссылки можно присоединять только к DOM-элементам или классовым компонентам, но с помощью `forwardRef()` можно передать ссылку через функциональный компонент.

```javascript
import React, { forwardRef } from "react";

// Функциональный компонент, который принимает ref
const MyInput = forwardRef((props, ref) => {
  return <input type="text" ref={ref} {...props} />;
});

// Родительский компонент
const ParentComponent = () => {
  const inputRef = React.useRef(null);

  const focusInput = () => {
    inputRef.current.focus();
  };

  return (
    <div>
      <MyInput ref={inputRef} />
      <button onClick={focusInput}>Focus Input</button>
    </div>
  );
};

export default ParentComponent;
```

1. **`forwardRef()`**: Эта функция принимает компонент и возвращает новый компонент, который может принимать `ref` в качестве второго аргумента.
2. **`ref` в `forwardRef`**: Внутри компонента `MyInput`, `ref` передается непосредственно на `<input>` элемент. Это позволяет родительскому компоненту управлять этим элементом через `ref`.
3. **Использование `ref` в родительском компоненте**: В `ParentComponent` создается `ref` с помощью `useRef()`, который затем передается в `MyInput`. Когда пользователь нажимает кнопку "Focus Input", вызывается метод `focus()` на `inputRef.current`, что фокусирует `<input>` элемент.

**Зачем это нужно?**

- **Управление DOM-элементами**: `forwardRef()` позволяет родительским компонентам управлять DOM-элементами, которые находятся внутри дочерних компонентов.
- **Передача ссылок через несколько уровней**: Если у вас есть несколько вложенных компонентов, `forwardRef()` позволяет передавать ссылки через все эти уровни.

**`as React 19` && `ref` as prop**

Начиная с React 19, теперь вы можете получить доступ к `ref` как к пропу для функциональных компонентов:

```jsx
function MyInput({ placeholder, ref }) {
  return <input placeholder={placeholder} ref={ref} />;
}

//...
<MyInput ref={ref} />;
```

Новые функциональные компоненты больше не будут нуждаться в `forwardRef`, и мы опубликуем `codemod` для автоматического обновления ваших компонентов для использования нового пропса `ref`. В будущих версиях мы планируем объявить `forwardRef` устаревшим и удалить его.

**Примечание:**

Ссылки, переданные классовым компонентам, не передаются как пропсы, так как они ссылаются на экземпляр компонента.

Мы добавили опцию `initialValue` в `useDeferredValue`:

```javascript
function Search({ deferredValue }) {
  // При первоначальном рендеринге значение будет ''.
  // Затем запланирован повторный рендеринг с deferredValue.
  const value = useDeferredValue(deferredValue, "");

  return <Results query={value} />;
}
```

Когда предоставляется `initialValue`, `useDeferredValue` вернет его как значение для первоначального рендеринга компонента и запланирует повторный рендеринг в фоновом режиме с возвращенным `deferredValue`.

**Очищающие функции для refs**

Теперь мы поддерживаем возвращение очищающей функции из колбэков `ref`:

```javascript
<input
  ref={(ref) => {
    // ref создан

    // НОВОЕ: возвращаем очищающую функцию для сброса
    // ref, когда элемент удаляется из DOM.
    return () => {
      // очистка ref
    };
  }}
/>
```

Когда компонент размонтируется, React вызовет очищающую функцию, возвращенную из колбэка ref. Это работает для DOM refs, refs к классовым компонентам и `useImperativeHandle`.

**Примечание:**  
Ранее React вызывал функции ref с `null` при размонтировании компонента. Если ваш ref возвращает очищающую функцию, React теперь пропустит этот шаг.

В будущих версиях мы объявим устаревшим вызов refs с `null` при размонтировании компонентов.

Из-за введения очищающих функций ref, возвращение чего-либо другого из колбэка ref теперь будет отклонено TypeScript. Исправление обычно заключается в прекращении использования неявных возвратов, например:

```javascript
-(<div ref={(current) => (instance = current)} />) +
(
  <div
    ref={(current) => {
      instance = current;
    }}
  />
);
```

Исходный код возвращал экземпляр HTMLDivElement, и TypeScript не мог определить, была ли это предполагаемая очищающая функция или вы не хотели возвращать очищающую функцию.

Вы можете автоматически исправить этот шаблон с помощью `no-implicit-ref-callback-return`.

---

[[004 ReactCore|Назад]]
