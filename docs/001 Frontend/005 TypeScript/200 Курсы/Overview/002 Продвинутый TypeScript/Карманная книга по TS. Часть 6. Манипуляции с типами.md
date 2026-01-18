---
uid: lB3HwSln8_yREOKGvPjJO
title: Карманная книга по TS. Часть 6. Манипуляции с типами
tags:
  - TypeScript
  - "#generic"
  - "#keyof"
  - "#as"
info:
  - "https://habr.com/ru/companies/macloud/articles/562786/"
draft: false
technology: TypeScript
specialty: Frontend
tools: []
order: 0
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

Система типов `TS` позволяет создавать типы на основе других типов.

Простейшей формой таких типов являются дженерики или общие типы (generics). В нашем распоряжении также имеется целый набор операторов типа. Более того, мы можем выражать типы в терминах имеющихся у нас значений.

# #generic

Создадим функцию `identity`, которая будет возвращать переданное ей значение:

```tsx
function identity(arg: number): number {
  return arg;
}
```

Для того, чтобы сделать эту функцию более универсальной, можно использовать тип `any`:

```tsx
function identity(arg: any): any {
  return arg;
}
```

Однако, при таком подходе мы не будем знать тип возвращаемого функцией значения.

Нам нужен какой-то способ перехватывать тип аргумента для обозначения с его помощью типа возвращаемого значения. Для этого мы можем воспользоваться переменной типа, специальным видом переменных, которые работают с типами, а не со значениями:

```tsx
function identity<Type>(arg: Type): Type {
  return arg;
}
```

Мы используем переменную `Type` как для типа передаваемого функции аргумента, так и для типа возвращаемого функцией значения.

Такие функции называют общими (дженериками), поскольку они могут работать с любыми типами.

Мы можем вызывать такие функции двумя способами. Первый способ заключается в передаче всех аргументов, включая аргумент типа:

```tsx
const output = identity<string>("myStr");
// let output: string
```

В данном случае принимаемым и возвращаемым типами является строка.

Второй способ заключается в делегировании типизации компилятору:

```tsx
const output = identity("myStr");
// let output: string
```

Второй способ является более распространенным. Однако, в более сложных случаях может потребоваться явное указание типа, как в первом примере.

## Работа с переменными типа в дженериках

Что если мы захотим выводить в консоль длину аргумента `arg` перед его возвращением?

```tsx
function loggingIdentity<Type>(arg: Type): Type {
  console.log(arg.length);
  // Property 'length' does not exist on type 'Type'.
  // Свойства 'length' не существует в типе 'Type'
  return arg;
}
```

Мы получаем ошибку, поскольку переменные типа указывают на любой (а, значит, все) тип, следовательно, аргумент `arg` может не иметь свойства `length`, например, если мы передадим в функцию число.

Изменим сигнатуру функции таким образом, чтобы она работала с массивом `Type`:

```tsx
function loggingIdentity<Type>(arg: Type[]): Type[] {
  console.log(arg.length);
  return arg;
}
```

Теперь наша функция стала дженериком, принимающим параметр `Type` и аргумент `arg`, который является массивом `Type`, и возвращает массив `Type`. Если мы передадим в функцию массив чисел, то получим массив чисел.

Мы можем сделать тоже самое с помощью такого синтаксиса:

```tsx
function loggingIdentity<Type>(arg: Array<Type>): Array<Type> {
  console.log(arg.length);
  return arg;
}
```

## Общие типы

Тип общей функции (функции-дженерика) похож на тип обычной функции, в начале которого указывается тип параметра:

```tsx
function identity<Type>(arg: Type): Type {
  return arg;
}

const myIdentity: <Type>(arg: Type) => Type = identity;
```

Мы можем использовать другое название для параметра общего типа:

```tsx
function identity<Type>(arg: Type): Type {
  return arg;
}

const myIdentity: <Input>(arg: Input) => Input = identity;
```

Мы также можем создавать общие типы в виде сигнатуры вызова типа объектного литерала:

```tsx
function identity<Type>(arg: Type): Type {
  return arg;
}

const myIdentity: { <Type>(arg: Type): Type } = identity;
```

