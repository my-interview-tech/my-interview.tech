---
uid: __-fBEl5eZSoyrQV_FlyX
title: Карманная книга по TS. Часть 7. Классы
tags:
  - TypeScript
  - "#class"
  - "#fields"
  - "#visibility"
  - "#public"
info:
  - "https://habr.com/ru/companies/macloud/articles/563408/"
draft: false
technology: TypeScript
specialty: Frontend
tools: []
order: 0
access: free
created_at: "2025-01-08T02:12:05+05:00"
updated_at: "2026-01-18T15:03:38.095Z"
---

# Члены класса (class members)

Вот пример самого простого класса — пустого:

```
class Point {}
```

Такой класс бесполезен, поэтому давайте добавим ему несколько членов.

## Поля ( #fields )

Поле — это открытое (публичное) и доступное для записи свойство класса:

```
class Point {

  x: number

  y: number

}

const pt = new Point()

pt.x = 0

pt.y = 0
```

Аннотация типа является опциональной (необязательной), но неявный тип будет иметь значение `any`.

Поля могут иметь инициализаторы, которые автоматически запускаются при инстанцировании класса:

```
class Point {

  x = 0

  y = 0

}

const pt = new Point()

// Вывод: 0, 0

console.log(`${pt.x}, ${pt.y}`)
```

Как и в случае с `const`, `let` и `var`, инициализатор свойства класса используется для предположения типа этого свойства:

```
const pt = new Point()

pt.x = '0'

// Type 'string' is not assignable to type 'number'.

// Тип 'string' не может быть присвоен типу 'number'
```

### `--strictPropertyInitialization`

Настройка `strictPropertyInitialization` определяет, должны ли поля класса инициализироваться в конструкторе.

```
class BadGreeter {

  name: string

  // Property 'name' has no initializer and is not definitely assigned in the constructor.

  // Свойство 'name' не имеет инициализатора и ему не присваивается значения в конструкторе

}

class GoodGreeter {

  name: string

  constructor() {

    this.name = 'привет'

  }

}
```

_Обратите внимание_, что поля классов должны быть инициализированы в самом конструкторе. `TS` не анализирует методы, вызываемые в конструкторе, для обнаружения инициализации, поскольку производный класс может перезаписать такие методы, и члены не будут инициализированы.

Если вы намерены инициализировать поле вне конструктора, можете использовать *оператор утверждения определения присвоения* (definite assignment assertion operator, `!`):

```
class OKGreeter {

  // Не инициализируется, но ошибки не возникает

  name!: string

}
```

#### #readonly

Перед названием поля можно указать модификатор `readonly`. Это запретит присваивать полю значения за пределами конструктора.

```
class Greeter {

  readonly name: string = 'народ'

  constructor(otherName?: string) {

    if (otherName !== undefined) {

      this.name = otherName

    }

  }

  err() {

    this.name = 'не ok'

    // Cannot assign to 'name' because it is a read-only property.

    // Невозможно присвоить значение свойству 'name', поскольку оно является доступным только для чтения

  }

}

const g = new Greeter()

g.name = 'тоже не ok'

// Cannot assign to 'name' because it is a read-only property.
```

## Конструкторы ( #constructors)

Конструкторы класса очень похожи на функции. Мы можем добавлять в них параметры с аннотациями типа, значения по умолчанию и перегрузки:

```
class Point {

  x: number

  y: number

  // Обычная сигнатура с «дефолтными» значениями

  constructor(x = 0, y = 0) {

    this.x = x

    this.y = y

  }

}

class Point {

  // Перегрузки

  constructor(x: number, y: string)

  constructor(s: string)

  constructor(xs: any, y?: any) {

    // ...

  }

}
```

Однако, между сигнатурами конструктора класса и функции существует несколько отличий:

- Конструкторы не могут иметь параметров типа — это задача возлагается на внешнее определение класса, о чем мы поговорим позже
- Конструкторы не могут иметь аннотацию возвращаемого типа — всегда возвращается тип экземпляра класса

