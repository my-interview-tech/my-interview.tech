---
uid: PbPFP7MaOOI1eqF8U7reH
title: "В чём разница между var, let и const в JavaScript"
tags:
  - "#JavaScript"
  - "#переменная"
  - "#var"
  - "#let"
  - "#const"
  - "#областьВидимости"
  - "#неизменность"
  - "#ES6"
  - "#цикл"
  - "#for"
  - "#hoisting"
draft: false
technology: JSCore
specialty: Frontend
tools: []
order: 29
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

## Введение

Сегодня вы узнаете два новых способа создавать переменные в JavaScript (ES6), а именно с помощью `let` и `const`. Мы разберёмся в чём разница между операторами `var`, `let`, и `const`. Ещё мы затронем такие темы, как: область видимости функции и блока, поднятие переменной (hoisting) и неизменность.

В спецификации ES2015 (ES6) нам представили два новых оператора для создания переменных: `let` и `const`. Чтобы понять различия между `var`, `let`, и `const`, мы должны сперва поговорить о таких понятиях, как: объявление и инициализация переменных, область видимости (особенно функции) и поднятие переменной.

## Инициализация и объявление переменной

Объявление переменной вводит новый идентификатор.

### var declaration

Только что мы создали новый идентификатор с именем declaration.
Когда в JavaScript создаётся переменная, она инициализируется со значением `undefined`. Если мы сейчас попытаемся логировать переменную `declaration`, то нам вернётся `undefined`.

### var declaration console.log(declaration)

Инициализация — это присваивание значения переменной.

var declaration console.log(declaration) // undefined declaration = 'This is an initialization'

Итак, мы инициализировали переменную `declaration`, присвоив ей строку.

Это подводит нас к понятию «область видимости».

## Область видимости

#областьВидимости видимости определяет, где в коде программы будут доступны переменные и функции. В JavaScript есть два типа области видимости — глобальная и локальная (**global scope** и **function scope**). Согласно официальной спецификации:

> _Если переменная создаётся внутри объявления функции, то её область видимости определяется как локальная и ограничивается этой функцией._

То есть, если вы создаёте переменную внутри функции с оператором `var`, то она будет доступна только внутри этой функции и вложенных в неё функциях.

```js
function getDate() {
  var date = new Date();
  return date;
}

getDate();
console.log(date); // ❌ Reference Error
```

В коде выше, мы пытаемся получить доступ к переменной вне функции, в которой она была объявлена. Так как переменная `date` ограничена областью видимости функции `getDate`, она доступна только внутри `getDate` или для любой вложенной в неё функции (как в примере ниже).

```js
function getDate() {
  var date = new Date();

  function formatDate() {
    return date.toDateString().slice(4); // ✅
  }
  return formatDate();
}

getDate();
console.log(date); // ❌ Reference Error
```

Давайте рассмотрим более сложный пример. Допустим у нас есть массивы `prices` и `discount`, нам нужно создать функцию, которая возьмёт значения из обоих массивов и вернёт новый массив цен с учётом скидок. В итоге у нас должен получится такой массив:

```js
discountPrices([100, 200, 300], 0.5);
```

Реализация:

```js
function discountPrices (prices, discount) {
  var discounted = []for (var i = 0; i < prices.length; i++) {
    var discountedPrice = prices[i] * (1 - discount)
    var finalPrice = Math.round(discountedPrice * 100) / 100
    discounted.push(finalPrice)
  }
  return discounted
}
```

Выглядит довольно просто, но что происходит в области видимости блока?
Обратите внимание на цикл `for`. Доступны ли переменные, которые объявлены внутри цикла, вне его? Оказывается, что да.

```js
function discountPrices (prices, discount) {
  var discounted = []for (var i = 0; i < prices.length; i++) {
    var discountedPrice = prices[i] * (1 - discount)
    var finalPrice = Math.round(discountedPrice * 100) / 100
    discounted.push(finalPrice)
  }console.log(i) // 3
  console.log(discountedPrice) // 150
  console.log(finalPrice) // 150return discounted
}
```

Если JavaScript это единственный язык программирования, которым вы владеете, то вы не заметите ничего странного. Но если вы перешли с другого языка, вы, вероятно, немного запутались в том, что здесь происходит.

