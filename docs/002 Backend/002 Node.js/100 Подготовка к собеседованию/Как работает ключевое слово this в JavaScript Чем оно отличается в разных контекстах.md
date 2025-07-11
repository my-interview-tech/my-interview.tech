---
title: Как работает ключевое слово this в JavaScript Чем оно отличается в разных контекстах
draft: false
tags:
  - "#NodeJS"
  - "#JavaScript"
  - "#this"
  - "#контекст"
  - "#функции"
  - "#замыкания"
info:
  - "[Документация MDN по ключевому слову this](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Operators/this)"
  - "[JavaScript this: понимание контекста в JavaScript](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Operators/this#примеры)"
  - "[this в стрелочных функциях](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Functions/Arrow_functions)"
---

Ключевое слово `this` в JavaScript ссылается на объект, в контексте которого выполняется код. Понимание `this` очень важно для написания эффективного JavaScript-кода, так как значение `this` может меняться в зависимости от контекста выполнения.

## 1. Глобальный контекст

В глобальном контексте (вне любой функции) `this` указывает на глобальный объект:

```javascript
// В браузере
console.log(this === window) // true

// В Node.js
console.log(this === global) // true в обычном скрипте
console.log(this === module.exports) // true в модуле
```

## 2. Контекст функции

Значение `this` в функции зависит от того, как функция вызывается:

### a) Простой вызов функции

```javascript
function showThis() {
  console.log(this)
}

showThis() // window (в браузере) или global (в Node.js)
```

В строгом режиме (`'use strict'`) `this` будет `undefined`:

```javascript
"use strict"
function showThis() {
  console.log(this)
}

showThis() // undefined
```

### b) Метод объекта

Когда функция вызывается как метод объекта, `this` указывает на этот объект:

```javascript
const user = {
  name: "Иван",
  greet() {
    console.log(`Привет, меня зовут ${this.name}`)
  },
}

user.greet() // "Привет, меня зовут Иван"
```

### c) Конструктор с new

Если функция вызывается с ключевым словом `new`, `this` указывает на новый созданный объект:

```javascript
function User(name) {
  this.name = name
  this.sayHi = function () {
    console.log(`Привет, я ${this.name}`)
  }
}

const user = new User("Мария")
user.sayHi() // "Привет, я Мария"
```

### d) Явное указание this: call, apply, bind

С помощью методов `call`, `apply` и `bind` можно явно указать, чему должно быть равно `this`:

```javascript
function introduce(greeting) {
  console.log(`${greeting}, я ${this.name}`)
}

const person = { name: "Алексей" }

// Используем call (аргументы передаются через запятую)
introduce.call(person, "Привет") // "Привет, я Алексей"

// Используем apply (аргументы передаются как массив)
introduce.apply(person, ["Здравствуйте"]) // "Здравствуйте, я Алексей"

// Используем bind (создает новую функцию с привязанным this)
const introducePerson = introduce.bind(person)
introducePerson("Добрый день") // "Добрый день, я Алексей"
```

## 3. Стрелочные функции

Стрелочные функции не имеют своего `this`. Они наследуют `this` из внешнего лексического окружения:

```javascript
const obj = {
  name: "Объект",
  regularFunc: function () {
    console.log("Regular function this:", this.name)

    const arrowFunc = () => {
      console.log("Arrow function this:", this.name)
    }

    arrowFunc()
  },
}

obj.regularFunc()
// Regular function this: Объект
// Arrow function this: Объект
```

## 4. Обработчики событий (в браузере)

В обработчиках событий `this` обычно указывает на элемент, который вызвал событие:

```javascript
const button = document.querySelector("button")

button.addEventListener("click", function () {
  console.log(this) // <button> элемент
})

// Но со стрелочной функцией будет иначе:
button.addEventListener("click", () => {
  console.log(this) // window или undefined в строгом режиме
})
```

## 5. Классы в JavaScript

В методах классов `this` относится к экземпляру класса:

```javascript
class Person {
  constructor(name) {
    this.name = name
  }

  greet() {
    console.log(`Привет, меня зовут ${this.name}`)
  }
}

const person = new Person("Иван")
person.greet() // "Привет, меня зовут Иван"
```

## Частые ошибки и проблемы с this

### Потеря контекста

```javascript
const user = {
  name: "Иван",
  greet() {
    console.log(`Привет, я ${this.name}`)
  },
}

// Работает правильно
user.greet() // "Привет, я Иван"

// Потеря контекста
const greet = user.greet
greet() // "Привет, я undefined" (this здесь будет window или undefined)
```

### Решения для сохранения контекста

1. **Использование bind:**

```javascript
const user = {
  name: "Иван",
  greet() {
    console.log(`Привет, я ${this.name}`)
  },
}

const greet = user.greet.bind(user)
greet() // "Привет, я Иван"
```

2. **Использование стрелочных функций:**

```javascript
const user = {
  name: "Иван",
  delayedGreet() {
    setTimeout(() => {
      console.log(`Привет, я ${this.name}`)
    }, 1000)
  },
}

user.delayedGreet() // через 1 секунду: "Привет, я Иван"
```

## Заключение

Ключевое слово `this` в JavaScript динамически определяется в момент вызова функции и зависит от контекста вызова. Понимание того, как определяется `this` в разных ситуациях, поможет избежать распространенных ошибок и писать более предсказуемый код.

Основные правила:

1. В глобальном контексте `this` указывает на глобальный объект.
2. В методе объекта `this` указывает на сам объект.
3. При вызове с `new` `this` указывает на новый экземпляр.
4. Стрелочные функции наследуют `this` из родительского контекста.
5. Методы `call`, `apply` и `bind` позволяют явно задать значение `this`.

---

[[002 Node.js|Назад]]