### #super

Как и в `JS`, при наличии базового класса в теле конструктора, перед использованием `this` необходимо вызывать `super()`:

```
class Base {

  k = 4

}

class Derived extends Base {

  constructor() {

    // В ES5 выводится неправильное значение, в ES6 выбрасывается исключение

    console.log(this.k)

    // 'super' must be called before accessing 'this' in the constructor of a derived class.

    // Перед доступом к 'this' в конструкторе или производном классе необходимо вызвать 'super'

    super()

  }

}
```

В `JS` легко забыть о необходимости вызова `super`, в `TS` — почти невозможно.

## Методы ( #methods)

Метод — это свойство класса, значением которого является функция. Методы могут использовать такие же аннотации типа, что и функции с конструкторами:

```
class Point {

  x = 10

  y = 10

  scale(n: number): void {

    this.x *= n

    this.y *= n

  }

}
```

Как видите, `TS` не добавляет к методам ничего нового.

_Обратите внимание_, что в теле метода к полям и другим методам по-прежнему следует обращаться через `this`. Неквалифицированное название (unqualified name) в теле функции всегда будет указывать на лексическое окружение:

```
let x: number = 0

class C {

  x: string = 'привет'

  m() {

    // Здесь мы пытаемся изменить значение переменной `x`, находящейся на первой строке, а не свойство класса

    x = 'world'

    // Type 'string' is not assignable to type 'number'.

  }

}
```

### Геттеры/сеттеры

Классы могут иметь *акцессоры* (вычисляемые свойства, accessors):

```
class C {

  _length = 0

  get length() {

    return this._length

  }

  set length(value) {

    this._length = value

  }

}
```

`TS` имеет несколько специальных правил, касающихся предположения типов в случае с акцессорами:

- Если `set` отсутствует, свойство автоматически становится `readonly`
- Параметр типа сеттера предполагается на основе типа, возвращаемого геттером
- Если параметр сеттера имеет аннотацию типа, она должна совпадать с типом, возвращаемым геттером
- Геттеры и сеттеры должны иметь одинаковую видимость членов (см. ниже)

Если есть геттер, но нет сеттера, свойство автоматически становится `readonly`.

### Сигнатуры индекса (index signatures)

Классы могут определять сигнатуры индекса. Они работают также, как сигнатуры индекса в других объектных типах:

```
class MyClass {

  [s: string]: boolean | ((s: string) => boolean)

  check(s: string) {

    return this[s] as boolean

  }

}
```

Обычно, индексированные данные лучше хранить в другом месте.

# Классы и наследование

Как и в других объектно-ориентированных языках, классы в `JS` могут наследовать членов других классов.

## #implements

`implements` используется для проверки соответствия класса определенному `interface`. При несоответствии класса интерфейсу возникает ошибка:

```
interface Pingable {

  ping(): void

}

class Sonar implements Pingable {

  ping() {

    console.log('пинг!')

  }

}

class Ball implements Pingable {

// Class 'Ball' incorrectly implements interface 'Pingable'. Property 'ping' is missing in type 'Ball' but required in type 'Pingable'.

// Класс 'Ball' некорректно реализует интерфейс 'Pingable'. Свойство 'ping' отсутствует в типе 'Ball', но является обязательным в типе 'Pingable'

  pong() {

    console.log('понг!')

  }

}
```

Классы могут реализовывать несколько интерейсов одновременно, например, `class C implements A, B {}`.

### Предостережение

Важно понимать, что `implements` всего лишь проверяет, соответствует ли класс определенному интерфейсу. Он не изменяет тип класса или его методов. Ошибочно полагать, что `implements` изменяет тип класса — это не так!

