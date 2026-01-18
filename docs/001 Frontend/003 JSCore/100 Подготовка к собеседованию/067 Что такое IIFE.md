---
uid: A_UB0f77dF8CL8Cv_NtFu
title: Что такое IIFE?
tags:
  - "#JavaScript"
  - "#IIFE"
info: null
draft: false
technology: JSCore
specialty: Frontend
tools: []
order: 67
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

![[Pasted image 20230702141704.png|600]]

_IIFE (Immediately Invoked Function Expression)_ - это функция, которая вызывается немедленно после ее определения. То есть, это функция, которая выполняется сразу же при загрузке страницы или скрипта, без явного вызова.

Синтаксис IIFE выглядит следующим образом:

```javascript
(function () {
  // код функции
})();
```

Внешние круглые скобки нужны для того, чтобы обозначить, что это функциональное выражение, а не объявление функции. Внутренние круглые скобки вызывают функцию немедленно после ее определения.

IIFE позволяет создавать локальную область видимости для переменных и функций, которые не будут доступны извне. Это особенно полезно, когда нужно избежать конфликтов имён при использовании большого количества библиотек и скриптов на одной странице.

Пример IIFE:

```javascript
(function () {
  var message = "Hello, World!";
  console.log(message);
})();
```

В этом примере мы создали IIFE, которая определяет переменную "message" и выводит ее значение в консоль. При выполнении этого кода, функция вызывается немедленно и выводит сообщение "Hello, World!" в консоль.

IIFE также может быть использована для создания закрытых модулей, которые позволяют скрывать реализацию и предоставлять публичный интерфейс для работы с модулем.

```javascript
var counter = (function () {
  var count = 0;

  return {
    increment: function () {
      count++;
    },
    decrement: function () {
      count--;
    },
    getCount: function () {
      return count;
    },
  };
})();

console.log(counter.getCount()); // Выводит 0
counter.increment();
console.log(counter.getCount()); // Выводит 1
counter.decrement();
console.log(counter.getCount()); // Выводит 0
```

В этом примере мы создали IIFE, которая возвращает объект с тремя методами: increment(), decrement() и getCount(). Методы increment() и decrement() увеличивают и уменьшают переменную "count", а метод getCount() возвращает текущее значение "count". После определения IIFE мы сохраняем объект в переменной "counter" и можем использовать его методы для работы с переменной "count".

---

[[003 JSCore|Назад]]