Здесь нет ошибки, это просто немного необычно. К тому же, у нас нет необходимости иметь доступ к `i`, `discountedPrice`, и `finalPrice` вне цикла `for`. Для нас в этом нет никакой пользы, более того, в некоторых случаях это может мешать. Тем не менее, поскольку переменные, объявлены оператором `var`, они относятся к функции и доступны вне цикла.

Теперь вы знаете, что такое область видимости, инициализация и объявление переменных; нам осталось разобраться с понятием «поднятие переменной» (hoisting), прежде чем перейти к `let` и `const`.

## Hoisting

Ранее я уже говорил, что при создании переменной в JavaScript, она инициализируются со значением `undefined`. Это и есть hoisting. Интерпретатор JavaScript присваивает переменой значение `undefined` по умолчанию, во время так называемой фазы «Создания».

Давайте посмотрим, как действует *hoisting, на предыдущем примере:*

```js
function discountPrices(prices, discount) {
  var discounted = undefined;
  var i = undefined;
  var discountedPrice = undefined;
  var finalPrice = undefined;
  discounted = [];

  for (var i = 0; i < prices.length; i++) {
    discountedPrice = prices[i] * (1 - discount);
    finalPrice = Math.round(discountedPrice * 100) / 100;
    discounted.push(finalPrice);
  }

  console.log(i); // 3
  console.log(discountedPrice); // 150
  console.log(finalPrice); // 150
  return discounted;
}
```

Обратите внимание, что всем объявленным переменным присвоено значение `undefined` по умолчанию. Вот почему, если вы попытаетесь получить доступ к одной из этих переменных до того, как она была фактически объявлена, вам вернётся `undefined`.

```js
function discountPrices(prices, discount) {
  console.log(discounted); // undefined
  var discounted = [];
  for (var i = 0; i < prices.length; i++) {
    var discountedPrice = prices[i] * (1 - discount);
    var finalPrice = Math.round(discountedPrice * 100) / 100;
    discounted.push(finalPrice);
  }
  console.log(i); // 3
  console.log(discountedPrice); // 150
  console.log(finalPrice); // 150return discounted
}
```

Теперь, когда вы знаете о `var` всё что нужно, давайте наконец разберёмся в чём разница между `var`, `let`, и `const`?

## var VS let VS const

### var VS let

Сперва сравним `var` и `let`. Главное отличие `let` в том, что область видимости переменной ограничивается блоком, а не функцией. Другими словами, переменная, созданная с помощью оператора `let`, доступна внутри блока, в котором она была создана и в любом вложенном блоке. Говоря «блок», я имею ввиду всё что вложено между фигурными скобками `{}`, как например в цикле `for` или условии `if`.

Давайте в последний раз вернёмся к нашей функции `discountPrices`.

```js
function discountPrices(prices, discount) {
  var discounted = [];
  for (var i = 0; i < prices.length; i++) {
    var discountedPrice = prices[i] * (1 - discount);
    var finalPrice = Math.round(discountedPrice * 100) / 100;
    discounted.push(finalPrice);
  }

  console.log(i); // 3
  console.log(discountedPrice); // 150
  console.log(finalPrice); // 150
  return discounted;
}
```

Помните, что мы можем логировать `i`, `discountedPrice`, и `finalPrice` вне цикла `for`, так как они созданы с помощью `var`, а значит видны в пределах функции. Но, что, если мы заменим оператор `var` на `let` и попробуем выполнить код.

```js
function discountPrices(prices, discount) {
  let discounted = [];
  for (let i = 0; i < prices.length; i++) {
    let discountedPrice = prices[i] * (1 - discount);
    let finalPrice = Math.round(discountedPrice * 100) / 100;
    discounted.push(finalPrice);
  }
  console.log(i); // 3
  console.log(discountedPrice); // 150
  console.log(finalPrice); // 150 return discounted
}
discountPrices([100, 200, 300], 0.5); // ❌ ReferenceError: i is not defined
```

Вот что мы получим: `ReferenceError: i is not defined`. Это подтверждает, что `let` переменные ограничены блоком, а не функцией. Поэтому попытка получить к ним доступ приводит к ошибке.

### var VS let. var: function scopedlet: block scoped

Следующее отличие связано с поднятием переменной. Ранее мы определили, что интерпретатор в JavaScript присваивает переменным значение `undefined` по умолчанию во время фазы «Создания». Вы даже видели это в действии, логируя переменную до её объявления (и получили `undefined`).