```
interface Checkable {

  check(name: string): boolean

}

class NameChecker implements Checkable {

  check(s) {

    // Parameter 's' implicitly has an 'any' type.

    // Неявным типом параметра 's' является 'any'

    // Обратите внимание, что ошибки не возникает

    return s.toLowercse() === 'ok'

          // any

  }

}
```

В приведенном примере мы, возможно, ожидали, что тип `s` будет определен на основе `name: string` в `check`. Это не так — `implements` не меняет того, как проверяется тело класса или предполагаются его типы.

Также следует помнить о том, что определение в интерфейсе опционального свойства не приводит к созданию такого свойства:

```
interface A {

  x: number

  y?: number

}

class C implements A {

  x = 0

}

const c = new C()

c.y = 10

// Property 'y' does not exist on type 'C'.

// Свойства с названием 'y' не существует в типе 'C'
```

## #extends

Классы могут расширяться другими классами. Производный класс получает все свойства и методы базового, а также может определять дополнительных членов.

```
class Animal {

  move() {

    console.log('Moving along!')

  }

}

class Dog extends Animal {

  woof(times: number) {

    for (let i = 0; i < times; i++) {

      console.log('woof!')

    }

  }

}

const d = new Dog()

// Метод базового класса

d.move()

// Метод производного класса

d.woof(3)
```

### Перезапись методов

Производный класс может перезаписывать свойства и методы базового класса. Для доступа к методам базового класса можно использовать синтаксис `super`. Поскольку классы в `JS` — это всего лишь объекты для поиска (lookup objects), такого понятия как «супер-поле» не существует.

`TS` обеспечивает, чтобы производный класс всегда был подтипом базового класса.

Пример «легального» способа перезаписи метода:

```
class Base {

  greet() {

    console.log('Привет, народ!')

  }

}

class Derived extends Base {

  greet(name?: string) {

    if (name === undefined) {

      super.greet()

    } else {

      console.log(`Привет, ${name.toUpperCase()}`)

    }

  }

}

const d = new Derived()

d.greet()

d.greet('читатель!')
```

Важно, чтобы производный класс следовал контракту базового класса. Помните, что очень часто (и всегда легально) ссылаться на экземпляр производного класса через указатель на базовый класс:

```
// Создаем синоним для производного экземпляра с помощью ссылки на базовый класс

const b: Base = d

// Все работает

b.greet()
```

Что если производный класс не будет следовать конракту базового класса?

```
class Base {

  greet() {

    console.log('Привет, народ!')

  }

}

class Derived extends Base {

  // Делаем этот параметр обязательным

  greet(name: string) {

  // Property 'greet' in type 'Derived' is not assignable to the same property in base type 'Base'. Type '(name: string) => void' is not assignable to type '() => void'.

  // Свойство 'greet' в типе 'Derived' не может быть присвоено одноименному свойству в базовом типе 'Base'...

    console.log(`Привет, ${name.toUpperCase()}`)

  }

}
```

Если мы скомпилируем этот код, несмотря на ошибку, такой «сниппет» провалится:

```
const b: Base = new Derived()

// Не работает, поскольку `name` имеет значение `undefined`

b.greet()
```

### Порядок инициализации

Порядок инициализации классов может быть неожиданным. Рассмотрим пример:

```
class Base {

  name = 'базовый'

  constructor() {

    console.log('Меня зовут ' + this.name)

  }

}

class Derived extends Base {

  name = 'производный'

}

// Вывод: 'базовый', а не 'производный'

const d = new Derived()
```

Что здесь происходит?

Порядок инициализации согласно спецификации следующий:

- Инициализация полей базового класса
- Запуск конструктора базового класса
- Инициализация полей производного класса
- Запуск конструктора производного класса

Это означает, что конструктор базового класса использует собственное значение `name`, поскольку поля производного класса в этот момент еще не инициализированы.

### Наследование встроенных типов

В `ES2015` конструкторы, неявно возвращающие объекты, заменяют значение `this` для любого вызова `super`. Для генерируемого конструктора важно перехватывать потенциальное значение, возвращаемое `super`, и заменять его значением `this`.

