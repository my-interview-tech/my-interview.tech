---
uid: No7cshXtnAEQDnyOAk2Gf
title: Карманная книга по TS. Часть 3. Сужение типов
tags:
  - TypeScript
  - "#type-guard"
  - "#narrowing"
  - "#typeOf"
  - "#instanceof"
  - "#assignments"
  - "#never"
info:
  - "https://habr.com/ru/companies/macloud/articles/560594/"
draft: false
technology: TypeScript
specialty: Frontend
tools: []
order: 0
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

## Продолжение

Предположим, что у нас имеется функция под названием `padLeft`:

```tsx
function padLeft(padding: number | string, input: string): string {
  throw new Error("Еще не реализовано!");
}
```

Если `padding` — это `number`, значит, мы хотим добавить указанное количество пробелов перед `input`. Если `padding` — это `string`, значит, мы просто хотим добавить `padding` перед `input`. Попробуем реализовать логику, когда `padLeft` принимает `number` для `padding`:

```tsx
function padLeft(padding: number | string, input: string): string {
  return new Array(padding + 1).join(" ") + input;
  // Operator '+' cannot be applied to types 'string | number' and 'number'. Оператор '+' не может быть применен к типам 'string | number'
}
```

Мы получаем ошибку. `TS` предупреждает нас о том, что добавление `number` к `number | string` может привести к неожиданному результату, и он прав. Другими словами, мы должны проверить тип `padding` перед выполнением каких-либо операций с ним:

```tsx
function padLeft(padding: number | string, input: string): string {
  if (typeof padding === "number") {
    return new Array(padding + 1).join(" ") + input;
  }
  return padding + input;
}
```

