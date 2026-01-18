---
uid: naC_C-jzaJ8AdY0RIHsO0
title: Сколько аргументов принимает `addEventListener`?
tags:
  - "#DOM"
  - "#addEventListener"
  - "#event"
  - "#listener"
  - "#useCapture"
  - "#browser"
info: []
draft: false
technology: JSCore
specialty: Frontend
tools: []
order: 11
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

Метод `addEventListener` принимает три аргумента:

1. _Тип события (event)_ - это строка, которая определяет тип события, например, 'click', 'keydown', 'submit', и т.д.
2. _Обработчик события (listener)_ - это функция, которая будет вызвана при наступлении события. Функция должна быть определена заранее и передана как ссылка на функцию вторым аргументом.
3. _Использовать захват (useCapture)_ - это необязательный логический параметр, который указывает, нужно ли использовать фазу захвата вместо фазы всплытия при обработке события. Если параметр равен true, то обработчик будет вызван на фазе захвата, если false (по умолчанию), то на фазе всплытия.

Вот пример использования метода `addEventListener`:

```javascript
const button = document.querySelector("button");

button.addEventListener("click", function () {
  console.log("Кнопка нажата");
});
```

В этом примере мы добавляем обработчик события на кнопку, который будет вызываться при клике на кнопку. Функция-обработчик определяется как безымянная функция и передается вторым аргументом метода `addEventListener`. Третий аргумент не указан, поэтому обработчик будет вызван на фазе всплытия.

Этот код демонстрирует использование метода `addEventListener` для добавления обработчиков событий на кнопку с различными параметрами. Разберем его по частям и объясним, как работает каждый вариант:

```js
const testFunc = () => console.log("Hello world!"); // Функция, которая выводит сообщение в консоль

const btn = document.querySelector("button"); // Находим кнопку в DOM

// 1. Обработчик по умолчанию
btn.addEventListener("click", testFunc); // Обработчик срабатывает при каждом клике на кнопку

// 2. Обработчик с параметром once: true
btn.addEventListener("click", testFunc, { once: true }); // Обработчик срабатывает только один раз

// 3. Обработчик с параметром capture: true
btn.addEventListener("click", testFunc, { capture: true }); // Обработчик срабатывает на фазе захвата
btn.addEventListener("click", testFunc, true); // Альтернативный синтаксис для capture: true

// 4. Обработчик с параметром passive: true
btn.addEventListener("click", testFunc, { passive: true }); // Обработчик не может вызвать event.preventDefault()

// 5. Комбинация параметров
btn.addEventListener("click", testFunc, {
  once: true, // Обработчик срабатывает только один раз
  capture: true, // Обработчик срабатывает на фазе захвата
  passive: true, // Обработчик не может вызвать event.preventDefault()
});
```

---

[[003 JSCore|Назад]]