Поэтому подклассы `Error`, `Array` и др. могут работать не так, как ожидается. Это объясняется тем, что `Error`, `Array` и др. используют `new.target` из `ES6` для определения цепочки прототипов; определить значение `new.target` в `ES5` невозможно. Другие компиляторы, обычно, имеют такие же ограничения.

Для такого подкласса:

```
class MsgError extends Error {

  constructor(m: string) {

    super(m)

  }

  sayHello() {

    return 'Привет ' + this.message

  }

}
```

вы можете обнаружить, что:

- методы объектов, возвращаемых при создании подклассов, могут иметь значение `undefined`, поэтому вызов `sayHello` завершится ошибкой
- `instanceof` сломается между экземплярами подкласса и их экземплярами, поэтому (`new MsgError()`) `instanceof MsgError` возвращает `false`

Для решения данной проблемы можно явно устанавливать прототип сразу после вызова `super`.

```
class MsgError extends Error {

  constructor(m: string) {

    super(m)

    // Явно устанавливаем прототип

    Object.setPrototypeOf(this, MsgError.prototype)

  }

  sayHello() {

    return 'Привет ' + this.message

  }

}
```

Тем не менее, любой подкласс `MsgError` также должен будет вручную устанавливать прототип. В среде выполнения, в которой не поддерживается `Object.setPrototypeOf`, можно использовать `__proto__`.

# Видимость членов (member #visibility)

Мы можем использовать `TS` для определения видимости методов и свойств для внешнего кода, т.е. кода, находящегося за пределами класса.

## #public

По умолчанию видимость членов класса имеет значение `public`. Публичный член доступен везде:

```
class Greeter {

  public greet() {

    console.log('Привет!')

  }

}

const g = new Greeter()

g.greet()
```

Поскольку `public` является дефолтным значением, специально указывать его не обязательно, но это повышает читаемость и улучшает стиль кода.

## #protected

Защищенные члены видимы только для подклассов класса, в котором они определены.

```
class Greeter {

  public greet() {

    console.log('Привет, ' + this.getName())

  }

  protected getName() {

    return 'народ!'

  }

}

class SpecialGreeter extends Greeter {

  public howdy() {

    // Здесь защищенный член доступен

    console.log('Здорово, ' + this.getName())

  }

}

const g = new SpecialGreeter()

g.greet() // OK

g.getName()

// Property 'getName' is protected and only accessible within class 'Greeter' and its subclasses.

// Свойство 'getName' является защищенным и доступно только в классе 'Greeter' и его подклассах
```

### Раскрытие защищенных членов

Производные классы должны следовать контракту базового класса, но могут расширять подтипы базового класса дополнительными возможностями. Это включает в себя перевод `protected` членов в статус `public`:

```
class Base {

  protected m = 10

}

class Derived extends Base {

  // Модификатор отсутствует, поэтому значением по умолчанию является `public`

  m = 15

}

const d = new Derived()

console.log(d.m) // OK
```

_Обратите внимание_, что в производной классе для сохранения «защищенности» члена необходимо повторно указывать модификатор `protected`.

### Доступ к защищенным членам за пределами иерархии классов

Разные языки ООП по-разному подходят к доступу к защищенным членам из базового класса:

```
class Base {

  protected x: number = 1

}

class Derived1 extends Base {

  protected x: number = 5

}

class Derived2 extends Base {

  f1(other: Derived2) {

    other.x = 10

  }

  f2(other: Base) {

    other.x = 10

    // Property 'x' is protected and only accessible through an instance of class 'Derived2'. This is an instance of class 'Base'.

    // Свойство 'x' является защищенным и доступно только через экземпляр класса 'Derived2'. А это — экземпляр класса 'Base'

  }

}
```

`Java`, например, считает такой подход легальным, а `C#` и `C++` нет.

