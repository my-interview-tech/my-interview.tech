---
uid: TyTO5x-uMGFkq_knob_dv
title: >-
  Можно ли в TypeScript использовать строго типизированные функции в качестве
  параметров?
tags:
  - "#TypeScript"
  - "#type"
  - "#interface"
info:
  - >-
    https://stackoverflow.com/questions/12694530/what-is-typescript-and-why-would-i-use-it-in-place-of-javascript
draft: false
technology: TypeScript
specialty: Frontend
tools: []
order: 6
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

_Строгая типизация (strong typing)_ - это основной принцип языка, который предоставляет возможность определения типов данных для переменных, функций, параметров и свойств объектов в коде.

Строгая типизация позволяет _выявлять ошибки в типах данных на этапе компиляции, что уменьшает количество ошибок во время выполнения программы и улучшает общую надежность кода._

Определение типов данных происходит с помощью явного указания типов или вывода типов.

Например:

```ts
let age: number = 30;
let name: string = "John";
let isValid: boolean = true;

function greet(name: string): void {
  console.log(`Hello, ${name}!`);
}
```

Здесь мы определяем переменные `age`, `name` и `isValid` с явно указанными типами данных `number`, `string` и `boolean`. Также мы определяем функцию `greet` с параметром `name` и типом `void`, который указывает на то, что функция не возвращает значение.

Строгая типизация в TypeScript также поддерживает использование типов данных для объектов и массивов.

Например:

```ts
interface Person {
  name: string;
  age: number;
}

let person: Person = {
  name: "John",
  age: 30,
};

let numbers: number[] = [1, 2, 3, 4, 5];
```

Здесь мы определяем интерфейс `Person`, который содержит свойства `name` и `age`. Затем мы определяем переменную `person` с типом `Person`, которая содержит объект с полями `name` и `age`. Мы также определяем переменную `numbers` с типом `number[]`, которая содержит массив чисел.

Строгая типизация позволяет использовать более безопасные и надежные типы данных в коде, что облегчает отладку и сопровождение программы. Кроме того, TypeScript предоставляет множество инструментов для проверки типов данных и улучшения качества кода, таких как проверка типов во время компиляции, автодополнение кода в редакторах кода и многие другие.

Рассмотрим следующий пример:

```tsx
class Foo {
  save(callback: Function): void {
    //Выполняем сохранение
    var result: number = 42; //Получаем в ходе операции сохранения некое число
    //Можно ли во время выполнения программы как-то обеспечить то, чтобы коллбэк принимал лишь один параметр типа number?
    callback(result);
  }
}

var foo = new Foo();
var callback = (result: string): void => {
  alert(result);
};
foo.save(callback);
```

Можно ли в методе `save` организовать работу с типизированным коллбэком? Перепишите код для того, чтобы это продемонстрировать.

В TypeScript можно объявить тип коллбэка, после чего переписать код:

```tsx
type NumberCallback = (n: number) => any;

class Foo {
  // Эквивалент
  save(callback: NumberCallback): void {
    console.log(1);
    callback(42);
  }
}

var numCallback: NumberCallback = (result: number): void => {
  console.log("numCallback: ", result.toString());
};

var foo = new Foo();
foo.save(numCallback);
```

---

[[005 TypeScript|Назад]]