```js
function discountPrices(prices, discount) {
  console.log(discounted); // undefined
  var discounted = [];
  for (var i = 0; i < prices.length; i++) {
    var discountedPrice = prices[i] * (1 - discount);
    var finalPrice = Math.round(discountedPrice * 100) / 100;
    discounted.push(finalPrice);
  }

  console.log(i); // 3
  console.log(discountedPrice); // 150
  console.log(finalPrice); // 150return discounted
}
```

Я даже не могу придумать причину, по которой стоит запрашивать переменную до её объявления. Мне кажется, что получать по умолчанию ReferenceError лучше, чем возврат `undefined`.

Кстати, именно это и делает `let`, т.е. вы получите ошибку ReferenceError вместо значения `undefined`, если запросите переменную, созданную оператором `let`, до её объявления.

```js
function discountPrices(prices, discount) {
  console.log(discounted); // ❌ ReferenceError
  let discounted = [];
  for (let i = 0; i < prices.length; i++) {
    let discountedPrice = prices[i] * (1 - discount);
    let finalPrice = Math.round(discountedPrice * 100) / 100;
    discounted.push(finalPrice);
  }
  console.log(i); // 3
  console.log(discountedPrice); // 150
  console.log(finalPrice); // 150return discounted
}
```

### var VS let var:

function scoped  
 undefined when accessing a variable before it's declaredlet:  
 block scoped  
 ReferenceError when accessing a variable before it's declared

## let VS const

Различия между `var` и `let` мы выяснили, а что насчёт `const`? Получается, что `const` и `let` почти одно и тоже. И всё же есть одно отличие: значение переменной, объявленной с помощью `const`, нельзя переназначить. Это можно увидеть в примере ниже:

```js
let name = "Tyler";
const handle = "tylermcginnis";
name = "Tyler McGinnis"; // ✅
handle = "[@tylermcginnis](http://twitter.com/tylermcginnis)";
// ❌ TypeError: Assignment to constant variable.
```

Итак, если вы хотите, чтобы переменная была неизменной, используйте `const`. Ну, почти. На самом деле оператор `const` не делает переменную неизменной, а только не даёт переназначать её значение. Вот хороший пример:

```js
const person = {
  name: "Kim Kardashian",
};
person.name = "Kim Kardashian West"; // ✅
person = {}; // ❌ Assignment to constant variable.
```

Обратите внимание, что изменение свойства объекта не является его переназначением, поэтому, даже если объект объявлен с помощью `const`, это не означает, что вы не можете изменить ни одно из его свойств. Это только означает, что вы не можете переназначить его на новое значение.

Теперь главный вопрос: что следует использовать `var`, `let`, или `const`? Наиболее популярное мнение, под которым подписываюсь и я, — всегда использовать `const`, кроме тех случаев, когда вы знаете, что переменная будет изменятся. Используя `const`, вы как бы говорите себе будущему и другим разработчикам, которые будут читать ваш код, что эту переменную изменять не следует. Если вам нужна изменяемая переменная (например, в цикле `for`), то используйте `let`.

Таким образом, между изменяемыми и неизменяемыми переменными осталось не так много различий. Это означает, что вам больше не придётся использовать `var`.

Теперь «непопулярное» мнение, хотя оно и обоснованно (пока): вы никогда не должны использовать const, потому что, хотя вы пытаетесь показать, что переменная неизменна, это не совсем правда (мы видели это на примере выше). Разработчики, которые разделяют это мнение, всегда используют `let`, за исключением случаев когда переменная действительно является константой, например `_LOCATION_ = ...`.

Повторим для закрепления. Область видимости `var` переменных ограничена функцией, если вы обратитесь к переменной до её объявления, то получите `undefined`. `const` и `let` ограничены блоком, а попытка обратится к переменной до её объявления, вернётся ошибкой ReferenceError. И наконец, разница между `let` и `const` в том, что в первом случае вы можете изменить значение переменной, а во втором нет.

var VS let VS constvar:

function scoped  
 undefined when accessing a variable before it's declaredlet:  
 block scoped  
 ReferenceError when accessing a variable before it's declaredconst:  
 block scoped  
 ReferenceError when accessing a variable before it's declared  
 can't be reassigned