`TS` считает такой подход нелегальным, поскольку доступ к `x` из `Derived2` должен быть легальным только в подклассах `Derived2`, а `Derived1` не является одним из них.

## #private

Частные члены похожи на защищенные, но не доступны даже в подклассах, т.е. они доступны только в том классе, где они определены.

```
class Base {

  private x = 0

}

const b = new Base()

// Снаружи класса доступ получить нельзя

console.log(b.x)

// Property 'x' is private and only accessible within class 'Base'.

class Derived extends Base {

  showX() {

    // В подклассе доступ получить также нельзя

    console.log(this.x)

    // Property 'x' is private and only accessible within class 'Base'.

  }

}
```

Поскольку частные члены невидимы для производных классов, производный класс не может изменять их видимость:

```
class Base {

  private x = 0

}

class Derived extends Base {

  // Class 'Derived' incorrectly extends base class 'Base'. Property 'x' is private in type 'Base' but not in type 'Derived'.

  // Класс 'Derived' неправильно расширяет базовый класс 'Base'. Свойство 'x' является частным в типе 'Base', но не в типе 'Derived'

  x = 1

}
```

### Доступ к защищенным членам между экземплярами

Разные языки ООП также по-разному подходят к предоставлению доступа экземплярам одного класса к защищенным членам друг друга. Такие языки как `Java`, `C#`, `C++`, `Swift` и `PHP` разрешают такой доступ, а `Ruby` нет.

`TS` разрешает такой доступ:

```
class A {

  private x = 10

  public sameAs(other: A) {

    // Ошибки не возникает

    return other.x === this.x

  }

}
```

### Предостережение

Подобно другим аспектам системы типов `TS`, `private` и `protected` оказывают влияние на код только во время проверки типов. Это означает, что конструкции вроде `in` или простой перебор свойств имеют доступ к частным и защищенным членам:

```
class MySafe {

  private secretKey = 12345

}

// В JS-файле...

const s = new MySafe()

// Вывод 12345

console.log(s.secretKey)
```

Для реализации «настоящих» частных членов можно использовать такие механизмы, как замыкания (closures), слабые карты (weak maps) или синтаксис приватных полей класса (private fields, `#`).

# Статические члены (static members)

В классах могут определеяться статические члены. Такие члены не связаны с конкретными экземплярами класса. Они доступны через объект конструктора класса:

```
class MyClass {

  static x = 0

  static printX() {

    console.log(MyClass.x)

  }

}

console.log(MyClass.x)

MyClass.printX()
```

К статическим членам также могут применяться модификаторы `public`, `protected` и `private`:

```
class MyClass {

  private static x = 0

}

console.log(MyClass.x)

// Property 'x' is private and only accessible within class 'MyClass'.
```

Статические члены наследуются:

```
class Base {

  static getGreeting() {

    return 'Привет, народ!'

  }

}

class Derived extends Base {

  myGreeting = Derived.getGreeting()

}
```

## Специальные названия статических членов

Изменение прототипа `Function` считается плохой практикой. Поскольку классы — это функции, вызываемые с помощью `new`, некоторые слова нельзя использовать в качестве названий статических членов. К таким словам относятся, в частности, свойства функций `name`, `length` и `call`:

```
class S {

  static name = 'S!'

  // Static property 'name' conflicts with built-in property 'Function.name' of constructor function 'S'.

  // Статическое свойство 'name' вступает в конфликт со встроенным свойством 'Function.name' функции-конструктора 'S'

}
```

### Почему не существует статических классов?

В некоторых языках, таких как `C#` или `Java` существует такая конструкция, как статический класс (static class).

Существование этих конструкций обусловлено тем, что в названных языках все данные и функции должны находиться внутри классов; в `TS` такого ограничения не существует, поэтому в статических классах нет никакой необходимости.

Например, нам не нужен синтаксис «статического класса», поскольку обычный объект (или функция верхнего уровня) прекрасно справляются с такими задачами:

```
// Ненужный «статический» класс

class MyStaticClass {

  static doSomething() {}

}

// Альтернатива 1

function doSomething() {}

// Альтернатива 2

const MyHelperObject = {

  dosomething() {},

}
```

# Общие классы (generic classes)

Классы, подобно интерфейсам, могут быть общими. Когда общий класс инстанцируется с помощью `new`, его параметры типа предполагаются точно также, как и при вызове функции:

```
class Box<Type> {

  contents: Type

  constructor(value: Type) {

    this.contents = value

  }

}

const b = new Box('Привет!')

    // const b: Box<string>
```

В классах, как и в интерфейсах, могут использоваться ограничения дженериков и значения по умолчанию.

## Параметр типа в статических членах

Следующий код, как ни странно, является НЕлегальным:

```
class Box<Type> {

  static defaultValue: Type

  // Static members cannot reference class type parameters.

  // Статические члены не могут ссылаться на типы параметров класса

}
```

Запомните, что типы полностью удаляются! Во время выполнения существует только один слот `Box.defaultValue`. Это означает, что установка `Box<string>.defaultValue` (если бы это было возможным) изменила бы `Box<number>.defaultValue`, что не есть хорошо. Поэтому статические члены общих классов не могут ссылаться на параметры типа класса.

# Значение `this` в классах во время выполнения кода

`TS` не изменяет поведения `JS` во время выполнения. Обработка `this` в `JS` может показаться необычной:

```
class MyClass {

  name = 'класс'

  getName() {

    return this.name

  }

}

const c = new MyClass()

const obj = {

  name: 'объект',

  getName: c.getName,

}

// Выводится 'объект', а не 'класс'

console.log(obj.getName())
```

Если кратко, то значение `this` внутри функции зависит от того, как эта функция вызывается. В приведенном примере, поскольку функция вызывается через ссылку на `obj`, значением `this` является `obj`, а не экземпляр класса.

`TS` предоставляет некоторые средства для изменения такого поведения.

## Стрелочные функции

Если у вас имеется функция, которая часто будет вызываться способом, приводящим к потере контекста, имеет смысл определить такое свойство в виде стрелочной функции:

```
class MyClass {

  name = 'класс'

  getName = () => {

    return this.name

  }

}

const c = new MyClass()

const g = c.getName

// Выводится 'класс'

console.log(g())
```

Это требует некоторых компромиссов:

- Значение `this` будет гарантированно правильным во время выполнения, даже в коде, не прошедшем проверки с помощью `TS`
- Будет использоваться больше памяти, поскольку для каждого экземпляра класса будет создаваться новая функция
- В производном классе нельзя будет использовать `super.getName`, поскольку отсутствует входная точка для получения метода базового класса в цепочке прототипов

## Параметры `this`

При определении метода или функции начальный параметр под названием `this` имеет особое значение в `TS`. Данный параметр удаляется во время компиляции:

```
// TS

function fn(this: SomeType, x: number) {

  /* ... */

}

// JS

function fn(x) {

  /* ... */

}
```

`TS` проверяет, что функция с параметром `this` вызывается в правильном контексте. Вместо использования стрелочной функции мы можем добавить параметр `this` в определение метода для обеспечения корректности его вызова:

```
class MyClass {

  name = 'класс'

  getName(this: MyClass) {

    return this.name

  }

}

const c = new MyClass()

// OK

c.getName()

// Ошибка

const g = c.getName

console.log(g())

// The 'this' context of type 'void' is not assignable to method's 'this' of type 'MyClass'.

// Контекст 'this' типа 'void' не может быть присвоен методу 'this' типа 'MyClass'
```

Данный подход также сопряжен с несколькими органичениями:

- Мы все еще имеем возможность вызывать метод неправильно
- Выделяется только одна функция для каждого определения класса, а не для каждого экземпляра класса
- Базовые определения методов могут по-прежнему вызываться через `super`