Это приводит нас к общему интерфейсу:

```tsx
interface GenericIdentityFn {
  <Type>(arg: Type): Type;
}

function identity<Type>(arg: Type): Type {
  return arg;
}

const myIdentity: GenericIdentityFn = identity;
```

Для того, чтобы сделать общий параметр видимым для всех членов интерфейса, его необходимо указать после названия интерфейса:

```tsx
interface GenericIdentityFn<Type> {
  (arg: Type): Type;
}

function identity<Type>(arg: Type): Type {
  return arg;
}

const myIdentity: GenericIdentityFn<number> = identity;
```

Кроме общих интерфейсов, мы можем создавать общие классы.

_Обратите внимание_, что общие перечисления (enums) и пространства имен (namespaces) создавать нельзя.

## Общие классы

Общий класс имеет такую же форму, что и общий интерфейс:

```tsx
class GenericNumber<NumType> {
  zeroValue: NumType;
  add: (x: NumType, y: NumType) => NumType;
}

const myGenericNum = new GenericNumber<number>();
myGenericNum.zeroValue = 0;
myGenericNum.add = (x, y) => x + y;
```

В случае с данным классом мы не ограничены числами. Мы вполне можем использовать строки или сложные объекты:

```tsx
const stringNumeric = new GenericNumber<string>();
stringNumeric.zeroValue = "";
stringNumeric.add = (x, y) => x + y;

console.log(stringNumeric.add(stringNumeric.zeroValue, "test"));
```

Класс имеет две стороны с точки зрения типов: статическую сторону и сторону экземпляров. Общие классы являются общими только для экземпляров. Это означает, что статические члены класса не могут использовать тип параметра класса.

## Ограничения дженериков

Иногда возникает необходимость в создании дженерика, работающего с набором типов, когда мы имеем некоторую информацию о возможностях, которыми будет обладать этот набор. В нашем примере `loggingIdentity` мы хотим получать доступ к свойству `length` аргумента `arg`, но компилятор знает, что не каждый тип имеет такое свойство, поэтому не позволяет нам делать так:

```tsx
function loggingIdentity<Type>(arg: Type): Type {
  console.log(arg.length);
  // Property 'length' does not exist on type 'Type'.
  return arg;
}
```

Мы хотим, чтобы функция работала с любым типом, у которого имеется свойство `length`. Для этого мы должны создать ограничение типа.

Нам необходимо создать интерфейс, описывающий ограничение. В следующем примере мы создаем интерфейс с единственным свойством `length` и используем его с помощью ключевого слова `extends` для применения органичения:

```tsx
interface Lengthwise {
  length: number;
}

function loggingIdentity<Type extends Lengthwise>(arg: Type): Type {
  console.log(arg.length);
  // Теперь мы можем быть увереными в существовании свойства `length`
  return arg;
}
```

Поскольку дженерик был ограничен, он больше не может работать с любым типом:

```tsx
loggingIdentity(3);
// Argument of type 'number' is not assignable to parameter of type 'Lengthwise'.
// Аргумент типа 'number' не может быть присвоен параметру типа 'Lengthwise'
```

Мы должны передавать ему значения, отвечающие всем установленным требованиям:

```tsx
loggingIdentity({ length: 10, value: 3 });
```

## Использование типов параметров в ограничениях дженериков

Мы можем определять типы параметров, ограниченные другими типами параметров. В следующем примере мы хотим получать свойства объекта по их названиям. При этом, мы хотим быть уверенными в том, что не извлекаем несуществующих свойств. Поэтому мы помещаем ограничение между двумя типами:

```tsx
function getProperty<Type, Key extends keyof Type>(obj: Type, key: Key) {
  return obj[key];
}

const x = { a: 1, b: 2, c: 3, d: 4 };

getProperty(x, "a");
getProperty(x, "m");
// Argument of type '"m"' is not assignable to parameter of type '"a" | "b" | "c" | "d"'.
```

## Использование типов класса в дженериках

При создании фабричных функций с помощью дженериков, необходимо ссылаться на типы классов через их функции-конструкторы. Например:

```tsx
function create<Type>(c: { new (): Type }): Type {
  return new c();
}
```

В более сложных случаях может потребоваться использование свойства `prototype` для вывода и ограничения отношений между функцией-конструктором и стороной экземляров типа класса:

```tsx
class BeeKeeper {
  hasMask: boolean;
}

class ZooKeeper {
  nametag: string;
}

class Animal {
  numLegs: number;
}

class Bee extends Animal {
  keeper: BeeKeeper;
}

class Lion extends Animal {
  keeper: ZooKeeper;
}

function createInstance<A extends Animal>(c: new () => A): A {
  return new c();
}

createInstance(Lion).keeper.nametag;
createInstance(Bee).keeper.hasMask;
```

Данный подход часто используется в миксинах или примесях.

# Оператор типа #keyof

Оператор `keyof` "берет" объектный тип и возвращает строковое или числовое литеральное объединение его ключей:

```tsx
type Point = { x: number; y: number };
type P = keyof Point;
// type P = keyof Point
```

Если типом сигнатуры индекса (index signature) типа является `string` или `number`, `keyof` возвращает эти типы:

```tsx
type Arrayish = { [n: number]: unknown };
type A = keyof Arrayish;
// type A = number

type Mapish = { [k: string]: boolean };
type M = keyof Mapish;
// type M = string | number
```

_Обратите внимание_, что типом `M` является `string | number`. Это объясняется тем, что ключи объекта в `JS` всегда преобразуются в строку, поэтому `obj[0]` — это всегда тоже самое, что `obj['0']`.

Типы `keyof` являются особенно полезными в сочетании со связанными типами (mapped types), которые мы рассмотрим позже.

# Оператор типа #typeof

`JS` предоставляет оператор `typeof`, который можно использовать в контексте выражения:

```tsx
console.log(typeof "Привет, народ!"); // string
```

В `TS` оператор `typeof` используется в контексте типа для ссылки на тип переменной или свойства:

```tsx
const s = "привет";
const n: typeof s;
// const n: string
```

В сочетании с другими операторами типа мы можем использовать `typeof` для реализации нескольких паттернов. Например, давайте начнем с рассмотрения предопределенного типа `ReturnType<T>`. Он принимает тип функции и производит тип возвращаемого функцией значения:

```tsx
type Predicate = (x: unknown) => boolean;
type K = ReturnType<Predicate>;
// type K = boolean
```

Если мы попытаемся использовать название функции в качестве типа параметра `ReturnType`, то получим ошибку:

```tsx
function f() {
  return { x: 10, y: 3 };
}
type P = ReturnType<f>;
// 'f' refers to a value, but is being used as a type here. Did you mean 'typeof f'?
// 'f' является ссылкой на значение, но используется как тип. Возможно, вы имели ввиду 'typeof f'
```

_Запомните_: значения и типы — это не одно и тоже. Для ссылки на тип значения `f` следует использовать `typeof`:

```tsx
function f() {
  return { x: 10, y: 3 };
}
type P = ReturnType<typeof f>;
// type P = { x: number, y: number }
```

## Ограничения

`TS` ограничивает виды выражений, на которых можно использовать `typeof`.

`typeof` можно использовать только в отношении идентификаторов (названий переменных) или их свойств. Это помогает избежать написания кода, который не выполняется:

```tsx
// Должны были использовать ReturnType<typeof msgbox>, но вместо этого написали
const shouldContinue: typeof msgbox('Вы уверены, что хотите продолжить?')
// ',' expected
```

# Типы доступа по индексу (indexed access types)

Мы можем использовать тип доступа по индексу для определения другого типа:

```tsx
type Person = { age: number; name: string; alive: boolean };
type Age = Person["age"];
// type Age = number
```

Индексированный тип — это обычный тип, так что мы можем использовать объединения, `keyof` и другие типы:

```tsx
type I1 = Person["age" | "name"];
// type I1 = string | number

type I2 = Person[keyof Person];
// type I2 = string | number | boolean

type AliveOrName = "alive" | "name";
type I3 = Person[AliveOrName];
// type I3 = string | boolean
```