Выражение `typeof padding === 'number'` называется защитником или предохранителем типа ( #type-guard ). А процесс приведения определенного типа к более конкретной версии с помощью защитников типа и присвоений называется сужением типа ( #narrowing ).

```tsx
function padLeft(padding: number | string, input: string) {
  if (typeof padding === "number") {
    return new Array(padding + 1).join(" ") + input;
    // (parameter) padding: number
  }
  return padding + input;
  // (parameter) padding: string
}
```

Для сужения типов может использоваться несколько конструкций.

## Защитник типа #typeof

Оператор `typeof` возвращает одну из следующих строк:

- "string"
- "number"
- "bigint"
- "boolean"
- "symbol"
- "undefined"
- "object"
- "function"

Рассмотрим интересный пример:

```tsx
function printAll(strs: string | string[] | null) {
  if (typeof strs === "object") {
    for (const s of strs) {
      // Object is possibly 'null'. Потенциальным значением объекта является 'null'
      console.log(s);
    }
  } else if (typeof strs === "string") {
    console.log(strs);
  } else {
    // ...
  }
}
```

В функции `printAll` мы пытаемся проверить, является ли переменная `strs` объектом (массивом). Но, поскольку выражение `typeof null` возвращает `object` (по историческим причинам), мы получаем ошибку.

Таким образом, в приведенном примере мы выполнили сужение к `string[] | null` вместо желаемого `string[]`.

## Проверка на истинность (truthiness narrowing)

В `JS` мы можем использовать любые выражения в условиях, инструкциях `&&`, `||`, `if`, приведении к логическому значению с помощью `!` и т.д. Например, в инструкции `if` условие не всегда должно иметь тип `boolean`:

```tsx
function getUsersOnlineMessage(numUsersOnline: number) {
  if (numUsersOnline) {
    return `В сети находится ${numUsersOnline} человек!`;
  }
  return "Здесь никого нет :(";
}
```

В `JS` конструкции типа `if` преобразуют условия в логические значения и выбирают ветку (с кодом для выполнения) в зависимости от результата (`true` или `false`). Значения

- 0
- NaN
- "" (пустая строка)
- 0n (bigint-версия нуля)
- null
- undefined

являются ложными, т.е. преобразуются в `false`, остальные значения являются истинными, т.е. преобразуются в `true`. Явно преобразовать значение в логическое можно с помощью функции `Boolean` или с помощью двойного отрицания (`!!`):

```tsx
// оба варианта возвращают `true`
Boolean("hello");
!!"world";
```

Данная техника широко применяется для исключения значений `null` и `undefined`. Применим ее к нашей функции `printAll`:

```tsx
function printAll(strs: string | string[] | null) {
  if (strs && typeof strs === "object") {
    for (const s of strs) {
      console.log(s);
    }
  } else if (typeof strs === "string") {
    console.log(strs);
  }
}
```

Теперь ошибки не возникает, поскольку мы проверяем, что `strs` является истинным. Это защищает нас от таких ошибок как:

```tsx
TypeError: null is not iterable
Ошибка типа: null не является итерируемой (перебираемой) сущностью
```

_Обратите внимание_, что проверка примитивов на истинность также подвержена подобным ошибкам. Рассмотрим другую реализацию `printAll`:

```tsx
function printAll(strs: string | string[] | null) {
  // !!!
  //  НЕ НАДО ТАК ДЕЛАТЬ
  // !!!
  if (strs) {
    if (typeof strs === "object") {
      for (const s of strs) {
        console.log(s);
      }
    } else if (typeof strs === "string") {
      console.log(strs);
    }
  }
}
```

Мы обернули тело функции в проверку на истинность, но у такого подхода имеется один существенный недостаток: мы больше не можем корректно обрабатывать случай передачи пустой строки в качестве аргумента.

Напоследок, рассмотрим пример использования логического оператора "НЕ":

```tsx
function multiplyAll(
  values: number[] | undefined,
  factor: number,
): number[] | undefined {
  if (!values) {
    return values;
  } else {
    return values.map((x) => x * factor);
  }
}
```

## Проверка на равенство (equality narrowing)

Для сужения типов также можно воспользоваться инструкцией `switch` или операторами равенства === , !==  ==  !=, например:

```tsx
function example(x: string | number, y: string | boolean) {
  if (x === y) {
    // Теперь мы можем вызывать любой строковый метод
    x.toUpperCase();
    // (method) String.toUpperCase(): string
    y.toLowerCase();
    // (method) String.toLowerCase(): string
  } else {
    console.log(x);
    // (parameter) x: string | number
    console.log(y);
    // (parameter) y: string | boolean
  }
}
```

Когда мы сравниваем значения `x` и `y`, `TS` знает, что их типы также должны быть равны. Поскольку `string` — это единственный общий тип, которым обладают и `x`, и `y`, `TS` знает, что `x` и `y` должны быть `string` в первой ветке.

Последняя версия нашей функции `printAll` была подвержена ошибкам, поскольку мы некорректно обрабатывали случай получения пустой строки. Перепишем ее с использованием оператора равенства:

```tsx
function printAll(strs: string | string[] | null) {
  if (strs !== null) {
    if (typeof strs === "object") {
      for (const s of strs) {
        // (parameter) strs: string[]
        console.log(s);
      }
    } else if (typeof strs === "string") {
      console.log(strs);
      // (parameter) strs: string
    }
  }
}
```

Операторы абстрактного равенства (== и !=) также могут использоваться для сужения типов, в некоторых случаях их использование даже более эффективно, чем использование операторов строгого равенства (=== и !== ). Например, выражение  == null проверяет на равенство не только с null, но и с undefined. Аналогично выражение == undefined проверяет на равенство не только с undefined, но и с null.

```tsx
interface Container {
  value: number | null | undefined;
}

function multiplyValue(container: Container, factor: number) {
  // Удаляем 'null' и 'undefined' из типа
  if (container.value != null) {
    console.log(container.value);
    // (property) Container.value: number

    // Теперь мы можем безопасно умножать 'container.value'
    container.value *= factor;
  }
}
```

### Сужение типов с помощью оператора `in`

В `JS` существует оператор для определения наличия указанного свойства в объекте — оператор `in`. `TS` позволяет использовать данный оператор для сужения поетнциальных типов.

Например, в выражении `'value' in x`, где 'value' — строка, а `x` — объединение, истинная ветка сужает типы `x` к типам, которые имеют опциональное или обязательное свойство `value`, а ложная ветка сужает типы к типам, которые имеют опциональное или не имеют названного свойства:

```tsx
type Fish = { swim: () => void };
type Bird = { fly: () => void };

function move(animal: Fish | Bird) {
  if ("swim" in animal) {
    return animal.swim();
  }

  return animal.fly();
}
```

Наличие опциональных свойств в обоих ветках не является ошибкой, поскольку человек, например, может и плавать (swim), и летать (fly) (при наличии соответствующего снаряжения):

```tsx
type Fish = { swim: () => void };
type Bird = { fly: () => void };
type Human = { swim?: () => void; fly?: () => void };

function move(animal: Fish | Bird | Human) {
  if ("swim" in animal) {
    animal;
    // (parameter) animal: Fish | Human
  } else {
    animal;
    // (parameter) animal: Bird | Human
  }
}
```

## Сужение типов с помощью оператора #instanceof

Оператор `instanceof` используется для определения того, является ли одна сущность "экземпляром" другой. Например, выражение `x instanceof Foo` проверяет, содержится ли `Foo.prototype` в цепочке прототипов `x`. Данный оператор применяется к значениям, сконструированным с помощью ключевого слова `new`. Он также может использоваться для сужения типов:

```tsx
function logValue(x: Date | string) {
  if (x instanceof Date) {
    console.log(x.toUTCString());
    // (parameter) x: Date
  } else {
    console.log(x.toUpperCase());
    // (parameter) x: string
  }
}
```

## Присвоения ( #assignments )

Как упоминалось ранее, когда мы присваиваем значение переменной, `TS` "смотрит" на правую часть выражения и вычисляет тип для левой части:

```tsx
let x = Math.random() < 0.5 ? 10 : "hello world!";
// let x: string | number

x = 1;

console.log(x);
// let x: number

x = "goodbye!";

console.log(x);
// let x: string
```

Данные присвоения являются валидными, поскольку типом, определенным для `x`, является `string | number`. Однако, если мы попытаемся присвоить `x` логическое значение, то получим ошибку:

```tsx
x = true;
// Type 'boolean' is not assignable to type 'string | number'.

console.log(x);
// let x: string | number
```

## Анализ потока управления

Анализ потока управления (control flow analysis) — это анализ, выполняемый `TS` на основе достижимости кода (reachability) и используемый им для сужения типов с учетом защитников типа и присвоений. При анализе переменной поток управления может разделяться и объединяться снова и снова, поэтому переменная может иметь разные типы в разных участках кода:

```tsx
function example() {
  let x: string | number | boolean;

  x = Math.random() < 0.5;

  console.log(x);
  // let x: boolean

  if (Math.random() < 0.5) {
    x = "hello";
    console.log(x);
    // let x: string
  } else {
    x = 100;
    console.log(x);
    // let x: number
  }

  return x;
  // let x: string | number
}
```

## Использование предикатов типа ( #type-predicates )

Иногда мы хотим иметь более прямой контроль над тем, как изменяются типы. Для определения пользовательского защитника типа необходимо определить функцию, возвращаемым значением которой является [предикат](<https://habr.com/ru/post/310172/#:~:text=%D0%9F%D1%80%D0%B5%D0%B4%D0%B8%D0%BA%D0%B0%D1%82%20%E2%80%94%20%D1%8D%D1%82%D0%BE%20%D1%84%D1%83%D0%BD%D0%BA%D1%86%D0%B8%D1%8F%2C%20%D0%BA%D0%BE%D1%82%D0%BE%D1%80%D0%B0%D1%8F%20%D0%B2%D0%BE%D0%B7%D0%B2%D1%80%D0%B0%D1%89%D0%B0%D0%B5%D1%82,(callback)%20%D0%B4%D0%BB%D1%8F%20%D1%84%D0%B8%D0%BB%D1%8C%D1%82%D1%80%D0%B0%20%D0%BC%D0%B0%D1%81%D1%81%D0%B8%D0%B2%D0%B0.>) типа:

```tsx
function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}
```

`pet is Fish` — это наш предикат. Предикат имеет форму `parameterName is Type`, где `parameterName` — это название параметра из [сигнатуры](https://ru.wikipedia.org/wiki/API#%D0%A1%D0%B8%D0%B3%D0%BD%D0%B0%D1%82%D1%83%D1%80%D0%B0_%D1%84%D1%83%D0%BD%D0%BA%D1%86%D0%B8%D0%B8) текущей функции.

При вызове `isFish` с любой переменной, `TS` "сузит" эту переменную до указанного типа, разумеется, при условии, что оригинальный тип совместим с указанным.

```tsx
const pet = getSmallPet();

if (isFish(pet)) {
  pet.swim();
} else {
  pet.fly();
}
```

_Обратите внимание_: `TS` знает не только то, что `pet` — это `Fish` в ветке `if`, но также то, что в ветке `else` `pet` — это `Bird`.

Мы можем использовать защитника `isFish` для фильтрации массива `Fish | Bird` и получения массива `Fish`:

```tsx
const zoo: (Fish | Bird)[] = [getSmallPet(), getSmallPet(), getSmallPet()];
const underWater1: Fish[] = zoo.filter(isFish);
// или
const underWater2: Fish[] = zoo.filter(isFish) as Fish[];

// В более сложных случаях, может потребоваться повторное использование предиката
const underWater3: Fish[] = zoo.filter((pet): pet is Fish => {
  if (pet.name === "sharkey") return false;
  return isFish(pet);
});
```

## Исключающие объединения ( #discriminated-unions)

Предположим, что мы пытаемся закодировать фигуры, такие как круги и квадраты. Круги "следят" за радиусом, а квадраты — за длиной стороны. Для обозначения того, с какой фигурой мы имеем дело, будет использоваться свойство `kind`. Вот наша первая попытка определить `Shape`:

```tsx
interface Shape {
  kind: "circle" | "square";
  radius?: number;
  sideLength: number;
}
```

Использование `'circle' | 'square'` вместо `string` позволяет избежать орфографических ошибок:

```tsx
function handleShape(shape: Shape) {
  // Упс!
  if (shape.kind === "rect") {
    // This condition will always return 'false' since the types '"circle" | "square"' and '"rect"' have no overlap. Данное условие всегда возвращает `false`, поскольку типы '"circle" | "square"' и '"rect"' не пересекаются
    // ...
  }
}
```

Давайте создадим функцию `getArea` для вычисления площади фигур. Начнем с кругов:

```tsx
function getArea(shape: Shape) {
  return Math.PI * shape.radius ** 2;
  // Object is possibly 'undefined'. Потенциальным значением объекта является 'undefined'
}
```

С включенной настройкой `strictNullChecks` мы получаем ошибку, поскольку `radius` может быть не определен. Что если перед выполнением кода проверить свойство `kind`?

```tsx
function getArea(shape: Shape) {
  if (shape.kind === "circle") {
    return Math.PI * shape.radius ** 2;
    // Object is possibly 'undefined'.
  }
}
```

Хм, `TS` по-прежнему не понимает, что с этим делать. В данном случае, мы знаем больше, чем компилятор. Можно попробовать использовать ненулевое утверждение (`!` после `shape.radius`), чтобы сообщать компилятору о том, что `radius` точно присутствует в типе:

```tsx
function getArea(shape: Shape) {
  if (shape.kind === "circle") {
    return Math.PI * shape.radius! ** 2;
  }
}
```

Код компилируется без ошибок, но решение не выглядит идеальным. Мы, определенно, можем сделать его лучше. Проблема состоит в том, что компилятор не может определить, имеется ли свойство `radius` или `sideLength` на основе свойства `kind`. Перепишем определение `Shape`:

```tsx
interface Circle {
  kind: "circle";
  radius: number;
}

interface Square {
  kind: "square";
  sideLength: number;
}

type Shape = Circle | Square;
```

Мы разделили `Shape` на два разных типа с разными значениями свойства `kind`, свойства `radius` и `sideLength` являются обязательными в соответствующих типах.

Посмотрим, что произойдет при попытке получить доступ к свойству `radius` типа `Shape`:

```tsx
function getArea(shape: Shape) {
  return Math.PI * shape.radius ** 2;
  // Property 'radius' does not exist on type 'Shape'. Property 'radius' does not exist on type 'Square'.
}
```

Мы получаем ошибку. На этот раз `TS` сообщает нам о том, что `shape` может быть `Square`, у которого нет `radius`. Что если мы снова попытаемся выполнить проверку свойства `kind`?

```tsx
function getArea(shape: Shape) {
  if (shape.kind === "circle") {
    return Math.PI * shape.radius ** 2;
    // (parameter) shape: Circle
  }
}
```

Код компилируется без ошибок. Когда каждый тип объединения содержит общее свойства с литеральным типом, `TS` рассматривает это как исключающее объединение и может сужать членов данного объединения.

В нашем случае, общим свойством является `kind` (которое рассматривается как особое свойство `Shape`). Проверка значения этого свойства позволяет сужать `shape` до определенного типа. Другими словами, если значением `kind` является `'circle'`, `shape` сужается до `Circle`.

Тоже самое справедливо и в отношении инструкции `switch`. Теперь мы можем реализовать нашу функцию `getArea` без `!`:

```tsx
function getArea(shape: Shape) {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    // (parameter) shape: Circle
    case "square":
      return shape.sideLength ** 2;
    // (parameter) shape: Square
  }
}
```

## Тип #never

Для представления состояния, которого не должно существовать, в `TS` используется тип `never`.

### Исчерпывающие проверки (exhaustiveness checking)

Тип `never` может быть присвоен любому типу; однако, никакой тип не может быть присвоен `never` (кроме самого `never`). Это означает, что `never` можно использовать для выполнения исчерпывающих проверок в инструкции `switch`.

Например, добавим такой `default` в `getArea`:

```tsx
function getArea(shape: Shape) {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "square":
      return shape.sideLength ** 2;
    default:
      const _exhaustiveCheck: never = shape;
      return _exhaustiveCheck;
  }
}
```

После этого попытка добавления нового члена в объединение `Shape` будет приводить к ошибке:

```tsx
interface Triangle {
  kind: "triangle";
  sideLength: number;
}

type Shape = Circle | Square | Triangle;

function getArea(shape: Shape) {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "square":
      return shape.sideLength ** 2;
    default:
      const _exhaustiveCheck: never = shape;
      // Type 'Triangle' is not assignable to type 'never'.
      return _exhaustiveCheck;
  }
}
```