## Типы `this`

В классах специальный тип `this` динамически ссылается на тип текущего класса:

```
class Box {

  contents: string = ''

  set(value: string) {

  // (method) Box.set(value: string): this

    this.contents = value

    return this

  }

}
```

Здесь `TS` предполагает, что типом `this` является тип, возвращаемый `set`, а не `Box`. Создадим подкласс `Box`:

```
class ClearableBox extends Box {

  clear() {

    this.contents = ''

  }

}

const a = new ClearableBox()

const b = a.set('привет')

  // const b: ClearableBox
```

Мы также можем использовать `this` в аннотации типа параметра:

```
class Box {

  content: string = ''

  sameAs(other: this) {

    return other.content === this.content

  }

}
```

Это отличается от `other: Box` — если у нас имеется производный класс, его метод `sameAs` будет принимать только другие экземпляры этого производного класса:

```
class Box {

  content: string = ''

  sameAs(other: this) {

    return other.content === this.content

  }

}

class DerivedBox extends Box {

  otherContent: string = '?'

}

const base = new Box()

const derived = new DerivedBox()

derived.sameAs(base)

// Argument of type 'Box' is not assignable to parameter of type 'DerivedBox'. Property 'otherContent' is missing in type 'Box' but required in type 'DerivedBox'.
```

### Основанные на `this` защитники типа

Мы можем использовать `this is Type` в качестве возвращаемого типа в методах классов и интерфейсах. В сочетании с сужением типов (например, с помощью инструкции `if`), тип целевого объекта может быть сведен к более конкретному `Type`.

```
class FileSystemObject {

  isFile(): this is FileRep {

    return this instanceof FileRep

  }

  isDirectory(): this is Directory {

    return this instanceof Directory

  }

  isNetworked(): this is Networked & this {

    return this.networked

  }

  constructor(public path: string, private networked: boolean) {}

}

class FileRep extends FileSystemObject {

  constructor(path: string, public content: string) {

    super(path, false)

  }

}

class Directory extends FileSystemObject {

  children: FileSystemObject[]

}

interface Networked {

  host: string

}

const fso: FileSystemObject = new FileRep('foo/bar.txt', 'foo')

if (fso.isFile()) {

  fso.content

  // const fso: FileRep

} else if (fso.isDirectory()) {

  fso.children

  // const fso: Directory

} else if (fso.isNetworked()) {

  fso.host

  // const fso: Networked & FileSystemObject

}
```

Распространенным случаем использования защитников или предохранителей типа (type guards) на основе `this` является «ленивая» валидация определенного поля. В следующем примере мы удаляем `undefined` из значения, содержащегося в `box`, когда `hasValue` проверяется на истинность:

```
class Box<T> {

  value?: T

  hasValue(): this is { value: T } {

    return this.value !== undefined

  }

}

const box = new Box()

box.value = 'Gameboy'

box.value

// (property) Box<unknown>.value?: unknown

if (box.hasValue()) {

  box.value

  // (property) value: unknown

}
```

# Свойства параметров

`TS` предоставляет специальный синтаксис для преобразования параметров конструктора в свойства класса с аналогичными названиями и значениями. Это называется свойствами параметров (или параметризованными свойствами), такие свойства создаются с помощью добавления модификаторов `public`, `private`, `protected` или `readonly` к аргументам конструктора. Создаваемые поля получают те же модификаторы:

```
class Params {

  constructor(

    public readonly x: number,

    protected y: number,

    private z: number

  ) {

    // ...

  }

}

const a = new Params(1, 2, 3)

console.log(a.x)

        // (property) Params.x: number

console.log(a.z)

// Property 'z' is private and only accessible within class 'Params'.
```

# Выражения классов (class expressions)

Выражения классов похожи на определения классов. Единственным отличием между ними является то, что выражения классов не нуждаются в названии, мы можем ссылаться на них с помощью любого идентификатора, к которому они привязаны (bound):