При попытке доступа к несуществующему свойству возникает ошибка:

```tsx
type I1 = Person["alve"];
// Property 'alve' does not exist on type 'Person'.
```

Другой способ индексации заключается в использовании `number` для получения типов элементов массива. Мы также можем использовать `typeof` для перехвата типа элемента:

```tsx
const MyArray = [
  { name: "Alice", age: 15 },
  { name: "Bob", age: 23 },
  { name: "John", age: 38 },
];

type Person = (typeof MyArray)[number];

type Person = {
  name: string;
  age: number;
};
type Age = (typeof MyArray)[number]["age"];

type Age = number;
// или
type Age2 = Person["age"];

type Age2 = number;
```

_Обратите внимание_, что мы не можем использовать `const`, чтобы сослаться на переменную:

```tsx
const key = "age";
type Age = Person[key];
/*
 Type 'any' cannot be used as an index type.
 'key' refers to a value, but is being used as a type here. Did you mean 'typeof key'?
*/
/*
 Тип 'any' не может быть использован в качестве типа индекса.
 'key' является ссылкой на значение, но используется как тип. Возможно, вы имели ввиду 'typeof key'
*/
```

Однако, в данном случае мы можем использовать синоним типа (type alias):

```tsx
type key = "age";
type Age = Person[key];
```

# Условные типы (conditional types)

Обычно, в программе нам приходится принимать решения на основе некоторых входных данных. В `TS` решения также зависят от типов передаваемых аргументов. Условные типы помогают описывать отношения между типами входящих и выходящих данных.

```tsx
interface Animal {
  live(): void;
}
interface Dog extends Animal {
  woof(): void;
}

type Example1 = Dog extends Animal ? number : string;
// type Example1 = number

type Example2 = RegExp extends Animal ? number : string;
// type Example2 = string
```

Условные типы имеют форму, схожую с условными выражениями в `JS` (`условие ? истинноеВыражение : ложноеВыражение`).

```tsx
SomeType extends OtherType ? TrueType : FalseType
```

Когда тип слева от `extends` может быть присвоен типу справа от `extends`, мы получаем тип из первой ветки (истинной), в противном случае, мы получаем тип из второй ветки (ложной).

В приведенном примере польза условных типов не слишком очевидна. Она становится более явной при совместном использовании условных типов и дженериков (общих типов).

Рассмотрим такую функцию:

```tsx
interface IdLabel {
  id: number /* некоторые поля */;
}
interface NameLabel {
  name: string /* другие поля */;
}

function createLabel(id: number): IdLabel;
function createLabel(name: string): NameLabel;
function createLabel(nameOrId: string | number): IdLabel | NameLabel;
function createLabel(nameOrId: string | number): IdLabel | NameLabel {
  throw "не реализовано";
}
```

Перегрузки `createLabel` описывают одну и ту же функцию, которая делает выбор на основе типов входных данных.

*Обратите внимание* на следующее:

1. Если библиотека будет выполнять такую проверку снова и снова, это будет не очень рациональным.
2. Нам пришлось создать 3 перегрузки: по одной для каждого случая, когда мы уверены в типе (одну для `string` и одну для `number`), и еще одну для общего случая (`string` или `number`). Количество перегрузок будет увеличиваться пропорционально добавлению новых типов.

Вместо этого, мы можем реализовать такую же логику с помощью условных типов:

```tsx
type NameOrId<T extends number | string> = T extends number
  ? IdLabel
  : NameLabel;
```

Затем мы можем использовать данный тип для избавления от перегрузок:

```tsx
function createLabel<T extends number | string>(idOrName: T): NameOrId<T> {
  throw "не реализовано";
}

let a = createLabel("typescript");
// let a: NameLabel

let b = createLabel(2.8);
// let b: IdLabel

let c = createLabel(Math.random() ? "hello" : 42);
// let c: NameLabel | IdLabel
```

## Ограничения условных типов

