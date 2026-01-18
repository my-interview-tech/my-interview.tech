---
uid: qXzBUkkrOshexMcYq6g-S
title: Что такое синтетические события (SyntheticEvent) в React?
tags:
  - "#React"
  - "#SyntheticEvent"
  - "#eventDelegation"
  - "#eventBubbling"
  - "#eventPersist"
info:
  - "https://ru.legacy.reactjs.org/docs/events.html"
draft: false
technology: ReactCore
specialty: Frontend
tools: []
order: 28
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

![[Pasted image 20230704174242.png]]

##### `SyntheticEvent`

React использует систему событий, которая основана на _делегировании событий `event delegation`_. При делегировании событий React добавляет обработчики событий на родительские элементы и использует _всплытие событий `event bubbling`_, чтобы обработать события на дочерних элементах.

_`SyntheticEvent` - это обертка вокруг нативного браузерного события, которая предоставляет нормализованный интерфейс для работы с событиями. Он содержит все свойства и методы, доступные в нативном событии, а также дополнительные свойства и методы, которые делают работу с событиями более простой и удобной. Основное предназначение `SyntheticEvent` обеспечение кроссбраузерности при выполнении событий._

Например, в синтетическом событии есть метод `preventDefault()`, который предотвращает выполнение действий по умолчанию при возникновении события, таких как переход по ссылке или отправка формы. Также в синтетическом событии есть метод `stopPropagation()`, который предотвращает всплытие события и останавливает его обработку на текущем элементе.

Синтетические события используются в обработчиках событий, которые передаются в компоненты в качестве свойств (`props`). Например:

```jsx
function handleClick(event) {
  event.preventDefault();
  console.log("The link was clicked.");
}

function MyComponent() {
  return (
    <a href="#" onClick={handleClick}>
      Click me
    </a>
  );
}
```

Здесь обработчик `handleClick` получает синтетическое событие в качестве аргумента `event` и использует его метод `preventDefault()` для предотвращения перехода по ссылке при клике на элемент `<a>`.

###### Поддерживаемые события

React нормализует события так, чтобы они содержали одинаковые свойства во всех браузерах.

Обработчики ниже вызываются на фазе всплытия (bubbling). А чтобы зарегистрировать событие на фазе перехвата (capture), просто добавьте `Capture` к имени события; например, вместо `onClick` используйте `onClickCapture`, чтобы обработать событие на фазе перехвата.

- [События буфера обмена](https://ru.legacy.reactjs.org/docs/events.html#clipboard-events)
- [Композиционные события](https://ru.legacy.reactjs.org/docs/events.html#composition-events)
- [События клавиатуры](https://ru.legacy.reactjs.org/docs/events.html#keyboard-events)
- [События фокуса](https://ru.legacy.reactjs.org/docs/events.html#focus-events)
- [События формы](https://ru.legacy.reactjs.org/docs/events.html#form-events)
- [Общие события](https://ru.legacy.reactjs.org/docs/events.html#generic-events)
- [События мыши](https://ru.legacy.reactjs.org/docs/events.html#mouse-events)
- [События курсора](https://ru.legacy.reactjs.org/docs/events.html#pointer-events)
- [События выбора](https://ru.legacy.reactjs.org/docs/events.html#selection-events)
- [Сенсорные события](https://ru.legacy.reactjs.org/docs/events.html#touch-events)
- [События UI](https://ru.legacy.reactjs.org/docs/events.html#ui-events)
- [События колёсика мыши](https://ru.legacy.reactjs.org/docs/events.html#wheel-events)
- [События медиа-элементов](https://ru.legacy.reactjs.org/docs/events.html#media-events)
- [События изображений](https://ru.legacy.reactjs.org/docs/events.html#image-events)
- [События анимаций](https://ru.legacy.reactjs.org/docs/events.html#animation-events)
- [События переходов](https://ru.legacy.reactjs.org/docs/events.html#transition-events)
- [Другие события](https://ru.legacy.reactjs.org/docs/events.html#other-events)

##### `event.persist()`

**`event.persist()`** - это метод, который используется для сохранения `SyntheticEvent` после его завершения. _Проще говоря, метод `event.persist()` позволяет обрабатывать асинхронный код внутри обработчика событий._

Когда вызывается обработчик события, объект `SyntheticEvent` создается для представления этого события. Этот объект содержит информацию о событии, такую как тип, цель, данные и т. д. Однако по умолчанию, после завершения обработчика события, объект `SyntheticEvent` становится недоступным и может быть переиспользован для других событий.

_Метод `event.persist()` позволяет сохранить объект `SyntheticEvent` после завершения обработчика события. Это полезно, когда вам нужно продолжить использовать объект `SyntheticEvent` за пределами обработчика события, например, при асинхронной обработке событий или внутри функций обратного вызова._

Вот пример использования метода `event.persist()`:

```jsx
function MyComponent() {
  function handleClick(event) {
    event.persist();
    setTimeout(() => {
      console.log(event.type);
    }, 1000);
  }

  return <button onClick={handleClick}>Click me</button>;
}
```

В этом примере при клике на кнопку будет вызван обработчик `handleClick`. Внутри обработчика мы вызываем `event.persist()`, чтобы сохранить объект SyntheticEvent после завершения обработчика. Затем через 1 секунду мы выводим тип события в консоль, используя сохраненный объект SyntheticEvent.

Примечание: Начиная с 17 версии, вызов e.persist() не имеет смысла, потому что объекты событий SyntheticEvent больше не добавляются в пул.

---

[[004 ReactCore|Назад]]
