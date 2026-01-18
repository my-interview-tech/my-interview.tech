---
uid: H5A762AnFOKkr1ui2IvUt
title: Карманная книга по TS. Часть 2. Типы на каждый день
tags:
  - TypeScript
  - "#tuple"
  - "#string"
  - "#number"
  - "#boolean"
  - "#any"
  - "#unions"
  - "#aliases"
  - "#interface"
  - "#type"
  - "#type-assertion"
  - "#literal-types"
  - "#null"
  - "#undefined"
  - "#enums"
  - "#BigInt"
  - "#symbol"
info:
  - "https://habr.com/ru/companies/macloud/articles/559976/"
draft: false
technology: TypeScript
specialty: Frontend
tools: []
order: 0
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

## Примитивы: `string`, `number` и `boolean`

В `JS` часто используется 3 [примитива](https://developer.mozilla.org/ru/docs/Glossary/Primitive): `string`, `number` и `boolean`. Каждый из них имеет соответствующий тип в `TS`:

- `string` представляет строковые значения, например, `'Hello World'`
- `number` предназначен для чисел, например, `42`. `JS` не различает целые числа и числа с плавающей точкой (или запятой), поэтому не существует таких типов, как `int` или `float` — только `number`
- `boolean` — предназначен для двух значений: `true` и `false`

_Обратите внимание_: типы `String`, `Number` и `Boolean` (начинающиеся с большой буквы) являются легальными и ссылаются на специальные встроенные типы, которые, однако, редко используются в коде. Для типов всегда следует использовать `string`, `number` или `boolean`.

## Массивы

Для определения типа массива `[1, 2, 3]` можно использовать синтаксис `number[]`; такой синтаксис подходит для любого типа (например, `string[]` — это массив строк и т.д.). Также можно встретить `Array<number>`, что означает тоже самое. Такой синтаксис, обычно, используется для определения общих типов или дженериков (generics).

_Обратите внимание_: `[number]` — это другой тип, кортеж (tuple).

### `any`

`TS` предоставляет специальный тип `any`, который может использоваться для отключения проверки типов:

```tsx
let obj: any = { x: 0 };
// Ни одна из строк ниже не приведет к возникновению ошибки на этапе компиляции
// Использование `any` отключает проверку типов
// Использование `any` означает, что вы знакомы со средой выполнения кода лучше, чем `TS`
obj.foo();
obj();
obj.bar = 100;
obj = "hello";
const n: number = obj;
```

Тип `any` может быть полезен в случае, когда мы не хотим писать длинное определение типов лишь для того, чтобы пройти проверку.

#### `noImplicitAny`

При отсутствии определения типа и когда `TS` не может предположить его на основании контекста, неявным типом значение становится `any`.

Обычно, мы хотим этого избежать, поскольку `any` является небезопасным с точки зрения системы типов. Установка флага [`noImplicitAny`](https://www.typescriptlang.org/tsconfig/#noImplicitAny) позволяет квалифицировать любое неявное `any` как ошибку.

## Аннотации типа для переменных

При объявлении переменной с помощью `const`, `let` или `var` опционально можно определить ее тип:

```tsx
const myName: string = "John";
```

Однако, в большинстве случаев этого делать не требуется, поскольку `TS` пытается автоматически определить тип переменной на основе типа ее инициализатора, т.е. значения:

```tsx
// В аннотации типа нет необходимости - `myName` будет иметь тип `string`
const myName = "John";
```

## Функции

В `JS` функции, в основном, используются для работы с данными. `TS` позволяет определять типы как для входных (input), так и для выходных (output) значений функции.

### Аннотации типа параметров

При определении функции можно указать, какие типы параметров она принимает:

```tsx
function greet(name: string) {
  console.log(`Hello, ${name.toUpperCase()}!`);
}
```

Вот что произойдет при попытке вызвать функцию с неправильным аргументом:

```tsx
greet(42);
// Argument of type 'number' is not assignable to parameter of type 'string'. Аргумент типа 'number' не может быть присвоен параметру типа 'string'
```

_Обратите внимание_: количество передаваемых аргументов будет проверяться даже при отсутствии аннотаций типа параметров.

### Аннотация типа возвращаемого значения

Также можно аннотировать тип возвращаемого функцией значения:

```tsx
function getFavouriteNumber(): number {
  return 26;
}
```

Как и в случае с аннотированием переменных, в большинстве случаев `TS` может автоматически определить тип возвращаемого функцией значения на основе инструкции `return`.

### Анонимные функции

Анонимные функции немного отличаются от обычных. Когда функция появляется в месте, где `TS` может определить способ ее вызова, типы параметров такой функции определяются автоматически.

Вот пример:

```tsx
// Аннотации типа отсутствуют, но это не мешает `TS` обнаруживать ошибки
const names = ["Alice", "Bob", "John"];

// Определение типов на основе контекста вызова функции
names.forEach(function (s) {
  console.log(s.toUppercase());
  // Property 'toUppercase' does not exist on type 'string'. Did you mean 'toUpperCase'? Свойства 'toUppercase' не существует в типе 'string'. Вы имели ввиду 'toUpperCase'?
});

// Определение типов на основе контекста также работает для стрелочных функций
names.forEach((s) => {
  console.log(s.toUppercase());
  // Property 'toUppercase' does not exist on type 'string'. Did you mean 'toUpperCase'?
});
```

Несмотря на отсутствие аннотации типа для `s`, `TS` использует типы функции `forEach`, а также предполагаемый тип массива для определения типа `s`. Этот процесс называется определением типа на основе контекста (contextual typing).

## Типы объекта

Объектный тип — это любое значение со свойствами. Для его определения мы просто перечисляем все свойства объекта и их типы. Например, так можно определить функцию, принимающую объект с координатами:

```tsx
function printCoords(pt: { x: number; y: number }) {
  console.log(`Значение координаты 'x': ${pt.x}`);
  console.log(`Значение координаты 'y': ${pt.y}`);
}

printCoords({ x: 3, y: 7 });
```

Для разделения свойств можно использовать `,` или `;`. Тип свойства является опциональным. Свойство без явно определенного типа будет иметь тип `any`.

### Опциональные свойства

Для определения свойства в качестве опционального используется символ `?` после названия свойства:

```tsx
function printName(obj: { first: string; last?: string }) {
  // ...
}
// Обе функции скомпилируются без ошибок
printName({ first: "John" });
printName({ first: "Jane", last: "Air" });
```

В `JS` при доступе к несуществующему свойству возвращается `undefined`. По этой причине, при чтении опционального свойства необходимо выполнять проверку на `undefined`:

```tsx
function printName(obj: { first: string; last?: string }) {
  // Ошибка - приложение может сломаться, если аргумент `last` не будет передан в функцию
  console.log(obj.last.toUpperCase()); // Object is possibly 'undefined'. Потенциальным значением объекта является 'undefined'

  if (obj.last !== undefined) {
    // Теперь все в порядке
    console.log(obj.last.toUpperCase());
  }

  // Безопасная альтернатива, использующая современный синтаксис `JS` - оператор опциональной последовательности (`?.`)
  console.log(obj.last?.toUpperCase());
}
```

## Объединения ( #unions)

_Обратите внимание_: в литературе, посвященной `TS`, `union`, обычно, переводится как объединение, но фактически речь идет об альтернативных типах, объединенных в один тип.

### Определение объединения

Объединение — это тип, сформированный из 2 и более типов, представляющий значение, которое может иметь один из этих типов. Типы, входящие в объединение, называются членами (members) объединения.

Реализуем функцию, которая может оперировать строками или числами:

```tsx
function printId(id: number | string) {
  console.log(`Ваш ID: ${id}`);
}

// OK
printId(101);
// OK
printId("202");
// Ошибка
printId({ myID: 22342 });
// Argument of type '{ myID: number }' is not assignable to parameter of type 'string | number'. Type '{ myID: number }' is not assignable to type 'number'. Аргумент типа '{ myID: number }' не может быть присвоен параметру типа 'string | number'. Тип '{ myID: number }' не может быть присвоен типу 'number'
```

### Работа с объединениями

В случае с объединениями, `TS` позволяет делать только такие вещи, которые являются валидными для каждого члена объединения. Например, если у нас имеется объединение `string | number`, мы не сможем использовать методы, которые доступны только для `string`:

```tsx
function printId(id: number | string) {
  console.log(id.toUpperCase());
  // Property 'toUpperCase' does not exist on type 'string | number'. Property 'toUpperCase' does not exist on type 'number'.
}
```

Решение данной проблемы заключается в сужении (narrowing) объединения. Например, `TS` знает, что только для `string` оператор `typeof` возвращает `'string'`:

```tsx
function printId(id: number | string) {
  if (typeof id === "string") {
    // В этой ветке `id` имеет тип 'string'
    console.log(id.toUpperCase());
  } else {
    // А здесь `id` имеет тип 'number'
    console.log(id);
  }
}
```

Другой способ заключается в использовании функции, такой как `Array.isArray`:

```tsx
function welcomePeople(x: string[] | string) {
  if (Array.isArray(x)) {
    // Здесь `x` - это 'string[]'
    console.log("Привет, " + x.join(" и "));
  } else {
    // Здесь `x` - 'string'
    console.log("Добро пожаловать, одинокий странник " + x);
  }
}
```

В некоторых случаях все члены объединения будут иметь общие методы. Например, и массивы, и строки имеют метод `slice`. Если каждый член объединения имеет общее свойство, необходимость в сужении отсутствует:

```tsx
function getFirstThree(x: number[] | string) {
  return x.slice(0, 3);
}
```

## Синонимы типов (type #aliases)

Что если мы хотим использовать один и тот же тип в нескольких местах? Для этого используются синонимы типов:

```tsx
type Point = {
  x: number;
  y: number;
};

// В точности тоже самое, что в приведенном выше примере
function printCoords(pt: Point) {
  console.log(`Значение координаты 'x': ${pt.x}`);
  console.log(`Значение координаты 'y': ${pt.y}`);
}

printCoords({ x: 3, y: 7 });
```

Синонимы можно использовать не только для объектных типов, но и для любых других типов, например, для объединений:

```tsx
type ID = number | string;
```

_Обратите внимание_: синонимы — это всего лишь синонимы, мы не можем создавать на их основе другие "версии" типов. Например, такой код может выглядеть неправильным, но `TS` не видит в нем проблем, поскольку оба типа являются синонимами одного и того же типа:

```tsx
type UserInputSanitizedString = string;

function sanitizeInput(str: string): UserInputSanitizedString {
  return sanitize(str);
}

// Создаем "обезвреженный" инпут
let userInput = sanitizeInput(getInput());

// По-прежнему имеем возможность изменять значение переменной
userInput = "new input";
```

## Интерфейсы

Определение интерфейса #interface — это другой способ определения типа объекта:

```tsx
interface Point {
  x: number;
  y: number;
}

function printCoords(pt: Point) {
  console.log(`Значение координаты 'x': ${pt.x}`);
  console.log(`Значение координаты 'y': ${pt.y}`);
}

printCoords({ x: 3, y: 7 });
```

`TS` иногда называют структурно типизированной системой типов (structurally typed type system) — `TS` заботит лишь соблюдение структуры значения, передаваемого в функцию `printCoords`, т.е. содержит ли данное значение ожидаемые свойства.

### Разница между синонимами типов и интерфейсами

Синонимы типов и интерфейсы очень похожи. Почти все возможности `interface` доступны в `type`. Ключевым отличием между ними является то, что `type` не может быть повторно открыт для добавления новых свойств, в то время как `interface` всегда может быть расширен.

Пример расширения интерфейса:

```tsx
interface Animal {
  name: string;
}

interface Bear extends Animal {
  honey: boolean;
}

const bear = getBear();
bear.name;
bear.honey;
```

Пример расширения типа с помощью пересечения (intersection):

```tsx
type Animal {
 name: string
}

type Bear = Animal & {
 honey: boolean
}

const bear = getBear()
bear.name
bear.honey
```

Пример добавления новых полей в существующий интерфейс:

```tsx
interface Window {
 title: string
}

interface Window {
 ts: TypeScriptAPI
}

const src = 'const a = 'Hello World''
window.ts.transpileModule(src, {})
```

Тип не может быть изменен после создания:

```tsx
type Window = {
  title: string;
};

type Window = {
  ts: TypeScriptAPI;
};
// Ошибка: повторяющийся идентификатор 'Window'.
```

_Общее правило_: используйте `interface` до тех пор, пока вам не понадобятся возможности `type`.

## Утверждение типа ( #type-assertion )

В некоторых случаях мы знаем о типе значения больше, чем `TS`.

Например, когда мы используем `document.getElementById`, `TS` знает лишь то, что данный метод возвращает какой-то `HTMLElement`, но мы знаем, например, что будет возвращен `HTMLCanvasElement`. В этой ситуации мы можем использовать утверждение типа для определения более конкретного типа:

```tsx
const myCanvas = document.getElementById("main_canvas") as HTMLCanvasElement;
```

Для утверждения типа можно использовать другой синтаксис (е в TSX-файлах):

```tsx
const myCanvas = <HTMLCanvasElement>document.getElementById('main_canvas')
```

`TS` разрешает утверждения более или менее конкретных версий типа. Это означает, что преобразования типов выполнять нельзя:

```tsx
const x = "hello" as number;
// Conversion of type 'string' to type 'number' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
// Преобразование типа 'string' в тип 'number' может быть ошибкой, поскольку эти типы не перекрываются. Если это было сделано намерено, то выражение сначала следует преобразовать в 'unknown'
```

Иногда это правило может быть слишком консервативным и мешать выполнению более сложных валидных преобразований. В этом случае можно использовать двойное утверждение: сначала привести тип к `any` (или `unknown`), затем к нужному типу:

```tsx
const a = expr as any as T;
```

## Литеральные типы ( #literal-types )

В дополнение к общим типам `string` и `number`, мы можем ссылаться на конкретные строки и числа, находящиеся на определенных позициях.

Вот как `TS` создает типы для литералов:

```tsx
let changingString = "Hello World";
changingString = "Olá Mundo";
// Поскольку `changingString` может представлять любую строку, вот
// как TS описывает ее в системе типов
changingString;
// let changingString: string

const constantString = "Hello World";
// Поскольку `constantString` может представлять только указанную строку, она
// имеет такое литеральное представление типа
constantString;
// const constantString: 'Hello World'
```

Сами по себе литеральные типы особой ценности не представляют:

```tsx
let x: "hello" = "hello";
// OK
x = "hello";
// ...
x = "howdy";
// Type '"howdy"' is not assignable to type '"hello"'.
```

Но комбинация литералов с объединениями позволяет создавать более полезные вещи, например, функцию, принимающую только набор известных значений:

```tsx
function printText(s: string, alignment: "left" | "right" | "center") {
  // ...
}
printText("Hello World", "left");
printText("G'day, mate", "centre");
// Argument of type '"centre"' is not assignable to parameter of type '"left" | "right" | "center"'.
```

Числовые литеральные типы работают похожим образом:

```tsx
function compare(a: string, b: string): -1 | 0 | 1 {
  return a === b ? 0 : a > b ? 1 : -1;
}
```

Разумеется, мы можем комбинировать литералы с нелитеральными типами:

```tsx
interface Options {
  width: number;
}
function configure(x: Options | "auto") {
  // ...
}
configure({ width: 100 });
configure("auto");
configure("automatic");
// Argument of type '"automatic"' is not assignable to parameter of type 'Options | "auto"'.
```

### Предположения типов литералов

При инициализации переменной с помощью объекта, `TS` будет исходить из предположения о том, что значения свойств объекта в будущем могут измениться. Например, если мы напишем такой код:

```tsx
const obj = { counter: 0 };
if (someCondition) {
  obj.counter = 1;
}
```

`TS` не будет считать присвоение значения `1` полю, которое раньше имело значение `0`, ошибкой. Это объясняется тем, что `TS` считает, что типом `obj.counter` является `number`, а не `0`.

Тоже самое справедливо и в отношении строк:

```tsx
const req = { url: "https://example.com", method: "GET" };
handleRequest(req.url, req.method);
// Argument of type 'string' is not assignable to parameter of type '"GET" | "POST"'.
```

В приведенном примере предположительный типом `req.method` является `string`, а не `'GET'`. Поскольку код может быть вычислен между созданием `req` и вызовом функции `handleRequest`, которая может присвоить `req.method` новое значение, например, `GUESS`, `TS` считает, что данный код содержит ошибку.

Существует 2 способа решить эту проблему.

1. Можно утвердить тип на каждой позиции:

```tsx
// Изменение 1
const req = { url: "https://example.com", method: "GET" as "GET" };
// Изменение 2
handleRequest(req.url, req.method as "GET");
```

2. Для преобразования объекта в литерал можно использовать `as const`:

```tsx
const req = { url: "https://example.com", method: "GET" } as const;
handleRequest(req.url, req.method);
```

## #null и #undefined

В `JS` существует два примитивных значения, сигнализирующих об отсутствии значения: `null` и `undefined`. `TS` имеет соответствующие типы. То, как эти типы обрабатываются, зависит от настройки `strictNullChecks` (см. часть 1).

### Оператор утверждения ненулевого значения (non-null assertion operator)

`TS` предоставляет специальный синтаксис для удаления `null` и `undefined` из типа без необходимости выполнения явной проверки. Указание `!` после выражения означает, что данное выражение не может быть нулевым, т.е. иметь значение `null` или `undefined`:

```tsx
function liveDangerously(x?: number | undefined) {
  // Ошибки не возникает
  console.log(x!.toFixed());
}
```

### Перечисления ( #enums )

Перечисления позволяют описывать значение, которое может быть одной из набора именованных констант. Использовать перечисления не рекомендуется.

### Редко используемые примитивы

#### #bigint

Данный примитив используется для представления очень больших целых чисел `BigInt`:

```tsx
// Создание `bigint` с помощью функции `BigInt`
const oneHundred: bigint = BigInt(100);

// Создание `bigint` с помощью литерального синтаксиса
const anotherHundred: bigint = 100n;
```

Подробнее о `BigInt` можно почитать [здесь](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-2.html#bigint).

#### #symbol

Данный примитив используется для создания глобально уникальных ссылок с помощью функции `Symbol()`:

```tsx
const firstName = Symbol("name");
const secondName = Symbol("name");

if (firstName === secondName) {
  // This condition will always return 'false' since the types 'typeof firstName' and 'typeof secondName' have no overlap.
  // Символы `firstName` и `lastName` никогда не будут равными
}
```

Подробнее о символах можно почитать [здесь](https://www.typescriptlang.org/docs/handbook/symbols.html).