Часто проверка в условном типе дает нам некоторую новую информацию. Подобно тому, как сужение с помощью защитников или предохранителей типа (type guards) возвращает более конкретный тип, инстинная ветка условного типа ограничивает дженерики по типу, который мы проверяем.

Рассмотрим такой пример:

```tsx
type MessageOf<T> = T["message"];
// Type '"message"' cannot be used to index type 'T'.
// Тип '"message"' не может быть использован для индексации типа 'T'
```

В данном случае возникает ошибка, поскольку `TS` не знает о существовании у `T` свойства `message`. Мы можем ограничить `T`, и тогда `TS` перестанет "жаловаться":

```tsx
type MessageOf<T extends { message: unknown }> = T["message"];

interface Email {
  message: string;
}

interface Dog {
  bark(): void;
}

type EmailMessageContents = MessageOf<Email>;
// type EmailMessageContents = string
```

Но что если мы хотим, чтобы `MessageOf` принимал любой тип, а его "дефолтным" значением был тип `never`? Мы можем "вынести" ограничение и использовать условный тип:

```tsx
type MessageOf<T> = T extends { message: unknown } ? T["message"] : never;

interface Email {
  message: string;
}

interface Dog {
  bark(): void;
}

type EmailMessageContents = MessageOf<Email>;
// type EmailMessageContents = string

type DogMessageContents = MessageOf<Dog>;
// type DogMessageContents = never
```

Находясь внутри истинной ветки, `TS` будет знать, что `T` имеет свойство `message`.

В качестве другого примера мы можем создать тип `Flatten`, который распаковывает типы массива на типы составляющих его элементов, но при этом сохраняет их в изоляции:

```tsx
type Flatten<T> = T extends any[] ? T[number] : T;

// Извлекаем тип элемента
type Str = Flatten<string[]>;
// type Str = string

// Сохраняем тип
type Num = Flatten<number>;
// type Num = number
```

Когда `Flatten` получает тип массива, он использует доступ по индексу с помощью `number` для получения типа элемента `string[]`. В противном случае, он просто возвращает переданный ему тип.

## Предположения в условных типах

Мы использовали условные типы для применения ограничений и извлечения типов. Это является настолько распространенной операцией, что существует особая разновидность условных типов.

Условные типы предоставляют возможность делать предположения на основе сравниваемых в истинной ветке типов с помощью ключевого слова `infer`. Например, мы можем сделать вывод относительно типа элемента во `Flatten` вместо его получения вручную через доступ по индексу:

```tsx
type Flatten<Type> = Type extends Array<infer Item> ? Item : Type;
```

В данном случае мы использовали ключевое слово `infer` для декларативного создания нового дженерика `Item` вместо извлечения типа элемента `T` в истинной ветке. Это избавляет нас от необходимости "копаться" и изучать структуру типов, которые нам необходимы.

Мы можем создать несколько вспомогательных синонимов типа (type aliases) с помощью `infer`. Например, в простых случаях мы можем извлекать возвращаемый тип из функции:

```tsx
type GetReturnType<Type> = Type extends (...args: never[]) => infer Return
  ? Return
  : never;

type Num = GetReturnType<() => number>;
// type Num = number

type Str = GetReturnType<(x: string) => string>;
// type Str = string

type Bools = GetReturnType<(a: boolean, b: boolean) => boolean[]>;
// type Bools = boolean[]
```

При предположении на основе типа с помощью нескольких сигнатур вызова (такого как тип перегруженной функции), предположение выполняется на основе последней сигнатуры. Невозможно произвести разрешение перегрузки на основе списка типов аргументов.

```tsx
declare function stringOrNum(x: string): number;
declare function stringOrNum(x: number): string;
declare function stringOrNum(x: string | number): string | number;

type T1 = ReturnType<typeof stringOrNum>;
// type T1 = string | number
```

## Распределенные условные типы (distributive conditional types)

Когда условные типы применяются к дженерикам, они становятся распределенными при получении объединения (union). Рассмотрим следующий пример:

```tsx
type ToArray<Type> = Type extends any ? Type[] : never;
```

Если мы изолируем объединение в `ToArray`, условный тип будет применяться к каждому члену объединения.

