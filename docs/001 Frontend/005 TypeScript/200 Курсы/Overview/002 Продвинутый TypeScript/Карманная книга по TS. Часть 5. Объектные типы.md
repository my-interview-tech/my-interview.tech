---
uid: lVvVGzml7J7UMKCaAQjaa
title: Карманная книга по TS. Часть 5. Объектные типы
tags:
  - TypeScript
  - "#readonly"
  - "#extend"
  - "#generic"
info:
  - "https://habr.com/ru/companies/macloud/articles/562054/"
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

В `JS` обычным способом группировки и передачи данных являются объекты. В `TS` они представлены объектными типами ( #object-types ).

Как мы видели ранее, они могут быть анонимными:

```tsx
function greet(person: { name: string; age: number }) {
  return `Привет, ${person.name}!`;
}
```

или именоваться с помощью интерфейсов (interfaces):

```tsx
interface Person {
  name: string;
  age: number;
}

function greet(person: Person) {
  return `Привет, ${person.name}!`;
}
```

или синонимов типа ( type #aliases ):

```tsx
type Person {
 name: string
 age: number
}

function greet(person: Person) {
 return `Привет, ${person.name}!`
}
```

Во всех приведенных примерах наша функция принимает объект, который содержит свойство `name` (значение которого должно быть типа `string`) и `age` (значение которого должно быть типа `number`).

## Модификаторы свойств (property modifiers)

Каждое свойство в объектном типе может определять несколько вещей: сам тип, то, является ли свойство опциональным, и может ли оно изменяться.

### Опциональные свойства (optional properties)

Свойства могут быть помечены как опциональные (необязательные) путем добавления вопросительного знака (`?`) после их названий:

```tsx
interface PaintOptions {
  shape: Shape;
  xPos?: number;
  yPos?: number;
}

function paintShape(opts: PaintOptions) {
  // ...
}

const shape = getShape();
paintShape({ shape });
paintShape({ shape, xPos: 100 });
paintShape({ shape, yPos: 100 });
paintShape({ shape, xPos: 100, yPos: 100 });
```

Все вызовы функции в приведенном примере являются валидными. Опциональность означает, что если свойство установлено, оно должно иметь указанный тип.

Мы можем получать значения таких свойств. Однако, при включенной настройке `strictNullChecks`, мы будем получать сообщения о том, что потенциальными значениями опциональных свойств является `undefined`:

```tsx
function paintShape(opts: PaintOptions) {
  let xPos = opts.xPos;
  // (property) PaintOptions.xPos?: number | undefined
  let yPos = opts.yPos;
  // (property) PaintOptions.yPos?: number | undefined
  // ...
}
```

В `JS` при доступе к несуществующему свойству возвращается `undefined`. Добавим обработку этого значения:

```tsx
function paintShape(opts: PaintOptions) {
  let xPos = opts.xPos === undefined ? 0 : opts.xPos;
  // let xPos: number
  let yPos = opts.yPos === undefined ? 0 : opts.yPos;
  // let yPos: number
  // ...
}
```

Теперь все в порядке. Но для определения "дефолтных" значений (значений по умолчанию) параметров в `JS` существует специальный синтаксис:

```tsx
function paintShape({ shape, xPos = 0, yPos = 0 }: PaintOptions) {
  console.log("x coordinate at", xPos);
  // var xPos: number
  console.log("y coordinate at", yPos);
  // var yPos: number
  // ...
}
```

В данном случае мы [деструктурировали](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) параметр `painShape` и указали значения по умолчанию для `xPos` и `yPos`. Теперь они присутствуют в теле функции `painShape`, но являются опциональными при ее вызове.

_Обратите внимание_: в настоящее время не существует способа поместить аннотацию типа в деструктуризацию, поскольку такой синтаксис будет интерпретирован `JS` иначе:

```tsx
function draw({ shape: Shape, xPos: number = 100 /*...*/ }) {
  render(shape);
  // Cannot find name 'shape'. Did you mean 'Shape'?
  // Невозможно найти 'shape'. Возможно, вы имели ввиду 'Shape'
  render(xPos);
  // Cannot find name 'xPos'.
  // Невозможно найти 'xPos'
}
```

`shape: Shape` означает "возьми значение свойства `shape` и присвой его локальной переменной `Shape`". Аналогично `xPos: number` создает переменную `number`, значение которой основано на параметре `xPos`.

## Свойства, доступные только для чтения ( #readonly properties)

Свойства могут быть помечены как доступные только для чтения с помощью ключевого слова `readonly`. Такие свойства не могут перезаписываться в процессе проверки типов:

```tsx
interface SomeType {
  readonly prop: string;
}

function doSomething(obj: SomeType) {
  // Мы может читать (извлекать значения) из 'obj.prop'.
  console.log(`prop has the value '${obj.prop}'.`);

  // Но не можем изменять значение данного свойства
  obj.prop = "hello";
  // Cannot assign to 'prop' because it is a read-only property.
  // Невозможно присвоить значение 'prop', поскольку оно является доступным только для чтения
}
```

Использование модификатора `readonly` не делает саму переменную иммутабельной (неизменяемой), это лишь запрещает присваивать ей другие значения:

```tsx
interface Home {
  readonly resident: { name: string; age: number };
}

function visitForBirthday(home: Home) {
  // Мы можем читать и обновлять свойства 'home.resident'.
  console.log(`С Днем рождения, ${home.resident.name}!`);
  home.resident.age++;
}

function evict(home: Home) {
  // Но мы не можем изменять значение свойства 'resident'
  home.resident = {
    // Cannot assign to 'resident' because it is a read-only property.
    name: "Victor the Evictor",
    age: 42,
  };
}
```

`readonly` сообщает `TS`, как должны использоваться объекты. При определении совместимости двух типов `TS` не проверяет, являются ли какие-либо свойства доступными только для чтения. Поэтому такие свойства можно изменять с помощью синонимов:

```tsx
interface Person {
  name: string;
  age: number;
}

interface ReadonlyPerson {
  readonly name: string;
  readonly age: number;
}

let writablePerson: Person = {
  name: "John Smith",
  age: 42,
};

// работает
let readonlyPerson: ReadonlyPerson = writablePerson;

console.log(readonlyPerson.age); // 42
writablePerson.age++;
console.log(readonlyPerson.age); // 43
```

### Сигнатуры индекса (index signatures)

Иногда мы не знаем названий всех свойств типа, но знаем форму значений.

В таких случаях мы можем использовать индексы для описания типов возможных значений, например:

```tsx
interface StringArray {
  [index: number]: string;
}

const myArray: StringArray = getStringArray();
const secondItem = myArray[1];
// const secondItem: string
```

В приведенном примере у нас имеется интерфейс `StringArray`, содержащий сигнатуру индекса. Данная сигнатура указывает на то, что при индексации `StringArray` с помощью `number` возвращается `string`.

Сигнатура индекса типа свойства должна быть строкой или числом.

Несмотря на поддержку обоих типов индексаторов (indexers), тип, возвращаемый из числового индексатора, должен быть подтипом типа, возвращаемого строковым индексатором. Это объясняется тем, что при индексации с помощью `number`, `JS` преобразует его в `string` перед индексацией объекта. Это означает, что индексация с помощью `100` (`number`) эквивалента индексации с помощью `"100"` (`string`), поэтому они должны быть согласованными между собой.

```tsx
interface Animal {
  name: string;
}

interface Dog extends Animal {
  breed: string;
}

// Ошибка: индексация с помощью числовой строки может привести к созданию другого типа Animal!
interface NotOkay {
  [x: number]: Animal;
  // Numeric index type 'Animal' is not assignable to string index type 'Dog'.
  // Числовой индекс типа 'Animal' не может быть присвоен строковому индексу типа 'Dog'
  [x: string]: Dog;
}
```

В то время, как сигнатуры строкового индекса являются хорошим способом для описания паттерна "словарь", они предопределяют совпадение всех свойств их возвращаемым типам. Это объясняется тем, что строковый индекс определяет возможность доступа к `obj.property` с помощью `obj['property']`. В следующем примере тип `name` не совпадает с типом строкового индекса, поэтому во время проверки возникает ошибка:

```tsx
interface NumberDictionary {
  [index: string]: number;

  length: number; // ok
  name: string;
  // Property 'name' of type 'string' is not assignable to string index type 'number'.
}
```

Тем не менее, свойства с разными типами являются валидными в случае, когда сигнатура индекса — это объединение типов (union):

```tsx
interface NumberOrStringDictionary {
  [index: string]: number | string;
  length: number; // ok, `length` - это число
  name: string; // ok, `name` - это строка
}
```

Сигнатуры индекса можно сделать доступными только для чтения для предотвращения их перезаписи:

```tsx
interface ReadonlyStringArray {
  readonly [index: number]: string;
}

let myArray: ReadonlyStringArray = getReadOnlyStringArray();
myArray[2] = "John";
// Index signature in type 'ReadonlyStringArray' only permits reading.
// Сигнатура индекса в типе 'ReadonlyStringArray' допускает только чтение
```

## Расширение типов (extending types)

Что если мы хотим определить тип, который является более конкретной версией другого типа? Например, у нас может быть тип `BasicAddress`, описывающий поля, необходимые для отправки писем и посылок в США:

```tsx
interface BasicAddress {
  name?: string;
  street: string;
  city: string;
  country: string;
  postalCode: string;
}
```

В некоторых случаях этого будет достаточно, однако адреса часто имеют литералы. Для таких случаев мы можем определить `AddressWithUnit`:

```tsx
interface AddressWithUnit {
  name?: string;
  unit: string;
  street: string;
  city: string;
  country: string;
  postalCode: string;
}
```

Неужели не существует более простого способа добавления дополнительных полей? На самом деле, мы можем просто расширить `BasicAddress`, добавив к нему новые поля, которые являются уникальными для `AddressWithUnit`:

```tsx
interface BasicAddress {
  name?: string;
  street: string;
  city: string;
  country: string;
  postalCode: string;
}

interface AddressWithUnit extends BasicAddress {
  unit: string;
}
```

Ключевое слово `extends` позволяет копировать членов именованных типов в другие типы. Оно также указывает на связь между типами.

Интерфейсы также могут расширяться с помощью нескольких типов одновременно:

```tsx
interface Colorful {
  color: string;
}

interface Circle {
  radius: number;
}

interface ColorfulCircle extends Colorful, Circle {}

const cc: ColorfulCircle = {
  color: "red",
  radius: 42,
};
```

### Пересечение типов (intersection types)

`interface` позволяет создавать новые типы на основе других посредством их расширения. `TS` также предоставляет другую конструкцию, которая называется *пересечением типов* или *пересекающимися типами* и позволяет комбинировать существующие объектные типы. Пересечение типов определяется с помощью оператора `&`:

```tsx
interface Colorful {
  color: string;
}

interface Circle {
  radius: number;
}

type ColorfulCircle = Colorful & Circle;
```

Пересечение типов `Colorful` и `Circle` приводит к возникновению типа, включающего все поля `Colorful` и `Circle`:

```tsx
function draw(circle: Colorful & Circle) {
  console.log(`Цвет круга: ${circle.color}`);
  console.log(`Радиус круга: ${circle.radius}`);
}

// OK
draw({ color: "blue", radius: 42 });

// опечатка
draw({ color: "red", raidus: 42 });
/*
Argument of type '{ color: string, raidus: number }' is not assignable to parameter of type 'Colorful & Circle'.
 Object literal may only specify known properties, but 'raidus' does not exist in type 'Colorful & Circle'. Did you mean to write 'radius'?
*/
/*
Аргумент типа '{ color: string, raidus: number }' не может быть присвоен параметру с типом 'Colorful & Circle'.
 С помощью литерала объекта могут определяться только известные свойства, а свойства с названием 'raidus' не существует в типе 'Colorful & Circle'. Возможно, вы имели ввиду 'radius'
*/
```

### Интерфейс или пересечение типов?

И интерфейсы, и пересечения типов используются для создания новых типов на основе существующих за счет комбинирования последних. Основное отличие между ними заключается в том, как обрабатываются возникающие конфликты.

## Общие объектные типы ( #generic object types)

Предположим, что у нас имеется тип `Box`, который может содержать любое значение:

```tsx
interface Box {
  contents: any;
}
```

Этот код работает, но тип `any` является небезопасным с точки зрения системы типов. Вместо него мы могли бы использовать `unknown`, но это будет означать необходимость выполнения предварительных проверок и подверженных ошибкам утверждений типов (type assertions).

```tsx
interface Box {
 contents: unknown
}

let x: Box {
 contents: 'привет, народ'
}

// мы можем проверить `x.contents`
if (typeof x.contents === 'string') {
 console.log(x.contents.toLowerCase())
}

// или можем использовать утверждение типа
console.log((x.contents as string).toLowerCase())
```

Более безопасным способом будет определение различных типов `Box` для каждого типа `contents`:

```tsx
interface NumberBox {
  contents: number;
}

interface StringBox {
  contents: string;
}

interface BooleanBox {
  contents: boolean;
}
```

Однако, это обуславливает необходимость создания различных функций или перегрузок функции (function overloads) для работы с такими типами:

```tsx
function setContents(box: StringBox, newContents: string): void;
function setContents(box: NumberBox, newContents: number): void;
function setContents(box: BooleanBox, newContents: boolean): void;
function setContents(box: { contents: any }, newContents: any) {
  box.contents = newContents;
}
```

Слишком много шаблонного кода. Более того, в будущем нам может потребоваться определить новый тип и перегрузку. Так не пойдет.

Для решения данной проблемы мы можем создать *общий (generic)* тип `Box`, в котором объявляется *параметр типа (type parameter)*:

```tsx
interface Box<Type> {
  contents: Type;
}
```

Затем, при ссылке на `Box`, мы должны определить *аргумент типа (type argument)* вместо `Type`:

```tsx
let box: Box<string>;
```

По сути, `Box` — это шаблон для настоящего типа, в котором `Type` будет заменен на конкретный тип. Когда `TS` видит `Box<string>`, он заменяет все вхождения `Type` в `Box<Type>` на `string` и заканчивает свою работу чем-то вроде `{ contents: string }`. Другими словами, `Box<string>` работает также, как рассмотренный ранее `StringBox`.

```tsx
interface Box<Type> {
  contents: Type;
}
interface StringBox {
  contents: string;
}

let boxA: Box<string> = { contents: "привет" };
boxA.contents;
// (property) Box<string>.contents: string

let boxB: StringBox = { contents: "народ" };
boxB.contents;
// (property) StringBox.contents: string
```

Тип `Box` теперь является переиспользуемым (т.е. имеется возможность использовать этот тип несколько раз без необходимости его модификации). Это означает, что когда нам потребуется коробка (`Box` — коробка, контейнер) нового типа, нам не придется определять новый тип `Box`:

```tsx
interface Box<Type> {
  contents: Type;
}

interface Apple {
  // ....
}

// Тоже самое, что '{ contents: Apple }'.
type AppleBox = Box<Apple>;
```

Это также означает, что нам не нужны перегрузки функции. Вместо них мы можем использовать общую функцию (generic function):

```tsx
function setContents<Type>(box: Box<Type>, newContents: Type) {
  box.contents = newContents;
}
```

Синонимы типов также могут быть общими. Вот как мы можем определить общий тип (generic type) `Box`:

```tsx
type Box<Type> = {
  contents: Type;
};
```

Поскольку синонимы, в отличие от интерфейсов, могут использоваться для описания любых типов, а не только типов объектов, мы можем использовать их следующим образом:

```tsx
type OrNull<Type> = Type | null;

type OneOrMany<Type> = Type | Type[];

type OneOrManyOrNull<Type> = OrNull<OneOrMany<Type>>;
// type OneOrManyOrNull<Type> = OneOrMany<Type> | null

type OneOrManyOrNullStrings = OneOrManyOrNull<string>;
// type OneOrManyOrNullStrings = OneOrMany<string> | null
```

### Тип `Array`

Синтаксис `number[]` или `string[]` — это сокращения для `Array<number>` и `Array<string>`, соответственно:

```tsx
function doSomething(value: Array<string>) {
  // ...
}

let myArray: string[] = ["hello", "world"];

// оба варианта являются рабочими!
doSomething(myArray);
doSomething(new Array("hello", "world"));
```

`Array` сам по себе является общим типом:

```tsx
interface Array<Type> {
  /**
   *  Получает или устанавливает длину массива
   */
  length: number;

  /**
   * Удаляет последний элемент массива и возвращает его
   */
  pop(): Type | undefined;

  /**
   * Добавляет новые элементы в конец массива и возвращает новую длину массива
   */
  push(...items: Type[]): number;

  // ...
}
```

Современный `JS` также предоставляет другие *общие* структуры данных, такие как `Map<K, V>`, `Set<T>` и `Promise<T>`. Указанные структуры могут работать с любым набором типов.

### Тип `ReadonlyArray`

`ReadonlyArray` — это специальный тип, описывающий массив, который не должен изменяться.

```tsx
function doStuff(values: ReadonlyArray<string>) {
  // Мы можем читать из `values`...
  const copy = values.slice();
  console.log(`Первым значением является ${values[0]}`);

  // но не можем их изменять
  values.push("Привет!");
  // Property 'push' does not exist on type 'readonly string[]'.
  // Свойства с названием 'push' не существует в типе 'readonly string[]'
}
```

Когда мы создаем функцию, которая возвращает `ReadonlyArray`, это означает, что мы не собираемся изменять такой массив, а когда мы видим функцию, принимающую `ReadonlyArray`, это означает, что мы можем передавать такой функции любой массив и не беспокоиться о том, что он может измениться.

В отличие от `Array`, `ReadonlyArray` не может использоваться как конструктор:

```tsx
new ReadonlyArray("red", "green", "blue");
// 'ReadonlyArray' only refers to a type, but is being used as a value here.
// 'ReadonlyArray' всего лишь указывает на тип, поэтому не может использовать в качестве значения
```

Однако, мы можем присваивать массиву, доступному только для чтения, обычные массивы:

```tsx
const roArray: ReadonlyArray<string> = ["red", "green", "blue"];
```

Для определения массива, доступного только для чтения, также существует сокращенный синтаксис, который выглядит как `readonly Type[]`:

```tsx
function doStuff(values: readonly string[]) {
  // Мы можем читать из `values`...
  const copy = values.slice();
  console.log(`The first value is ${values[0]}`);

  // но не можем их изменять
  values.push("hello!");
  // Property 'push' does not exist on type 'readonly string[]'.
}
```

В отличие от модификатора свойств `readonly`, присваивание между `Array` и `ReadonlyArray` является однонаправленным (т.е. только обычный массив может быть присвоен доступному только для чтения массиву):

```tsx
let x: readonly string[] = [];
let y: string[] = [];

x = y;
y = x;
// The type 'readonly string[]' is 'readonly' and cannot be assigned to the mutable type 'string[]'.
// Тип 'readonly string[]' является доступным только для чтения и не может быть присвоен изменяемому типу 'string[]'
```

### Кортеж ( #tuple )

*Кортеж* — это еще одна разновидность типа `Array` с фиксированным количеством элементов определенных типов.

```tsx
type StrNumPair = [string, number];
```

`StrNumPair` — это кортеж `string` и `number`. `StrNumPair` описывает массив, первый элемент которого (элемент под индексом `0`) имеет тип `string`, а второй (элемент под индексом `1`) — `number`.

```tsx
function doSomething(pair: [string, number]) {
  const a = pair[0];
  // const a: string

  const b = pair[1];
  // const b: number
  // ...
}

doSomething(["hello", 42]);
```

Если мы попытаемся получить элемент по индексу, превосходящему количество элементов, то получим ошибку:

```tsx
function doSomething(pair: [string, number]) {
  // ...

  const c = pair[2];
  // Tuple type '[string, number]' of length '2' has no element at index '2'.
  // Кортеж '[string, number]' длиной в 2 элемента не имеет элемента под индексом '2'
}
```

Кортежи можно деструктурировать:

```tsx
function doSomething(stringHash: [string, number]) {
  const [inputString, hash] = stringHash;

  console.log(inputString);
  // const inputString: string

  console.log(hash);
  // const hash: number
}
```

Рассматриваемый кортеж является эквивалентом такой версии типа `Array`:

```tsx
interface StringNumberPair {
  // Конкретные свойства
  length: 2;
  0: string;
  1: number;

  // Другие поля 'Array<string | number>'
  slice(start?: number, end?: number): Array<string | number>;
}
```

Элементы кортежа могут быть опциональными (`?`). Такие элементы указываются в самом конце и влияют на тип свойства `length`:

```tsx
type Either2dOr3d = [number, number, number?];

function setCoords(coord: Either2dOr3d) {
  const [x, y, z] = coord;
  // const z: number | undefined

  console.log(`
   Переданы координаты в ${coord.length} направлениях
 `);
  // (property) length: 2 | 3
}
```

Кортежи также могут содержать оставшиеся элементы (т.е. элементы, оставшиеся не использованными, rest elements), которые должны быть массивом или кортежем:

```tsx
type StringNumberBooleans = [string, number, ...boolean[]];
type StringBooleansNumber = [string, ...boolean[], number];
type BooleansStringNumber = [...boolean[], string, number];
```

`...boolean[]` означает любое количество элементов типа `boolean`.

Такие кортежи не имеют определенной длины (`length`) — они имеют лишь набор известных элементов на конкретных позициях:

```tsx
const a: StringNumberBooleans = ["hello", 1];
const b: StringNumberBooleans = ["beautiful", 2, true];
const c: StringNumberBooleans = ["world", 3, true, false, true, false, true];
```

Кортежи сами могут использоваться в качестве оставшихся параметров и аргументов. Например, такой код:

```tsx
function readButtonInput(...args: [string, number, ...boolean[]]) {
  const [name, version, ...input] = args;
  // ...
}
```

является эквивалентом следующего:

```tsx
function readButtonInput(name: string, version: number, ...input: boolean[]) {
  // ...
}
```

#### Кортежи, доступные только для чтения (readonly tuple types)

Кортежи, доступные только для чтения, также определяются с помощью модификатора `readonly`:

```tsx
function doSomething(pair: readonly [string, number]) {
  // ...
}
```

Попытка перезаписи элемента такого кортежа приведет к ошибке:

```tsx
function doSomething(pair: readonly [string, number]) {
  pair[0] = "Привет!";
  // Cannot assign to '0' because it is a read-only property.
}
```

Кортежи предназначены для определения типов иммутабельных массивов, так что хорошей практикой считается делать их доступными только для чтения. Следует отметить, что предполагаемым типом массива с утверждением `const` является `readonly` кортеж:

```tsx
let point = [3, 4] as const;

function distanceFromOrigin([x, y]: [number, number]) {
  return Math.sqrt(x ** 2 + y ** 2);
}

distanceFromOrigin(point);
/*
Argument of type 'readonly [3, 4]' is not assignable to parameter of type '[number, number]'.
 The type 'readonly [3, 4]' is 'readonly' and cannot be assigned to the mutable type '[number, number]'.
*/
```

В приведенном примере `distanceFromOrigin` не изменяет элементы переданного массива, но ожидает получения изменяемого кортежа. Поскольку предполагаемым типом `point` является `readonly [3, 4]`, он несовместим с `[number, number]`, поскольку такой тип не может гарантировать иммутабельности элементов `point`.
