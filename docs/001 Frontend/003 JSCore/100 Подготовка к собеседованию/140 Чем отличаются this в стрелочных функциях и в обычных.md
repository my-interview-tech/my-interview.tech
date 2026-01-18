---
uid: HFeiPKfG28aReA__09zsA
title: Чем отличаются this в стрелочных функциях и в обычных?
tags:
  - "#JavaScript"
  - "#this"
  - "#call"
  - "#bind"
  - "#apply"
info:
  - "https://habr.com/ru/articles/515356/"
draft: false
technology: JSCore
specialty: Frontend
tools: []
order: 140
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

Ключевое отличие между `this` в стрелочных функциях и в обычных функциях заключается в том, как оно определяется.

_В обычных функциях_ значение `this` зависит от контекста, в котором функция вызывается. Значение `this` определяется в момент вызова функции и может изменяться в зависимости от контекста вызова. Контекст вызова может быть определен явно, используя методы `call()`, `apply()` или `bind()`, или неявно, когда функция вызывается как метод объекта (то есть через точку) или как функция конструктора.

```javascript
const obj = {
  name: "John",
  greet: function () {
    console.log(`Hello, my name is ${this.name}`);
  },
};

obj.greet(); // "Hello, my name is John"
```

_В стрелочных функциях_ значение `this` определяется лексически, то есть оно наследуется из контекста, в котором функция была определена. Значение `this` внутри стрелочной функции не может быть изменено ни явно, ни неявно. Это означает, что `this` в стрелочных функциях всегда ссылается на контекст внешней функции, в которой была определена стрелочная функция.

```javascript
const obj = {
  name: "John",
  greet: function () {
    const arrowGreet = () => {
      console.log(`Hello, my name is ${this.name}`);
    };
    arrowGreet();
  },
};

obj.greet(); // "Hello, my name is John"
```

Почему `object.arrowArrow()()` ответом является `{ }`

```js
const object = {
  arrowArrow: () => {
    return () => {
      console.log(this);
    };
  },
};

object.arrowArrow()(); // {}
```

Стрелочная функция получает контекст в момент создания, и берет его от первой родительской функции (либо глобальный, если родителя нет).

Исходя из этой логики мы создаем функцию `object.arrowArrow`, у нее контекст либо global/ window/ undefined. Она в свою очередь создает анонимную функцию и возвращает ее нам, у новой контекст берем у родителя, то есть у `object.arrowArrow`. А у нее он равен global/ window/ undefined

---

[[003 JSCore|Назад]]