```tsx
type ToArray<Type> = Type extends any ? Type[] : never;

type StrArrOrNumArr = ToArray<string | number>;
// type StrArrOrNumArr = string[] | number[]
```

Здесь `StrOrNumArray` распределяется на:

```tsx
string | number;
```

и применяется к каждому члену объединения:

```tsx
ToArray<string> | ToArray<number>;
```

что приводит к следующему:

```tsx
string[] | number[]
```

Обычно, такое поведение является ожидаемым. Для его изменения можно обернуть каждую сторону `extends` в квадратные скобки:

```tsx
type ToArrayNonDist<Type> = [Type] extends [any] ? Type[] : never;

// 'StrOrNumArr' больше не является объединением
type StrOrNumArr = ToArrayNonDist<string | number>;
// type StrOrNumArr = (string | number)[]
```

# Связанные типы (mapped types)

Связанные типы основаны на синтаксисе сигнатуры доступа по индексу, который используется для определения типов свойств, которые не были определены заранее:

```tsx
type OnlyBoolsAndHorses = {
  [key: string]: boolean | Horse;
};

const conforms: OnlyBoolsAndHorses = {
  del: true,
  rodney: false,
};
```

Связанный тип — это общий тип, использующий объединение, созданное с помощью оператора `keyof`, для перебора ключей одного типа в целях создания другого:

```tsx
type OptionsFlags<Type> = {
  [Property in keyof Type]: boolean;
};
```

В приведенном примере `OptionsFlag` получит все свойства типа `Type` и изменит их значения на `boolean`.

```tsx
type FeatureFlags = {
  darkMode: () => void;
  newUserProfile: () => void;
};

type FeatureOptions = OptionsFlags<FeatureFlags>;
// type FeatureOptions = { darkMode: boolean, newUserProfile: boolean }
```

## Модификаторы связывания (mapping modifiers)

Существует два модификатора, которые могут применяться в процессе связывания типов: `readonly` и `?`, отвечающие за иммутабельность (неизменность) и опциональность, соответственно.

Эти модификаторы можно добавлять и удалять с помощью префиксов `-` или `+`. Если префикс отсутствует, предполагается `+`.

```tsx
// Удаляем атрибуты `readonly` из свойств типа
type CreateMutable<Type> = {
  -readonly [Property in keyof Type]: Type[Property];
};

type LockedAccount = {
  readonly id: string;
  readonly name: string;
};

type UnlockedAccount = CreateMutable<LockedAccount>;
// type UnlockedAccount = { id: string, name: string }
```

```tsx
// Удаляем атрибуты `optional` из свойств типа
type Concrete<Type> = {
  [Property in keyof Type]-?: Type[Property];
};

type MaybeUser = {
  id: string;
  name?: string;
  age?: number;
};

type User = Concrete<MaybeUser>;
// type User = { id: string, name: string, age: number }
```

## Повторное связывание ключей с помощью `as`

В `TS` 4.1 и выше, можно использовать оговорку `as` для повторного связывания ключей в связанном типе:

```tsx
type MappedTypeWithNewProperties<Type> = {
  [Properties in keyof Type as NewKeyType]: Type[Properties];
};
```

Для создания новых названий свойств на основе предыдущих можно использовать продвинутые возможности, такие как типы шаблонных литералов (см. ниже):

```tsx
type Getters<Type> = {
  [Property in keyof Type as `get${Capitalize<
    string & Property
  >}`]: () => Type[Property];
};

interface Person {
  name: string;
  age: number;
  location: string;
}

type LazyPerson = Getters<Person>;
// type LazyPerson = { getName: () => string, getAge: () => number, getLocation: () => string }
```

Ключи можно фильтровать с помощью `never` в условном типе:

```tsx
// Удаляем свойство `kind`
type RemoveKindField<Type> = {
  [Property in keyof Type as Exclude<Property, "kind">]: Type[Property];
};

interface Circle {
  kind: "circle";
  radius: number;
}

type KindlessCircle = RemoveKindField<Circle>;
// type KindlessCircle = { radius: number }
```