```
const someClass = class<Type> {

  content: Type

  constructor(value: Type) {

    this.content = value

  }

}

const m = new someClass('Привет, народ!')

// const m: someClass<string>
```

# Абстрактные классы и члены

Классы, методы и поля в `TS` могут быть абстрактными.

Абстрактным называется метод или поле, которые не имеют реализации. Такие методы и поля должны находится внутри абстрактного класса, который не может инстанцироваться напрямую.

Абстрактные классы выступают в роли базовых классов для подклассов, которые реализуют абстрактных членов. При отсутствии абстрактных членов класс считается конкретным (concrete).

Рассмотрим пример:

```
abstract class Base {

  abstract getName(): string

  printName() {

    console.log('Привет, ' + this.getName())

  }

}

const b = new Base()

// Cannot create an instance of an abstract class.

// Невозможно создать экземпляр абстрактного класса
```

Мы не можем инстанцировать `Base` с помощью `new`, поскольку он является абстрактным. Вместо этого, мы должны создать производный класс и реализовать всех абстрактных членов:

```
class Derived extends Base {

  getName() {

    return 'народ!'

  }

}

const d = new Derived()

d.printName()
```

_Обратите внимание_: если мы забудем реализовать абстрактных членов, то получим ошибку:

```
class Derived extends Base {

  // Non-abstract class 'Derived' does not implement inherited abstract member 'getName' from class 'Base'.

  // Неабстрактный класс 'Derived' не реализует унаследованный от класса 'Base' абстрактный член 'getName'

  // Забыли про необходимость реализации абстрактных членов

}
```

## Сигнатуры абстрактных конструкций (abstract construct signatures)

Иногда нам требуется конструктор класса, создающий экземпляр класса, производный от некоторого абстрактного класса.

Рассмотрим пример:

```
function greet(ctor: typeof Base) {

  const instance = new ctor()

  // Cannot create an instance of an abstract class.

  instance.printName()

}
```

`TS` сообщает нам о том, что мы пытаемся создать экземпляр абстрактного класса. Тем не менее, имея определение `greet`, мы вполне можем создать абстрактный класс:

```
// Плохо!

greet(Base)
```

Вместо этого, мы можем написать функцию, которая принимает нечто с сигнатурой конструктора:

```
function greet(ctor: new () => Base) {

  const instance = new ctor()

  instance.printName()

}

greet(Derived)

greet(Base)

/*

  Argument of type 'typeof Base' is not assignable to parameter of type 'new () => Base'.

    Cannot assign an abstract constructor type to a non-abstract constructor type.

*/

/*

  Аргумент типа 'typeof Base' не может быть присвоен параметру типа 'new () => Base'.

    Невозможно присвоить тип абстрактного конструктора типу неабстрактного конструктора

*/
```

Теперь `TS` правильно указывает нам на то, какой конструктор может быть вызван — `Derived` может, а `Base` нет.

# Отношения между классами

В большинстве случаев классы в `TS` сравниваются структурно, подобно другим типам.

Например, следующие два класса являются взаимозаменяемыми, поскольку они идентичны:

```
class Point1 {

  x = 0

  y = 0

}

class Point2 {

  x = 0

  y = 0

}

// OK

const p: Point1 = new Point2()
```

Также существуют отношения между подтипами, даже при отсутствии явного наследования:

```
class Person {

  name: string

  age: number

}

class Employee {

  name: string

  age: number

  salary: number

}

// OK

const p: Person = new Employee()
```

Однако, существует одно исключение.

Пустые классы не имеют членов. В структурном отношении такие классы являются «супертипами» для любых других типов. Так что, если мы создадим пустой класс (не надо этого делать!), вместо него можно будет использовать что угодно:

```
class Empty {}

function fn(x: Empty) {

  // С `x` можно делать что угодно

}

// OK!

fn(window)

fn({})

fn(fn)
```
