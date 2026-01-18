---
uid: 16dFnWtV4t4aWTT5Dox71
title: >-
  Как отследить прогресс и окончание CSS @keyframes анимаций или плавных
  переходов, реализованных с помощью transition, в JS?
tags:
  - "#CSS"
  - "#DOM"
  - "#animation"
  - "#transition"
info: null
draft: false
technology: CSS
specialty: Frontend
tools: []
order: 41
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

Для отслеживания прогресса и окончания CSS анимаций можно использовать события, которые генерируются в DOM при изменении состояния анимации. Существуют два основных события, которые можно использовать для этой цели: `animationstart` и `animationend`.

Например, для отслеживания окончания анимации, можно использовать следующий код:

```js
const element = document.querySelector("#my-element");

element.addEventListener("animationend", () => {
  // код, который нужно выполнить после окончания анимации
});
```

Для отслеживания прогресса анимации можно использовать событие `animationiteration`, которое генерируется каждый раз, когда анимация проходит через свой цикл. Например:

```js
const element = document.querySelector("#my-element");

element.addEventListener("animationiteration", () => {
  // код, который нужно выполнить после каждого цикла анимации
});
```

Аналогично, для отслеживания прогресса плавных переходов, можно использовать событие `transitionend`. Например:

```js
const element = document.querySelector("#my-element");

element.addEventListener("transitionend", () => {
  // код, который нужно выполнить после окончания перехода
});
```

В общем случае, для отслеживания анимаций и переходов в JavaScript, необходимо получить доступ к соответствующим элементам DOM и назначить обработчики событий соответствующих типов. Кроме того, можно использовать библиотеки, такие как jQuery и GreenSock, которые предоставляют удобные методы для работы с анимациями и переходами в JavaScript.

---

[[002 CSS|Назад]]