Связанные типы хорошо работают с другими возможностями по манипуляции типами, например, с условными типами. В следующем примере условный тип возвращает `true` или `false` в зависимости от того, содержит ли объект свойство `pii` с литерально установленным `true`:

```tsx
type ExtractPII<Type> = {
  [Property in keyof Type]: Type[Property] extends { pii: true } ? true : false;
};

type DBFields = {
  id: { format: "incrementing" };
  name: { type: string; pii: true };
};

type ObjectsNeedingGDPRDeletion = ExtractPII<DBFields>;
// type ObjectsNeedingGDPRDeletion = { id: false, name: true }
```

# Типы шаблонных литералов (template literal types)

Типы шаблонных литералов основаны на типах строковых литералов и имеют возможность превращаться в несколько строк через объединения.

Они имеют такой же синтаксис, что и шаблонные литералы в `JS`, но используются на позициях типа. При использовании с конкретным литеральным типом, шаблонный литерал возвращает новый строковый литерал посредством объединения содержимого:

```tsx
type World = "world";

type Greeting = `hello ${World}`;
// type Greeting = 'hello world'
```

Когда тип используется в интерполированной позиции, он является набором каждого возможного строкого литерала, который может быть представлен каждым членом объединения:

```tsx
type EmailLocaleIDs = "welcome_email" | "email_heading";
type FooterLocaleIDs = "footer_title" | "footer_sendoff";

type AllLocaleIDs = `${EmailLocaleIDs | FooterLocaleIDs}_id`;
/*
 type AllLocaleIDs = 'welcome_email_id' | 'email_heading_id' | 'footer_title_id' | 'footer_sendoff_id'
*/
```

Для каждой интерполированной позиции в шаблонном литерале объединения являются множественными:

```tsx
type AllLocaleIDs = `${EmailLocaleIDs | FooterLocaleIDs}_id`;
type Lang = "en" | "ja" | "pt";

type LocaleMessageIDs = `${Lang}_${AllLocaleIDs}`;
/*
 type LocaleMessageIDs = 'en_welcome_email_id' | 'en_email_heading_id' | 'en_footer_title_id' | 'en_footer_sendoff_id' | 'ja_welcome_email_id' | 'ja_email_heading_id' | 'ja_footer_title_id' | 'ja_footer_sendoff_id' | 'pt_welcome_email_id' | 'pt_email_heading_id' | 'pt_footer_title_id' | 'pt_footer_sendoff_id'
*/
```

Большие строковые объединения лучше создавать отдельно, но указанный способ может быть полезным в простых случаях.

## Строковые объединения в типах

Мощь шаблонных строк в полной мере проявляется при определении новой строки на основе существующей внутри типа.

Например, обычной практикой в `JS` является расширение объекта на основе его свойства. Создадим определение типа для функции, добавляющей поддержку для функции `on`, которая позволяет регистрировать изменения значения:

```tsx
const person = makeWatchedObject({
  firstName: "John",
  lastName: "Smith",
  age: 30,
});

person.on("firstNameChanged", (newValue) => {
  console.log(`Имя было изменено на ${newValue}!`);
});
```

_Обратите внимание_, что `on` регистрирует событие `firstNameChanged`, а не просто `firstName`.

Шаблонные литералы предоставляют способ обработки такой операции внутри системы типов:

```tsx
type PropEventSource<Type> = {
  on(
    eventName: `${string & keyof Type}Changed`,
    callback: (newValue: any) => void,
  ): void;
};

// Создаем "наблюдаемый объект" с методом `on`,
// позволяющим следить за изменениями значений свойств
declare function makeWatchedObject<Type>(
  obj: Type,
): Type & PropEventSource<Type>;
```

При передаче неправильного свойства возникает ошибка:

```tsx
const person = makeWatchedObject({
  firstName: "John",
  lastName: "Smith",
  age: 26,
});

person.on("firstNameChanged", () => {});

person.on("firstName", () => {});
// Argument of type '"firstName"' is not assignable to parameter of type '"firstNameChanged" | "lastNameChanged" | "ageChanged"'.
// Параметр типа '"firstName"' не может быть присвоен типу...

person.on("frstNameChanged", () => {});
// Argument of type '"firstNameChanged"' is not assignable to parameter of type '"firstNameChanged" | "lastNameChanged" | "ageChanged"'.
```

## Предположения типов с помощью шаблонных литералов

Заметьте, что в последних примерах типы оригинальных значений не использовались повторно. В функции обратного вызова использовался тип `any`. Типы шаблонных литералов могут предполагаться на основе заменяемых позиций.

Мы можем переписать последний пример с дженериком таким образом, что типы будут предполагаться на основе частей строки `eventName`:

```tsx
type PropEventSource<Type> = {
 on<Key extends string & keyof Type>
   // (eventName: `${Key}Changed`, callback: (newValue: Type[Key]) => void ): void
}

declare function makeWatchedObject<Type>(obj: Type): Type & PropEventSource<Type>

const person = makeWatchedObject({
 firstName: 'Jane',
 lastName: 'Air',
 age: 26
})

person.on('firstNameChanged', newName => {
                         // (parameter) newName: string
   console.log(`Новое имя - ${newName.toUpperCase()}`)
})

person.on('ageChanged', newAge => {
                   // (parameter) newAge: number
   if (newAge < 0) {
       console.warn('Предупреждение! Отрицательный возраст')
   }
})
```

Здесь мы реализовали `on` в общем методе.

При вызове пользователя со строкой `firstNameChanged`, `TS` попытается предположить правильный тип для `Key`. Для этого `TS` будет искать совпадения `Key` с "контентом", находящимся перед `Changed`, и дойдет до строки `firstName`. После этого метод `on` сможет получить тип `firstName` из оригинального объекта, чем в данном случае является `string`. Точно также при вызове с `ageChanged`, `TS` обнаружит тип для свойства `age`, которым является `number`.

## Внутренние типы манипуляций со строками (intrisic string manipulation types)

`TS` предоставляет несколько типов, которые могут использоваться при работе со строками. Эти типы являются встроенными и находятся в файлах `.d.ts`, создаваемых `TS`.

- `Uppercase<StringType>` — переводит каждый символ строки в верхний регистр

```tsx
type Greeting = "Hello, world";
type ShoutyGreeting = Uppercase<Greeting>;
// type ShoutyGreeting = 'HELLO, WORLD'

type ASCIICacheKey<Str extends string> = `ID-${Uppercase<Str>}`;
type MainID = ASCIICacheKey<"my_app">;
// type MainID = 'ID-MY_APP'
```

- `Lowercase<StringType>` — переводит каждый символ в строке в нижний регистр

```tsx
type Greeting = "Hello, world";
type QuietGreeting = Lowercase<Greeting>;
// type QuietGreeting = 'hello, world'

type ASCIICacheKey<Str extends string> = `id-${Lowercase<Str>}`;
type MainID = ASCIICacheKey<"MY_APP">;
// type MainID = 'id-my_app'
```

- `Capitilize<StringType>` — переводит первый символ строки в верхний регистр

```tsx
type LowercaseGreeting = "hello, world";
type Greeting = Capitalize<LowercaseGreeting>;
// type Greeting = 'Hello, world'
```

- `Uncapitilize<StringType>` — переводит первый символ строки в нижний регистр

```tsx
type UppercaseGreeting = "HELLO WORLD";
type UncomfortableGreeting = Uncapitalize<UppercaseGreeting>;
// type UncomfortableGreeting = 'hELLO WORLD'
```

Вот как эти типы реализованы:

```tsx
function applyStringMapping(symbol: Symbol, str: string) {
  switch (intrinsicTypeKinds.get(symbol.escapedName as string)) {
    case IntrinsicTypeKind.Uppercase:
      return str.toUpperCase();
    case IntrinsicTypeKind.Lowercase:
      return str.toLowerCase();
    case IntrinsicTypeKind.Capitalize:
      return str.charAt(0).toUpperCase() + str.slice(1);
    case IntrinsicTypeKind.Uncapitalize:
      return str.charAt(0).toLowerCase() + str.slice(1);
  }
  return str;
}
```
